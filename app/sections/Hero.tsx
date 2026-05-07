"use client";
import Image from "next/image";
import type { JSX } from "react";

import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import ParagraphAnimation from "../animation/ParagraphAnimation";

gsap.registerPlugin(SplitText);

const Hero = (): JSX.Element => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const bgImage = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    const tl = gsap.timeline();

    const splitedTextTitle = new SplitText(titleRef.current, {
      type: "chars",
      charsClass:
        "bg-linear-to-r from-sky-300 to-sky-500 bg-clip-text text-transparent bg-fixed p-[0.1em] -m-[0.1em]",
    });

    const splitedTextSubtitle = new SplitText(subtitleRef.current, {
      type: "chars",
      charsClass:
        "bg-linear-to-r from-gold-main to-orange-300 bg-clip-text text-transparent bg-fixed p-[0.1em] -m-[0.1em]",
    });

    tl.from(splitedTextTitle.chars, {
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: {
        each: 0.05,
        from: "end",
      },
    }).from(
      splitedTextSubtitle.chars,
      {
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: {
          each: 0.05,
          from: "end",
        },
      },
      0.2,
    );

    return () => {
      splitedTextTitle.revert();
      splitedTextSubtitle.revert();
    };
  });
  return (
    <main className="relative flex h-dvh w-full flex-col items-center justify-center">
      <Image
        ref={bgImage}
        src="/images/bg-hero-bern.jpg"
        alt="Background"
        fill
        className="absolute inset-0 -z-20 object-cover object-center"
      />

      <div className="absolute inset-0 -z-10 bg-black/50" />

      <div className="center-content flex-col">
        <h1
          ref={titleRef}
          className="title-hero leading-10.5 min-[425px]:leading-12"
        >
          Umineko: When They Cry
        </h1>

        <h2 ref={subtitleRef} className="title-sub italic">
          No naku koro ni
        </h2>
        <ParagraphAnimation className="paragraph [text-shadow:_0_4px_4px_rgba(0,0,0,0.5)]">
          Step onto the cursed island of Rokkenjima, where a wealthy
          family&apos;s reunion becomes a tale of mystery, tragedy, and the
          golden witch. Will you solve the riddles or fall prey to the endless
          loop?
        </ParagraphAnimation>
      </div>
    </main>
  );
};

export default Hero;
