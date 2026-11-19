"""Shorten narration pauses (the reference style has almost none) and remap word times.
Pauses > 0.3 s become: scene break 0.50 s, sentence end 0.24 s, other 0.16 s. Then an optional pitch-preserving
tempo factor (ffmpeg atempo). Writes voice/voice.wav (48 kHz mono) and voice/words.json.
Usage: python3 tools/tighten.py [tempo]"""
import json, os, sys, subprocess
import numpy as np
from scipy.io import wavfile
HERE = os.path.dirname(os.path.abspath(__file__)); V = os.path.join(HERE, "..", "voice")
TEMPO = float(sys.argv[1]) if len(sys.argv) > 1 else 1.0
sr, x = wavfile.read(os.path.join(V, "raw.wav")); x = x.astype(np.float32) / 32768.0
sil = json.load(open(os.path.join(V, "sil.json")))
words = json.load(open(os.path.join(V, "words_raw.json")))

def kind(a, b):
    prev = [w for w in words if w["e"] <= a + 0.05]
    nxt = [w for w in words if w["s"] >= b - 0.05]
    if not prev or not nxt: return 0.16
    p, n = prev[-1], nxt[0]
    if n["para"] != p["para"]: return 0.50
    return 0.24 if p["cap"][-1] in ".?!:\"" else 0.16

cuts = []  # (start_cut, end_cut) in seconds, removed from the middle of each long pause
for a, b in sil:
    if a <= 0.01: continue
    d, tgt = b - a, kind(a, b)
    if d > tgt + 0.02:
        m = (a + b) / 2; cuts.append((m - (d - tgt) / 2, m + (d - tgt) / 2))
XF = int(0.008 * sr)
pieces, keep, t0 = [], [], 0.0  # keep = list of (raw_start, raw_end, new_start)
new = 0.0
for c0, c1 in cuts + [(len(x) / sr, len(x) / sr)]:
    keep.append((t0, c0, new)); new += c0 - t0
    seg = x[int(t0 * sr):int(c0 * sr)].copy()
    if len(seg) > 2 * XF: seg[:XF] *= np.linspace(0, 1, XF); seg[-XF:] *= np.linspace(1, 0, XF)
    pieces.append(seg); t0 = c1
y = np.concatenate(pieces)
def remap(t):
    for r0, r1, n0 in keep:
        if t <= r1 + 1e-6: return n0 + max(0.0, t - r0)
    return new
for w in words:
    w["s"] = round(remap(w["s"]) / TEMPO, 3); w["e"] = round(remap(w["e"]) / TEMPO, 3)
tmp = os.path.join(V, "tight.wav"); wavfile.write(tmp, sr, (y * 32767).astype(np.int16))
subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", tmp, "-af", f"atempo={TEMPO}", "-ar", "48000", os.path.join(V, "voice.wav")], check=True)
json.dump(words, open(os.path.join(V, "words.json"), "w"), indent=0)
print(f"removed {sum(b - a for a, b in cuts):.1f}s in {len(cuts)} pauses; tight {len(y)/sr:.1f}s; final {len(y)/sr/TEMPO:.1f}s at tempo {TEMPO}")
