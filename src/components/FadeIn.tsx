"use client";
import { useRef } from "react";
import clsx from "clsx";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(useGSAP);

type FadeInProps = {
  children: React.ReactNode;
  start?: string;
  vars?: gsap.TweenVars;
  className?: string;
};

export const FadeIn = ({
  children,
  start = "top 80%",
  vars = {},
  className,
}: FadeInProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Create full tween
        gsap.to(containerRef.current, {
          duration: 5,
          opacity: 1,
          ease: "power3.out",
          y: 0,
          ...vars,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        // Create a shorter tween with reduced motion
        gsap.to(containerRef.current, {
          duration: 0.5,
          opacity: 1,
          ease: "none",
          y: 0,
          stagger: 0,
        });
      });
    },
    { scope: containerRef },
  );
  return (
    <div ref={containerRef} className={clsx("opacity-0", className)}>
      {children}
    </div>
  );
};
