// === edges/PortfolioEdge.tsx ===
import { BaseEdge, getBezierPath, type EdgeProps } from '@xyflow/react';

export default function PortfolioEdge(props: EdgeProps) {
  const [path, labelX, labelY] = getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
  });

  return (
    <>
      <BaseEdge id={props.id} path={path} />
      <image
        href="/stock-icon.png"
        x={labelX - 10}
        y={labelY - 10}
        width={20}
        height={20}
      />
    </>
  );
}