"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const ParagraphAnimation = ({
  children,
  className,
  animateOnScroll = false,
  scrollStart = "top 85%",
  enableTwilightCycle = false,
}: {
  children: React.ReactNode;
  className?: string;
  animateOnScroll?: boolean;
  scrollStart?: string;
  enableTwilightCycle?: boolean;
}) => {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const [revealed, setRevealed] = useState(!animateOnScroll);

  useGSAP(
    () => {
      if (!paragraphRef.current) return;
      const paragraph = new SplitText(paragraphRef.current, { type: "lines" });

      gsap.from(paragraph.lines, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: animateOnScroll
          ? {
              trigger: paragraphRef.current,
              start: scrollStart,
              toggleActions: "play none none none",
              onEnter: () => setRevealed(true),
            }
          : undefined,
      });

      return () => paragraph.revert();
    },
    { scope: paragraphRef, dependencies: [animateOnScroll, scrollStart] },
  );

  useEffect(() => {
    if (!enableTwilightCycle || !revealed || !paragraphRef.current) return;

    const spans = paragraphRef.current.querySelectorAll(".text-gold-main");
    if (!spans.length) return;

    let current = 0;

    const applyGlow = (el: Element) => {
      gsap.to(el, {
        fontStyle: "italic",
        textShadow: "0 0 8px #f5c842, 0 0 20px #f5c84299, 0 0 40px #f5c84255",
        color: "#f5c842",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const removeGlow = (el: Element) => {
      gsap.to(el, {
        fontStyle: "normal",
        textShadow: "none",
        color: "",
        duration: 0.4,
        ease: "power2.in",
      });
    };

    applyGlow(spans[0]);

    const interval = setInterval(() => {
      removeGlow(spans[current]);
      current = (current + 1) % spans.length;
      applyGlow(spans[current]);
    }, 2000);

    return () => {
      clearInterval(interval);
      spans.forEach(removeGlow);
    };
  }, [enableTwilightCycle, revealed]);

  return (
    <p ref={paragraphRef} className={className}>
      {children}
    </p>
  );
};

export default ParagraphAnimation;
