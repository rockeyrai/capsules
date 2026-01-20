export interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
  timestamp: number;
}

export type PatternName =
  | "Doji"
  | "Hammer"
  | "Hanging Man"
  | "Bullish Engulfing"
  | "Bearish Engulfing"
  | "Morning Star"
  | "Evening Star"
  | "Shooting Star"
  | "Inverted Hammer"
  | "Three White Soldiers"
  | "Three Black Crows"
  | "Piercing Pattern"
  | "Dark Cloud Cover"
  | "Spinning Top"
  | "Marubozu";

export type Direction = "UP" | "DOWN";

export interface Pattern {
  name: PatternName;
  candles: Candle[];
  expectedDirection: Direction;
}
