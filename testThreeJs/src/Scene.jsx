import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default function ThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    // 1. 基本場景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#F0F0F0')
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // 2. 加物件
    // Box
    const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshLambertMaterial({
    //   color: 0x00ff00,        // 綠色
    //   emissive: 0x004400,     // 暗綠光
    //   emissiveIntensity: 0.8
    // }); // 綠色
    const material = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      emissive: 0x004400,
      shininess: 80,          // 高光強度
      specular: 0xffffff      // 高光顏色
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 0.5;

    // Dodecahedron
    const geometry2 = new THREE.DodecahedronGeometry();
    // const material2 = new THREE.MeshLambertMaterial({
    //   color: 0xff0000,
    //   emissive: 0x220000,
    //   flatShading: true
    // }); // 紅色
    const material2 = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      emissive: 0x220000,
      shininess: 80,          // 高光強度
      specular: 0xffffff      // 高光顏色
    });
    const mesh2 = new THREE.Mesh(geometry2, material2);
    mesh2.position.y = -1.5;

    scene.add(mesh);
    scene.add(mesh2)

    // 4. Light
    // const ambient = new THREE.AmbientLight(0xffffff, 0.3); // 柔和環境光
    // scene.add(ambient);

    const point = new THREE.PointLight(0xffffff, 10);
    point.position.set(2, 2, 2);
    scene.add(point);


    // 5. Render
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);
    renderer.setPixelRatio(window.devicePixelRatio);

    //6. Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = true;

    // 3. 動畫
    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;

      mesh2.rotation.x += 0.005;
      mesh2.rotation.y += 0.005;

      controls.update();

      renderer.render(scene, camera);
    };
    animate();

    // 清理：避免重複掛多個 canvas
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };

  }, []);

  // 這裡就不 return null，而是回傳一個 div
  return <div ref={mountRef} style={{ width: "90vw", height: "90vh" }} />;
}
