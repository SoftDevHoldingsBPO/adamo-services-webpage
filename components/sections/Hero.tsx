import React from "react";

import { cn } from "@/lib/utils";

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  cursorText?: string;
  bgColor?: string;
}

const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
  ({ children, bgColor = "bg-adamo-pay-700", cursorText, ...rest }, ref) => {
    return (
      <section
        ref={ref}
        aria-labelledby="hero-title"
        className="h-screen min-h-[780px] max-h-[960px] md:px-4 lg:px-6 md:mt-[88px] md:pb-6 lg:min-h-[820px] md:h-[calc(100vh-88px)]"
        {...rest}
      >
        <div
          data-inview
          data-cursor-text={cursorText}
          className={cn(
            "h-full px-4 md:rounded-4xl overflow-hidden relative pt-32 lg:pt-48",
            bgColor,
          )}
        >
          <div className="max-w-3xl mx-auto md:text-center text-white">
            {children}
          </div>
        </div>
      </section>
    );
  },
);
export default Hero;
