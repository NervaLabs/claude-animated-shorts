"""Soundtrack of "Napoleon Bonaparte: The Man Who Conquered Europe" - all original, synthesised with numpy/scipy.
  music:  per-scene cues in D minor / D major: plucked strings, string pad, horns, fife, field snare, timpani
  sfx:    every cue in out/cues.json (stamps, pops, whooshes, hooves, crowds, clashes, ...) + ambience beds per shot
  mix:    voice (gain only) on top; music ducked under speech; master to -14 LUFS integrated, <= -1 dBTP
Writes out/mix.wav (48 kHz, stereo, 24-bit), exactly TOTAL/30 s, plus out/stem_{voice,music,sfx}.wav.
Usage: python3 audio/soundtrack.py"""
import json, os, sys
import numpy as np
from scipy import signal, ndimage
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)
from dsp import SR, TAU, ns, tt, dbg, rng, lp, hp, bp, colored, smooth_noise, ramp, fades, modal, pan, st, place, make_ir, convolve_st, integrated, true_peak, read_wav, write_wav
import instruments as I
import sfx_gen as X

CUES = json.load(open(os.path.join(ROOT, "out", "cues.json")))
WORDS = json.load(open(os.path.join(ROOT, "voice", "words.json")))
FPS = CUES["fps"]; DUR = CUES["total"] / FPS; N = ns(DUR)
TARGET_LUFS, CEIL_DBTP = -14.0, -1.2
m2f = lambda m: 440.0 * 2 ** ((m - 69) / 12)

def scene_spans():
    sp = {}
    for s in CUES["shots"]:
        a, b = s["a"] / FPS, s["b"] / FPS
        k = s["scene"]; sp[k] = (min(sp.get(k, (a, b))[0], a), max(sp.get(k, (a, b))[1], b))
    return sp

# ============================================================ music
def add(buf, x, t, g=1.0):
    if x.ndim == 1: x = st(x)
    place(buf, x, t, g)

def lyre(f, vel=0.6, r=None, dur=1.4):
    y = I.pluck(f, vel, r, dur=dur, bright=0.62, pos=0.21)
    o = I.pluck(f * 2.003, vel * 0.5, r, dur=dur * 0.6, bright=0.5, pos=0.3)
    y[: len(o)] += 0.25 * o
    return y

def frame_drum(vel, r, low=True):
    t = tt(0.45)
    body = np.sin(TAU * (95 if low else 160) * t * (1 - 0.25 * t)) * np.exp(-t / (0.16 if low else 0.07))
    slap = hp(r.standard_normal(len(t)), 900) * np.exp(-t / 0.012) * (0.25 if low else 0.6)
    return fades((body + slap) * vel)

CHORDS = {  # midi roots + triads
    "Dm": [50, 62, 65, 69], "C": [48, 60, 64, 67], "G": [43, 59, 62, 67], "Am": [45, 60, 64, 69], "Bb": [46, 58, 62, 65],
    "F": [41, 60, 65, 69], "Gm": [43, 58, 62, 67], "A": [45, 61, 64, 69], "D": [50, 62, 66, 69],
}

def section(buf, a, b, mood, r):
    """fill [a, b) seconds of the music buffer with one scene cue"""
    plan = {
        "wonder": dict(bpm=78, prog=["Dm", "C", "G", "Dm"], bars=2, lyre="arp", drum=None, pad=0.5, horn=False),
        "playful": dict(bpm=104, prog=["Dm", "G", "C", "Am"], bars=1, lyre="dance", drum="light", pad=0.3, horn=False),
        "tension": dict(bpm=70, prog=["Dm", "Bb", "Gm", "A"], bars=2, lyre="sparse", drum="pulse", pad=0.55, horn=False),
        "battle": dict(bpm=124, prog=["Dm", "Bb", "C", "Dm"], bars=1, lyre="ostinato", drum="battle", pad=0.45, horn=True),
        "march": dict(bpm=112, prog=["Dm", "C", "Bb", "A"], bars=1, lyre="ostinato", drum="march", pad=0.4, horn=True),
        "hopeful": dict(bpm=92, prog=["F", "C", "Dm", "Bb"], bars=1, lyre="arp", drum="light", pad=0.45, horn=False),
        "sad": dict(bpm=60, prog=["Dm", "Bb", "Gm", "A"], bars=2, lyre="sparse", drum=None, pad=0.6, horn=False),
        "finale": dict(bpm=84, prog=["Dm", "Bb", "F", "C"], bars=1, lyre="arp", drum="swell", pad=0.6, horn=True),
        "regal": dict(bpm=72, prog=["D", "G", "A", "D"], bars=1, lyre="arp", drum="swell", pad=0.65, horn=True),
        "winter": dict(bpm=52, prog=["Dm", "Gm", "Bb", "A"], bars=2, lyre="sparse", drum=None, pad=0.7, horn=False),
    }[mood]
    beat = 60.0 / plan["bpm"]; bar = 4 * beat * plan["bars"]
    t, k = a, 0
    while t < b - 0.05:
        ch = CHORDS[plan["prog"][k % len(plan["prog"])]]
        last = t + bar >= b - 0.05
        if mood == "finale" and last: ch = CHORDS["D"]
        dur = min(bar, b - t)
        # pad (strings)
        if plan["pad"]: add(buf, I.pad([m2f(m) for m in ch[1:]] + [m2f(ch[0])], dur + 0.2, plan["pad"] * 0.55, r, att=min(0.6, dur / 3), rel=0.8, warm=1100), t, 1.0)
        nb = int(round(dur / beat))
        for i in range(nb):
            tb = t + i * beat
            if plan["lyre"] == "arp":
                for j, m in enumerate([ch[1], ch[2], ch[3], ch[2] + 12 if j == 3 else ch[2]] if False else [ch[1], ch[2], ch[3], ch[1] + 12]):
                    if j % 2 == 0 or i % 2 == 0: add(buf, lyre(m2f(m), 0.42 - 0.06 * j, r), tb + j * beat / 4, 1.0)
            elif plan["lyre"] == "dance":
                pat = [ch[1], ch[3], ch[2], ch[3]]
                add(buf, lyre(m2f(pat[i % 4] + (12 if i % 8 == 7 else 0)), 0.45, r, dur=0.9), tb, 1.0)
                add(buf, lyre(m2f(pat[(i + 2) % 4]), 0.28, r, dur=0.6), tb + beat / 2, 1.0)
            elif plan["lyre"] == "ostinato":
                for j in range(2): add(buf, lyre(m2f(ch[1] + (0, 7)[j] - 12 * (i % 2 == 0 and j == 0)), 0.38, r, dur=0.5), tb + j * beat / 2, 1.0)
            elif plan["lyre"] == "sparse" and i % 2 == 0:
                add(buf, lyre(m2f(ch[1 + (i // 2) % 3]), 0.35, r, dur=2.0), tb, 1.0)
            d = plan["drum"]
            if d == "light" and i % 2 == 0: add(buf, frame_drum(0.5, r), tb, 1.0); add(buf, frame_drum(0.25, r, low=False), tb + beat * 1.5, 1.0)
            if d == "pulse" and i % 4 == 0: add(buf, I.timpani(m2f(38), 0.55, r, dur=1.6), tb, 1.0)
            if d == "battle":
                add(buf, I.snare(0.8, r), tb, 0.8); add(buf, I.snare(0.35, r), tb + beat * 0.5, 0.8); add(buf, frame_drum(0.6, r), tb, 1.0)
                if i % 4 == 0: add(buf, I.timpani(m2f(38), 0.8, r, dur=1.4), tb, 1.0)
                if i % 4 == 3: add(buf, frame_drum(0.5, r), tb + beat * 0.75, 1.0)
            if d == "march":
                add(buf, I.snare(0.7 if i % 2 == 0 else 0.45, r), tb, 0.8)
                if i % 4 == 3: [add(buf, I.snare(0.3, r, buzz=True), tb + beat * (0.5 + j / 8), 0.7) for j in range(4)]
                if mood == "march": add(buf, I.fife(m2f([ch[1], ch[2], ch[3], ch[2]][i % 4] + 12), beat * 0.85, 0.45, r), tb, 0.35)
                if i % 4 == 0: add(buf, I.timpani(m2f(38), 0.6, r, dur=1.2), tb, 1.0)
            if d == "swell" and i % 2 == 0: add(buf, I.timpani(m2f(38 if i % 4 == 0 else 45), 0.45 + 0.4 * (t - a) / max(1, b - a), r, dur=1.6), tb, 1.0)
        if plan["horn"] and k % 2 == 0:
            for j, m in enumerate([ch[1], ch[2]]): add(buf, I.brass(m2f(m - 12 + (12 if j else 0)), min(bar, b - t) * 0.9, 0.55, r, kind="horn", scoop=-14), t, 0.55)
        t += bar; k += 1

MOOD = {1: "wonder", 2: "playful", 3: "tension", 4: "march", 5: "wonder", 6: "regal", 7: "battle", 8: "winter", 9: "tension", 10: "battle", 11: "sad", 12: "finale"}
LEVEL = {1: 0.0, 2: -1.5, 3: -0.5, 4: -2.5, 5: -0.5, 6: -3.0, 7: -2.5, 8: 0.0, 9: -0.5, 10: -2.5, 11: 0.0, 12: -1.5}

def music():
    buf = np.zeros((2, N + ns(4)))
    for k, (a, b) in sorted(scene_spans().items()):
        part = np.zeros_like(buf)
        section(part, a, b, MOOD[k], rng(100 + k))
        # 0.4 s fades at scene edges (scene 3 cuts hard into silence at the assassination, handled by a dip)
        env = np.zeros(part.shape[1]); i0, i1 = ns(a), min(part.shape[1], ns(b + 0.6))
        env[i0:i1] = 1.0; fi = ns(0.4); env[i0:i0 + fi] = ramp(fi); env[max(i0, i1 - ns(1.0)):i1] *= ramp(i1 - max(i0, i1 - ns(1.0)))[::-1]
        buf += part * env[None, :] * dbg(LEVEL[k])
    # musical dips at story beats: the king's fall, the abdication, the death bell
    for kind, shot, depth, dur in (("drum_hit", "king", -12, 1.6), ("drum_hit", "abdicate", -10, 1.8), ("bell", "death", -16, 3.2)):
        for q in CUES["cues"]:
            if q["kind"] == kind and q["shot"] == shot:
                t0 = q["f"] / FPS; i0, i1 = ns(t0 - 0.05), ns(t0 + dur)
                g = np.ones(buf.shape[1]); g[i0:i1] = dbg(depth); g = ndimage.uniform_filter1d(g, ns(0.25))
                buf *= g[None, :]
    ir = make_ir(1.8, 7, hf=0.6)
    wet = convolve_st(buf, ir)[:, : buf.shape[1]]
    return (buf * 0.8 + wet * 0.35)[:, :N]

# ============================================================ sfx
def S(*xs):
    """sum mono/stereo arrays of different lengths into one stereo array"""
    xs = [st(x) for x in xs]; n = max(x.shape[1] for x in xs); out = np.zeros((2, n))
    for x in xs: out[:, : x.shape[1]] += x
    return out
def acc(y, h, i):
    """y[i:] += h, clipped to y's length (mono)"""
    if i >= len(y) or i < 0: return
    k = min(len(h), len(y) - i); y[i:i + k] += h[:k]
def thud(r, f=55, dur=0.6, v=1.0):
    t = tt(dur); y = np.sin(TAU * f * t * (1 - 0.35 * t)) * np.exp(-t / 0.18) + lp(r.standard_normal(len(t)), 300) * np.exp(-t / 0.04) * 0.5
    return fades(y * v)
def blip(r, f0=700, f1=1300, dur=0.12, v=0.5):
    t = tt(dur); f = f0 + (f1 - f0) * (t / dur) ** 0.5
    return fades(np.sin(TAU * np.cumsum(f) / SR) * np.exp(-t / 0.05) * v)
def noise_burst(r, lo, hi, dur, tau, v=1.0):
    t = tt(dur); return fades(bp(r.standard_normal(len(t)), lo, hi) * np.exp(-t / tau) * v)
def riser(r, dur=1.6, v=0.6):
    t = tt(dur); env = (t / dur) ** 2.2
    y = bp(r.standard_normal(len(t)), 500, 7000) * env + 0.3 * np.sin(TAU * np.cumsum(200 + 600 * t / dur) / SR) * env
    return fades(y * v, 0.01, 0.05)
def gallop(dur, r, rate=2.6):
    n = ns(dur); y = np.zeros(n); t = 0.0
    while t < dur - 0.1:
        for k, dt in enumerate((0.0, 0.085, 0.17)):
            h = noise_burst(r, 700, 2600, 0.08, 0.012, 0.6 + 0.2 * r.random()) + thud(r, 90, 0.08, 0.5)
            acc(y, h, ns(t + dt))
        t += 1 / rate
    return y
def whinny(r, v=0.6):
    t = tt(1.1); f = 600 + 350 * np.sin(TAU * 9 * t) * np.exp(-t / 0.5) + 250 * np.exp(-t / 0.3)
    y = signal.sawtooth(TAU * np.cumsum(f) / SR) * np.exp(-t / 0.45)
    return fades(bp(y, 400, 3500) * v)
def trumpet(r, v=0.6):
    t = tt(1.3); f = 420 + 380 * np.minimum(1, t / 0.25) + 25 * np.sin(TAU * 7 * t)
    y = signal.sawtooth(TAU * np.cumsum(f) / SR) * np.minimum(1, t / 0.05) * np.exp(-np.maximum(0, t - 0.8) / 0.2)
    return fades(bp(y, 300, 4000) * v)
def bell(r, v=0.6):
    return fades(modal(4.0, [(110, 1.0, 3.0), (110 * 2.0, 0.5, 2.2), (110 * 2.76, 0.35, 1.6), (110 * 5.4, 0.2, 0.9)], r) * v)
def march_steps(dur, r, rate=2.8, v=0.35):
    n = ns(dur); y = np.zeros(n); t = 0.0
    while t < dur:
        h = thud(r, 70, 0.12, v) + noise_burst(r, 200, 1200, 0.12, 0.03, v * 0.6)
        acc(y, h, ns(t + r.uniform(-0.01, 0.01)))
        t += 1 / rate
    return y
def crowd(r, dur=1.6, v=0.5, people=10):
    out = np.zeros((2, ns(dur + 1.0)))
    for k in range(people):
        h = X.hurrah(r, base=r.uniform(110, 190), scale=r.uniform(0.9, 1.2))
        add(out, pan(h, r.uniform(-0.8, 0.8)) if h.ndim == 1 else h, r.uniform(0, dur * 0.5), v / np.sqrt(people))
    return out
def babble_bed(dur, r, people=8, v=0.3):
    out = np.zeros((2, ns(dur)))
    for k in range(people):
        b = X.babble(dur, r, base=r.uniform(100, 220), scale=r.uniform(0.9, 1.25))
        add(out, pan(b, r.uniform(-0.9, 0.9)), 0.0, v / np.sqrt(people))
    return out

def one(kind, r, dur):
    """mono or stereo array for one cue"""
    if kind == "stamp": return thud(r, 60, 0.5, 0.9) + noise_burst(r, 800, 4000, 0.5, 0.02, 0.5)
    if kind == "pop": return blip(r, 650, 1350, 0.12, 0.45) + noise_burst(r, 2000, 8000, 0.12, 0.004, 0.25)
    if kind == "sparkle":
        out = np.zeros(ns(1.6))
        for k in range(5): acc(out, I.glock(m2f([86, 88, 91, 93, 95][k]), 0.35, r, dur=1.0), ns(k * 0.06))
        return out
    if kind == "whoosh": return X.whoosh(0.55, r, peak=0.35)
    if kind == "wind": return X.breeze(2.5, r, level=0.8)
    if kind == "title_hit": return S(thud(r, 42, 1.4, 1.0) * 0.9, I.cymbal(0.5, r, dur=2.2) * 0.5)
    if kind == "swell": return riser(r, 1.8, 0.45)
    if kind == "boom": return thud(r, 45, 1.0, 1.0) + noise_burst(r, 60, 600, 1.0, 0.12, 0.5)
    if kind == "flash": return X.whoosh(0.35, r, peak=0.1, f_lo=1500, f_hi=7000) * 0.7
    if kind == "march": return march_steps(dur, r)
    if kind == "neigh": return whinny(r)
    if kind == "hooves": return gallop(dur, r) * 0.6
    if kind == "coins":
        out = np.zeros(ns(0.8))
        for k in range(7): acc(out, X.clink(r, dur=0.15) * 0.5, ns(r.uniform(0, 0.5)))
        return out
    if kind == "sting": return S(lyre(m2f(57), 0.6, r, 0.8) + lyre(m2f(62), 0.5, r, 0.8), I.cymbal(0.25, r, dur=0.8) * 0.3)
    if kind == "crowd": return crowd(r, 1.6, 0.6, 12)
    if kind == "laugh_crowd": return babble_bed(2.0, r, 6, 0.55)
    if kind == "drum_hit": return st(I.timpani(m2f(33), 1.0, r, dur=2.6)) * 1.1
    if kind == "lyre_flourish":
        out = np.zeros(ns(1.6))
        for k, m in enumerate([62, 65, 69, 72, 74, 77]): acc(out, lyre(m2f(m), 0.4, r, 1.0), ns(k * 0.07))
        return out
    if kind == "clink":
        out = np.zeros(ns(1.2))
        for k, (dt, a) in enumerate([(0, 1), (0.22, 0.6), (0.38, 0.35), (0.5, 0.2)]): acc(out, X.clink(r, f0=2400 + 300 * k, dur=0.2) * a * 0.7, ns(dt))
        return out
    if kind == "thunk": return S(thud(r, 80, 0.4, 0.9), noise_burst(r, 300, 2500, 0.3, 0.03, 0.7))
    if kind == "squish": return X.oof(r) * 0.6
    if kind == "groan": return X.oof(r, kind="oof") * 0.6
    if kind == "clash":
        out = noise_burst(r, 1500, 9000, 0.6, 0.08, 0.7)
        for k in range(4): acc(out, X.clink(r, dur=0.3) * 0.8, ns(r.uniform(0, 0.15)))
        return out
    if kind == "wheels": return X.rattle(dur, r, density=24) * 0.5 + lp(r.standard_normal(ns(dur)), 180) * 0.3
    if kind == "blades": t = tt(0.8); return fades(hp(r.standard_normal(len(t)), 3000) * np.exp(-t / 0.2) * 0.4 + np.sin(TAU * 3100 * t) * np.exp(-t / 0.3) * 0.15)
    if kind == "shuffle": return march_steps(0.9, r, rate=9, v=0.25)
    if kind == "scribble":
        n = ns(dur); y = bp(r.standard_normal(n), 2500, 7000) * (0.5 + 0.5 * np.sin(TAU * 5.5 * np.arange(n) / SR)) ** 2
        return fades(y * 0.05, 0.05, 0.2)
    if kind == "trumpet": return trumpet(r)
    if kind == "pour": n = ns(dur); return fades(bp(r.standard_normal(n), 2000, 6000) * 0.08, 0.2, 0.3)
    if kind == "birds": return X.bird_chirps(dur, r, density=1.2)
    if kind == "build":
        out = np.zeros(ns(dur + 1)); t = 0.0
        while t < dur: h = X.hammer_hit(r, big=0.5); h = h if h.ndim == 1 else h.mean(0); acc(out, h * 0.35, ns(t)); t += r.uniform(0.25, 0.6)
        return out
    if kind == "drone_low": return st(I.pad([m2f(38), m2f(45)], 3.0, 0.5, r, att=1.0, rel=1.5, warm=500).mean(0))
    if kind == "blowout": return noise_burst(r, 400, 3000, 0.5, 0.12, 0.35)
    if kind == "bell": return bell(r)
    if kind == "crack": return S(X.wood_crack(r), thud(r, 50, 0.9, 0.8))
    if kind == "flag": return X.flag_flutter(1.2, r) * 0.6
    if kind == "page": return noise_burst(r, 1500, 7000, 0.25, 0.05, 0.4)
    if kind == "snowball": return S(thud(r, 120, 0.15, 0.5), noise_burst(r, 500, 4000, 0.15, 0.02, 0.5))
    if kind == "cannon": return S(thud(r, 38, 1.6, 1.0), noise_burst(r, 40, 900, 1.8, 0.35, 0.8), noise_burst(r, 1000, 6000, 0.2, 0.01, 0.6))
    if kind == "explosion": return S(thud(r, 32, 2.5, 1.2), noise_burst(r, 30, 1500, 2.5, 0.6, 1.0), noise_burst(r, 800, 5000, 0.4, 0.05, 0.5))
    if kind == "muskets":
        out = np.zeros((2, ns(dur + 0.5))); t = 0.0
        while t < dur: add(out, S(noise_burst(r, 700, 6000, 0.25, 0.015, r.uniform(0.3, 0.7)), thud(r, 90, 0.2, 0.3)) * pan_g(r), t, 1.0); t += r.uniform(0.05, 0.35)
        return out
    if kind == "waves": return ambience("sea", dur, r)
    if kind == "organ": return st(I.pad([m2f(m) for m in (38, 45, 50, 54, 57, 62, 66)], min(dur, 12.0), 0.5, r, att=1.2, rel=1.5, warm=2600).mean(0)) * 0.45
    if kind == "fire": return crackle(dur, r)
    if kind == "clock":
        out = np.zeros((2, ns(dur + 0.2))); t = 0.0
        while t < dur: add(out, noise_burst(r, 2500, 9000, 0.04, 0.004, 0.5), t, 1.0); t += 0.5
        return out
    if kind == "steps": return march_steps(dur, r, rate=2.0, v=0.4)
    raise KeyError(kind)

def pan_g(r):
    p = r.uniform(-0.6, 0.6); return np.array([[np.sqrt(0.5 * (1 - p))], [np.sqrt(0.5 * (1 + p))]])
def crackle(dur, r):
    n = ns(dur); out = st(lp(r.standard_normal(n), 300) * 0.35 * (0.6 + 0.4 * smooth_noise(n, r, 0.8)))
    t = 0.0
    while t < dur - 0.1: add(out, noise_burst(r, 1200, 8000, 0.05, 0.006, r.uniform(0.15, 0.6)), t, 1.0); t += r.exponential(0.09)
    return out

AMB = {"birds": -30, "wind": -32, "court": -31, "march": -30, "night": -31, "crowd_murmur": -27, "battle": -25, "battle_far": -29, "sea": -29, "map": -40,
       "cathedral": -33, "fire": -28, "blizzard": -25, "rain": -26}
def ambience(kind, dur, r):
    if kind == "birds": return st(X.bird_chirps(dur, r, density=0.6)) + X.breeze(dur, r, level=0.4)
    if kind == "wind": return X.breeze(dur, r, level=1.0)
    if kind == "court": return babble_bed(dur, r, 4, 0.25) + st(X.bird_chirps(dur, r, density=0.3))
    if kind == "march": return st(march_steps(dur, r, rate=2.8, v=0.3))
    if kind == "night": return st(X.crickets(dur, r)) + X.breeze(dur, r, level=0.4) + st(bp(r.standard_normal(ns(dur)), 1000, 5000) * (r.random(ns(dur)) > 0.9993) * 2)
    if kind == "crowd_murmur": return babble_bed(dur, r, 10, 0.5)
    if kind in ("battle", "battle_far"):
        n = ns(dur); out = st(lp(r.standard_normal(n), 220) * 0.5 * smooth_noise(n, r, 0.5) ** 2)
        t = 0.3
        while t < dur - 1:
            add(out, one("clash", r, 0) * (0.5 if kind == "battle" else 0.2), t, 1.0); t += r.uniform(0.6, 1.8)
        add(out, crowd(r, dur * 0.8, 0.35, 10)[:, : n], 0.0, 0.6 if kind == "battle" else 0.3)
        return out
    if kind == "sea":
        n = ns(dur); sw = 0.5 + 0.5 * np.sin(TAU * 0.11 * np.arange(n) / SR) ** 2
        return st(lp(r.standard_normal(n), 900) * sw * 0.6) + X.breeze(dur, r, level=0.4)
    if kind == "map": return st(lp(r.standard_normal(ns(dur)), 400) * 0.05)
    if kind == "cathedral": return babble_bed(dur, r, 6, 0.15) + st(lp(r.standard_normal(ns(dur)), 250) * 0.15)
    if kind == "fire": return crackle(dur, r)
    if kind == "blizzard": return X.breeze(dur, r, level=1.4, gust=0.35, bright=1500) + X.breeze(dur, r, level=0.8, gust=0.2, bright=500)
    if kind == "rain":
        n = ns(dur); out = np.stack([hp(r.standard_normal(n), 1800) * 0.25 + lp(r.standard_normal(n), 700) * 0.15 for _ in range(2)])
        t = 0.0
        while t < dur - 0.1: add(out, noise_burst(r, 2000, 9000, 0.03, 0.003, r.uniform(0.05, 0.25)) * pan_g(r), t, 1.0); t += r.exponential(0.02)
        return out
    return np.zeros((2, ns(dur)))

def rms_db(x):
    return 20 * np.log10(np.sqrt(np.mean(np.square(x))) + 1e-9)

def sfx():
    buf = np.zeros((2, N + ns(6)))
    for i, q in enumerate(CUES["cues"]):
        r = rng(1000 + i); dur = q.get("dur", 0) / FPS
        x = one(q["kind"], r, max(0.5, dur))
        if x.ndim == 1: x = st(x)
        add(buf, x, q["f"] / FPS, dbg(-8) * q.get("gain", 1.0))
    amb = np.zeros_like(buf)
    for k, s in enumerate(CUES["amb"]):
        if not s["amb"]: continue
        a, b = s["a"] / FPS, s["b"] / FPS; dur = b - a + 0.6
        x = ambience(s["amb"], dur, rng(5000 + k))
        if not np.any(x): continue
        x = x * dbg(AMB[s["amb"]] - rms_db(x))
        env = np.ones(x.shape[1]); f = min(ns(0.3), x.shape[1] // 3); env[:f] = ramp(f); env[-f:] = ramp(f)[::-1]
        add(amb, x * env[None, :], max(0, a - 0.3), 1.0)
    return (buf + amb)[:, :N]

# ============================================================ mix
def speech_env(depth_db=-5.0, pre=0.08, post=0.15):
    ctrl = 1000; nc = int(DUR * ctrl) + 2; va = np.zeros(nc)
    for w in WORDS: va[max(0, int((w["s"] - pre) * ctrl)): int((w["e"] + post) * ctrl)] = 1
    va = ndimage.uniform_filter1d(va, 120)
    return np.interp(np.arange(N) / SR, np.arange(nc) / ctrl, va * depth_db)

def limiter(x, ceil_db=CEIL_DBTP, look=0.003, rel=0.08):
    """(from templates/audio/mix.py) 4x-oversampled peak detection, look-ahead min filter, one-pole release, smoothing"""
    c = dbg(ceil_db); n = x.shape[1]
    up = np.abs(signal.resample_poly(x, 4, 1, axis=-1)).max(0)
    pk = np.pad(up, (0, max(0, 4 * n - len(up))))[: 4 * n].reshape(n, 4).max(1)
    gr = np.minimum(1.0, c / np.maximum(pk, 1e-12))
    La = max(1, ns(look)); g1 = ndimage.minimum_filter1d(gr, 2 * La + 1, mode="nearest"); g2 = g1.copy()
    idx = np.flatnonzero(g1 < 1.0)
    if len(idx):
        kr = 1 - np.exp(-1 / (rel * SR)); gap = ns(rel * 8)
        brk = np.flatnonzero(np.diff(idx) > gap)
        starts = np.concatenate([[idx[0]], idx[brk + 1]]); ends = np.concatenate([idx[brk], [idx[-1]]])
        for a_, b_ in zip(starts, ends):
            e = min(n, b_ + gap); seg = g1[a_:e]; out = np.empty(len(seg)); g = 1.0
            for k in range(len(seg)): g = min(seg[k], g + (1 - g) * kr); out[k] = g
            g2[a_:e] = out
    g3 = np.minimum(ndimage.uniform_filter1d(g2, 2 * La + 1, mode="nearest"), 1.0)
    return x * g3[None, :]

def main():
    v, sr = read_wav(os.path.join(ROOT, "voice", "voice.wav"))
    assert sr == SR, sr
    v = v if v.ndim == 2 else st(v)
    voice = np.zeros((2, N)); voice[:, : min(N, v.shape[1])] = v[:, :N]
    print("music..."); m = music()
    print("sfx..."); s = sfx()
    lv = integrated(voice)
    m *= dbg(lv - 9.5 - integrated(m)) * dbg(speech_env(-4.0))[None, :]   # music bed ~13 LU under the voice, -4 dB while he speaks
    s *= dbg(lv - 10.5 - integrated(s))
    mix0 = voice + m + s
    G = TARGET_LUFS - integrated(mix0)
    y = limiter(mix0 * dbg(G))
    G2 = TARGET_LUFS - integrated(y); y = limiter(y * dbg(G2))
    out = os.path.join(ROOT, "out")
    write_wav(os.path.join(out, "mix.wav"), y)
    for name, x in (("voice", voice), ("music", m), ("sfx", s)): write_wav(os.path.join(out, f"stem_{name}.wav"), x * dbg(G + G2))
    print(f"mix: {y.shape[1] / SR:.3f} s, {integrated(y):.2f} LUFS, peak {true_peak(y):.2f} dBTP; voice {integrated(voice * dbg(G + G2)):.1f}, music {integrated(m * dbg(G + G2)):.1f}, sfx {integrated(s * dbg(G + G2)):.1f}")

if __name__ == "__main__":
    main()
