# Original synthesized score + SFX + mix for the Alexander short.
# in: voice/voice.wav, voice/words.json, out/events.json   out: audio/mix.wav (48 kHz stereo)
import json, numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt, resample_poly

SR = 48000
rng = np.random.default_rng(7)
W = json.load(open("voice/words.json"))
EV = json.load(open("out/events.json"))
DUR = W["duration"]
N = int(DUR * SR)
S = [s["s"] for s in W["sentences"]]

def lp(x, f, o=2): return sosfilt(butter(o, f / (SR / 2), "low", output="sos"), x)
def hp(x, f, o=2): return sosfilt(butter(o, f / (SR / 2), "high", output="sos"), x)
def bp(x, a, b, o=2): return sosfilt(butter(o, [a / (SR / 2), b / (SR / 2)], "band", output="sos"), x)
def env(n, a, r, sus=None):
    e = np.ones(n); A = max(1, int(a * SR)); R = max(1, int(r * SR))
    e[:A] = np.linspace(0, 1, A)[: min(A, n)] if A <= n else np.linspace(0, 1, A)[:n]
    if R < n: e[-R:] *= np.linspace(1, 0, R)
    return e
def t_(d): return np.arange(int(d * SR)) / SR
def midi(m): return 440 * 2 ** ((m - 69) / 12)
def add(buf, x, t, g=1.0):
    i = int(t * SR)
    if i >= len(buf) or i + len(x) <= 0: return
    if i < 0: x = x[-i:]; i = 0
    n = min(len(x), len(buf) - i)
    buf[i:i + n] += x[:n] * g

# ---------------- instruments ----------------
def saw(f, d):
    t = t_(d); x = np.zeros_like(t)
    for k in range(1, 14): x += np.sin(2 * np.pi * f * k * t) / k * (1 if f * k < 9000 else 0)
    return x
def pad(m, d, bright=1200):
    x = sum(saw(midi(m) * (1 + dt), d) for dt in (-0.004, 0, 0.0045)) / 3
    return lp(x, bright) * env(len(x), 0.6, 0.8) * 0.5
def pluck(m, d=1.6, bright=0.5):  # Karplus-Strong lyre
    f = midi(m); n = int(d * SR); p = int(SR / f)
    buf = rng.uniform(-1, 1, p); out = np.zeros(n)
    for i in range(n):
        out[i] = buf[i % p]
        buf[i % p] = 0.5 * (buf[i % p] + buf[(i + 1) % p]) * (0.994 if bright > 0.4 else 0.99)
    return lp(out, 5000) * env(n, 0.002, 0.3) * 0.6
PL = {}
def pluckc(m, d=1.6):
    if m not in PL: PL[m] = pluck(m, d)
    return PL[m]
def brass(m, d):
    t = t_(d); x = saw(midi(m), d)
    cut = 500 + 2200 * np.minimum(1, t / 0.15) * np.exp(-t * 0.6)
    y = np.zeros_like(x); s = 0.0
    a = 1 - np.exp(-2 * np.pi * cut / SR)
    for i in range(len(x)): s += a[i] * (x[i] - s); y[i] = s
    return y * env(len(x), 0.05, 0.3) * 0.5
def taiko(g=1.0, pitch=70):
    t = t_(0.9); f = pitch * (1 + 1.6 * np.exp(-t * 30))
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 5.5)
    x += lp(rng.normal(size=len(t)), 900) * np.exp(-t * 30) * 0.5
    return x * g
def snare(g=1.0):
    t = t_(0.25); return (bp(rng.normal(size=len(t)), 1500, 7000) * np.exp(-t * 22) + np.sin(2 * np.pi * 190 * t) * np.exp(-t * 30) * 0.4) * g
def noise(d): return rng.normal(size=int(d * SR))

# ---------------- score ----------------
music = np.zeros(N)
# sections (start time, chords as (root midi, minor?), tempo bpm, style)
sec = [
    (0.0, S[2], "intro"), (S[2], S[6], "child"), (S[6], S[8], "king"), (S[8], S[12], "war"),
    (S[12], S[16], "empire"), (S[16], S[18], "death"), (S[18], DUR, "legacy"),
]
PROG = {
    "intro": [(50, 0), (46, 1), (48, 1), (45, 0)], "child": [(50, 0), (53, 1), (48, 1), (45, 0)],
    "king": [(50, 0), (46, 1), (45, 1), (45, 1)], "war": [(50, 0), (50, 0), (46, 1), (48, 1)],
    "empire": [(50, 0), (46, 1), (53, 1), (48, 1)], "death": [(50, 0), (43, 0), (46, 1), (45, 0)],
    "legacy": [(50, 0), (46, 1), (53, 1), (48, 1)],
}
def triad(r, maj): return [r, r + (4 if maj else 3), r + 7]
BPM = 92; beat = 60 / BPM; bar = 4 * beat
for (a, b, st) in sec:
    prog = PROG[st]; t = a; k = 0
    while t < b - 0.2:
        r, maj = prog[k % 4]
        if st == "legacy" and t > S[22] - 0.5: r, maj = 50, 1  # resolve to D major for the final line
        d = min(bar, b - t)
        ch = triad(r, maj)
        g = {"intro": 0.5, "child": 0.4, "king": 0.55, "war": 0.5, "empire": 0.5, "death": 0.45, "legacy": 0.6}[st]
        for m in ch: add(music, pad(m + 12, d + 0.6, 900 if st == "death" else 1600), t, g * 0.35)
        add(music, pad(r - 12, d + 0.6, 400), t, g * 0.4)
        if st in ("child", "empire", "legacy", "intro"):  # lyre arpeggio
            pat = [0, 1, 2, 1, 0, 2, 1, 2] if st != "intro" else [0, 2, 1, 2]
            step = bar / len(pat)
            for j, p in enumerate(pat):
                if t + j * step < b: add(music, pluckc(ch[p] + 24), t + j * step, 0.35 if st != "intro" else 0.25)
        if st in ("king", "war", "empire", "legacy"):  # drums
            for j in range(4):
                tb = t + j * beat
                if tb >= b: break
                if st == "war": add(music, taiko(1.0 if j % 2 == 0 else 0.6), tb, 0.6); add(music, taiko(0.4, 110), tb + beat / 2, 0.5)
                elif st == "king": add(music, taiko(0.5 + 0.15 * j), tb, 0.45)
                else:
                    add(music, taiko(0.7 if j in (0, 2) else 0.35), tb, 0.4)
                    if j in (1, 3): add(music, snare(0.4), tb, 0.35)
        if st in ("war", "legacy") and k % 2 == 1:  # brass call
            mel = [ch[2] + 12, ch[1] + 12, ch[0] + 12] if st == "war" else [ch[0] + 12, ch[1] + 12, ch[2] + 12]
            for j, m in enumerate(mel): add(music, brass(m, beat * (1.2 if j < 2 else 2)), t + j * beat, 0.22)
        t += bar; k += 1
music = lp(music, 7000)

# ---------------- SFX ----------------
sfx = np.zeros(N)
def whoosh(g=1):
    d = 0.5; t = t_(d); x = noise(d)
    f = 300 + 2500 * np.sin(np.pi * t / d)
    out = np.zeros_like(x); s = 0
    for i in range(len(x)):
        a = 1 - np.exp(-2 * np.pi * f[i] / SR); s += a * (x[i] - s); out[i] = s
    return out * np.sin(np.pi * t / d) ** 2 * 0.8 * g
def boom(g=1):
    t = t_(1.6); f = 45 * (1 + 2 * np.exp(-t * 18))
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 2.8) + lp(noise(1.6), 300) * np.exp(-t * 6) * 0.6) * g
def pop(g=1):
    t = t_(0.12); f = 500 + 900 * np.exp(-t * 60); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 35) * 0.6 * g
def sparkle(g=1):
    x = np.zeros(int(1.2 * SR))
    for j, m in enumerate([88, 91, 95, 100, 96, 103]):
        t = t_(0.6); add(x, np.sin(2 * np.pi * midi(m) * t) * np.exp(-t * 7), j * 0.07, 0.25)
    return x * g
def crowd(d=2.5, g=1, f0=350, f1=2500):
    t = t_(d); x = bp(noise(d), f0, f1) * (0.6 + 0.4 * np.sin(2 * np.pi * 3 * t) * np.sin(2 * np.pi * 0.7 * t))
    return x * env(len(x), 0.2, 1.0) * 0.6 * g
def clank(g=1):
    t = t_(0.7); x = sum(np.sin(2 * np.pi * f * t) * np.exp(-t * dcy) for f, dcy in [(1320, 9), (2210, 12), (3460, 15), (5100, 20)])
    return (x / 3 + hp(noise(0.7), 3000) * np.exp(-t * 40)) * 0.5 * g
def impact(g=1): return (boom(0.8) + lp(noise(1.6), 1500) * np.exp(-t_(1.6) * 9) * 0.8) * g
def neigh(g=1):
    t = t_(1.1); f = 700 + 500 * np.sin(2 * np.pi * 6 * t) * np.exp(-t * 1) - 300 * t
    x = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * 0.3
    return bp(x, 500, 3500) * env(len(t), 0.05, 0.4) * 0.7 * g
def gallop(d=2.2, g=1):
    x = np.zeros(int(d * SR))
    for k in range(int(d * 7)):
        tk = k / 7 + (0.03 if k % 4 == 1 else 0); add(x, lp(noise(0.08), 800) * np.exp(-t_(0.08) * 50), tk, 0.9)
    return x * g
def rumble(d=2.5, g=1): return lp(noise(d), 160) * env(int(d * SR), 0.3, 1.0) * 2.5 * g
def creak(g=1):
    t = t_(0.9); f = 180 + 60 * np.sin(2 * np.pi * 2 * t)
    return bp(np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)), 300, 2500) * env(len(t), 0.1, 0.3) * 0.25 * g
def heartbeat(g=1):
    x = np.zeros(int(3 * SR))
    for k in range(3): add(x, taiko(0.8, 50), k * 0.9); add(x, taiko(0.5, 50), k * 0.9 + 0.22)
    return lp(x, 300) * g
def sad(g=1):
    x = np.zeros(int(2.4 * SR))
    for j, m in enumerate([58, 57, 56]): add(x, brass(m, 0.45), j * 0.45, 0.6)
    t = t_(0.9); add(x, brass(55, 0.9) * (1 + 0.3 * np.sin(2 * np.pi * 6 * t)), 1.35, 0.6)
    return x * g
def birds(g=1):
    x = np.zeros(int(2.5 * SR))
    for k in range(10):
        t = t_(0.12); f = 3000 + 1500 * np.sin(np.pi * t / 0.12); add(x, np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / 0.12) * 0.3, rng.uniform(0, 2.2))
    return x * g
def choir(g=1):
    x = sum(pad(m, 2.5, 2500) for m in (62, 66, 69, 74)) / 2
    return bp(x, 300, 3000) * g
def build(g=1):
    x = np.zeros(int(2.4 * SR))
    for k in range(7): add(x, taiko(0.5, 90), k * 0.18 + 0.4); add(x, clank(0.3), k * 0.18 + 0.4)
    return x * g
def shatter(g=1):
    x = np.zeros(int(1.6 * SR)); add(x, impact(0.7), 0)
    for k in range(14): add(x, clank(0.25) * 0.6, rng.uniform(0.02, 0.6))
    return x * g
def blowout(g=1): t = t_(0.5); return bp(noise(0.5), 200, 1500) * np.exp(-t * 7) * 0.5 * g
def rain(g=1): d = 8.0; return bp(noise(d), 1500, 9000) * env(int(d * SR), 0.6, 1.5) * 0.18 * g
def sting(g=1):
    x = np.zeros(int(1.7 * SR)); add(x, sum(brass(m, 1.4) for m in (50, 53, 56)) * 0.5, 0); add(x, boom(0.6), 0)
    return x * g
def boing(g=1): t = t_(0.5); f = 220 + 160 * np.sin(2 * np.pi * 9 * t) * np.exp(-t * 4); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 5) * 0.4 * g
def coins(g=1):
    x = np.zeros(int(1.0 * SR))
    for k in range(8): add(x, clank(0.25), rng.uniform(0, 0.5))
    return hp(x, 1500) * g
def pour(g=1): d = 3.0; return bp(noise(d), 2000, 7000) * 0.12 * env(int(d * SR), 0.3, 0.5) * g
def night(g=1): d = 3.0; t = t_(d); return (bp(noise(d), 4000, 6000) * (np.sin(2 * np.pi * 14 * t) > 0.6) * 0.05) * g  # crickets
SFX = {"whoosh": whoosh, "boom": boom, "pop": pop, "sparkle": sparkle, "cheer": lambda g: crowd(2.5, g), "stomp": lambda g: taiko(1.2, 55) * g,
       "march": lambda g: taiko(0.5, 85) * g, "neigh": neigh, "scramble": lambda g: crowd(1.2, 0.5 * g, 600, 1800), "boing": boing, "coins": coins,
       "choir": choir, "sting": sting, "clank": clank, "gasp": lambda g: crowd(1.0, 0.6 * g, 800, 4000), "drums": lambda g: taiko(1.0) * g,
       "gallop": lambda g: gallop(2.2, g), "warcry": lambda g: crowd(1.6, 0.8 * g, 200, 1500), "skid": lambda g: whoosh(0.7 * g), "horns": lambda g: brass(45, 1.8) * g * 1.4,
       "rumble": lambda g: rumble(2.5, g), "impact": impact, "clash": lambda g: sum(clank(0.5) for _ in range(1)) * g, "creak": creak,
       "crash": lambda g: impact(1.2 * g), "rain": rain, "grumble": lambda g: crowd(1.4, 0.7 * g, 120, 700), "pour": pour, "sadtrombone": sad,
       "birds": birds, "build": build, "night": night, "heartbeat": heartbeat, "blowout": blowout, "drone": lambda g: pad(38, 3.5, 300) * g,
       "tug": lambda g: crowd(1.5, 0.6 * g, 150, 900), "shatter": shatter}
for e in EV["e"]:
    f = SFX.get(e["k"])
    if f is None: print("no sfx", e["k"]); continue
    add(sfx, f(e["v"]), e["t"], 1.0)

# ---------------- mix ----------------
v, vsr = sf.read("voice/voice.wav")
if v.ndim > 1: v = v.mean(1)
v = resample_poly(v, SR, vsr)[:N]; v = np.pad(v, (0, N - len(v)))
# ducking envelope from voice activity
act = np.convolve(np.abs(v) > 0.02, np.ones(int(0.25 * SR)) / int(0.25 * SR), "same")
duck = 1 - 0.55 * np.clip(act * 3, 0, 1)
def norm(x, peak=1.0): return x / (np.abs(x).max() + 1e-9) * peak
music = norm(music, 0.5) * duck
sfx = norm(sfx, 0.7)
# music fades out over the last second
music[-SR:] *= np.linspace(1, 0, SR)
mixm = v * 1.0 + music * 0.55 + sfx * 0.45
L = mixm + np.concatenate([np.zeros(int(0.011 * SR)), music[:-int(0.011 * SR)]]) * 0.08
R = mixm
st = np.stack([L, R], 1)
st = st / np.abs(st).max() * 0.95
sf.write("audio/mix_raw.wav", st, SR)
print("ok", DUR)
