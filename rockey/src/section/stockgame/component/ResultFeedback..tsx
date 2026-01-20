import { CheckCircle2, XCircle } from "lucide-react";
import { Direction } from "../types/candle";

interface ResultFeedbackProps {
  isCorrect: boolean;
  correctDirection: Direction;
}

export const ResultFeedback = ({ isCorrect, correctDirection }: ResultFeedbackProps) => {
  return (
    <div className={`animate-scale-in flex items-center justify-center gap-3 p-4 rounded-lg ${
      isCorrect ? "bg-bullish/20 text-bullish" : "bg-bearish/20 text-bearish"
    }`}>
      {isCorrect ? (
        <>
          <CheckCircle2 className="w-6 h-6" />
          <span className="text-lg font-semibold">Correct!</span>
        </>
      ) : (
        <>
          <XCircle className="w-6 h-6" />
          <span className="text-lg font-semibold">
            Wrong! It went {correctDirection}
          </span>
        </>
      )}
    </div>
  );
};
