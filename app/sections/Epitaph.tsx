"use client";
import React from "react";
import ParagraphAnimation from "../animation/ParagraphAnimation";
import TitleAnimation from "../animation/TitleAnimation";

import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import gsap from "gsap/src/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Epitaph = () => {
  const largeDevice = useMediaQuery({ query: "(min-width: 768px)" });
  const imageRef = React.useRef<HTMLImageElement>(null);

  useGSAP(() => {
    gsap.from(imageRef.current, {
      opacity: 0,
      scale: 0,
      duration: 1,
      ease: "power3.out",

      scrollTrigger: {
        trigger: imageRef.current,
        start: largeDevice ? "top 90%" : "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <section className="page-container font-body flex flex-col justify-center gap-8 overflow-x-hidden bg-[url('/images/epitaph/bg-epitaph.png')] bg-cover bg-center text-white [text-shadow:0_4px_4px_rgba(0,0,0,0.5)]">
      <div className="center-content flex flex-col gap-1.5 text-center">
        <TitleAnimation
          animateOnScroll
          scrollStart={largeDevice ? "top 90%" : "top 85%"}
        >
          <h1 className="title-hero whitespace-nowrap">Solve the epitaph!</h1>
        </TitleAnimation>
        <ParagraphAnimation
          scrollStart={largeDevice ? "top 90%" : "top 85%"}
          animateOnScroll
          className="w-full text-center text-base leading-7 lg:text-lg lg:leading-9"
        >
          If you solve the Epitaph, you halt the ritual murders, claim the 10
          tons of hidden gold, and are officially recognized as the successor to
          the Ushiromiya headship, effectively &quot;killing&quot; the Witch by
          exposing her mystery. However, if the riddle remains unsolved by the
          end of the conference, the &quot;ritual&quot; is completed through a
          series of grizzly sacrifices, culminating in the{" "}
          <span className="text-gold-main">Tenth Twilight</span> where a hidden
          explosive device typically detonates, wiping out everyone on the
          island and ensuring that the truth of Rokkenjima is lost to
          &quot;magic&quot; and legend forever.
        </ParagraphAnimation>
      </div>

      <div className="mx-auto min-h-96 w-full gap-4 md:grid md:grid-cols-2 xl:w-3/4 xl:gap-0">
        <div className="flex justify-center">
          <Image
            ref={imageRef}
            alt="Portrait"
            className=""
            src="/images/epitaph/portrait.jpg"
            width={384}
            height={384}
          />
        </div>
        <div className="flex h-full min-w-0 items-center">
          <ParagraphAnimation
            animateOnScroll
            enableTwilightCycle
            scrollStart={largeDevice ? "top 90%" : "top 85%"}
            className="text-center text-sm leading-8 lg:text-lg lg:leading-9"
          >
            At the <span className="text-gold-main">first twilight</span>,
            sacrifice the six chosen by the key. At the{" "}
            <span className="text-gold-main">second twilight</span>, those who
            remain shall tear apart the two who are close. At the{" "}
            <span className="text-gold-main">third twilight</span>, those who
            remain shall praise my honorable name at high spirits. At the{" "}
            <span className="text-gold-main">fourth twilight</span>, gouge the
            head and kill. At the{" "}
            <span className="text-gold-main">fifth twilight</span>, gouge the
            chest and kill. At the{" "}
            <span className="text-gold-main">sixth twilight</span>, gouge the
            stomach and kill. At the{" "}
            <span className="text-gold-main">seventh twilight</span>, gouge the
            knee and kill. At the{" "}
            <span className="text-gold-main">eighth twilight</span>, gouge the
            leg and kill. At the{" "}
            <span className="text-gold-main">ninth twilight</span>, the Witch
            shall revive, and none shall be left alive. At the{" "}
            <span className="text-gold-main">tenth twilight</span>, the journey
            shall end, and you shall reach the capital where the gold resides.
          </ParagraphAnimation>
        </div>
      </div>
    </section>
  );
};

export default Epitaph;
