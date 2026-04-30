import type { JSX } from "react";

import React from "react";

const Hero = (): JSX.Element => {
  return (
    <main className="flex h-dvh w-full flex-col items-center justify-center bg-black/50 bg-[url('/images/bg-hero.png')] bg-cover bg-center bg-no-repeat bg-blend-overlay">
      <h1 className="title-hero bg-linear-to-r from-sky-500 to-sky-700 bg-clip-text leading-15 text-transparent">
        Umineko: When They Cry
      </h1>
      <h2 className="title-sub from-gold-main bg-linear-to-r via-yellow-500 to-orange-500 bg-clip-text text-transparent">
        No naku koro ni
      </h2>
    </main>
  );
};

export default Hero;
