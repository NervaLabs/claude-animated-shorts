// set preview: window.preview({set, light, pos, look, fov, chars}) renders one frame
import { Engine } from "./render/engine.ts";
import { buildPella } from "./sets/pella.ts";
import { buildMieza } from "./sets/mieza.ts";
import { buildAegae } from "./sets/aegae.ts";
import { buildField } from "./sets/field.ts";
import { buildAlexandria } from "./sets/alexandria.ts";
import { buildBabylon } from "./sets/babylon.ts";
import { charCard } from "./chars/cast.ts";
const E = new Engine(1920, 1080);
const builders: Record<string, () => any> = { pella: buildPella, mieza: buildMieza, aegae: buildAegae, field: buildField, alexandria: buildAlexandria, babylon: buildBabylon };
(window as any).preview = (o: any) => {
  if (!E.sets.has(o.set)) E.addSet(o.set, builders[o.set]());
  const cards = (o.chars ?? []).flatMap((c: any) => charCard(c.pose, c.pos, 0, c.o ?? {}));
  E.frame({ layers: [{ alpha: 1, world: { set: o.set, light: o.light ?? "day", f: 0, cam: { pos: o.pos, look: o.look, fov: o.fov ?? 40, roll: 0 }, cards, dof: o.dof, state: o.state ?? {} } }] });
  return E.jpeg();
};
(window as any).builders = builders;
(window as any).ready = true;
