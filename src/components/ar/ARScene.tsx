import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Line, Html } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { RouteStep } from "@/data/destinations";

/**
 * Corrected ARScene.tsx
 * Premium neon AR overlay for campus navigation.
 *
 * Features:
 * - Floating animated arrows
 * - Distance label
 * - Landmark label
 * - Glowing floor route line
 * - Animated checkpoints
 * - Arrival beacon
 * - Better mobile rendering
 */

type Props = {
  steps: RouteStep[];
  stepIndex: number;
};

/* -------------------------------- */
/* Neon Direction Arrow */
/* -------------------------------- */

const NeonArrow = ({
  direction,
}: {
  direction: RouteStep["direction"];
}) => {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.position.y =
      -0.35 + Math.sin(state.clock.elapsedTime * 2) * 0.08;
  });

  const yaw =
    direction === "left"
      ? Math.PI / 2
      : direction === "right"
      ? -Math.PI / 2
      : direction === "down"
      ? Math.PI
      : 0;

  return (
    <group ref={ref} rotation={[0, yaw, 0]}>
      {/* Shaft */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.45, 0.14, 1.1]} />
        <meshStandardMaterial
          color="#22f7e3"
          emissive="#22f7e3"
          emissiveIntensity={2.5}
          toneMapped={false}
        />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0, 0.8]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.38, 0.7, 6]} />
        <meshStandardMaterial
          color="#b15bff"
          emissive="#b15bff"
          emissiveIntensity={2.4}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};

/* -------------------------------- */
/* Floor Path */
/* -------------------------------- */

const FloorPath = () => {
  const points = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => {
        return new THREE.Vector3(0, -1.2, -1 - i * 0.45);
      }),
    []
  );

  return (
    <Line
      points={points}
      color="#22f7e3"
      lineWidth={3}
      dashed
      dashSize={0.3}
      gapSize={0.15}
      transparent
      opacity={0.9}
    />
  );
};

/* -------------------------------- */
/* Checkpoint Rings */
/* -------------------------------- */

const Checkpoint = ({ z }: { z: number }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;

    const pulse =
      0.8 + Math.sin(state.clock.elapsedTime * 3 + z) * 0.2;

    ref.current.scale.set(pulse, pulse, pulse);
  });

  return (
    <mesh
      ref={ref}
      position={[0, -1.19, z]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <ringGeometry args={[0.3, 0.42, 32]} />
      <meshBasicMaterial
        color="#22f7e3"
        transparent
        opacity={0.9}
        toneMapped={false}
      />
    </mesh>
  );
};

/* -------------------------------- */
/* Arrival Beacon */
/* -------------------------------- */

const Beacon = ({
  label,
}: {
  label?: string;
}) => {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime;
  });

  return (
    <group ref={ref} position={[0, 0, -2]}>
      <Float speed={2} floatIntensity={1.4}>
        <mesh>
          <icosahedronGeometry args={[0.65, 0]} />
          <meshStandardMaterial
            color="#ff3df0"
            emissive="#ff3df0"
            emissiveIntensity={3}
            wireframe
            toneMapped={false}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[0.25, 24, 24]} />
          <meshStandardMaterial
            color="#22f7e3"
            emissive="#22f7e3"
            emissiveIntensity={4}
            toneMapped={false}
          />
        </mesh>

        <Text
          position={[0, 1.2, 0]}
          fontSize={0.22}
          color="#22f7e3"
          anchorX="center"
        >
          {label || "Destination"}
        </Text>
      </Float>
    </group>
  );
};

/* -------------------------------- */
/* Main Scene */
/* -------------------------------- */

const ARScene = ({
  steps,
  stepIndex,
}: Props) => {
  const step =
    steps[Math.min(stepIndex, steps.length - 1)];

  const isArrival =
    step?.direction === "arrive";

  return (
    <Canvas
      gl={{
        alpha: true,
        antialias: true,
      }}
      camera={{
        fov: 70,
        position: [0, 0, 0],
      }}
      style={{
        background: "transparent",
        position: "absolute",
        inset: 0,
      }}
    >
      {/* Lights */}
      <ambientLight intensity={1} />

      <pointLight
        position={[2, 3, 2]}
        intensity={2}
        color="#22f7e3"
      />

      <pointLight
        position={[-2, 3, -2]}
        intensity={1.5}
        color="#b15bff"
      />

      {/* Route Mode */}
      {!isArrival && (
        <>
          <FloorPath />

          {[-2, -3.5, -5, -6.5].map((z) => (
            <Checkpoint key={z} z={z} />
          ))}

          {/* Arrow */}
          <group position={[0, 0, -2.2]}>
            <NeonArrow
              direction={step.direction}
            />
          </group>

          {/* Distance */}
          {step.distance > 0 && (
            <Text
              position={[0, 0.8, -2.2]}
              fontSize={0.28}
              color="#22f7e3"
              outlineColor="#000"
              outlineWidth={0.015}
              anchorX="center"
            >
              {step.distance} m
            </Text>
          )}

          {/* Landmark */}
          {step.landmark && (
            <Text
              position={[0, 1.25, -2.2]}
              fontSize={0.2}
              color="#ffffff"
              anchorX="center"
            >
              {step.landmark}
            </Text>
          )}
        </>
      )}

      {/* Arrival */}
      {isArrival && (
        <Beacon
          label={step.landmark}
        />
      )}

      {/* Optional HUD */}
      <Html position={[0, -1.5, -2]}>
        <div
          style={{
            color: "white",
            fontSize: "12px",
            padding: "4px 8px",
            borderRadius: "8px",
            background:
              "rgba(0,0,0,0.4)",
            whiteSpace: "nowrap",
          }}
        >
          {step.instruction}
        </div>
      </Html>
    </Canvas>
  );
};

export default ARScene;