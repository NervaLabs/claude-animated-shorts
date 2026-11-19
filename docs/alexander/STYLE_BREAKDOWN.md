# Reference style breakdown, and how the Alexander video uses it

**Basis.**
- Only one still frame of the reference came through: two helmeted guards on a moonlit castle wall, with torches and a one-word caption ("it's").
- Its video couldn't be watched from here.
- The numbers below therefore come from this repo's measured study of 20 shorts in the same style (`references/STYLE_BIBLE.md`, `references/reports/*.md`: 32,337 frames), checked against that frame.
- Reference pixel values are at 720x1280 and are scaled to our 1920x1080.
- "Ours" gives where each technique appears in the finished video (mm:ss).

## 1. Animation style (character design)
| Element | Reference | Ours |
|---|---|---|
| Construction | Flat 2D cartoon cards standing in a 3D world, lit by the scene's light | Same: Canvas2D-drawn cards depth-tested into three.js sets, tinted by each light preset |
| Head | Bean shape, H/W ≈ 0.93, slightly pointed crown, fuller jaw tapering to the chin, ~10 % asymmetry, a few degrees of tilt | `headBlob`: superellipse, crown 1.75 / jaw 2.3, chin taper −0.12, seeded bulge and tilt |
| Outline | Plum ink #201628–#2f1d28, about 3x thicker on the shadow / bottom side | Thick-thin ink ring weighted away from the light |
| Face | Eyes ~0.26 W apart, no blush, no catchlights; deadpan lidded eyes by default | 21 expressions (neutral, sly, determined, proud, sad, sick, shock, laugh …) |
| Body | ~3.5 head-heights; bean torso; single-stroke stick limbs (~0.055 W); ink-dot hands | Same proportions. A kid build for young Alexander and the students. Costume layers: cuirass, linen skirt (pteryges), cloak, chiton, himation, kidaris crown, Attic helmet with plume, pilos, felt cap, turban, beards, a scarred eye for Philip, shields, sarissas |
| Rendering | Animated on ones; no line boil, no squash and stretch | Same |

## 2. Character movement
| Movement | Reference (measured) | Ours, and where |
|---|---|---|
| Walk / march | One step every 9–12 f, body bob 3–7 %, lean 1–7°, planted stance foot | Walk cycle at 1.4 Hz (a step about every 10.7 f). Philip's entrance at Aegae 1:07, Alexander striding at 2:28, marching phalanxes 0:21 / 1:22 / 1:33 / 2:24 |
| Running / charging | Fast horizontal moves with speed lines and dust trails | Cavalry charges at Chaeronea 0:57, the Issus charge 1:52, the weak-spot charge 2:19 |
| Fighting (non-graphic) | An impact flash with a 4–5 f ring, the contact on the word's onset | Clash bursts at the Hydaspes 2:43; armies face off at Issus 1:42 and Gaugamela 2:06. Nobody is ever hit |
| Pointing / gestures | A raised arm on the acting beat, 0–3 f before the word | Aristotle's lesson 0:44–0:49, Alexander marking out Alexandria 2:58, the seer 3:06, Parmenion 2:00 |
| Blinks | Every 0.5–2.3 s, 4 frames (half, shut, shut, half) | Seeded blinks, one per 40-frame cell (25–55 f apart, 4 f each) |
| Expressions | Swapped on story beats | For example: "sly" on "never lose a major battle" 0:14, "angry" on "They were wrong" 1:21, "sad" and "sick" for the weary army 2:46, the deadpan "Again." 2:23 |

## 3. Camera effects
| Effect | Reference | Ours, and where |
|---|---|---|
| Glide | Symmetric ease in and out over about 23 f (smootherstep), peaking at 14–16 px/f; about 6 moves per 10 s | Every shot has keyed glides of 10–40 f, for example the crane over Pella 0:03 and the Gaugamela push 2:06 |
| Creep | Holds always push in, 0.15–0.35 %/f; 0.6 %/f on punch words | Default 0.2 %/f on every hold; 0.4–0.8 %/f on punch close-ups (0:14, 1:21, 2:03) |
| Zoom-in punch | A fast push to a face on the joke word | Philip's eye 0:16, the dagger 0:53, "So would I, if I were Parmenion" 2:03, "The strongest" 3:32 |
| Pull-out | Reveals scale | "far bigger than Alexander's": from Darius to his whole army, 1:29. The final shot pulls back over the empire map, 3:57 |
| Shake | Impact kicks flip sign every frame and decay over 6–7 f | On "battle" 0:14, Bucephalus rearing 0:25, the spear hitting the beach 1:38, the chariots 2:14, "king" 1:16 and 2:25 |
| Dutch tilt | 4–5° rolls for drama | "never lose a major battle" 0:14, "They were wrong" 1:21, the dagger close-up 0:53 |
| Tracking | The camera follows a moving subject | The Issus charge 1:52 and Darius fleeing 1:54 / 2:21 |
| Lens blur | Lens blur on about 1/3 of screen time (close and medium shots); wides stay sharp | Half-res lens blur on all close and medium shots, focusing on whatever the camera targets |

## 4. Visual effects
| Effect | Reference | Ours, and where |
|---|---|---|
| Dust clouds | Flat puff sprites with ink, growing and fading | Charges and chariots (0:57, 1:52, 2:14), the spear impact 1:38 |
| Impact / burst stars | A white-yellow burst ring of 4–5 f | Battle icons on the map, the coronation 1:16, "king of Asia" 2:25, the Hydaspes clash 2:43 |
| Motion / speed lines | Horizontal white streaks | Horse charges and the fleeing chariot |
| Fire | Flat flame cards with glow on emissive sources only; warm light pools | Torches at Aegae 1:04–1:16 and the oil lamps 0:49, 3:22–3:28 (point lights plus flicker) |
| Smoke | Soft wisps | The lamp going out at "dead" 3:24 |
| Shadows | Characters cast tight contact shadows; the sun casts set shadows | A contact shadow under every card; a 2048 shadow map for the sets. Bucephalus's own shadow at 0:30 |
| Sparkles / glows | Star sparkles on good news | The coins 0:35, "think" 0:47, "feed the world" 3:06 |
| Icons | "!" and "?" marks | "!" on the shadow 0:30, the dagger 0:53, "The strongest" 3:32; "?" for the mystery of his death 3:28 |
| Flashes / fades | A 4 f white flash after the hook; dips to black for shocks | A white flash out of the title 0:16; a smash to black on "assassinated" 1:11 |

## 5. Backgrounds and settings
| Set | Built as (painted 3D, ink lines) | Light |
|---|---|---|
| Pella | Palace with 8 Doric columns, pediment and tiles; paved courtyard, side colonnades, throne dais; the town on the slope and mountains beyond | Dawn, day, golden, lamp, dusk |
| Mieza | Grove, small stoa, a cave of the Nymphs in a rock wall, stone benches, sand table | Day |
| Aegae | Stepped half-ring theatre, orchestra, stage building, torches | Violet moonlit night (fog #877aea), like the reference frame |
| Battlefields | One set, six variants: Chaeronea hills, the narrow Issus plain (sea, river, mountains), flat Gaugamela, the Hellespont beach with ships, the Indian river with palms, a camp of tents | Day, golden, dusk |
| Alexandria | Coast, Pharos island; the city, lighthouse and library rise over time | Day, golden, dusk |
| Babylon | Ishtar Gate in blue glazed brick with animal reliefs, walls, a ziggurat, palms; the royal chamber at night | Day, night, lamp |

Shared look:
- Painted canvas textures with seams painted in.
- Ink about 3 px at 1080p: silhouettes from depth, creases from mesh edges.
- Fog the colour of the horizon.
- A saturated sky gradient with a moon and stars at night.

## 6. Editing
- **Pace.** 70 shots in 4:01, one about every 3.4 s. The voice starts on frame 1. Pauses are tightened to ≤ 0.5 s, as in the reference's near-continuous narration.
- **Sync.** Every shot starts 2 frames before its first word (`words.json`), and every gesture, pop, label and kick is keyed to a word.
- **Transitions.**
  - Crossfades of 6–14 f on place and time changes.
  - The white flash out of the title.
  - A smash to black on the assassination.
  - Map fly-ins and fly-outs (1:26, 2:29, 2:53, 3:35).
  - A zoom-dive into Egypt (2:57).
  - The lamp extinguishing into the legacy section.
- **Callbacks.** Darius flees twice in the same composition (1:54 and 2:21), capped by the deadpan "Again." Every sentence is illustrated literally.

## 7. Text effects
- **Captions:** one word at a time, as in the reference frame. White heavy sans, thin black outline, lower middle, a hard swap on each word. Years show as numerals ("356 BC").
- **Title card:** gold Cinzel "ALEXANDER THE GREAT" pops in word by word with a 4 f overshoot; the subtitle rises in (0:15–0:17).
- **Year stamps:** gold-on-ink plates that pop in with a kick: 356, 336, 334, 333, 331, 326, 323 BC and "336 – 323 BC".
- **Labels:** parchment plates naming people and places (PELLA, PHILIP II, BUCEPHALUS, ARISTOTLE, MIEZA, AEGAE, DARIUS III, ISSUS, GAUGAMELA, BABYLON, PORUS, ALEXANDRIA, LIGHTHOUSE, LIBRARY …).
- **Corner tags:** "ACCORDING TO PLUTARCH", "LEGEND SAYS", "BUILT BY THE PTOLEMIES", "AS THE STORY GOES". These mark legends honestly.
- **Map lettering:** region names with modern names underneath (Bactria / Afghanistan, Sogdiana / Uzbekistan), battle dates, the three kingdoms, "HELLENISTIC AGE".

## 8. Sound
| Layer | Reference | Ours |
|---|---|---|
| Narration | One fast, steady narrator at 3.5–4.1 words/s | ElevenLabs "Liam", 1.1× tempo, about 3.2 words/s |
| Music | A bed 5–10 dB under speech, ducking while he talks | Original synthesised score per scene: wonder, playful, tension, battle ostinato, march build, hopeful, sad drone, finale ending on a D-major chord. Lyre, string pads, horns, frame drums and timpani in D Dorian / Aeolian. Ducked 4 dB under words. Cut to silence on the assassination, dipped when the lamp dies |
| Impacts | Booms on kicks; stamps, pops and whooshes on every graphic | 148 timed cues: stamp, pop, whoosh, boom, title hit, sting, sparkle, coins, thunk, clash, crack, bell … |
| Action | Footsteps, crowds, animals | Marching boots, gallops, whinnies, chariot wheels, scythe blades, a war-elephant trumpet, crowd roars, laughter, a groaning army, birds, hammering |
| Atmosphere | A bed per place | Birdsong, wind, courtyard murmur, crickets and torch crackle at night, sea surf, distant battle |
| Loudness | −14 to −15 LUFS, LRA ~2.5 LU | −14.1 LUFS integrated, −1.2 dBTP |
