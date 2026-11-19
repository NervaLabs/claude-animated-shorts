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
  day: { skyTop: "#4f86d6", skyHor: "#bcd8f2", fog: "#b4cdea", fogNear: 60, fogFar: 1100, hemiSky: "#d6e4ff", hemiGround: "#b09a80", hemiI: 2.1,
    sun: "#fff1dc", sunI: 2.0, sunDir: [-0.55, 0.75, 0.38], card: "#ffffff", cardMin: 1, grade: G(0.025, 1.06, 1.0, 1.06, 0.16), glow: 0.4 },
  golden: { skyTop: "#5b6fc4", skyHor: "#ffc98a", fog: "#e9b9a0", fogNear: 50, fogFar: 950, hemiSky: "#c8c2f4", hemiGround: "#a07c70", hemiI: 1.9,
    sun: "#ffcf96", sunI: 2.1, sunDir: [0.7, 0.32, -0.45], card: "#ffe6cc", cardMin: 0.95, grade: G(0.03, 1.04, 1.0, 1.04, 0.2, [1.02, 1, 0.97]), glow: 0.6 },
  dawn: { skyTop: "#6f7fcf", skyHor: "#ffb7a6", fog: "#dcb4bc", fogNear: 50, fogFar: 900, hemiSky: "#ccc6f4", hemiGround: "#977a86", hemiI: 1.9,
    sun: "#ffd2b0", sunI: 1.8, sunDir: [-0.75, 0.25, 0.4], card: "#ffe9e4", cardMin: 0.95, grade: G(0.03, 1.04, 1.0, 1.04, 0.22), glow: 0.6 },
  dusk: { skyTop: "#3b3f8f", skyHor: "#e98f7c", fog: "#a8809f", fogNear: 40, fogFar: 800, hemiSky: "#a7a2e6", hemiGround: "#76607a", hemiI: 1.8,
    sun: "#ff9f74", sunI: 1.5, sunDir: [0.8, 0.18, -0.3], card: "#f0d0d8", cardMin: 0.9, grade: G(0.03, 0.98, 1.0, 1.06, 0.28), glow: 0.8 },
  night: { skyTop: "#232a7a", skyHor: "#7d76d8", fog: "#877aea", fogNear: 40, fogFar: 700, hemiSky: "#a29ef2", hemiGround: "#5a4a8a", hemiI: 2.3,
    sun: "#c4bff5", sunI: 1.6, sunDir: [-0.3, 0.8, -0.5], card: "#d6d2f8", cardMin: 0.85, grade: G(0.04, 1.02, 1.05, 1.1, 0.28), glow: 1.0, moon: true, stars: true },
  lamp: { skyTop: "#1d2360", skyHor: "#4c4aa0", fog: "#4a4280", fogNear: 14, fogFar: 160, hemiSky: "#8e88d8", hemiGround: "#433563", hemiI: 1.6,
    sun: "#a7a2ea", sunI: 0.8, sunDir: [0.4, 0.7, 0.6], card: "#d8c0b4", cardMin: 0.8, grade: G(0.03, 0.96, 1.04, 1.05, 0.38, [1.03, 0.99, 0.96]), glow: 1.1 },
};
