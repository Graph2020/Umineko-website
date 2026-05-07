"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BlackCat } from "./models/BlackCat";

export const RotateBlackCat = () => {
  const catRef = useRef<THREE.Group>(null);

  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame((state, delta) => {
    if (!catRef.current) return;

    const targetY = (mouse.current.x * Math.PI) / 4;
    const targetX = -(mouse.current.y * Math.PI) / 4;

    catRef.current.rotation.y = THREE.MathUtils.lerp(
      catRef.current.rotation.y,
      targetY,
      delta * 5,
    );

    catRef.current.rotation.x = THREE.MathUtils.lerp(
      catRef.current.rotation.x,
      targetX,
      delta * 5,
    );
  });

  return (
    <group ref={catRef}>
      <BlackCat scale={0.25} />
    </group>
  );
};
