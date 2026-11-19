// Light presets per story beat (references/reports/lighting.md + grade.md): saturated day sky ~#5e93d9 with a
// brighter horizon; golden = peach horizon + violet-blue shadows; night = violet fog #877aea, moonlight #b1ace7 and
// warm torch pools; dawn = pink-gold; lamp = dark interior lit by oil lamps.
import type { Grade } from "./post.ts";
export type Light = "day" | "golden" | "night" | "dawn" | "lamp" | "dusk";
export type LightPreset = {
  skyTop: string; skyHor: string; fog: string; fogNear: number; fogFar: number;
  hemiSky: string; hemiGround: string; hemiI: number; sun: string; sunI: number; sunDir: [number, number, number];
  card: string; cardMin: number; grade: Grade; glow: number; moon?: boolean; stars?: boolean;
};
const G = (lift: number, gamma: number, gain: number, sat: number, vig: number, tint: [number, number, number] = [1, 1, 1]): Grade =>
  ({ lift: [lift, lift, lift * 1.15], gamma: [gamma, gamma, gamma], gain: [gain * tint[0], gain * tint[1], gain * tint[2]], sat, vignette: vig });
export const LIGHTS: Record<Light, LightPreset> = {
  day: { skyTop: "#4f86d6", skyHor: "#bcd8f2", fog: "#bcd3ea", fogNear: 40, fogFar: 520, hemiSky: "#cfe0ff", hemiGround: "#8a7a62", hemiI: 1.25,
    sun: "#fff1dc", sunI: 2.1, sunDir: [-0.55, 0.75, 0.38], card: "#ffffff", cardMin: 1, grade: G(0.02, 1.02, 1.0, 1.14, 0.18), glow: 0.4 },
  golden: { skyTop: "#5b6fc4", skyHor: "#ffc98a", fog: "#f2c39a", fogNear: 30, fogFar: 420, hemiSky: "#b9b4ef", hemiGround: "#8a5f52", hemiI: 1.15,
    sun: "#ffc68a", sunI: 2.3, sunDir: [0.7, 0.32, -0.45], card: "#ffe6cc", cardMin: 0.95, grade: G(0.03, 1.0, 1.02, 1.12, 0.22, [1.03, 1, 0.95]), glow: 0.6 },
  dawn: { skyTop: "#6f7fcf", skyHor: "#ffb7a6", fog: "#e9b9b6", fogNear: 30, fogFar: 400, hemiSky: "#c6c0f2", hemiGround: "#7c5f66", hemiI: 1.1,
    sun: "#ffd2b0", sunI: 1.7, sunDir: [-0.75, 0.25, 0.4], card: "#ffe9e4", cardMin: 0.95, grade: G(0.03, 1.0, 1.0, 1.08, 0.24), glow: 0.6 },
  dusk: { skyTop: "#3b3f8f", skyHor: "#e98f7c", fog: "#a8809f", fogNear: 25, fogFar: 380, hemiSky: "#9c97de", hemiGround: "#5a4458", hemiI: 1.0,
    sun: "#ff9f74", sunI: 1.5, sunDir: [0.8, 0.18, -0.3], card: "#f0d0d8", cardMin: 0.9, grade: G(0.03, 0.98, 1.0, 1.06, 0.28), glow: 0.8 },
  night: { skyTop: "#232a7a", skyHor: "#7d76d8", fog: "#877aea", fogNear: 25, fogFar: 380, hemiSky: "#a29ef2", hemiGround: "#5a4a8a", hemiI: 2.3,
    sun: "#c4bff5", sunI: 1.6, sunDir: [-0.3, 0.8, -0.5], card: "#d6d2f8", cardMin: 0.85, grade: G(0.04, 1.02, 1.05, 1.1, 0.28), glow: 1.0, moon: true, stars: true },
  lamp: { skyTop: "#1d2360", skyHor: "#4c4aa0", fog: "#4a4280", fogNear: 14, fogFar: 160, hemiSky: "#8e88d8", hemiGround: "#433563", hemiI: 1.6,
    sun: "#a7a2ea", sunI: 0.8, sunDir: [0.4, 0.7, 0.6], card: "#d8c0b4", cardMin: 0.8, grade: G(0.03, 0.96, 1.04, 1.05, 0.38, [1.03, 0.99, 0.96]), glow: 1.1 },
};
