"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const TitleAnimation = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const title = new SplitText(containerRef.current, { type: "chars" });

      gsap.from(title.chars, {
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: {
          each: 0.05,
          from: "end",
        },
      });
      return () => title.revert();
    },
    { scope: containerRef },
  );

  return <div ref={containerRef}>{children}</div>;
};

export default TitleAnimation;
