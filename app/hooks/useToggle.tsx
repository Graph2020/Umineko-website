import React from "react";

const useToggle = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return { isOpen, toggle };
};

export default useToggle;
