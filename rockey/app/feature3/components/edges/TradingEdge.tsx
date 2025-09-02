
// === components/edges/FloatingTradingEdge.tsx ===
'use client';
import { BaseEdge, getStraightPath, useReactFlow, type EdgeProps } from '@xyflow/react';
import { useEffect, useState } from 'react';
import { getFloatingEdgeParams } from '../utils/getFloatingEdgeParams';

export default function FloatingTradingEdge({ 
  id, 
  source, 
  target, 
  sourceX,
  sourceY,
  targetX,
  targetY,
  data 
}: EdgeProps) {
  const { getNode } = useReactFlow();
  const [color, setColor] = useState('#6b7280'); // gray-500
  
  const sourceNode = getNode(source);
  const targetNode = getNode(target);

  useEffect(() => {
    if (data?.action) {
      const colorMap = { buy: '#3b82f6', sell: '#ef4444' }; // blue-500, red-500
      setColor(colorMap[data.action]);
      const timeout = setTimeout(() => setColor('#6b7280'), 1000);
      return () => clearTimeout(timeout);
    }
  }, [data?.action]);

  // Fallback to provided coordinates if nodes aren't available yet
  let edgeSourceX = sourceX;
  let edgeSourceY = sourceY;
  let edgeTargetX = targetX;
  let edgeTargetY = targetY;

  // Use floating edge calculation if both nodes are available
  if (sourceNode && targetNode) {
    const floatingParams = getFloatingEdgeParams(sourceNode, targetNode);
    edgeSourceX = floatingParams.sourceX;
    edgeSourceY = floatingParams.sourceY;
    edgeTargetX = floatingParams.targetX;
    edgeTargetY = floatingParams.targetY;
  }

  const [path] = getStraightPath({
    sourceX: edgeSourceX,
    sourceY: edgeSourceY,
    targetX: edgeTargetX,
    targetY: edgeTargetY,
  });

  return (
    <BaseEdge 
      id={id} 
      path={path} 
      style={{ 
        stroke: color, 
        strokeWidth: 3,
        strokeDasharray: data?.action ? '8,4' : 'none',
        transition: 'all 0.3s ease'
      }} 
    />
  );
}