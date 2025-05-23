"use client";

import { useRef } from "react";
import { asText, RichTextField } from "@prismicio/client";
import clsx from "clsx";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

gsap.registerPlugin(useGSAP);

type RevealTextProps = {
  field: RichTextField;
  id: string;
  className?: string;
  staggerAmmount?: number;
  as?: React.ElementType;
  duration?: number;
  align?: "start" | "center" | "end";
};

export const RevealText = ({
  id,
  field,
  className,
  duration = 0.8,
  align = "start",
  staggerAmmount = 0.1,
  as: Component = "div",
}: RevealTextProps) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const words = asText(field).split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Create full tween
        gsap.to(".reveal-text-word", {
          y: 0,
          stagger: staggerAmmount,
          duration,
          ease: "power3.out",
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        // Create a shorter tween with reduced motion
        gsap.to(".reveal-text-word", {
          duration: 0.5,
          opacity: 1,
          ease: "none",
          y: 0,
          stagger: 0,
        });
      });
    },
    { scope: componentRef },
  );

  return (
    <Component
      ref={componentRef}
      className={clsx(
        "reveal-text text-balance",
        align === "center" && "text-center",
        align === "end" && "text-right",
        align === "start" && "text-left",
        className,
      )}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}-${id}`}
          className="mb-0 inline-block overflow-hidden pb-4"
        >
          <span className="reveal-text-word mt-0 inline-block translate-y-[120%] will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
};
