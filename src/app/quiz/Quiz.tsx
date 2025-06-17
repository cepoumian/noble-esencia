"use client";

import { Content } from "@prismicio/client";
import { StartScreen } from "./StartScreen";

type QuizProps = {
  quizData: Content.QuizDocument;
};

export const Quiz = ({ quizData }: QuizProps) => {
  return (
    <div className="min-h-screen">
      <StartScreen quizData={quizData} onStart={() => {}} />
    </div>
  );
};
