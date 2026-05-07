"use client";
import type { JSX } from "react";
import React, { useRef, useState } from "react";
import ToggleBgPhone from "../sections/ToggleBgPhone";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Burger = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}): JSX.Element => {
  const [animationIsDone, setAnimationIsDone] = useState<boolean>(false);

  const burgerRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      if (!burgerRef.current) return;

      gsap.from(".span-burger", {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.3,
        clearProps: "all",
        onComplete: () => setAnimationIsDone(true),
      });
    },
    { scope: burgerRef },
  );

  const toggleMenu = () => {
    onClick();
  };

  const transitionClasses = animationIsDone
    ? "transition-all duration-300"
    : "";

  return (
    <>
      <button
        ref={burgerRef}
        className={`relative z-50 flex size-8 items-center justify-center rounded-full transition-colors ${isOpen ? "bg-white/30 backdrop-blur-md" : ""} sm:hidden`}
        onClick={toggleMenu}
      >
        <span
          className={`span-burger ${transitionClasses} ${
            isOpen ? "w-6 rotate-45" : "-translate-y-1.5"
          }`}
        ></span>
        <span
          className={`span-burger ${transitionClasses} ${
            isOpen ? "w-6 -rotate-45" : "translate-y-1.5"
          }`}
        ></span>
      </button>

      <ToggleBgPhone isOpen={isOpen} />
    </>
  );
};

export default Burger;
