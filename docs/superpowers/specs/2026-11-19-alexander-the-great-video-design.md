# Alexander the Great: The Boy Who Conquered an Empire — design

Date: 2026-11-19 · Status: draft for approval

## 1. Intent

An original, animated stickman history documentary about Alexander the Great for YouTube viewers who like history told
as a story. It must look and move like the reference style: flat bean-head characters with plum ink outlines standing
in a painted, ink-lined 3D world, gliding cameras, flat 2D effect sprites and one-word captions. The user's reference
frame (two helmeted guards on a moonlit castle wall with torches) and the repo's study of 20 shorts in the same style
(`references/`) are the style targets. Story, script, characters, music and voice are all our own.

Success means three things. It reads as a professionally produced animated documentary. Every claim is historically
sound, and legends are labelled as legends. Viewers stay to the end because each sentence is illustrated with a little
visual joke or punch.

### Goals
- A 16:9, 1920x1080, 30 fps video of 3:30–4:00, with a mixed soundtrack (voice, original music, SFX), exported as MP4 (H.264 + AAC).
- The 8 scenes in the user's order, timed to the narration word by word.
- Animated maps for the campaign, the empire and its break-up.
- A written breakdown of the reference style (8 categories, when and how each effect appears). This is a deliverable in its own right.
- One consistent cast that keeps the same design in every shot.

### Non-goals
- Copying the reference channel's characters, scripts, shots or name.
- A vertical cut, thumbnail, title card art for YouTube, or upload (can follow later).
- Any AI video generator. Everything is rendered from code.

### Anti-goals (a failure even if it "works")
- Gore, blood, wounds or deaths on screen. Battles are dust, clashing shields and fleeing kings. Philip's assassination is
  a shadow and a falling crown.
- Invented events presented as fact. Ancient anecdotes (Bucephalus, the spear on the beach, the barley-flour city plan,
  "to the strongest") are said as "legend says" or "according to Plutarch".
- A slideshow feel: no static holds, no hard cuts except on big place jumps.
- An inconsistent cast (Alexander changing colours or proportions between scenes).

## 2. Constraints
- **Toolchain.** Everything is built from the repo's proven pipeline (`SKILL.md`, `templates/`): three.js inside Remotion,
  Canvas2D-drawn character cards (`toon.ts` Pen API), the ink pass, lens blur, grade, and numpy-synthesised audio
  (`templates/audio/`). Node 22, Python 3, ffmpeg and Chromium are present; Remotion, three and the TTS are installed from
  package registries.
- **Kenney models are not in the repo.** `world.ts` loads them from `public/` and falls back to null. Our sets use procedural
  geometry plus `paint.ts` textures only.
- **No GPU is assumed.** Chromium may render WebGL in software. Render speed is the main schedule risk (see §8).
- **The final MP4 is large.** It can't be committed to git (GitHub's limit is 100 MB per file). It is sent to the user as
  a file, plus a 720p preview.
- **The repo's own rules are overridden by the user.** "No captions" is overridden by this request, so captions stay in.
  The 2K vertical export rule doesn't apply (16:9 was chosen). Kept: the standard mix (music +3 dB, SFX −6 dB relative to the
  template mix), one steady voice tone, English only.

## 3. Approaches (decided)
| | Approach | Trade-off | Decision |
|---|---|---|---|
| A | 3D painted sets with ink and flat character cards for the story scenes. Maps, title and captions as 2D Remotion layers on top. | Closest to the reference look; most work (6 new sets); 20-30+ min per full render | **Chosen by the user** |
| B | All 2D painted backgrounds that slide at different speeds when the camera pans, to fake depth | About twice as fast; loses the 3D depth and light that make the style | Rejected |
| C | Everything in 3D, maps included | Risky label and border animation for no visible gain | Dropped |

Format decided by the user: **C — landscape 16:9, 3–4 minutes** (vertical options A/B rejected).
Voice decided by the user: **a young male narrator in his 20s — the ElevenLabs voice `c6SfcYrb2t09NHXiT80T`.**

## 4. Reference style breakdown (summary; full version is deliverable `docs/alexander/STYLE_BREAKDOWN.md`)
Measured numbers come from `references/STYLE_BIBLE.md` and `references/reports/*.md`. Reference px are given at 720x1280.
For our 1920x1080 frame, scale by output height (1080/1280).

1. **Animation style.** 2D flat cards in a 3D world.
   - Heads: bean-shaped, H/W ≈ 0.93, a slightly pointed crown, a narrower chin, ~10 % asymmetry.
   - Outline: plum ink #201628–#2f1d28, about 3x thicker on the shadow/bottom side.
   - Faces: eyes ~0.26 W apart, no blush, no catchlights.
   - Bodies: about 3.5 head-heights tall. Bean torso in costume colours, single-stroke stick legs and arms (~0.055 W), ink-dot hands.
   - Animated on ones, with no line boil, no squash/stretch and no idle loops.
2. **Character movement.**
   - Walk: 9-12 f per step, 3-7 % body bob, 1-7° lean, stance foot planted.
   - Acting: beats land 0-3 f before their word. Anticipation is a 2-3 f crouch, or for a thrust: 3 f lower, about 6 f held, a 1-frame strike, then a 4-5 f ring.
   - Blinks: every 0.5-2.3 s, 4 frames (half, shut, shut, half), plus one blink on every expression swap.
   - Faces: a library of about 14 expressions (smirk, wide-eye, worried, angry, sly side-eye as in the user's frame).
   - Mouths: open and close against the voice envelope.
3. **Camera effects.**
   - Moves are symmetric smootherstep glides of ~23 f (10 in, 10 out), peaking at 14-16 px/f.
   - About 6 moves every 10 s, and 65 % of frames are moving. Holds always creep in (0.15-0.35 %/f, 0.6 %/f on punch words).
   - Shake: an impact kick that flips sign every frame and decays over 6-7 f.
   - Tilt: 4-5° dutch rolls for drama.
   - Whip pans: at most 0.45 per minute, 45-93 px/f, always heavily motion-blurred.
   - Height: a low camera, plus foreground props in about 1/3 of shots.
   - Lens blur on close and medium shots (about 1/3 of screen time). Wides stay sharp.
4. **Visual effects.**
   - All flat 2D sprites composited in the 3D world: dust puffs, impact stars or sparkles with a 4-5 f ring, speed lines, glow bursts, light shafts, splashes, music notes.
   - Fire is a flat flame card with bloom only on emissive sources (torches, braziers, lamps).
   - Characters cast tight contact shadows.
   - Night is violet-blue (fog #877aea, moonlight #b1ace7) against warm torch pools that tint the faces. This is the look of the user's frame.
5. **Backgrounds.**
   - 3D toon sets with hand-painted HD textures (stone blocks, tiles, planks) and seams painted in as darker tints.
   - Thin near-black ink, ~3 px at 1080 wide, on silhouettes and creases only.
   - Saturated skies, with fog matching the horizon colour.
   - Light follows the story beat: day, then golden, then night.
6. **Editing.**
   - Voice starts on frame 1-4. About 3.5-4.1 words/s with almost no pauses. Every sentence is illustrated literally.
   - Hard cuts are rare. Place changes use 6-8 f crossfades, follow-the-object moves or fly-throughs. A 4 f white flash punctuates the hook.
   - The video ends on the last word.
7. **Text effects.**
   - Captions: one word (sometimes 2-3) at a time, white bold sans with a thin black outline, lower-middle, hard swap on each word.
   - The reference has almost no titles. For a documentary we add sparing period labels: year stamps, place names and map labels.
8. **Sound.**
   - One fast, steady narrator. Music and SFX sit 5-10 dB under the speech and duck while he talks.
   - Loudness: −14 to −15 LUFS integrated, LRA ~2.5 LU.
   - Synthesised SFX hit each visual event on its frame: whoosh on moves, boom on kicks, crowd and dust on battles, fire crackle at night.

## 5. The video

### 5.1 Script (draft v1, ~760 words, target ~3.4 words/s ≈ 3:45)
Sources: Plutarch, *Life of Alexander*; Arrian, *Anabasis*; Diodorus XVII; summarised against Britannica and Wikipedia
("Alexander the Great", "Battle of Issus", "Battle of Gaugamela", "Alexandria", "Diadochi"). All dates are BC.
The facts block with a source per claim goes at the top of `projects/alexander/SCRIPT.md`.

**S1 — Introduction (~0:00–0:22)**
In 356 BC, a baby boy was born in Pella, the capital of Macedonia, a rugged mountain kingdom on the northern edge of the
Greek world. His name was Alexander. Before he turned thirty, he would rule one of the largest empires the ancient world
had ever seen. And he would never lose a major battle. *(title: ALEXANDER THE GREAT — The Boy Who Conquered an Empire)*

**S2 — Childhood (~0:22–1:05)**
His father was King Philip the Second, a tough soldier-king who had lost an eye in battle and turned Macedonia's farmers
into the most dangerous army in Greece. According to Plutarch, when Alexander was a boy, nobody could tame a wild horse
called Bucephalus. Alexander noticed the horse was afraid of its own shadow, so he turned it to face the sun, and rode it.
Philip decided a son like that needed the best teacher money could buy. So he hired the philosopher Aristotle. At a quiet
school in Mieza, Aristotle taught the thirteen-year-old prince philosophy, mathematics, science and medicine, and how a
leader should think. Alexander loved Homer's *Iliad* so much that he kept a copy under his pillow… right next to his dagger.
His father's generals taught him the other subject: war. At just eighteen, Alexander led the cavalry charge at the Battle
of Chaeronea, and helped his father take control of Greece.

**S3 — Becoming king (~1:05–1:30)**
Then, in 336 BC, everything changed. At a royal wedding in the old capital, Aegae, King Philip walked into the theatre…
and was assassinated by one of his own bodyguards. Alexander was about twenty years old. Overnight, he was king. Some Greek
cities thought the boy-king would be easy to push around. They were wrong. He crushed the revolts, and turned to face the
largest empire on Earth.

**S4 — Conquering the Persian Empire (~1:30–2:25)**
The Persian Empire stretched from Egypt to India, and its king, Darius the Third, could raise armies far bigger than
Alexander's. In 334 BC, Alexander crossed into Asia with roughly forty thousand men. Legend says he threw a spear into the
beach as he landed, claiming the whole continent. In 333 BC, at Issus, the two kings finally met. Darius had the bigger
army, but the battlefield was squeezed between the mountains and the sea, so his numbers didn't help. Alexander charged
straight at Darius… and Darius turned his chariot around and fled. Darius offered him a huge piece of his empire for
peace. His general Parmenion said, "If I were Alexander, I'd take it." Alexander replied, "So would I, if I were Parmenion."
In 331 BC, they met again at Gaugamela, on a wide flat plain chosen so Darius's huge army and scythed chariots could spread
out. Alexander's soldiers simply opened gaps in their lines and let the chariots roll right through. Then Alexander found
a weak spot, charged… and Darius fled. Again.

**S5 — His empire (~2:25–2:55, map)**
Babylon, Susa and Persepolis fell, and Alexander was now the king of Asia. But he didn't stop. His empire already reached
from Greece to Egypt, where he was welcomed as pharaoh. Now it pushed across Persia, into the mountains of Bactria and
Sogdiana, in today's Afghanistan and Uzbekistan, and in 326 BC, across the Indus into northwestern India, where he beat
King Porus and his war elephants at the Hydaspes River. There, after eight years of marching, his exhausted army refused
to go any farther. So, for once, Alexander turned back.

**S6 — Alexandria (~2:55–3:15)**
Along the way he founded cities, and named many of them after himself. The most famous was in Egypt. Earlier, in 331 BC,
Alexander marked out a new city on the Mediterranean coast. Legend says the builders outlined its streets with barley
flour, and when birds flew down and ate it, the seers said the city would one day feed the world. Alexandria grew into one
of the greatest cities on Earth, famous for its lighthouse and its library, both built by the kings who came after him.

**S7 — His death (~3:15–3:30)**
Alexander never saw it grow. In June 323 BC, in Babylon, he fell ill with a fever. Days later, Alexander the Great was
dead, at just thirty-two years old. To this day, nobody knows for sure what killed him.

**S8 — His legacy (~3:30–3:55)**
He left no clear heir. Asked who should rule after him, he is said to have answered: "The strongest." His generals fought
over his empire for decades, until it broke apart into separate kingdoms: the Ptolemies in Egypt, the Seleucids in Asia,
and the Antigonids in Macedonia. But his real legacy wasn't the land. Greek language, art and ideas spread from Egypt to the
edge of India, blending with the cultures they met, and began an era historians call the Hellenistic Age. He ruled for just
thirteen years. People have been talking about him for more than two thousand years.

### 5.2 Cast (one design each, defined once in `cast.ts`, reused everywhere)
| Character | Design notes (bean head, 3.5 HH, plum ink) |
|---|---|
| Alexander (boy, ~10) | Smaller (2.8 HH), tousled gold-brown hair, white chiton, red sash |
| Alexander (young man, 18-32) | Same face and hair, beardless. Bronze muscle cuirass, crimson cloak, crested Attic helmet with a white plume (battle), gold diadem ribbon (king). The signature head tilt and an upward gaze in the hero poses. |
| Philip II | Black beard. Right eye drawn closed with a small scar line (no wound detail). Purple cloak, gold wreath crown. |
| Aristotle | Old, white beard, bald crown, blue-grey himation, scroll in hand |
| Darius III | Tall cylindrical Persian crown (kidaris), long curled black beard, purple and gold robe, gold chariot |
| Parmenion | Grey-bearded veteran general in Macedonian armour |
| Porus | Very tall, turban, beard. Only on the map/elephant beat. |
| Macedonian phalangite (crowd) | Bronze helmet, small round shield, long sarissa pike. Crowd of hundreds of instanced cards. |
| Persian soldier (crowd) | Soft felt cap, wicker shield, short spear, colourful tunic |
| Bucephalus | Black horse with a white star. A side-view and a 3/4-view card. |
| Extras | Seers, builders, a wedding crowd, Babylon physicians, a war elephant (map/scene card) |

### 5.3 Sets (3D, procedural geometry with `paint.ts` textures and ink)
1. **Pella** — a palace with Doric columns, a pediment and red tiles on a hill above the town and plain, with mountains behind. Day and golden light. Used in S1, S2 (courtyard with Bucephalus) and S3 (the coronation at dawn).
2. **Mieza** — a grove, stone benches, a colonnade and a cave-shrine of the Nymphs, a sand table with soldier tokens, geometry drawn in sand, scrolls. Day.
3. **Aegae theatre** — a stepped half-ring theatre at night with torches, in the violet moonlit look of the user's frame. S3.
4. **Battlefield** — one plain with two variants. Issus: a narrow coastal plain with a sea edge, mountains and a shallow river. Gaugamela: a vast flat plain. Day and golden light, heavy dust layers. S4 (plus the Chaeronea charge in S2 and the Hellespont beach landing in S4 as small variants).
5. **Alexandria** — coastline, Pharos island and a harbour. Streets drawn on the ground, then buildings rising in stages. A lighthouse and library appear last, labelled "built later by the Ptolemies". S6.
6. **Babylon** — blue glazed brick walls with yellow animal reliefs (Ishtar Gate inspired), a palace chamber at night with oil lamps, a ziggurat silhouette through the window. S5 opener and S7.

### 5.4 Maps (2D Remotion layers)
- **Geography:** Natural Earth land and coastlines (npm `world-atlas`, public domain), projected with `d3-geo` over about lon 10°E–80°E, lat 15°N–48°N.
- **Look:** drawn as a painted parchment map. Sea in a muted teal, land in ochre, a plum ink coastline 3 px wide that matches the character ink. Hand-lettered-style labels.
- **Map 1, Persia vs Macedonia (S4 intro).** Small Macedonia, huge Achaemenid Empire.
- **Map 2, campaign (S4/S5).** The route draws as an animated dashed line: Pella, Hellespont/Granicus (334), Issus (333), Tyre, Egypt/Alexandria (332-331), Gaugamela (331), Babylon, Persepolis, Bactria, Sogdiana, Hydaspes (326), back to Babylon (323). The empire fill grows behind the line, and battle icons pop with impact stars.
- **Map 3, break-up (S8).** The empire shatters into the Ptolemaic, Seleucid and Antigonid kingdoms (c. 301-276 BC boundaries, simplified) with the crack SFX. Then a Greek-culture glow spreads (Alexandria, Ai-Khanoum, Gandhara).
- **Borders:** hand-authored lat/lon polygons simplified from standard historical atlases. They are approximate, and the narration never claims exact borders.
- **Characters on maps:** Alexander's card (same `toon.ts` drawing) marches along the route as a small map token.
- **Final shot:** Alexander, in full figure and hero pose, stands in front of the full empire map at golden hour. The map has lens blur behind him and dust motes, and the camera pulls out slowly. Lettering: "336–323 BC".

### 5.5 Text
- **Word-by-word captions** in the reference style: white bold rounded sans with a thin black outline, hard swap per word, lower third, from `words.json`.
- **Title card** after the hook. The words pop in with a 4 f overshoot scale, then a metallic gold "ALEXANDER THE GREAT" over the subtitle.
- **Year stamps** ("356 BC", "336 BC", …) stamp in with a small kick.
- **Map labels and place labels** ("PELLA", "ISSUS · 333 BC", "GAUGAMELA · 331 BC") type or ink in.

### 5.6 Sound
- **Voice:** the user's chosen ElevenLabs voice (`c6SfcYrb2t09NHXiT80T`), via the ElevenLabs API `text-to-speech/{voice}/with-timestamps` endpoint. That endpoint returns per-character alignment, which gives exact word timings for captions and mouths. Generated one scene at a time (8 requests, ~4,500 characters total). One steady tone, ~3.4 words/s. A 30 s test clip goes to the user before the full narration.
- **Music:** an original score synthesised in numpy (`instruments.py` style). Plucked lyre (Karplus-Strong), frame drum, low string drones, horn swells in the D Dorian/Phrygian colour. The cues:
  - S1 wonder
  - S2 light and playful
  - S3 a sudden drop to tension
  - S4 a driving battle ostinato
  - S5 a marching build
  - S6 a hopeful lyre
  - S7 a sparse, sad drone
  - S8 a swelling, resolved finale
- **SFX (synthesised):** whooshes on moves and transitions, impact booms on kicks, shield clashes (metallic, non-gory), crowd roars, hooves, chariot wheels, dust bursts, torch crackle, wind, quill scratches, stone and hammer building sounds, a map-pen scribble, a map-crack sound, sparkle chimes.
- **Mix:** `mix.py` approach. Music ducks under the voice. −14 LUFS integrated, ≤ −1 dBTP.

### 5.7 Editing and timing
- Shots are keyed to **word indices in `words.json`**, not to raw frames, so re-timing the voice re-times the picture. Each shot also has a light, a set, a camera key list, kicks and lens-blur values (the `story.ts` structure, extended).
- Place changes use 8 f crossfades, follow-object moves (the spear flight, the route line), or a whip pan with blur.
- **Scene-change grammar:**
  - S1 to S2: a white flash after the title.
  - S2 to S3: a crossfade to night.
  - S3 (assassination): a smash to black, holding about 6 f, then a slow fade up on the coronation.
  - S3 to S4: a map fly-in.
  - S4 to S5: a pull up from the battlefield into the map.
  - S5 to S6: map dive into Egypt.
  - S6 to S7: a dissolve to night in Babylon.
  - S7 to S8: an extinguished lamp, then the map shatters.
- Expect about 70-90 shots across 3:45 (one every 2.5-3 s, matching the reference density).

## 6. Deliverables
1. `docs/alexander/STYLE_BREAKDOWN.md`: the full 8-category breakdown, with when and how each technique appears and the numbers.
2. `projects/alexander/SCRIPT.md`: facts with sources, and the final narration.
3. `projects/alexander/`: the Remotion project (source, audio scripts, words.json). Committed without node_modules, renders or large WAVs.
4. `alexander_the_great_1080p.mp4`: the final cut. Plus `…_720p.mp4` as a preview, and a contact sheet of stills per scene. Sent to the user as files, not committed.

## 7. Decided by the user vs. my calls
- **User:** the 8 scenes and the title; non-graphic battles; historically accurate; captions and text effects; animated maps; 16:9 at 3-4 min; Approach A; a narrator voice in his 20s, using their ElevenLabs voice.
- **My calls (correct any):**
  - the script wording above;
  - including the Bucephalus, Iliad/dagger, Parmenion and barley-flour anecdotes (all ancient-sourced, labelled as legend or Plutarch);
  - Chaeronea in S2 as the "military strategy" beat;
  - keeping the user's scene order and phrasing Alexandria as "earlier, in 331 BC" (it was founded before Gaugamela);
  - original synthesised music and SFX;
  - approximate map borders;
  - break-up kingdoms named as Ptolemaic, Seleucid and Antigonid.

## 8. Risks and how the builder handles them
- **Render speed.** First task: render one bridge-template frame at 1920x1080 in this container and time it.
  - Under 2 s/frame: render the final at 1080p.
  - Slower: cut lens-blur quality and MSAA, render scenes in parallel chunks, and stitch them with ffmpeg.
- **ElevenLabs fails** (key, credits or voice access): stop and tell the user. No silent fallback to another voice.
- **Scope.** About 6 sets plus maps is a lot. Each set is built to the camera: only what its shots see. Stills of every shot get reviewed against the reference frames before the full render.

## 9. Left to the builder
- Exact shot list and camera keys, sprite designs and texture painting.
- Exact colours within the measured targets.
- Music melodies.
- How the cards are lit.
- Exact border polygons.
