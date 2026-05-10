"use client";
import type { JSX, ReactNode } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
const ButtonHero = ({
  text,
  icon,
  glow = false,
}: {
  text: string;
  icon?: ReactNode;
  glow?: boolean;
}): JSX.Element => {
  const btnRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    if (!btnRef.current) return;

    gsap.from(btnRef.current, {
      scale: 0,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out(1.7)",
    });
  });
  return (
    <button
      ref={btnRef}
      className={`font-body relative flex w-fit cursor-pointer items-center justify-center gap-2 rounded-xl bg-white/15 p-3 font-medium text-white backdrop-blur-md ${glow ? "btn-glow" : ""}`}
    >
      {text}
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default ButtonHero;
