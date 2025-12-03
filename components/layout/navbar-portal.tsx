"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type NavbarPortalProps = {
  children: ReactNode;
};

export function NavbarPortal({ children }: NavbarPortalProps) {
  const [mounted, setMounted] = useState(false);

  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );

  useEffect(() => {
    setMounted(true);

    const container = document.querySelector(
      "[data-navbar-portal]",
    ) as HTMLElement;

    setPortalContainer(container);

    // Store original display values and hide all children
    const originalDisplays = new Map<HTMLElement, string>();

    if (container) {
      Array.from(container.children).forEach((child) => {
        const element = child as HTMLElement;

        originalDisplays.set(element, element.style.display);

        element.style.display = "none";
      });
    }

    // Cleanup: restore original display values when unmounting
    return () => {
      if (container) {
        Array.from(container.children).forEach((child) => {
          const element = child as HTMLElement;

          const originalDisplay = originalDisplays.get(element);

          element.style.display = originalDisplay || "";
        });
      }
    };
  }, []);

  if (!mounted || !portalContainer) {
    return null;
  }

  return createPortal(children, portalContainer);
}
