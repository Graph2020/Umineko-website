"use client";

import type { JSX } from "react";
import { PiButterfly } from "react-icons/pi";
import Burger from "../components/Burger";
import { navigationLinks } from "../consts";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { Center, Environment, Float, OrbitControls } from "@react-three/drei";
import { BlackCat } from "../components/models/BlackCat";

const NavBar = (): JSX.Element => {
  const navLinks = navigationLinks.map((link) => (
    <Link
      className="font-body text-white/90 hover:text-sky-300"
      href={link.href}
      key={link.id}
    >
      {link.name}
    </Link>
  ));

  return (
    <header className="center-content fixed top-2 left-1/2 z-20 h-12 w-[90%] max-w-6xl -translate-x-1/2 justify-between rounded-xl bg-white/15 p-4 shadow-lg backdrop-blur-md">
      <div className="center-content gap-1.5">
        <PiButterfly className="size-8 text-sky-500" />
        <span className="font-main text-lg font-medium text-white">
          Witches
        </span>
      </div>

      <Burger />

      <nav className="center-content hidden gap-1.5 sm:flex">{navLinks}</nav>

      <div className="center-content relative size-11 cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 0, 2], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[30, 30, 30]} />
          <React.Suspense fallback={null}>
            <Environment preset="city" />
            <Float
              speed={3}
              rotationIntensity={0.5}
              floatIntensity={0.5}
              floatingRange={[-0.1, 0.1]}
            >
              <Center>
                <BlackCat scale={0.25} />
              </Center>
            </Float>
          </React.Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </header>
  );
};

export default NavBar;
