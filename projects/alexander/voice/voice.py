# Narration with kokoro-onnx (local), word timings estimated per sentence by spoken-length weights.
import json, re, sys, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
VOICE = sys.argv[1] if len(sys.argv) > 1 else "am_michael"
SPEED = float(sys.argv[2]) if len(sys.argv) > 2 else 1.08
SAY = {"356": "three fifty-six", "336": "three thirty-six", "331": "three thirty-one", "323": "three twenty-three",
       "BC": "B.C.", "BC,": "B.C.,", "Gaugamela,": "Gow-gah-meela,", "Issus,": "Issus,"}
k = Kokoro("voice/kokoro-v1.0.int8.onnx", "voice/voices-v1.0.bin")
SR = 24000
lines = [l.split("|", 1) for l in open("voice/lines.txt").read().strip().split("\n")]
out, words, sents, t = [], [], [], 0.25
out.append(np.zeros(int(SR * 0.25), np.float32))
prev_scene = None
def weight(s):  # spoken length proxy
    s = re.sub(r"[^A-Za-z0-9 \-]", "", s); return max(2.0, len(s) + 1.5 * s.count("-"))
for scene, text in lines:
    scene = int(scene)
    if prev_scene is not None:
        gap = 0.32 if scene != prev_scene else 0.14
        out.append(np.zeros(int(SR * gap), np.float32)); t += gap
    prev_scene = scene
    toks = text.split()
    spoken = " ".join(SAY.get(w, w) for w in toks)
    a, sr = k.create(spoken, voice=VOICE, speed=SPEED, lang="en-us")
    a = a.astype(np.float32)
    # trim leading/trailing silence
    env = np.abs(a) > 0.01
    i0 = max(0, np.argmax(env) - int(0.02 * SR)); i1 = min(len(a), len(a) - np.argmax(env[::-1]) + int(0.06 * SR))
    a = a[i0:i1]
    dur = len(a) / SR
    ws = [weight(SAY.get(w, w)) + (3.0 if re.search(r"[,.:?]$", w) else 0) for w in toks]
    tot = sum(ws); c = t
    for w, wt in zip(toks, ws):
        d = dur * wt / tot
        words.append({"w": w, "s": round(c, 3), "e": round(c + d, 3), "scene": scene})
        c += d
    sents.append({"scene": scene, "text": text, "s": round(t, 3), "e": round(t + dur, 3)})
    out.append(a); t += dur
out.append(np.zeros(int(SR * 2.2), np.float32)); t += 2.2
wav = np.concatenate(out)
wav = wav / (np.abs(wav).max() + 1e-9) * 0.89
sf.write("voice/voice.wav", wav, SR)
json.dump({"duration": round(t, 3), "words": words, "sentences": sents}, open("voice/words.json", "w"), indent=0)
print("duration", round(t, 2), "words", len(words), "wps", round(len(words) / t, 2))
