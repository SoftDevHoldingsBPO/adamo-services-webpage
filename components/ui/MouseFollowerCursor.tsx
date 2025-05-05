"use client";

import gsap from "gsap";
import MouseFollower from "mouse-follower";

import { useEffect } from "react";

const MouseFollowerCursor = () => {
  useEffect(() => {
    MouseFollower.registerGSAP(gsap);
    const cursor = new MouseFollower();
    return () => {
      cursor.destroy();
    };
  }, []);
  return null;
};

export default MouseFollowerCursor;
