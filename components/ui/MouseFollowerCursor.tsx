"use client";

import gsap from "gsap";
import MouseFollower from "mouse-follower";

import { useEffect } from "react";

const MouseFollowerCursor = () => {
  useEffect(() => {
    // Only enable on devices with a fine pointer (not touch)
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches
    ) {
      MouseFollower.registerGSAP(gsap);
      const cursor = new MouseFollower();
      return () => {
        cursor.destroy();
      };
    }
    // No-op cleanup for mobile
    return undefined;
  }, []);
  return null;
};

export default MouseFollowerCursor;
