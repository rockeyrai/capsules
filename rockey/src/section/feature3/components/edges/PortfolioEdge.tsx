
// === components/edges/FloatingPortfolioEdge.tsx ===
'use client';
import { BaseEdge, getStraightPath, useReactFlow, type EdgeProps } from '@xyflow/react';
import { getFloatingEdgeParams } from '../utils/getFloatingEdgeParams';

export default function FloatingPortfolioEdge({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps) {
  const { getNode } = useReactFlow();
  
  const sourceNode = getNode(source);
  const targetNode = getNode(target);

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

  const [path, labelX, labelY] = getStraightPath({
    sourceX: edgeSourceX,
    sourceY: edgeSourceY,
    targetX: edgeTargetX,
    targetY: edgeTargetY,
  });

  return (
    <>
      <BaseEdge 
        id={id} 
        path={path} 
        style={{ 
          stroke: '#10b981', // emerald-500
          strokeWidth: 3,
          strokeDasharray: '6,3'
        }} 
      />
      {/* Portfolio icon at the midpoint */}
      <circle
        cx={labelX}
        cy={labelY}
        r={10}
        fill="#10b981"
        stroke="white"
        strokeWidth={2}
      />
      <text
        x={labelX}
        y={labelY + 1}
        textAnchor="middle"
        fontSize={12}
        fill="white"
        fontWeight="bold"
      >
        $
      </text>
    </>
  );
}