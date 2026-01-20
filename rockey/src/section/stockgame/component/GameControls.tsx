import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, SkipForward } from "lucide-react";
import { Direction } from "@/types/candle";

interface GameControlsProps {
  onPredict: (direction: Direction) => void;
  onSkip: () => void;
  canSkip: boolean;
  disabled: boolean;
}

export const GameControls = ({ onPredict, onSkip, canSkip, disabled }: GameControlsProps) => {
  return (
    <div className="flex gap-4 justify-center items-center">
      <Button
        onClick={() => onPredict("UP")}
        disabled={disabled}
        size="lg"
        className="bg-bullish hover:bg-bullish/90 text-white px-8 py-6 text-lg flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50"
      >
        <ArrowUp className="w-5 h-5" />
        Predict UP
      </Button>

      <Button
        onClick={onSkip}
        disabled={!canSkip || disabled}
        variant="outline"
        size="lg"
        className="px-6 py-6 hover:scale-105 transition-transform disabled:opacity-50"
        title={!canSkip ? "Skip already used" : "Skip this pattern"}
      >
        <SkipForward className="w-5 h-5" />
      </Button>

      <Button
        onClick={() => onPredict("DOWN")}
        disabled={disabled}
        size="lg"
        className="bg-bearish hover:bg-bearish/90 text-white px-8 py-6 text-lg flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50"
      >
        <ArrowDown className="w-5 h-5" />
        Predict DOWN
      </Button>
    </div>
  );
};
