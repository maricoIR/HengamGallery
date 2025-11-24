import { useState, useEffect } from "react";

export const useRTL = () => {
  const [isRTL, setIsRTL] = useState(true);

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute("dir", "rtl");
    htmlElement.setAttribute("lang", "fa");

    return () => {
      htmlElement.removeAttribute("dir");
      htmlElement.removeAttribute("lang");
    };
  }, []);

  const toggleRTL = () => {
    setIsRTL(!isRTL);
    document.documentElement.setAttribute("dir", isRTL ? "ltr" : "rtl");
  };

  return {
    isRTL,
    toggleRTL,
    direction: isRTL ? "rtl" : "ltr",
  };
};
