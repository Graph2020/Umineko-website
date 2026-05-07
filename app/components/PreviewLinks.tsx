"use client";
import type { JSX } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
gsap.registerPlugin(SplitText);

import React, { useRef, useState } from "react";
import { navigationLinks } from "../consts";
import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";

const PreviewLinks = (): JSX.Element => {
  const [mounted, setMounted] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(
    navigationLinks[0].imagePreview || null,
  );

  const pathname = usePathname();

  const imageRef = useRef<HTMLImageElement>(null);

  const xMove = useRef<gsap.QuickToFunc>(null);
  const yMove = useRef<gsap.QuickToFunc>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      const splitedLinkText = new SplitText(".link-animate", { type: "chars" });

      gsap.from(splitedLinkText.chars, {
        rotate: 360,
        y: 20,
        opacity: 0,
        stagger: {
          each: 0.05,
          from: "random",
        },
      });

      if (!imageRef.current) return;

      xMove.current = gsap.quickTo(imageRef.current, "x", {
        duration: 0.5,
        ease: "power3.out",
      });
      yMove.current = gsap.quickTo(imageRef.current, "y", {
        duration: 0.5,
        ease: "power3.out",
      });
    },
    { dependencies: [mounted] },
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!xMove.current || !yMove.current) return;

    // Center the image precisely to cursor (-150 to shift left/up half the image width/height)
    xMove.current(e.clientX - 150);
    yMove.current(e.clientY + 30);
  };

  const handleMouseEnter = (imagePreview: string) => {
    setActiveImage(imagePreview);

    gsap.to(imageRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <nav
      onMouseMove={handleMouseMove}
      className="center-content hidden gap-1.5 lg:flex"
    >
      {mounted &&
        createPortal(
          <div className="pointer-events-none fixed top-0 left-0 z-50">
            <Image
              ref={imageRef}
              src={activeImage || ""}
              alt="Preview"
              width={300}
              height={300}
              className="size-75 scale-0 transform-gpu object-cover object-center opacity-0"
            />
          </div>,
          document.body,
        )}

      {navigationLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          onMouseEnter={() => handleMouseEnter(link.imagePreview || "")}
          onMouseLeave={handleMouseLeave}
          className={`link-animate font-body relative transition-colors duration-300 ${pathname === link.href ? "active-link text-gold-main" : "text-white/90 hover:text-sky-300"}`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default PreviewLinks;
