# Narrate every script in scripts.txt -> videos/<id>-<slug>/{voice.wav, words.json, meta.json}
import json, os, re, sys, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
VOICE, SPEED, SR = "am_michael", 1.15, 24000
only = set(sys.argv[1:])
ONES = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split()
TENS = "_ _ twenty thirty forty fifty sixty seventy eighty ninety".split()
def two(n):
    if n < 20: return ONES[n]
    return TENS[n // 10] + ("" if n % 10 == 0 else "-" + ONES[n % 10])
def year(n):
    if 2000 <= n <= 2009: return "two thousand" + ("" if n == 2000 else " " + ONES[n - 2000])
    hi, lo = divmod(n, 100)
    if lo == 0: return two(hi) + " hundred"
    return two(hi) + " " + ("oh-" + ONES[lo] if lo < 10 else two(lo))
def decade(n):  # 1960 -> nineteen sixties, 1700 -> seventeen hundreds
    hi, lo = divmod(n, 100)
    if lo == 0: return two(hi) + " hundreds"
    t = TENS[lo // 10]; return two(hi) + " " + (t[:-1] + "ies")
ORD = {"17": "seventeenth", "30": "thirtieth"}
FIX = {"Scheldt": "Skelt", "Meux": "Mews", "Tenochtitlan": "Tay-notch-teet-lan", "Mexica": "Meh-shee-kah", "Daghlian": "Dag-lee-an",
       "aeolipile": "ee-oh-lih-pile", "Ea-nasir": "Ay-uh nah-seer", "Ea-nasir's": "Ay-uh nah-seer's", "AD": "A.D.", "FAA": "F.A.A.", "HMS": "H.M.S.",
       "B-52": "B fifty-two", "Troffea": "Troff-ay-uh", "Poyais": "Poy-ice", "Koppai": "Koh-pie", "Notarbartolo's": "Notar-bar-tolo's",
       "Trier": "Treer", "Trier.": "Treer.", "Trier,": "Treer,", "Karánsebes": "Karan-sheh-besh", "Abyssinia": "Abba-sinnia"}
def say(w):
    core = re.sub(r"^[\"“(]+|[\"”).,:;!?…]+$", "", w); pre = w[: w.find(core)] if core else ""; post = w[len(pre) + len(core):]
    if core in FIX: return pre + FIX[core] + post
    m = re.fullmatch(r"(\d{4})s", core)
    if m: return pre + decade(int(m.group(1))) + post
    if re.fullmatch(r"1\d{3}|20\d{2}", core): return pre + year(int(core)) + post
    if re.fullmatch(r"\d{3}", core): return pre + ONES[int(core) // 100] + " " + two(int(core) % 100) + post
    return w
def spoken(words):
    out = []
    for i, w in enumerate(words):
        prev = words[i - 1] if i else ""
        core = re.sub(r"[^\d]", "", w)
        if prev in ("June", "December") and core in ORD: out.append(ORD[core] + w[len(core):]); continue
        if w.startswith("BC"): out.append("B.C." + w[2:]); continue
        out.append(say(w))
    return " ".join(out)
ABBR = ("U.S.", "St.", "Co.", "P.T.", "D.B.", "Sir")
def sentences(body):
    parts = re.split(r'(?:(?<=[.!?])|(?<=[.!?]["”]))\s+(?=["“]?[A-Z])', body.strip())
    out = []
    for p in parts:
        if out and out[-1].split()[-1] in ABBR: out[-1] += " " + p
        else: out.append(p)
    return out
k = Kokoro("voice/kokoro-v1.0.int8.onnx", "voice/voices-v1.0.bin")
blocks = re.split(r"^## ", open("scripts.txt").read(), flags=re.M)[1:]
for b in blocks:
    head, hook, body = b.strip().split("\n", 2)
    vid, rest = head.split(" ", 1); slug, title = [x.strip() for x in rest.split("|")]
    if only and vid not in only: continue
    d = f"videos/{vid}-{slug}"; os.makedirs(d, exist_ok=True)
    if os.path.exists(f"{d}/words.json") and not only: continue
    sents = [hook.strip()] + sentences(body)
    t = 0.05; audio = [np.zeros(int(SR * 0.05), np.float32)]; words, S = [], []
    for i, text in enumerate(sents):
        if i: gap = 0.22 if i == 1 else 0.1; audio.append(np.zeros(int(SR * gap), np.float32)); t += gap
        toks = text.split()
        a, _ = k.create(spoken(toks), voice=VOICE, speed=SPEED, lang="en-us"); a = a.astype(np.float32)
        env = np.abs(a) > 0.01
        a = a[max(0, np.argmax(env) - int(0.02 * SR)): len(a) - np.argmax(env[::-1]) + int(0.05 * SR)]
        dur = len(a) / SR
        wts = [max(2.0, len(re.sub(r"[^A-Za-z0-9 -]", "", spoken([w]))) + 1) + (2.5 if re.search(r"[,.:;?!]$", w) else 0) for w in toks]
        c = t
        for w, wt in zip(toks, wts):
            dd = dur * wt / sum(wts); words.append({"w": w, "s": round(c, 3), "e": round(c + dd, 3)}); c += dd
        S.append({"text": text, "s": round(t, 3), "e": round(t + dur, 3)}); audio.append(a); t += dur
    audio.append(np.zeros(int(SR * 0.3), np.float32)); t += 0.3
    wav = np.concatenate(audio); wav = wav / (np.abs(wav).max() + 1e-9) * 0.89
    sf.write(f"{d}/voice.wav", wav, SR)
    json.dump({"id": vid, "slug": slug, "title": title, "duration": round(t, 3), "words": words, "sentences": S}, open(f"{d}/words.json", "w"))
    print(vid, slug, round(t, 1), "s", len(S), "sentences", flush=True)
