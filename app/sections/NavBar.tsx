"use client";

import type { JSX } from "react";
import { PiButterfly } from "react-icons/pi";
import Burger from "../components/Burger";
import { navigationLinks } from "../consts";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import React, { createContext, useRef, useState } from "react";
import { Center, Environment, Float } from "@react-three/drei";

import { usePathname } from "next/navigation";
import PreviewLinks from "../components/PreviewLinks";
import { RotateBlackCat } from "../components/RotateBlackCat";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const NavBar = (): JSX.Element => {
  const pathname = usePathname();

  const navRef = useRef<HTMLElement>(null);
  const divRefWithLinks = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);

  const handleMount = () => {
    setMounted((prev) => !prev);
  };

  const navLinks = navigationLinks.map((link) => (
    <Link
      className={`font-body relative transition-colors duration-300 ${pathname === link.href ? "active-link text-gold-main" : "text-white/90 hover:text-sky-300"}`}
      href={link.href}
      key={link.id}
    >
      {link.name}
    </Link>
  ));

  useGSAP(
    () => {
      if (!navRef.current) return;

      const tl = gsap.timeline();

      const splitedLinkText = new SplitText(divRefWithLinks.current, {
        type: "chars",
      });

      const titleSplit = new SplitText("span", {
        type: "chars",
      });

      tl.from(".logo", {
        opacity: 0,
        scale: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      }).from(titleSplit.chars, {
        opacity: 0,
        scale: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.05,
      });
    },
    { scope: navRef },
  );

  return (
    <nav
      ref={navRef}
      className="center-content fixed top-2 left-1/2 z-50 h-12 w-[90%] max-w-6xl -translate-x-1/2 justify-between rounded-xl bg-white/15 p-4 shadow-lg backdrop-blur-md"
    >
      <div className="center-content gap-1.5">
        <PiButterfly className="logo size-8 text-sky-500" />
        <span className="font-main text-lg font-medium text-white">
          Witches
        </span>
      </div>

      <Burger isOpen={mounted} onClick={handleMount} />

      <div
        ref={divRefWithLinks}
        className="center-content hidden gap-1.5 sm:flex lg:hidden"
      >
        {navLinks}
      </div>

      <PreviewLinks />

      <div className="center-content relative hidden size-11 cursor-grab active:cursor-grabbing sm:flex">
        <Canvas camera={{ position: [0, 0, 2], fov: 45 }}>
          <ambientLight intensity={0.5} />

          <React.Suspense fallback={null}>
            <Environment preset="city" />
            <Float
              speed={3}
              rotationIntensity={0.5}
              floatIntensity={0.5}
              floatingRange={[-0.1, 0.1]}
            >
              <Center>
                <RotateBlackCat />
              </Center>
            </Float>
          </React.Suspense>
        </Canvas>
      </div>
    </nav>
  );
};

export default NavBar;
