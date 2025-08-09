// === edges/TradingEdge.tsx ===
'use client'
import { BaseEdge, getStraightPath, type EdgeProps } from '@xyflow/react';
import { useEffect, useState } from 'react';

export default function TradingEdge({ id, sourceX, sourceY, targetX, targetY, data }: EdgeProps) {
  const [path] = getStraightPath({ sourceX, sourceY, targetX, targetY });
  const [color, setColor] = useState('white');

  useEffect(() => {
    if (data?.action) {
      const colorMap = { buy: 'blue', sell: 'red' };
      setColor(colorMap[data.action]);
      const timeout = setTimeout(() => setColor('white'), 1000);
      return () => clearTimeout(timeout);
    }
  }, [data?.action]);

  return <BaseEdge id={id} path={path} style={{ stroke: color, strokeWidth: 2 }} />;
}
