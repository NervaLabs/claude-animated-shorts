# Napoleon Bonaparte: The Man Who Conquered Europe — script and sources

This is episode 2 of the series. It uses the same narrator, style, title card format and editing as *Alexander the Great: The Boy Who Conquered an Empire*.

**Narration**
- Voice: ElevenLabs "Liam" (young male), eleven_v4.
- Recording: two takes, because the model caps each request at 5,000 characters. `voice/part1.txt` became `take1.mp3` and `voice/part2.txt` became `take2.mp3`; they were joined into one track.
- Pauses: anything longer than 0.3 s was shortened to 0.16–0.5 s.
- Speed: 1.1×, with the pitch unchanged (`tools/tighten.py`).
- Final narration length: 4:27.9. Video length: 4:29.1.
- Word timings: faster-whisper word alignment mapped onto the script tokens (`tools/align.py`, output `voice/words.json`).
- Captions show years and figures as numerals ("1769", "600,000", "−30°C").

**Structure**
- 12 scenes, 69 shots, 30 fps, 1920×1080.
- Every shot starts 2 frames before the word it illustrates (`src/story/shots.ts`).

## Facts used, with sources
Anecdotes that may be legend are spoken as "legend says". Height and the "little corporal" nickname are treated as the myth they are.

| # | Claim in the video | Source |
|---|---|---|
| 1 | Born 15 August 1769 at Ajaccio, Corsica | Britannica "Napoleon I"; Wikipedia "Napoleon" |
| 2 | Corsica passed from Genoa to France in 1768 (Treaty of Versailles) | Britannica "Corsica" |
| 3 | His father Carlo Buonaparte fought for Paoli's Corsican independence movement against the French | Britannica; Englund, *Napoleon: A Political Life* (2004) |
| 4 | Sent to school in France at nine (Autun, then Brienne, 1779); mocked for his Corsican accent; buried himself in history and mathematics | Roberts, *Napoleon the Great* (2014), ch. 1 |
| 5 | Snowball fight at Brienne organised like a siege (anecdote, told as legend) | Bourrienne, *Memoirs*; Roberts ch. 1 |
| 6 | École Militaire in Paris; finished in one year; commissioned artillery second lieutenant in 1785, at 16 | Britannica; Roberts ch. 1 |
| 7 | French Revolution 1789; Louis XVI deposed 1792, executed January 1793 | Britannica "French Revolution" |
| 8 | Siege of Toulon, 1793: Captain Bonaparte's artillery placement forced the British fleet out of the harbour | Britannica "Siege of Toulon"; Roberts ch. 3 |
| 9 | Promoted brigadier general in December 1793, at 24 | Britannica |
| 10 | 13 Vendémiaire (5 Oct 1795): defended the Convention against a royalist uprising in Paris | Britannica "Vendémiaire" |
| 11 | Married Joséphine de Beauharnais, March 1796 | Britannica "Joséphine" |
| 12 | Army of Italy, 1796: poorly supplied; Lodi (May 1796), Arcole (Nov 1796), Rivoli (Jan 1797); Austria made peace (Campo Formio, Oct 1797) | Britannica "Italian campaigns of the French Revolutionary Wars" |
| 13 | Nicknamed "le petit caporal" by his soldiers after Lodi | Roberts ch. 4 |
| 14 | About 5 ft 7 in (≈1.69 m), around average; the "short" myth owes much to British caricature (Gillray's "Little Boney") and confusion between French and English inches | Roberts, appendix; Britannica |
| 15 | Egypt, 1798, partly to threaten Britain's route to India | Britannica "French campaign in Egypt and Syria" |
| 16 | "Forty centuries look down upon you" (attributed; told as legend) | Napoleon's later account; Roberts ch. 7 |
| 17 | Battle of the Pyramids, July 1798; over 150 savants on the expedition; Rosetta Stone found 1799 | Britannica "Rosetta Stone"; British Museum |
| 18 | Nelson destroyed the French fleet at the Nile (Aboukir Bay), August 1798 | Britannica "Battle of the Nile" |
| 19 | Returned to France in 1799; coup of 18 Brumaire (9 Nov 1799); First Consul | Britannica "Coup of 18–19 Brumaire" |
| 20 | Coronation, Notre-Dame, 2 December 1804; Pope Pius VII present; Napoleon crowned himself, then Joséphine | Britannica; Musée du Louvre on David's *Coronation* |
| 21 | David's painting took about three years (1805–1807) | Musée du Louvre |
| 22 | Austerlitz, 2 Dec 1805, one year to the day after the coronation: "Battle of the Three Emperors"; feigned weakness, allies drawn off the Pratzen Heights; morning fog and the "sun of Austerlitz" | Britannica "Battle of Austerlitz" |
| 23 | Jena (vs Prussia, 1806) and Friedland (vs Russia, 1807) | Britannica |
| 24 | Napoleonic (Civil) Code, 1804: equality before the law; reduced rights for women; still influences civil law worldwide | Britannica "Napoleonic Code" |
| 25 | 1812: Grande Armée of more than 600,000 crossed the Niemen | Britannica "French invasion of Russia"; Zamoyski, *1812* (2004) |
| 26 | Russians retreated with scorched earth; Moscow found largely empty, then burned (Sept 1812); waited over a month before retreating | Zamoyski; Britannica |
| 27 | Retreat temperatures below −30 °C; hunger, cold and Cossack attacks; only a small fraction returned | Zamoyski; Britannica |
| 28 | Sixth Coalition (Russia, Prussia, Austria, Sweden, Britain and others); Leipzig, Oct 1813, "Battle of the Nations" | Britannica "Battle of Leipzig" |
| 29 | Allies took Paris, March 1814; abdication, April 1814; exiled to Elba, keeping the title of Emperor; Elba ≈29 km long | Britannica "Elba"; Treaty of Fontainebleau (1814) |
| 30 | Escaped Feb 1815 with about 1,000 men; Laffrey: "If there is a man among you who would kill his Emperor, here I am"; troops joined him | Britannica "Hundred Days"; Roberts ch. 30 |
| 31 | Louis XVIII fled Paris; the Hundred Days | Britannica |
| 32 | Waterloo, 18 June 1815: rain delayed the attack; Wellington's line held; Blücher's Prussians arrived; "the nearest-run thing you ever saw in your life" | Britannica "Battle of Waterloo"; Creevey Papers |
| 33 | Exiled to Saint Helena, South Atlantic, roughly 1,900 km from Africa; dictated memoirs | Britannica "Saint Helena" |
| 34 | Died 5 May 1821, aged 51, most likely of stomach cancer | Britannica; Lugli et al., *Nature Clinical Practice* (2007) |
| 35 | Remains returned to Paris in 1840 (Les Invalides) before large crowds | Britannica "Les Invalides" |
| 36 | The Napoleonic Wars cost millions of lives (≈3–6 million estimated) | Britannica "Napoleonic Wars" |
| 37 | Legacy: the legal code, the lycée school system, and the spread of the metric system across Europe | Britannica |

Map borders (France 1789, the Empire and its client states in 1812, the coalition powers) are simplified from standard historical atlases and are approximate.

## Narration (as spoken)
One man went from being a relatively unknown army officer to ruling one of the most powerful empires in European history. He crowned himself emperor, redrew the map of Europe, and then lost it all, twice. His name was Napoleon Bonaparte.

He was born on August fifteenth, seventeen sixty-nine, on the island of Corsica, which had become French only the year before. His father had actually fought against the French. At nine, Napoleon was sent to school in France, where the other boys mocked his thick Corsican accent. So he buried himself in books about history and mathematics. Legend says he once even led a schoolboy snowball fight like a real battle. At military school in Paris, he finished the course in a single year, and at sixteen, he became an artillery officer.

Then, in seventeen eighty-nine, the French Revolution turned the country upside down. The king lost his throne, and later his life. Suddenly, talent mattered more than noble birth. In seventeen ninety-three, at the Siege of Toulon, a young captain named Bonaparte placed the cannons that drove the British fleet out of the harbor. At just twenty-four, he was made a general. Two years later, he defended the government in Paris against a royalist uprising, and became a hero of the Revolution. Soon after, he married Josephine.

In seventeen ninety-six, he took command of a hungry, ragged army in Italy, and turned it into a winning machine. He moved so fast that his enemies could barely keep up. Lodi, Arcole, Rivoli: victory after victory, until Austria was forced to make peace. His soldiers nicknamed him "the little corporal." And no, he wasn't actually short. He was about five foot seven, average for his time. The myth came partly from British cartoonists.

In seventeen ninety-eight, he sailed to Egypt, hoping to threaten Britain's route to India. Legend says he told his men that forty centuries were looking down on them from the pyramids. He won the Battle of the Pyramids, and brought along more than a hundred scholars, whose expedition uncovered the Rosetta Stone. But the British admiral Nelson destroyed his fleet, leaving his army stranded. The campaign made him famous, but it never achieved its goals.

So Napoleon slipped back to France. In November seventeen ninety-nine, he seized power in a coup, and became First Consul. Five years later, on December second, eighteen-oh-four, in Notre-Dame, with the Pope watching, he took the crown and placed it on his own head. Emperor of the French. Then he crowned Josephine as empress. The ceremony was so grand that the painting of it took almost three years to finish.

Exactly one year later, at Austerlitz, he faced the emperors of Austria and Russia at once. He pretended to be weak, and lured them off the high ground. Then, as the sun broke through the morning fog, he smashed their center. It was his masterpiece. Then came Jena against Prussia, and Friedland against Russia. Much of Europe was now under his control. At home, his Napoleonic Code made all men equal before the law, though it gave women far fewer rights. Versions of it still shape legal systems around the world.

But in eighteen-twelve, he invaded Russia with more than six hundred thousand men. The Russians kept retreating, burning crops behind them. He reached Moscow, but found it empty, and soon on fire. He waited over a month for a surrender that never came, then turned back. Temperatures fell below minus thirty. Hunger, freezing cold and constant attacks destroyed his army. Only a small fraction ever made it home.

Now Russia, Prussia, Austria, Sweden and Britain all joined forces against him. In eighteen-thirteen, he was beaten at Leipzig, in the Battle of the Nations. The next year, enemy armies marched into Paris, and Napoleon was forced to give up his throne. He was exiled to Elba, a tiny island off Italy, and allowed to keep the title of Emperor, of an island just twenty-nine kilometers long.

Ten months later, he escaped, with about a thousand men. When soldiers were sent to stop him, he walked right up to them and said, "If any of you wants to kill his Emperor, here I am." They switched sides. The king fled Paris, and Napoleon was back. His return lasted about a hundred days. On June eighteenth, eighteen-fifteen, at Waterloo, he faced the British under Wellington. Rain delayed his attack, the British line held, and when the Prussians under Blücher arrived, his army broke. Wellington called it "the nearest-run thing you ever saw."

This time, he was sent to Saint Helena, a speck of rock in the South Atlantic, nearly two thousand kilometers from Africa. He spent his last years dictating his memories. On May fifth, eighteen twenty-one, Napoleon died, at fifty-one years old, most likely of stomach cancer. Nineteen years later, his body was brought back to Paris, as huge crowds lined the streets.

His wars cost millions of lives. But his laws, his schools, and even the metric system he spread across Europe outlived his empire. So, was Napoleon a brilliant leader, or was his ambition his greatest weakness?
