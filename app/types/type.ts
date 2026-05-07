import type { IconType } from "react-icons";

type NavigationLinks = {
  name: string;
  href: string;
  id: string | number;
  imagePreview?: string;
  icon?: IconType;
};

export type { NavigationLinks };
