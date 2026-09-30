import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, ContactShadows } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function BurgerModel() {
  const groupRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.25;
    const targetX = pointer.current.y * 0.2;
    const targetZ = -pointer.current.x * 0.2;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.z += (targetZ - groupRef.current.rotation.z) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* bottom bun */}
      <mesh position={[0, -1.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.05, 0.95, 0.45, 48]} />
        <meshStandardMaterial color="#d9a15c" roughness={0.7} />
      </mesh>
      {/* patty */}
      <mesh position={[0, -0.75, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1, 1, 0.3, 48]} />
        <meshStandardMaterial color="#4a2e1a" roughness={0.9} />
      </mesh>
      {/* cheese */}
      <mesh position={[0, -0.53, 0]} rotation={[0, Math.PI / 8, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.15, 0.06, 2.15]} />
        <meshStandardMaterial color="#f4b400" roughness={0.4} />
      </mesh>
      {/* tomato */}
      <mesh position={[0, -0.32, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.02, 1.02, 0.14, 48]} />
        <meshStandardMaterial color="#c0392b" roughness={0.5} />
      </mesh>
      {/* lettuce */}
      <mesh position={[0, -0.13, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.18, 1.18, 0.14, 16]} />
        <meshStandardMaterial color="#7cb342" roughness={0.8} />
      </mesh>
      {/* top bun */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1.08, 48, 32, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
        <meshStandardMaterial color="#e0a85f" roughness={0.65} />
      </mesh>
    </group>
  );
}

function FloatingChip({ position, color, geometry = "icosahedron", scale = 0.35 }) {
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh position={position} scale={scale} castShadow>
        {geometry === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
        {geometry === "octahedron" && <octahedronGeometry args={[1, 0]} />}
        {geometry === "torus" && <torusGeometry args={[0.7, 0.28, 16, 32]} />}
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
      </mesh>
    </Float>
  );
}

function FloatingCard({ position, rotation }) {
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.6}>
      <RoundedBox
        args={[1.1, 1.4, 0.08]}
        radius={0.12}
        smoothness={4}
        position={position}
        rotation={rotation}
        castShadow
      >
        <meshStandardMaterial
          color="#2a1810"
          roughness={0.35}
          metalness={0.2}
          emissive="#ff7a30"
          emissiveIntensity={0.12}
        />
      </RoundedBox>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight
        position={[4, 6, 3]}
        intensity={1.6}
        color="#ffcf8a"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-3, 2, 4]} intensity={0.6} color="#ffe8c4" />
      <pointLight position={[-4, -2, -3]} intensity={0.8} color="#ff7a30" />

      <group position={[0, 0.2, 0]}>
        <BurgerModel />
        <FloatingCard position={[-2.6, 1.1, -0.6]} rotation={[0.1, 0.4, -0.1]} />
        <FloatingCard position={[2.7, -0.8, -0.4]} rotation={[-0.1, -0.5, 0.15]} />
        <FloatingChip position={[2.4, 1.4, 0.6]} color="#f4b400" geometry="icosahedron" scale={0.32} />
        <FloatingChip position={[-2.5, -1.3, 0.4]} color="#c0392b" geometry="octahedron" scale={0.3} />
        <FloatingChip position={[1.7, -1.7, 0.9]} color="#7cb342" geometry="torus" scale={0.28} />
      </group>

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.55}
        scale={10}
        blur={2.2}
        far={2}
        color="#000000"
      />
    </>
  );
}

function ThreeShowcase() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const canvasWrapRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => setVisible(true),
      });

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        canvasWrapRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-24 md:py-32 px-4 md:px-6 lg:px-20 overflow-hidden"
    >
      <div ref={headingRef} className="max-w-6xl mx-auto text-center mb-8">
        <p className="text-amber-500 text-xs uppercase tracking-[0.3em] mb-4">
          Rendered In Real Time
        </p>
        <h2 className="brand-font text-3xl md:text-5xl font-bold text-white mb-6">
          Every Layer, In 3D
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Move your cursor to tilt the build. This isn't a video — it's a
          live scene, rendered right in your browser.
        </p>
      </div>

      <div
        ref={canvasWrapRef}
        className="max-w-4xl mx-auto h-[420px] md:h-[560px]"
      >
        {visible && (
          <Canvas
            shadows
            dpr={[1, 1.5]}
            camera={{ position: [0, 0.6, 5.5], fov: 40 }}
          >
            <Scene />
          </Canvas>
        )}
      </div>
    </section>
  );
}

export default ThreeShowcase;
