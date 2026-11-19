# Alexander the Great Video Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render "Alexander the Great: The Boy Who Conquered an Empire", a ~3:50, 1920x1080/30 fps animated stickman documentary with narration, music, SFX, captions and maps. Output is an MP4.

**Architecture:**
- A single browser page (`src/main.ts`, bundled with esbuild) owns a three.js world and draws frame `f` deterministically. It has painted 3D sets, flat character and effect cards, an ink-edge pass, half-res lens blur, glow and grade.
- A Canvas2D overlay layer handles maps, captions and titles.
- A Playwright driver (`tools/render.cjs`) runs 4 page workers over frame ranges. Each worker streams JPEG frames into ffmpeg, and the segments are then concatenated and muxed with the mix.
- Everything is timed from `voice/words.json`.
- Audio is synthesised in Python/numpy, using the repo's `templates/audio` approach.

**Tech Stack:**
- three 0.170, d3-geo 3.1, topojson-client 3.1, world-atlas 2.0 (Natural Earth 50m), esbuild 0.24, TypeScript 5.6
- Playwright (preinstalled at `/opt/node-tools/node_modules/playwright`) with Chromium SwiftShader
- ffmpeg; Python 3 with numpy/scipy; faster-whisper (word alignment)
- ElevenLabs connector (voice "Liam", `TX3LPaxmHKxFdv7VOQHJ`, eleven_v4)

**Spec:** `docs/superpowers/specs/2026-11-19-alexander-the-great-video-design.md`

## Global Constraints
- Output: 1920x1080, 30 fps, H.264 yuv420p CRF 18 + AAC 192k, duration = voice length + 1.0 s tail. Also a 720p preview.
- Narration: the single ElevenLabs take, eleven_v4, voice `TX3LPaxmHKxFdv7VOQHJ` (Liam). Never regenerate without asking: the free plan has 10,000 credits a month and this take used 4,559.
- Characters: bean heads H/W ≈ 0.93, plum ink #201628–#2f1d28 thicker on the shadow side, ~3.5 head-heights for adults, stick limbs ~0.055 W, ink-dot hands, no blush, no catchlights. Blinks every 0.5–2.3 s, 4 f long.
- Camera:
  - Glides are smootherstep moves of 18–40 f.
  - Every hold pushes in 0.15–0.35 %/f, and 0.6 %/f on punch words. No hold is frozen for 12 f or more.
  - Impact kicks flip sign every frame and decay over 7 f.
  - Rolls are 4–5°.
- World ink: ~3 px at 1920 wide (scale with height/1080), near-black #0b0a0c, on silhouettes and creases only. Cards are never world-inked.
- Night look: violet fog #877aea, moonlight #b1ace7, warm torch pools.
- Captions: one word at a time, white bold sans, thin black outline, lower-middle, hard swap per word.
- No gore or blood. Deaths are off-screen or symbolic.
- Legends are spoken as legends (the narration text is fixed in `voice/narration.txt`).
- Loudness: −14 LUFS integrated, ≤ −1 dBTP. Music ducks under the voice.
- Determinism: frame f renders identically every time (seeded RNG only, no `Math.random`, no wall clock).

## Review Focus
1. **Narration and word alignment.** Caption words come from the script, not the recogniser. Numbers like "three fifty-six B.C." caption as "356 BC". A word the recogniser drops must still get a time, interpolated from its neighbours.
2. **Frames at chunk boundaries.** A worker that starts mid-shot must draw the same frame as a worker that rendered from the shot's start. No state may carry over from earlier frames.
3. **Card sizes at close range.** A character card nearer than ~2 m to the lens, or a prop cut by the frame edge, reads as a blob. The stills check every shot's first, middle and last frame.
4. **Map labels.** Labels must not overlap each other or run off the frame at 1080p. Dates on labels must match the narration.
5. **The audio tail.** The mix must be exactly as long as the video, so muxing neither truncates the last word nor leaves trailing silence of more than 1.0 s.

---

## File structure (all under `projects/alexander/`)
| Path | Responsibility |
|---|---|
| `voice/narration.txt` | exact TTS text (done) |
| `voice/captions.txt` | the same script with display spellings ("356 BC"), one token per spoken word group |
| `voice/voice.wav`, `voice/words.json` | the narration take, and the per-word `{w, cap, s, e}` (seconds) list |
| `tools/align.py` | faster-whisper word times mapped onto caption tokens |
| `src/core/time.ts` | FPS, `Words` loader, `wordAt`, `tOf(wordIndex)`, easing (`smooth`, `smoother`, `easeOut`), seeded `rng` |
| `src/core/camera.ts` | `CamKey`, `camAt(keys, f)` with glides, creep, kicks, rolls |
| `src/render/post.ts` | ink edge pass, half-res DOF, emissive glow, grade, flash/fade |
| `src/render/engine.ts` | renderer, scene graph per set, `renderFrame(f)`, compositing with the overlay canvas |
| `src/chars/toon.ts` | copied from `templates/bridge/toon.ts` (Pen, heads, faces, bodies, fx), plus ancient outfits |
| `src/chars/cast.ts` | `CAST` designs, `Card` billboards with texture cache, crowds via InstancedMesh |
| `src/sets/paint.ts` | copied from `templates/bridge/paint.ts`, plus marble, mudbrick, glazed brick, sand, parchment |
| `src/sets/{pella,mieza,aegae,field,alexandria,babylon}.ts` | each exports `build(): SetHandle` with `{root, update(f, shot)}` |
| `src/overlay/{captions,title,maps}.ts` | Canvas2D overlay drawing |
| `src/story/shots.ts` | the shot list keyed to word indices: set, light, camera keys, actors, fx, DOF, transitions |
| `src/main.ts` | page entry; exposes `window.ready`, `window.renderFrame(f)` and `window.TOTAL` |
| `tools/render.cjs` | Playwright workers, ffmpeg piping, concat, mux |
| `tools/stills.cjs` | renders the listed frames to `out/stills/*.jpg` plus a contact sheet |
| `audio/{dsp,instruments,music,sfx,mix}.py` | adapted from `templates/audio`; cue list read from `out/cues.json` (emitted by the page) |
| `tests/*.test.ts`, `audio/test_*.py` | pure-logic tests (`node --experimental-strip-types --test`, `python -m pytest`) |
| `SCRIPT.md`, `../../docs/alexander/STYLE_BREAKDOWN.md` | deliverable documents |

---

### Task 1: Voice, word timings and captions
**Files:** create `voice/captions.txt`, `tools/align.py`, `voice/words.json`, `tests/words.test.ts`, `src/core/time.ts`.
**Interfaces:** Produces `type Word = {w: string; cap: string; s: number; e: number}`, `loadWords(): Word[]` (JSON import), `wordStart(i: number): number` (seconds), `frameOfWord(i: number): number`, `captionAt(t: number): string | null`.

- [ ] Download the finished ElevenLabs generation (`creative_get_generations` → `full_res_url`) to `voice/take.mp3`, then convert with `ffmpeg -i take.mp3 -ar 48000 -ac 1 voice/voice.wav`.
- [ ] Write `voice/captions.txt`: the narration with display spellings. Each year becomes one token ("356 BC") and is mapped to its spoken words ("three fifty-six B.C.") with the `{spoken|display}` syntax.
- [ ] Write the test `tests/words.test.ts`. It asserts:
  - words are monotonic (`s[i] <= s[i+1]`, `s < e`);
  - the first word "In" starts before 0.5 s;
  - the last word's `cap` is "years.";
  - a caption token "356 BC" exists;
  - `captionAt(wordStart(10)+0.01) === words[10].cap`;
  - `captionAt(-1) === null`.
- [ ] Run it. Expected: FAIL (no words.json).
- [ ] Implement `tools/align.py`:
  - Run faster-whisper `base.en` with `word_timestamps=True`.
  - Align its words to the caption tokens with difflib SequenceMatcher on normalised lowercase tokens.
  - Unmatched tokens get times interpolated linearly between their matched neighbours.
  - Write `voice/words.json`.
- [ ] Implement `src/core/time.ts` (FPS = 30, smooth/smoother/easeOut, `rng(seed)` mulberry32, the word helpers).
- [ ] Run the tests again. Expected: PASS. Commit.

### Task 2: Render engine, post chain and frame driver
**Files:** create `src/render/engine.ts`, `src/render/post.ts`, `src/core/camera.ts`, `src/main.ts`, `tools/render.cjs`, `tools/stills.cjs`, `tests/camera.test.ts`.
**Interfaces:**
- Produces `type CamKey = {f: number; dur?: number; cut?: boolean; pos: V3; look: V3; fov?: number; roll?: number}`.
- Produces `camAt(keys: CamKey[], f: number, kicks: number[], creep: number): {pos; look; fov; roll}`.
- Produces `Engine.renderFrame(f): void`.
- Produces `window.renderFrame(f): Promise<string>` (JPEG data URL at q 0.92).
- Produces the driver CLI `node tools/render.cjs --from A --to B --workers 4 --out out/video.mp4`.

- [ ] Write the test `tests/camera.test.ts`. It asserts:
  - glide midpoint = average of the two keys;
  - a `cut` key jumps on its own frame;
  - the speed profile is symmetric (smootherstep);
  - a kick at frame k gives offsets with alternating sign for k..k+6, zero at k+7;
  - a hold of 30 f changes fov by 0.15–0.35 %/f.
- [ ] Run it. Expected: FAIL.
- [ ] Implement `camera.ts`, then run until it passes.
- [ ] Implement `post.ts` with these passes:
  - Scene into an RGBA + depth target.
  - Ink: depth and normal discontinuities, line width `3*H/1080` px, colour #0b0a0c. Cards are excluded via a layer mask (rendered after the ink, in a second scene pass over the inked colour, depth-tested).
  - DOF at half res: 13-tap disc, circle of confusion from `|1/z − 1/focus|`, `cInf` per shot.
  - Glow: an emissive mask at quarter res, threshold 1.0.
  - Grade: per-light lift/gamma/gain, plus saturation and vignette.
  - Flash/fade uniform.
- [ ] Implement `engine.ts`, `main.ts`, `render.cjs` and `stills.cjs`. Launch flags: `--use-angle=swiftshader --enable-unsafe-swiftshader --ignore-gpu-blocklist`; viewport 1920x1080. Each worker runs `ffmpeg -f image2pipe -c:v mjpeg -r 30 -i - -c:v libx264 -crf 18 -pix_fmt yuv420p seg_N.mp4`. Concat with the concat demuxer, then mux with `-map 0:v:0 -map 1:a:0 -shortest`.
- [ ] Verify determinism and speed. Render frames 0–59 twice, on different worker splits (1 worker, then 3), and compare the per-frame MD5s of decoded frames with `ffmpeg -f framemd5`. Expected: identical. Median render time ≤ 400 ms/frame. Commit.

### Task 3: Cast
**Files:** copy `templates/bridge/toon.ts` to `src/chars/toon.ts`; extend it. Create `src/chars/cast.ts`, `tests/cast.test.ts`.
**Interfaces:**
- Produces `type Who = "alex_boy" | "alex" | "alex_king" | "alex_helm" | "philip" | "aristotle" | "darius" | "parmenion" | "porus" | "phalangite" | "persian" | "courtier" | "seer" | "builder" | "physician"`.
- Produces `type Pose = {who: Who; expr: Expr; view: "front"|"side"|"3q"; facing: 1|-1; walk?: number; arms?: ArmPose; prop?: PropName; blinkSeed: number}`.
- Produces `drawChar(p: Pen, pose: Pose, f: number)`.
- Produces `class Cards { place(pose, pos: V3, height: number, f: number): void; crowd(who, positions: V3[], f, opts): void; fx(kind: FxKind, pos: V3, size: number, t: number): void; begin(): void; end(): void }`.
- Also produces `horseCard`, `elephantCard`, `chariotCard`.

- [ ] Write the test `tests/cast.test.ts`, using a node canvas stub of the Pen ops recorded as a call list. It asserts:
  - every `Who` draws without throwing at f = 0 and f = 100;
  - blink frames from `blinkAt(seed, f)` form 4-frame runs, with gaps of 15–69 f;
  - `walkPhase` gives a step length of 9–12 f;
  - the same `(pose, f)` gives the same texture cache key.
- [ ] Implement the outfits in toon.ts:
  - Attic helmet with white plume; bronze cuirass; crimson cloak; chiton; himation.
  - Kidaris crown with curled beard; turban; gold wreath; diadem ribbon.
  - Philip's closed right eye with a scar line; sarissa; round hoplon shield; wicker shield.
  - Expressions added: "smirk", "sideeye", "determined", "sad", "sick".
- [ ] Implement `cast.ts`:
  - Billboards always face the camera and sit on the NOINK layer.
  - Textures are cached by key: pose plus quantised animation phase.
  - Crowds use an InstancedMesh per texture variant: 4 variants × 4 walk phases.
  - Contact shadow is a soft ellipse.
- [ ] Render a cast sheet with `tools/stills.cjs --sheet cast`: every character in the front and side views on a neutral set. Check it against `references/frames/*`. Commit.

### Task 4: Sets
**Files:** copy `templates/bridge/paint.ts` to `src/sets/paint.ts` and extend it. Create the six set files and `tests/sets.test.ts`.
**Interfaces:**
- Produces `type SetName = "pella" | "mieza" | "aegae" | "field" | "alexandria" | "babylon"`.
- Produces `type Light = "day" | "golden" | "night" | "dawn"`.
- Produces `buildSet(name, variant?: string): SetHandle`.
- Produces `SetHandle = {root: THREE.Group; anchors: Record<string, V3>; update(f: number, light: Light, state: Record<string, number>): void}`.

Each set is built only to what its shots see:
- **pella** — palace (Doric colonnade, pediment, red tile roof), courtyard, town below, mountains, a stable corner for Bucephalus. Anchors: `throne`, `courtyard`, `balcony`.
- **mieza** — grove, benches, colonnade, a cave-shrine mouth, a sand table, and a ground-geometry plane that draws over time (`state.geom`). Anchors: `teacher`, `pupil`, `table`.
- **aegae** — stepped half-ring theatre at night, torches (emissive flame cards), a royal procession entrance. Anchor `gate`. `state.fall` animates the crown falling.
- **field** — plain, hills, dust layers, plus variants:
  - `issus`: sea strip, mountains, river;
  - `gaugamela`: flat;
  - `hellespont`: beach and ships;
  - `chaeronea`: hills.
  Army blocks sit at anchors `macedon` and `persia`.
- **alexandria** — coastline, harbour, Pharos island. Growth runs on `state.build` 0..1: flour lines first, then walls, houses, then lighthouse and library. Birds are cards.
- **babylon** — glazed blue walls with relief animals, a ziggurat backdrop, a night palace chamber with bed and oil lamps. Anchors: `bed`, `window`, `gate`.

- [ ] Write the test `tests/sets.test.ts`. Under a three.js scene without a renderer, it asserts:
  - each set builds;
  - every anchor is finite;
  - no mesh lies within 1.5 m of any camera position listed for that set in `shots.ts`.
- [ ] Implement each set and run the test.
- [ ] Render the first, middle and last frame of every shot that uses it with `tools/stills.cjs --set <name>`. Check for colour, ink and blob props. Commit per set.

### Task 5: Overlays (maps, captions, titles)
**Files:** create `src/overlay/maps.ts`, `src/overlay/captions.ts`, `src/overlay/title.ts`, `src/overlay/geo.ts` (empire polygons as lon/lat arrays), `tests/maps.test.ts`.
**Interfaces:**
- Produces `drawMap(g: CanvasRenderingContext2D, state: MapState, W, H)` with `MapState = {view: [lon, lat, scale]; persia: number; route: number; empire: number; breakup: number; culture: number; labels: string[]; token?: {u: number}}`.
- Produces `drawCaption(g, text, W, H)`, `drawTitle(g, t, W, H)` and `drawStamp(g, text, t, x, y)`.

- [ ] Write the test `tests/maps.test.ts`. It asserts:
  - the projection puts Pella (22.5E, 40.75N) left of Babylon (44.4E, 32.5N), and Babylon left of the Hydaspes (73.0E, 32.7N);
  - the route polyline passes through all 11 stops in order;
  - for every label set used in `shots.ts`, the label boxes don't intersect each other and stay inside a 64 px safe margin at 1920x1080.
- [ ] Implement:
  - Parchment land, teal sea and plum coast ink, from `world-atlas/land-50m.json`.
  - Persia and the empire as hand-authored polygons with the reveal masked by `empire`.
  - The dashed route draws over `route`, with battle icons and impact stars at each stop.
  - The break-up into three kingdom colours with crack lines.
  - The culture glow.
- [ ] Captions: weight 800, size 64 px at 1080p, a 6 px black stroke, at y = 0.80 H.
- [ ] Title: a 4 f overshoot pop per word, gold gradient text.
- [ ] Run the tests until they pass, render map stills and check them. Commit.

### Task 6: Story timeline
**Files:** create `src/story/shots.ts`, `tests/shots.test.ts`.
**Interfaces:**
- Consumes everything above.
- Produces `type Shot = {id; from: number; to: number; set: SetName; variant?; light: Light; cams: CamKey[]; kicks?: number[]; dof?: {cInf; focus?}; xfade?: number; flashAt?: number; actors: (f) => Placement[]; fx?: (f) => FxPlacement[]; overlay?: (f) => OverlayState; sfx?: Cue[]}`. `from`/`to` are word indices and are resolved to frames.
- Produces `TOTAL_FRAMES`.
- Produces `cues(): Cue[]`, written to `out/cues.json` for the audio.

- [ ] Write the test `tests/shots.test.ts`. It asserts:
  - shots tile [0, TOTAL) with no gaps or overlaps;
  - every shot is ≥ 45 f and ≤ 240 f long (240 only for a map);
  - there are 70–95 shots in total;
  - the 8 scene boundaries land on their first words ("In", "His", "Then,", "The", "Babylon,", "Along", "Alexander", "He");
  - every cue frame is within the video;
  - camera keys exist at each shot start.
- [ ] Write the shots scene by scene, following the design §5.7 transitions. Each sentence is illustrated literally, and every reaction lands 0–3 f before its word.
- [ ] Run the tests until they pass. Render stills of every shot (first, middle, last) into a contact sheet and review it against the reference frames. Fix, then commit.

### Task 7: Sound
**Files:** create `audio/dsp.py`, `audio/instruments.py`, `audio/music.py`, `audio/sfx.py`, `audio/mix.py` (adapted from `templates/audio`), and `audio/test_mix.py`.
**Interfaces:** Consumes `out/cues.json` (`[{f, kind, gain?}]`), `voice/voice.wav` and `voice/words.json`. Produces `out/mix.wav` (48 kHz stereo, length = TOTAL_FRAMES/30 s).

- [ ] Write the test `audio/test_mix.py`. It asserts:
  - the mix length equals `TOTAL_FRAMES/30*48000` ±1 sample;
  - integrated loudness is −14 ± 0.5 LUFS;
  - true peak ≤ −1.0 dBTP;
  - the music is ≥ 8 LU under the voice during words;
  - the cue kinds used all have generators.
- [ ] Music: lyre (Karplus-Strong), frame drum, drones, horns, in the D Dorian/Phrygian colour. Per-scene cues as in the design §5.6: wonder, playful, tension, battle ostinato, march build, hopeful, sad drone, finale.
- [ ] SFX:
  - whoosh, boom, clash, crowd, hooves, wheels, dust, torch, wind;
  - quill, hammer, scribble, crack, sparkle, gulp (the gulp only when a character swallows), title hit.
- [ ] Run the tests until they pass. Commit.

### Task 8: Final render, QA and delivery
**Files:** create `SCRIPT.md` and `docs/alexander/STYLE_BREAKDOWN.md`. The renders go in `out/` (ignored by git).

- [ ] Full render: `node tools/render.cjs --from 0 --to TOTAL --workers 4 --out out/alexander_1080p.mp4`.
- [ ] Make the 720p preview with ffmpeg scale.
- [ ] QA:
  - `ffprobe` shows 1920x1080, 30 fps, and a duration equal to the mix.
  - Spot-check frames at every scene boundary.
  - Check that no frozen span is 12 f or longer: frame-diff over the full video with `ffmpeg -vf mpdecimate` reporting no drop run of 12 f or more.
- [ ] Write SCRIPT.md (facts with sources, plus the narration) and STYLE_BREAKDOWN.md (the 8 categories, when and how each appears, with numbers).
- [ ] Commit the source and docs. Send the MP4s and the contact sheet to the user.
