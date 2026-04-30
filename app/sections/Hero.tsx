import type { JSX } from "react";

import React from "react";

const Hero = (): JSX.Element => {
  return (
    <main className="flex h-dvh w-full flex-col items-center justify-center bg-black/50 bg-[url('/images/bg-hero.png')] bg-cover bg-center bg-no-repeat bg-blend-overlay">
      <div className="center-content flex-col">
        <h1 className="title-hero bg-linear-to-r from-sky-300 to-sky-500 bg-clip-text leading-10.5 text-transparent min-[425px]:leading-12">
          Umineko: When They Cry
        </h1>
        <h2 className="title-sub from-gold-main bg-linear-to-r via-yellow-300 to-orange-300 bg-clip-text px-1 text-transparent italic">
          No naku koro ni
        </h2>
        <p className="paragraph [text-shadow:_0_4px_4px_rgba(0,0,0,0.5)]">
          Step onto the cursed island of Rokkenjima, where a wealthy
          family&apos;s reunion becomes a tale of mystery, tragedy, and the
          golden witch. Will you solve the riddles or fall prey to the endless
          loop?
        </p>
      </div>
    </main>
  );
};

export default Hero;
