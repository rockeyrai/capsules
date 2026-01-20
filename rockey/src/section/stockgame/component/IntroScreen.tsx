import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen = ({ onStart }: IntroScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-600 animate-fade-in">
      <div className="text-center space-y-6 max-w-2xl px-6">
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-primary/10 rounded-full">
            <TrendingUp className="w-16 h-16 text-primary" />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Candlestick Prediction Game
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Predict whether the next pattern will move up or down. Watch live candles form just like a real stock chart.
        </p>

        <div className="pt-8">
          <Button
            onClick={onStart}
            size="lg"
            className="text-lg px-8 py-6 hover:scale-105 transition-transform"
          >
            Start Game
          </Button>
        </div>

        <div className="pt-8 grid grid-cols-3 gap-4 text-sm text-muted-foreground">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">15+</div>
            <div>Patterns</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">Real-time</div>
            <div>Animation</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">Learn</div>
            <div>Trading</div>
          </div>
        </div>
      </div>
    </div>
  );
};
