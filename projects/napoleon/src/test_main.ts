import * as THREE from "three";
import { Engine } from "./render/engine.ts";
import { camAt } from "./core/camera.ts";
import { Pen, bodyFront, soldier, fxContact } from "./chars/toon.ts";
import { stoneHD, grassHD, roofHD, rep } from "./sets/paint.ts";

const E = new Engine(1920, 1080);
const root = new THREE.Group();
const lam = (map: THREE.Texture) => new THREE.MeshLambertMaterial({ map });
const ground = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), lam(rep(grassHD(), 30, 30))); ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; root.add(ground);
for (let i = 0; i < 14; i++) {
  const w = 4 + (i % 3) * 2, h = 4 + (i % 4) * 2;
  const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, 5), lam(rep(stoneHD(), w / 4, h / 4))); b.position.set(-30 + i * 5.2, h / 2, -14 - (i % 2) * 6); b.castShadow = b.receiveShadow = true; root.add(b);
  const r = new THREE.Mesh(new THREE.ConeGeometry(w * 0.8, 2.5, 4), lam(roofHD("#c0573a"))); r.position.set(b.position.x, h + 1.25, b.position.z); r.rotation.y = Math.PI / 4; r.castShadow = true; root.add(r);
}
import { inkEdges } from "./render/ink.ts";
inkEdges(root);
E.addSet("test", { root, anchors: {} });
const keys = [{ f: 0, pos: [0, 1.6, 9] as [number, number, number], look: [0, 1.4, 0] as [number, number, number], fov: 38 }, { f: 30, dur: 30, pos: [4, 2, 8] as [number, number, number], look: [0, 1.4, 0] as [number, number, number], fov: 34 }];
(window as any).renderFrame = (f: number, light = "day") => {
  const t0 = performance.now();
  const cards = [] as any[];
  for (let i = 0; i < 9; i++) {
    const x = -4 + i, z = -(i % 3) * 1.5;
    cards.push({ key: `sol${i}_${Math.floor((f / 10 + i * 0.13) * 12) % 12}`, cw: 600, ch: 1000, h: 2.16 * 1000 / 1000 * 0.95, pos: [x, 0, z], draw: (g: CanvasRenderingContext2D) => bodyFront(new Pen(g), soldier(i % 3), { phase: (Math.floor((f / 10 + i * 0.13) * 12) % 12) / 12, mode: "march", expr: i === 4 ? "grin" : "neutral", seed: i + 1 }) });
    cards.push({ key: "shadow", cw: 300, ch: 120, h: 0.45, pos: [x, 0, z], flat: true, shadow: true, anchor: 0.5, draw: (g: CanvasRenderingContext2D) => { const gr = g.createRadialGradient(150, 60, 0, 150, 60, 150); gr.addColorStop(0, "rgba(30,20,50,0.55)"); gr.addColorStop(0.5, "rgba(30,20,50,0.3)"); gr.addColorStop(1, "rgba(30,20,50,0)"); g.setTransform(1,0,0,0.4,0,36); g.fillStyle = gr; g.fillRect(0, 0, 300, 300); } });
  }
  E.frame({ layers: [{ alpha: 1, world: { set: "test", light: light as any, f, cam: camAt(keys, f), cards, dof: { cInf: (window as any).__cinf ?? 12, focus: 9 } } }] });
  return performance.now() - t0;
};
(window as any).grab = () => E.jpeg(); (window as any).E = E;
(window as any).TOTAL = 120; (window as any).ready = true;
