# Alexander the Great: The Boy Who Conquered an Empire — script v1 (2026-11-15)

Facts (Plutarch, *Life of Alexander*; Arrian, *Anabasis*; standard dates):
- Born 356 BC, Pella, Macedonia; father King Philip II.
- Tamed the horse Bucephalus as a boy by turning it toward the sun — it was afraid of its own shadow (Plutarch 6).
- Aristotle tutored him from c. 343 BC at Mieza (Plutarch 7-8).
- Philip II assassinated 336 BC at Aegae by his bodyguard Pausanias, at his daughter's wedding. Alexander king at 20.
- Issus 333 BC and Gaugamela 331 BC: Darius III fled both battles.
- Egypt 332 BC (welcomed, treated as pharaoh); Alexandria founded 331 BC. Chalk ran out, the plan was marked with
  barley meal, birds ate it; seers read it as a sign the city would feed many (Plutarch 26).
- Reached the Beas (Hyphasis) in India 326 BC; the army refused to go further.
- Died in Babylon, June 323 BC, aged 32, after a fever.
- Asked who should inherit: "the strongest" (Arrian 7.26). Empire split among his generals (Ptolemaic, Seleucid,
  Antigonid kingdoms). Greek language and culture spread from Egypt to Central Asia and India (Hellenistic age).
- Cleopatra VII (d. 30 BC), last ruler of the Ptolemaic kingdom, was of Macedonian Greek descent.
- Undefeated in battle.

## Script (one line per sentence; scene markers in brackets)
This boy would conquer most of the known world before his thirty-third birthday.
It's 356 BC, in the kingdom of Macedonia, and a prince named Alexander is born.
His father, King Philip the Second, is turning Macedonia into a military powerhouse.
As a boy, Alexander tames a wild horse nobody else can ride, just by turning it toward the sun, because it was scared of its own shadow.
So Philip hires the smartest man in Greece to teach him. Aristotle.
Philosophy, mathematics, medicine, and how to lead an army.
Then, in 336 BC, Philip is assassinated by one of his own bodyguards, at a wedding.
Suddenly, Alexander is king. He's twenty years old.
And he has a plan: invade the Persian Empire, the biggest superpower on Earth.
At Issus, he charges straight at the Persian king, Darius, who turns his chariot around and runs.
Two years later, at Gaugamela, Darius brings a much bigger army.
Alexander punches a hole right through the middle, and Darius runs away again.
Egypt welcomes him as a pharaoh. Persia falls.
He keeps marching, through Central Asia and all the way into India, until his exhausted army finally refuses to go any further.
Back in Egypt, in 331 BC, he had marked out a new city with barley flour, because the builders ran out of chalk.
Birds ate the whole plan. His priests called it a great sign, and they were right. Alexandria became one of the greatest cities on Earth.
Then, in 323 BC, in Babylon, Alexander catches a fever.
Days later, he's dead, at just thirty-two.
Asked who should rule his empire, he reportedly answered: the strongest.
So his generals fought over it, and it shattered into rival kingdoms.
But Greek language, art, and ideas now stretched from Egypt to India.
Nearly three hundred years later, Egypt's last queen still spoke Greek. Her name? Cleopatra.
All because one boy from Macedonia never lost a battle.

## Build
- Voice: `pip install kokoro-onnx soundfile`, download `kokoro-v1.0.int8.onnx` + `voices-v1.0.bin` (kokoro-onnx GitHub release) into `voice/`, then `python3 voice/voice.py am_michael 1.18` → voice.wav + words.json.
- Picture: 2D Canvas renderer (`src/`), rendered headless with Playwright: `npm i && node render.mjs video out/video.mp4 4 30` (stills: `node render.mjs stills out/st 2.5,10`).
- Sound: `pip install scipy && python3 audio/audio.py` (original synthesized score + SFX from out/events.json, voice ducking).
- Mux: `ffmpeg -i out/video.mp4 -i audio/mix_raw.wav -map 0:v:0 -map 1:a:0 -c:v copy -af loudnorm=I=-14:TP=-1.5 -c:a aac -b:a 192k out/alexander_final.mp4`
