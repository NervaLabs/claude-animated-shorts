import json, os, sys
import numpy as np
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE); sys.path.insert(0, HERE)
from dsp import read_wav, integrated, true_peak, momentary
import soundtrack as T

def test_cue_kinds_have_generators():
    r = np.random.default_rng(0)
    for k in sorted({q["kind"] for q in T.CUES["cues"]}):
        x = T.one(k, r, 3.0); assert np.isfinite(x).all() and np.abs(x).max() > 0, k
    for k in sorted({s["amb"] for s in T.CUES["amb"] if s["amb"]}): assert k in T.AMB, k

def test_mix_file():
    y, sr = read_wav(os.path.join(ROOT, "out", "mix.wav"))
    assert sr == 48000 and y.shape[0] == 2
    assert abs(y.shape[1] - round(T.CUES["total"] / 30 * 48000)) <= 1
    assert abs(integrated(y) + 14.0) <= 0.5, integrated(y)
    assert true_peak(y) <= -1.0, true_peak(y)

def test_music_under_voice():
    v, _ = read_wav(os.path.join(ROOT, "out", "stem_voice.wav")); m, _ = read_wav(os.path.join(ROOT, "out", "stem_music.wav"))
    assert integrated(v) - integrated(m) >= 8.0, (integrated(v), integrated(m))
