// Ink edge geometry: crease lines of a set's meshes (EdgesGeometry above a threshold angle), merged into one
// screen-space fat-line object, ~3 px at 1080 (scaled), near-black #0b0a0c, depth-tested with the world.
import * as THREE from "three";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";

export const INK_MATS: LineMaterial[] = [];
export const inkMaterial = (width = 3) => {
  const m = new LineMaterial({ color: 0x0b0a0c, linewidth: width * 1.2, worldUnits: false, depthTest: true, depthWrite: true });
  m.resolution.set(1920, 1080); INK_MATS.push(m);
  return m;
};
/** add crease ink to every mesh under `root` that has userData.ink !== false; angle in degrees */
export const inkEdges = (root: THREE.Object3D, angle = 32, width = 3) => {
  root.updateMatrixWorld(true);
  const pos: number[] = [];
  const v = new THREE.Vector3();
  root.traverse((o) => {
    const m = o as THREE.Mesh;
    if (!m.isMesh || m.userData.ink === false || (m as any).isInstancedMesh) return;
    const eg = new THREE.EdgesGeometry(m.geometry, m.userData.inkAngle ?? angle);
    const a = eg.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < a.count; i++) { v.fromBufferAttribute(a, i).applyMatrix4(m.matrixWorld); pos.push(v.x, v.y, v.z); }
    eg.dispose();
  });
  if (!pos.length) return null;
  const g = new LineSegmentsGeometry(); g.setPositions(pos);
  const L = new LineSegments2(g, inkMaterial(width)); L.computeLineDistances(); L.frustumCulled = false;
  L.userData.ink = false;
  root.add(L);
  return L;
};
export const setInkResolution = (W: number, H: number) => { for (const m of INK_MATS) { m.resolution.set(W, H); m.linewidth = 3 * (H / 1080); } };
