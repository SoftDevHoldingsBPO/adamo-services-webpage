"use client";

import { useLenis } from "lenis/react";

import { useEffect } from "react";

type Options = {
  isOpen: boolean;
};

export const useLockScroll = ({ isOpen }: Options) => {
  const lenis = useLenis();

  useEffect(() => {
    const fixedElements =
      document.querySelectorAll<HTMLElement>("[data-fixed]");
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const shouldCompensate = scrollbarWidth > 0;

    const applyScrollbarCompensation = () => {
      if (shouldCompensate) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;

        fixedElements.forEach((el) => {
          el.style.right = `${scrollbarWidth}px`;
        });
      }
    };

    const resetScrollbarCompensation = () => {
      if (shouldCompensate) {
        document.body.style.paddingRight = "";

        fixedElements.forEach((el) => {
          el.style.right = "";
        });
      }
    };

    if (isOpen) {
      applyScrollbarCompensation();
      lenis?.stop();
    } else {
      resetScrollbarCompensation();
      lenis?.start();
    }

    return () => {
      resetScrollbarCompensation();
      lenis?.start();
    };
  }, [isOpen, lenis]);
};
