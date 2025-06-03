"use client";

import gsap from "gsap";
import MouseFollower from "mouse-follower";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

const MouseFollowerCursor = () => {
  const pathname = usePathname();
  const [cursor, setCursor] = useState<MouseFollower | null>(null);
  useEffect(() => {
    // Only enable on devices with a fine pointer (not touch)
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches
    ) {
      MouseFollower.registerGSAP(gsap);
      const cursor = new MouseFollower();
      setCursor(cursor);
      return () => {
        cursor.destroy();
      };
    }
    // No-op cleanup for mobile
    return undefined;
  }, []);

  useEffect(() => {
    if (cursor) {
      cursor.removeText();
    }
  }, [pathname]);
  return null;
};

export default MouseFollowerCursor;
