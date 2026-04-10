import fs from "fs";

class NodeFileReader {
  constructor() {
    this.result = null;
    this.onloadend = null;
  }

  async readAsArrayBuffer(blob) {
    this.result = await blob.arrayBuffer();

    if (typeof this.onloadend === "function") {
      this.onloadend();
    }
  }
}

globalThis.FileReader = NodeFileReader;

const THREE = await import("three");
const { GLTFExporter } = await import("three/examples/jsm/exporters/GLTFExporter.js");

const scene = new THREE.Scene();
const group = new THREE.Group();

const bodyMaterial = new THREE.MeshStandardMaterial({
  color: "#1c1511",
  roughness: 0.92,
  metalness: 0.08,
});

const roofMaterial = new THREE.MeshStandardMaterial({
  color: "#281c18",
  roughness: 0.88,
  metalness: 0.05,
});

const frameMaterial = new THREE.MeshStandardMaterial({
  color: "#665437",
  roughness: 0.7,
  metalness: 0.2,
});

const fireMaterial = new THREE.MeshStandardMaterial({
  color: "#ff9240",
  emissive: "#ff9240",
  emissiveIntensity: 1.8,
  roughness: 0.3,
  metalness: 0.05,
});

const body = new THREE.Mesh(
  new THREE.CylinderGeometry(2.2, 2.55, 1.15, 32, 1, true),
  bodyMaterial,
);
body.position.y = 0.62;
group.add(body);

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(1.88, 1.48, 24, 1, true),
  roofMaterial,
);
roof.position.y = 1.46;
group.add(roof);

const crown = new THREE.Mesh(
  new THREE.TorusGeometry(0.44, 0.06, 12, 28),
  frameMaterial,
);
crown.rotation.x = Math.PI / 2;
crown.position.y = 1.92;
group.add(crown);

for (let i = 0; i < 10; i += 1) {
  const angle = (Math.PI * 2 * i) / 10;
  const rib = new THREE.Mesh(
    new THREE.CylinderGeometry(0.028, 0.028, 1.28, 8),
    frameMaterial,
  );

  rib.position.set(Math.cos(angle) * 0.36, 1.42, Math.sin(angle) * 0.36);
  rib.rotation.z = Math.PI / 2.8;
  rib.rotation.y = angle;
  group.add(rib);
}

const door = new THREE.Mesh(
  new THREE.BoxGeometry(0.78, 0.68, 0.12),
  frameMaterial,
);
door.position.set(0, 0.38, 2.02);
group.add(door);

const fire = new THREE.Mesh(
  new THREE.SphereGeometry(0.18, 18, 18),
  fireMaterial,
);
fire.position.set(0, 0.76, 0.72);
group.add(fire);

const baseRing = new THREE.Mesh(
  new THREE.TorusGeometry(3, 0.12, 12, 48),
  frameMaterial,
);
baseRing.rotation.x = Math.PI / 2;
baseRing.position.y = 0.03;
group.add(baseRing);

scene.add(group);

const exporter = new GLTFExporter();

const arrayBuffer = await new Promise((resolve, reject) => {
  exporter.parse(
    scene,
    resolve,
    (error) => reject(error),
    {
      binary: true,
      trs: false,
      onlyVisible: true,
    },
  );
});

fs.mkdirSync("public/models", { recursive: true });
fs.writeFileSync("public/models/sacred-structure.glb", Buffer.from(arrayBuffer));

console.log("Generated public/models/sacred-structure.glb");
