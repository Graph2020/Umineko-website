"use client";
import type { JSX } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { navigationLinks } from "../consts";
import Link from "next/link";
import { usePathname } from "next/navigation";

import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

import { GiButterfly } from "react-icons/gi";
import { GiMagicBroom } from "react-icons/gi";

gsap.registerPlugin(SplitText);

const ToggleBgPhone = ({ isOpen }: { isOpen: boolean }): JSX.Element | null => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const navMenuRef = useRef<HTMLDivElement>(null);
  const butterflyRef = useRef<HTMLSpanElement>(null);
  const broomRef = useRef<HTMLSpanElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const displayLinks = navigationLinks.map((link) => (
    <Link
      className={`font-body text-lg transition-colors ${pathname === link.href ? "text-gold-main drop-shadow-gold-main drop-shadow-2xl" : "text-white/50 hover:text-white"}`}
      href={link.href}
      key={link.id}
    >
      <span className="center-content">
        {link.icon && <link.icon className="toggle-logo mr-1 inline-block" />}{" "}
        <span className="toggle-link">{link.name}</span>{" "}
        {link.icon && <link.icon className="toggle-logo ml-1 inline-block" />}
      </span>
    </Link>
  ));

  useGSAP(
    () => {
      if (!mounted) return;

      gsap.to(".edge-beam", {
        opacity: 0.3,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const linksSplited = new SplitText(".toggle-link", { type: "words" });

      tl.current = gsap.timeline({ paused: true });

      tl.current
        .fromTo(
          navMenuRef.current,
          {
            y: "-120%",
          },
          {
            y: "0%",
            duration: 0.8,
            ease: "power4.out",
          },
        )
        .from(
          linksSplited.words,
          {
            opacity: 0,
            scale: 0,
            stagger: {
              each: 0.1,
              from: "random",
            },
            ease: "power4.inOut",
          },
          "<0.2",
        )
        .from(
          ".toggle-logo",
          {
            opacity: 0,
            scale: 0,

            ease: "back.out(1.7)",
            stagger: 0.1,
          },
          "<",
        )
        .from(
          [butterflyRef.current, broomRef.current],
          {
            opacity: 0,
            scale: 0,
            ease: "back.out(1.7)",
            stagger: 0.2,
          },
          "<",
        );
    },
    { dependencies: [mounted] },
  );

  useGSAP(() => {
    if (!tl.current) return;
    if (isOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isOpen, mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={navMenuRef}
      style={{ transform: "translateY(-120%)" }}
      className="center-content fixed inset-0 z-40 h-dvh w-dvw flex-col gap-1.5 bg-black outline-4 sm:hidden"
    >
      <div
        className="edge-beam pointer-events-none absolute top-0 bottom-0 left-0 z-50 w-1.5"
        style={{
          background:
            "linear-gradient(to right, var(--color-gold-main), transparent)",
        }}
      />

      <div
        className="edge-beam pointer-events-none absolute top-0 right-0 bottom-0 z-50 w-1.5"
        style={{
          background:
            "linear-gradient(to left, var(--color-blue-main), transparent)",
        }}
      />

      {displayLinks}

      <span ref={butterflyRef} className="absolute top-1/6 left-1/6">
        <GiButterfly className="text-gold-main size-12 animate-pulse text-2xl" />
      </span>
      <span ref={broomRef} className="absolute right-1/6 bottom-1/6">
        <GiMagicBroom className="text-blue-main size-12 animate-pulse text-2xl delay-75" />
      </span>
    </div>,
    document.body,
  );
};

export default ToggleBgPhone;
