import { Card } from "@/components/ui/card";
import { Trophy, Flame } from "lucide-react";

interface GameStatsProps {
  score: number;
  streak: number;
}

export const GameStats = ({ score, streak }: GameStatsProps) => {
  return (
    <div className="flex gap-4 justify-center">
      <Card className="px-6 py-4 bg-card border-border">
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-primary" />
          <div>
            <div className="text-sm text-muted-foreground">Score</div>
            <div className="text-2xl font-bold">{score}</div>
          </div>
        </div>
      </Card>

      <Card className="px-6 py-4 bg-card border-border">
        <div className="flex items-center gap-3">
          <Flame className="w-6 h-6 text-bearish" />
          <div>
            <div className="text-sm text-muted-foreground">Streak</div>
            <div className="text-2xl font-bold">{streak}</div>
          </div>
        </div>
      </Card>
    </div>
  );
};
