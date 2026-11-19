import { Engine } from "./render/engine.ts";
import { buildCoast } from "./sets/coast.ts";
import { buildSchool } from "./sets/school.ts";
import { buildParis } from "./sets/paris.ts";
import { buildNotreDame } from "./sets/notredame.ts";
import { buildField } from "./sets/field.ts";
import { buildRoom } from "./sets/room.ts";
import { charCard } from "./chars/cast.ts";
const E = new Engine(1920, 1080);
const builders: Record<string, () => any> = { coast: buildCoast, school: buildSchool, paris: buildParis, notredame: buildNotreDame, field: buildField, room: () => buildRoom() };
(window as any).preview = (o: any) => {
  if (!E.sets.has(o.set)) E.addSet(o.set, builders[o.set]());
  const cards = (o.chars ?? []).flatMap((c: any) => charCard(c.pose, c.pos, 0, c.o ?? {}));
  E.frame({ layers: [{ alpha: 1, world: { set: o.set, light: o.light ?? "day", f: 0, cam: { pos: o.pos, look: o.look, fov: o.fov ?? 40, roll: 0 }, cards, dof: o.dof, state: o.state ?? {} } }] });
  return E.jpeg();
};
(window as any).ready = true;
