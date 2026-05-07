import { NavigationLinks } from "../types/type";

import { LuScroll } from "react-icons/lu";
import { PiPersonArmsSpread } from "react-icons/pi";
import { BsCupHot } from "react-icons/bs";
import { IoMusicalNotes } from "react-icons/io5";

export const navigationLinks: NavigationLinks[] = [
  {
    name: "The legend",
    href: "/",
    id: 1,
    imagePreview: "/images/bg-hero-bern.jpg",
    icon: LuScroll,
  },
  {
    name: "Characters",
    href: "/characters",
    id: 2,
    imagePreview: "/images/people.jpeg",
    icon: PiPersonArmsSpread,
  },
  {
    name: "Tea party",
    href: "/tea-party",
    id: 3,
    imagePreview: "/images/tea-party.jpeg",
    icon: BsCupHot,
  },
  {
    name: "Soundtrack",
    href: "/soundtrack",
    id: 4,
    imagePreview: "/images/soundtrack.jpeg",
    icon: IoMusicalNotes,
  },
];
