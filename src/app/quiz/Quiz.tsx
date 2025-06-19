"use client";

import { asImageSrc, Content } from "@prismicio/client";
import { StartScreen } from "./StartScreen";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { Question } from "./Question";
import { Votes, Vote } from "./types";

type QuizProps = {
  quizData: Content.QuizDocument;
};

type QuizStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export const Quiz = ({ quizData }: QuizProps) => {
  const startScreenRef = useRef<HTMLDivElement>(null);
  const [quizStatus, setQuizStatus] = useState<QuizStatus>("NOT_STARTED");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [votes, setVotes] = useState<Votes>([]);

  const currentQuestion = quizData.data.questions[currentQuestionIndex];

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

  const addVote = (fragranceType: string) => {
    const newVote: Vote = {
      Terra: fragranceType === "Terra" ? 1 : 0,
      Ignis: fragranceType === "Ignis" ? 1 : 0,
      Aqua: fragranceType === "Aqua" ? 1 : 0,
    };

    setVotes((prevVotes) => {
      const newVotes = [...prevVotes];
      newVotes[currentQuestionIndex] = newVote;
      return newVotes;
    });

    // Check if complete
    if (currentQuestionIndex >= quizData.data.questions.length - 1) {
      setQuizStatus("COMPLETED");
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Function to go back to the previous question and remove the last vote
  const back = () => {
    if (currentQuestionIndex > 0) {
      setVotes((prevVotes) => {
        const newVotes = [...prevVotes];
        newVotes.pop(); // Remove the last vote
        return newVotes;
      });
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    } else {
      setQuizStatus("NOT_STARTED");
    }
  };

  // Preload all images
  useEffect(() => {
    quizData.data.questions.forEach((question) => {
      if (question.image_aqua?.url) {
        const img = new Image();
        img.src = asImageSrc(question.image_aqua, {
          fit: "max",
          w: 640,
        });
      }

      if (question.image_terra?.url) {
        const img = new Image();
        img.src = asImageSrc(question.image_terra, {
          fit: "max",
          w: 640,
        });
      }

      if (question.image_ignis?.url) {
        const img = new Image();
        img.src = asImageSrc(question.image_ignis, {
          fit: "max",
          w: 640,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => console.log("Votes:", votes), [votes]);
  useEffect(() => console.log("Quiz Status:", quizStatus), [quizStatus]);

  return (
    <div className="min-h-screen">
      {quizStatus === "NOT_STARTED" && (
        <div ref={startScreenRef}>
          <StartScreen quizData={quizData} onStart={start} />
        </div>
      )}
      {quizStatus === "IN_PROGRESS" && (
        <Question
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={quizData.data.questions.length}
          onAnswerSelected={addVote}
          onBack={back}
        />
      )}
    </div>
  );
};
