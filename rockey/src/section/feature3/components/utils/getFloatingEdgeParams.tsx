// === utils/getFloatingEdgeParams.ts ===
import { Node } from '@xyflow/react';

// Calculate connection points for floating edges
export function getFloatingEdgeParams(source: Node, target: Node) {
  const sourceIntersectionPoint = getNodeIntersection(source, target);
  const targetIntersectionPoint = getNodeIntersection(target, source);

  return {
    sourceX: sourceIntersectionPoint.x,
    sourceY: sourceIntersectionPoint.y,
    targetX: targetIntersectionPoint.x,
    targetY: targetIntersectionPoint.y,
  };
}

// Get the intersection point on a node's boundary
function getNodeIntersection(intersectionNode: Node, targetNode: Node) {
  // Use measured dimensions if available, otherwise use defaults based on node type
  const getDefaultDimensions = (nodeType: string) => {
    switch (nodeType) {
      case 'tmsNode':
        return { width: 240, height: 200 };
      case 'meroShareNode':
        return { width: 256, height: 180 };
      case 'portfolioNode':
        return { width: 272, height: 200 };
      default:
        return { width: 240, height: 180 };
    }
  };

  const sourceDefaults = getDefaultDimensions(intersectionNode.type || '');
  const targetDefaults = getDefaultDimensions(targetNode.type || '');

  const {
    width: intersectionNodeWidth = sourceDefaults.width,
    height: intersectionNodeHeight = sourceDefaults.height,
  } = intersectionNode.measured || {};

  const {
    width: targetNodeWidth = targetDefaults.width,
    height: targetNodeHeight = targetDefaults.height,
  } = targetNode.measured || {};

  const w = intersectionNodeWidth / 2;
  const h = intersectionNodeHeight / 2;

  const x2 = intersectionNode.position.x + w;
  const y2 = intersectionNode.position.y + h;
  const x1 = targetNode.position.x + targetNodeWidth / 2;
  const y1 = targetNode.position.y + targetNodeHeight / 2;

  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
  const xx3 = a * xx1;
  const yy3 = a * yy1;
  const x = w * (xx3 + yy3) + x2;
  const y = h * (-xx3 + yy3) + y2;

  return { x, y };
}