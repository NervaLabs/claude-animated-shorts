"""Word timings for the narration.
1. faster-whisper (base.en, word timestamps) on voice/raw.wav
2. align recognised words to the script tokens (difflib), interpolate unmatched tokens
3. group spoken tokens into caption tokens (years -> "356 BC")
Writes voice/words_raw.json: [{"cap", "spoken", "s", "e", "para"}] in raw-take seconds.
"""
import json, re, sys, difflib, os
HERE = os.path.dirname(os.path.abspath(__file__))
V = os.path.join(HERE, "..", "voice")

# spoken phrase (as in narration.txt) -> caption text
GROUPS = {
    "three fifty-six B.C.,": "356 BC,", "three thirty-six B.C.,": "336 BC,", "three thirty-four B.C.,": "334 BC,",
    "three thirty-three B.C.,": "333 BC,", "three thirty-one B.C.,": "331 BC,", "three twenty-six B.C.,": "326 BC,",
    "three twenty-three B.C.,": "323 BC,", "forty thousand": "40,000",
}

def norm(w):
    return re.sub(r"[^a-z0-9]", "", w.lower())

def script_tokens(text):
    paras = [p.split() for p in text.strip().split("\n\n")]
    toks = []
    for pi, p in enumerate(paras):
        for w in p:
            toks.append({"w": w, "para": pi})
    return toks

def group(toks):
    out, i = [], 0
    while i < len(toks):
        hit = None
        for k, cap in GROUPS.items():
            n = len(k.split())
            if " ".join(t["w"] for t in toks[i:i + n]) == k:
                hit = (n, cap)
                break
        n, cap = hit if hit else (1, toks[i]["w"])
        seg = toks[i:i + n]
        out.append({"cap": cap, "spoken": [t["w"] for t in seg], "s": seg[0]["s"], "e": seg[-1]["e"], "para": seg[0]["para"]})
        i += n
    return out

def interpolate(toks):
    idx = [i for i, t in enumerate(toks) if t.get("s") is not None]
    for i, t in enumerate(toks):
        if t.get("s") is not None:
            continue
        lo = max([j for j in idx if j < i], default=None)
        hi = min([j for j in idx if j > i], default=None)
        a = toks[lo]["e"] if lo is not None else 0.0
        b = toks[hi]["s"] if hi is not None else a + 0.3
        k0 = lo if lo is not None else -1
        k1 = hi if hi is not None else len(toks)
        span = k1 - k0
        t["s"] = a + (b - a) * (i - k0 - 1) / max(1, span - 1)
        t["e"] = a + (b - a) * (i - k0) / max(1, span - 1)
    return toks

def main():
    from faster_whisper import WhisperModel
    text = open(os.path.join(V, "narration.txt")).read()
    toks = script_tokens(text)
    model = WhisperModel("base.en", device="cpu", compute_type="int8")
    from scipy.io import wavfile
    sr, pcm = wavfile.read(os.path.join(V, "raw16.wav"))
    segs, _ = model.transcribe(pcm.astype("float32") / 32768.0, word_timestamps=True, beam_size=5,
                               initial_prompt="Alexander, Macedonia, Pella, Bucephalus, Aristotle, Mieza, Chaeronea, Aegae, Darius, Issus, Parmenion, Gaugamela, Persepolis, Bactria, Sogdiana, Porus, Hydaspes, Ptolemies, Seleucids, Antigonids, Hellenistic")
    rec = [w for s in segs for w in s.words]
    a = [norm(t["w"]) for t in toks]
    b = [norm(w.word) for w in rec]
    sm = difflib.SequenceMatcher(a=a, b=b, autojunk=False)
    for blk in sm.get_matching_blocks():
        for k in range(blk.size):
            w = rec[blk.b + k]
            toks[blk.a + k]["s"], toks[blk.a + k]["e"] = float(w.start), float(w.end)
    matched = sum(1 for t in toks if t.get("s") is not None)
    print(f"matched {matched}/{len(toks)} script tokens ({len(rec)} recognised)")
    toks = interpolate(toks)
    json.dump(group(toks), open(os.path.join(V, "words_raw.json"), "w"), indent=0)

if __name__ == "__main__":
    main()
