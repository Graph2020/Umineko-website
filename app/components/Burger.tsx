import type { JSX } from "react";

import React from "react";

const Burger = (): JSX.Element => {
  return (
    <button className="flex flex-col gap-1.5 pt-0.5">
      <span className="span-burger"></span>
      <span className="span-burger"></span>
    </button>
  );
};

export default Burger;
