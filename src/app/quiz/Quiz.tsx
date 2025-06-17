"use client";

import { Content } from "@prismicio/client";
import { StartScreen } from "./StartScreen";
import { useState, useRef } from "react";
import gsap from "gsap";

type QuizProps = {
  quizData: Content.QuizDocument;
};

type QuizStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export const Quiz = ({ quizData }: QuizProps) => {
  const startScreenRef = useRef<HTMLDivElement>(null);
  const [quizStatus, setQuizStatus] = useState<QuizStatus>("NOT_STARTED");

  const start = () => {
    if (!startScreenRef.current) return;

    gsap.to(startScreenRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        setQuizStatus("IN_PROGRESS");
      },
    });
  };

  return (
    <div className="min-h-screen">
      {quizStatus === "NOT_STARTED" && (
        <div ref={startScreenRef}>
          <StartScreen quizData={quizData} onStart={start} />
        </div>
      )}
      <StartScreen quizData={quizData} onStart={() => {}} />
    </div>
  );
};
