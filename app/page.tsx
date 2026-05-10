import React from "react";
import Hero from "./sections/Hero";
import useToggle from "./hooks/useToggle";
import ToggleBgPhone from "./sections/ToggleBgPhone";
import Epitaph from "./sections/Epitaph";

const Home = () => {
  return (
    <main className="">
      <Hero />
      <Epitaph />
    </main>
  );
};

export default Home;
