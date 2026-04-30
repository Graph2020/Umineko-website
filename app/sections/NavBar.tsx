import type { JSX } from "react";

import React from "react";
import { PiButterfly } from "react-icons/pi";
import Burger from "../components/Burger";
const NavBar = (): JSX.Element => {
  return (
    <header className="center-content fixed top-2 left-1/2 z-20 h-12 w-[90%] max-w-6xl -translate-x-1/2 justify-between rounded-xl bg-white/15 p-4 shadow-lg backdrop-blur-md">
      <div className="center-content gap-1.5">
        <PiButterfly className="size-8 text-sky-500" />
        <span className="text-lg text-white">Witches</span>
      </div>
      <Burger />
    </header>
  );
};

export default NavBar;
