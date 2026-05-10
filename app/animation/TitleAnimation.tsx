"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const TitleAnimation = ({
  children,
  animateOnScroll = false,
  scrollStart = "top 85%",
}: {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  scrollStart?: string;
}) => {
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
        scrollTrigger: animateOnScroll
          ? {
              trigger: containerRef.current,
              start: scrollStart,
              toggleActions: "play none none none",
            }
          : undefined,
      });
      return () => title.revert();
    },
    { scope: containerRef, dependencies: [animateOnScroll, scrollStart] },
  );

  return <div ref={containerRef}>{children}</div>;
};

export default TitleAnimation;
