import type { JSX, ReactNode } from "react";

import React from "react";

const ButtonHero = ({
  text,
  icon,
  glow = false,
}: {
  text: string;
  icon?: ReactNode;
  glow?: boolean;
}): JSX.Element => {
  return (
    <button
      className={`font-body relative flex w-fit cursor-pointer items-center justify-center gap-2 rounded-xl bg-white/15 p-3 font-medium text-white backdrop-blur-md ${glow ? "btn-glow" : ""}`}
    >
      {text}
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default ButtonHero;
