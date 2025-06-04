"use client";

import { useEffect } from "react";

type Options = {
  isOpen: boolean;
};

export const useLockScroll = ({ isOpen }: Options) => {
  useEffect(() => {
    const fixedElements =
      document.querySelectorAll<HTMLElement>("[data-fixed]");
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const shouldCompensate = scrollbarWidth > 0;

    const applyScrollbarCompensation = () => {
      document.body.style.overflow = "hidden";
      if (shouldCompensate) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;

        fixedElements.forEach((el) => {
          el.style.right = `${scrollbarWidth}px`;
        });
      }
    };

    const resetScrollbarCompensation = () => {
      document.body.style.overflow = "auto";
      if (shouldCompensate) {
        document.body.style.paddingRight = "";

        fixedElements.forEach((el) => {
          el.style.right = "";
        });
      }
    };

    if (isOpen) {
      applyScrollbarCompensation();
    } else {
      resetScrollbarCompensation();
    }

    return () => {
      resetScrollbarCompensation();
    };
  }, [isOpen]);
};
