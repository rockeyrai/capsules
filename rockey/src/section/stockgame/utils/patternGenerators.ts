import { Candle, Pattern, PatternName, Direction } from "../types/candle"

const getRandomPrice = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const generateBaseCandles = (count: number, basePrice: number): Candle[] => {
  const candles: Candle[] = [];
  let currentPrice = basePrice;

  for (let i = 0; i < count; i++) {
    const open = currentPrice;
    const volatility = basePrice * 0.02;
    const close = open + getRandomPrice(-volatility, volatility);
    const high = Math.max(open, close) + Math.abs(getRandomPrice(0, volatility * 0.5));
    const low = Math.min(open, close) - Math.abs(getRandomPrice(0, volatility * 0.5));

    candles.push({
      open,
      high,
      low,
      close,
      timestamp: Date.now() + i * 1000,
    });

    currentPrice = close;
  }

  return candles;
};

export const generateDoji = (basePrice: number): Pattern => {
  const candles = generateBaseCandles(3, basePrice);
  const lastCandle = candles[candles.length - 1];
  const open = lastCandle.close;
  const close = open + getRandomPrice(-0.5, 0.5);
  const bodySize = Math.abs(close - open);
  const wickSize = basePrice * 0.015;

  candles.push({
    open,
    close,
    high: Math.max(open, close) + wickSize,
    low: Math.min(open, close) - wickSize,
    timestamp: Date.now() + candles.length * 1000,
  });

  return {
    name: "Doji",
    candles,
    expectedDirection: Math.random() > 0.5 ? "UP" : "DOWN",
  };
};

export const generateHammer = (basePrice: number): Pattern => {
  const candles = generateBaseCandles(3, basePrice);
  const lastCandle = candles[candles.length - 1];
  const open = lastCandle.close;
  const bodySize = basePrice * 0.008;
  const close = open + bodySize;
  const lowerWick = basePrice * 0.025;

  candles.push({
    open,
    close,
    high: Math.max(open, close) + bodySize * 0.2,
    low: Math.min(open, close) - lowerWick,
    timestamp: Date.now() + candles.length * 1000,
  });

  return {
    name: "Hammer",
    candles,
    expectedDirection: "UP",
  };
};

export const generateHangingMan = (basePrice: number): Pattern => {
  const candles = generateBaseCandles(3, basePrice);
  const lastCandle = candles[candles.length - 1];
  const open = lastCandle.close;
  const bodySize = basePrice * 0.008;
  const close = open - bodySize;
  const lowerWick = basePrice * 0.025;

  candles.push({
    open,
    close,
    high: Math.max(open, close) + bodySize * 0.2,
    low: Math.min(open, close) - lowerWick,
    timestamp: Date.now() + candles.length * 1000,
  });

  return {
    name: "Hanging Man",
    candles,
    expectedDirection: "DOWN",
  };
};

export const generateBullishEngulfing = (basePrice: number): Pattern => {
  const candles = generateBaseCandles(2, basePrice);
  const lastCandle = candles[candles.length - 1];
  
  // Small bearish candle
  const open1 = lastCandle.close;
  const close1 = open1 - basePrice * 0.01;
  candles.push({
    open: open1,
    close: close1,
    high: open1 + basePrice * 0.003,
    low: close1 - basePrice * 0.003,
    timestamp: Date.now() + candles.length * 1000,
  });

  // Large bullish engulfing candle
  const open2 = close1 - basePrice * 0.002;
  const close2 = open1 + basePrice * 0.015;
  candles.push({
    open: open2,
    close: close2,
    high: close2 + basePrice * 0.005,
    low: open2 - basePrice * 0.003,
    timestamp: Date.now() + candles.length * 1000,
  });

  return {
    name: "Bullish Engulfing",
    candles,
    expectedDirection: "UP",
  };
};

export const generateBearishEngulfing = (basePrice: number): Pattern => {
  const candles = generateBaseCandles(2, basePrice);
  const lastCandle = candles[candles.length - 1];
  
  // Small bullish candle
  const open1 = lastCandle.close;
  const close1 = open1 + basePrice * 0.01;
  candles.push({
    open: open1,
    close: close1,
    high: close1 + basePrice * 0.003,
    low: open1 - basePrice * 0.003,
    timestamp: Date.now() + candles.length * 1000,
  });

  // Large bearish engulfing candle
  const open2 = close1 + basePrice * 0.002;
  const close2 = open1 - basePrice * 0.015;
  candles.push({
    open: open2,
    close: close2,
    high: open2 + basePrice * 0.003,
    low: close2 - basePrice * 0.005,
    timestamp: Date.now() + candles.length * 1000,
  });

  return {
    name: "Bearish Engulfing",
    candles,
    expectedDirection: "DOWN",
  };
};

export const generateMorningStar = (basePrice: number): Pattern => {
  const candles = generateBaseCandles(2, basePrice);
  const lastCandle = candles[candles.length - 1];
  
  // Large bearish candle
  const open1 = lastCandle.close;
  const close1 = open1 - basePrice * 0.02;
  candles.push({
    open: open1,
    close: close1,
    high: open1 + basePrice * 0.003,
    low: close1 - basePrice * 0.003,
    timestamp: Date.now() + candles.length * 1000,
  });

  // Small candle (star)
  const open2 = close1 - basePrice * 0.005;
  const close2 = open2 - basePrice * 0.003;
  candles.push({
    open: open2,
    close: close2,
    high: Math.max(open2, close2) + basePrice * 0.002,
    low: Math.min(open2, close2) - basePrice * 0.002,
    timestamp: Date.now() + candles.length * 1000,
  });

  // Large bullish candle
  const open3 = close2 + basePrice * 0.003;
  const close3 = open1 - basePrice * 0.005;
  candles.push({
    open: open3,
    close: close3,
    high: close3 + basePrice * 0.003,
    low: open3 - basePrice * 0.003,
    timestamp: Date.now() + candles.length * 1000,
  });

  return {
    name: "Morning Star",
    candles,
    expectedDirection: "UP",
  };
};

export const generateEveningStar = (basePrice: number): Pattern => {
  const candles = generateBaseCandles(2, basePrice);
  const lastCandle = candles[candles.length - 1];
  
  // Large bullish candle
  const open1 = lastCandle.close;
  const close1 = open1 + basePrice * 0.02;
  candles.push({
    open: open1,
    close: close1,
    high: close1 + basePrice * 0.003,
    low: open1 - basePrice * 0.003,
    timestamp: Date.now() + candles.length * 1000,
  });

  // Small candle (star)
  const open2 = close1 + basePrice * 0.005;
  const close2 = open2 + basePrice * 0.003;
  candles.push({
    open: open2,
    close: close2,
    high: Math.max(open2, close2) + basePrice * 0.002,
    low: Math.min(open2, close2) - basePrice * 0.002,
    timestamp: Date.now() + candles.length * 1000,
  });

  // Large bearish candle
  const open3 = close2 - basePrice * 0.003;
  const close3 = open1 + basePrice * 0.005;
  candles.push({
    open: open3,
    close: close3,
    high: open3 + basePrice * 0.003,
    low: close3 - basePrice * 0.003,
    timestamp: Date.now() + candles.length * 1000,
  });

  return {
    name: "Evening Star",
    candles,
    expectedDirection: "DOWN",
  };
};

export const generateShootingStar = (basePrice: number): Pattern => {
  const candles = generateBaseCandles(3, basePrice);
  const lastCandle = candles[candles.length - 1];
  const open = lastCandle.close;
  const bodySize = basePrice * 0.008;
  const close = open - bodySize;
  const upperWick = basePrice * 0.025;

  candles.push({
    open,
    close,
    high: Math.max(open, close) + upperWick,
    low: Math.min(open, close) - bodySize * 0.2,
    timestamp: Date.now() + candles.length * 1000,
  });

  return {
    name: "Shooting Star",
    candles,
    expectedDirection: "DOWN",
  };
};

export const generateInvertedHammer = (basePrice: number): Pattern => {
  const candles = generateBaseCandles(3, basePrice);
  const lastCandle = candles[candles.length - 1];
  const open = lastCandle.close;
  const bodySize = basePrice * 0.008;
  const close = open + bodySize;
  const upperWick = basePrice * 0.025;

  candles.push({
    open,
    close,
    high: Math.max(open, close) + upperWick,
    low: Math.min(open, close) - bodySize * 0.2,
    timestamp: Date.now() + candles.length * 1000,
  });

  return {
    name: "Inverted Hammer",
    candles,
    expectedDirection: "UP",
  };
};

export const generateThreeWhiteSoldiers = (basePrice: number): Pattern => {
  const candles = generateBaseCandles(2, basePrice);
  let currentPrice = candles[candles.length - 1].close;

  for (let i = 0; i < 3; i++) {
    const open = currentPrice;
    const close = open + basePrice * 0.015;
    candles.push({
      open,
      close,
      high: close + basePrice * 0.003,
      low: open - basePrice * 0.002,
      timestamp: Date.now() + candles.length * 1000,
    });
    currentPrice = close;
  }

  return {
    name: "Three White Soldiers",
    candles,
    expectedDirection: "UP",
  };
};

export const generateThreeBlackCrows = (basePrice: number): Pattern => {
  const candles = generateBaseCandles(2, basePrice);
  let currentPrice = candles[candles.length - 1].close;

  for (let i = 0; i < 3; i++) {
    const open = currentPrice;
    const close = open - basePrice * 0.015;
    candles.push({
      open,
      close,
      high: open + basePrice * 0.002,
      low: close - basePrice * 0.003,
      timestamp: Date.now() + candles.length * 1000,
    });
    currentPrice = close;
  }

  return {
    name: "Three Black Crows",
    candles,
    expectedDirection: "DOWN",
  };
};

export const generatePiercingPattern = (basePrice: number): Pattern => {
  const candles = generateBaseCandles(2, basePrice);
  const lastCandle = candles[candles.length - 1];
  
  // Bearish candle
  const open1 = lastCandle.close;
  const close1 = open1 - basePrice * 0.02;
  candles.push({
    open: open1,
    close: close1,
    high: open1 + basePrice * 0.003,
    low: close1 - basePrice * 0.003,
    timestamp: Date.now() + candles.length * 1000,
  });

  // Bullish candle piercing more than 50%
  const open2 = close1 - basePrice * 0.005;
  const close2 = open1 - basePrice * 0.008;
  candles.push({
    open: open2,
    close: close2,
    high: close2 + basePrice * 0.003,
    low: open2 - basePrice * 0.003,
    timestamp: Date.now() + candles.length * 1000,
  });

  return {
    name: "Piercing Pattern",
    candles,
    expectedDirection: "UP",
  };
};

export const generateDarkCloudCover = (basePrice: number): Pattern => {
  const candles = generateBaseCandles(2, basePrice);
  const lastCandle = candles[candles.length - 1];
  
  // Bullish candle
  const open1 = lastCandle.close;
  const close1 = open1 + basePrice * 0.02;
  candles.push({
    open: open1,
    close: close1,
    high: close1 + basePrice * 0.003,
    low: open1 - basePrice * 0.003,
    timestamp: Date.now() + candles.length * 1000,
  });

  // Bearish candle covering more than 50%
  const open2 = close1 + basePrice * 0.005;
  const close2 = open1 + basePrice * 0.008;
  candles.push({
    open: open2,
    close: close2,
    high: open2 + basePrice * 0.003,
    low: close2 - basePrice * 0.003,
    timestamp: Date.now() + candles.length * 1000,
  });

  return {
    name: "Dark Cloud Cover",
    candles,
    expectedDirection: "DOWN",
  };
};

export const generateSpinningTop = (basePrice: number): Pattern => {
  const candles = generateBaseCandles(3, basePrice);
  const lastCandle = candles[candles.length - 1];
  const open = lastCandle.close;
  const bodySize = basePrice * 0.005;
  const close = open + (Math.random() > 0.5 ? bodySize : -bodySize);
  const wickSize = basePrice * 0.015;

  candles.push({
    open,
    close,
    high: Math.max(open, close) + wickSize,
    low: Math.min(open, close) - wickSize,
    timestamp: Date.now() + candles.length * 1000,
  });

  return {
    name: "Spinning Top",
    candles,
    expectedDirection: Math.random() > 0.5 ? "UP" : "DOWN",
  };
};

export const generateMarubozu = (basePrice: number): Pattern => {
  const candles = generateBaseCandles(3, basePrice);
  const lastCandle = candles[candles.length - 1];
  const isBullish = Math.random() > 0.5;
  const open = lastCandle.close;
  const close = isBullish ? open + basePrice * 0.025 : open - basePrice * 0.025;

  candles.push({
    open,
    close,
    high: Math.max(open, close),
    low: Math.min(open, close),
    timestamp: Date.now() + candles.length * 1000,
  });

  return {
    name: "Marubozu",
    candles,
    expectedDirection: isBullish ? "UP" : "DOWN",
  };
};

export const generateRandomPattern = (): Pattern => {
  const basePrice = getRandomPrice(100, 500);
  const patterns = [
    () => generateDoji(basePrice),
    () => generateHammer(basePrice),
    () => generateHangingMan(basePrice),
    () => generateBullishEngulfing(basePrice),
    () => generateBearishEngulfing(basePrice),
    () => generateMorningStar(basePrice),
    () => generateEveningStar(basePrice),
    () => generateShootingStar(basePrice),
    () => generateInvertedHammer(basePrice),
    () => generateThreeWhiteSoldiers(basePrice),
    () => generateThreeBlackCrows(basePrice),
    () => generatePiercingPattern(basePrice),
    () => generateDarkCloudCover(basePrice),
    () => generateSpinningTop(basePrice),
    () => generateMarubozu(basePrice),
  ];

  const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
  return randomPattern();
};
