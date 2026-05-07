"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

const ParagraphAnimation = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const paragraphRef = useRef<HTMLParagraphElement>(null);

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
      });

      return () => paragraph.revert();
    },
    { scope: paragraphRef },
  );

  return (
    <p ref={paragraphRef} className={className}>
      {children}
    </p>
  );
};

export default ParagraphAnimation;
