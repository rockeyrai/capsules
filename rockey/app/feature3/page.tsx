'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from '@xyflow/react';
import TMSNode from './components/nodes/TMSNode';
import MeroShareNode from './components/nodes/MeroShareNode';
import PortfolioNode from './components/nodes/PortfolioNode';
import TradingEdge from './components/edges/TradingEdge';
import PortfolioEdge from './components/edges/PortfolioEdge';
import { useGlobalStore } from './store/globalStore';
import '@xyflow/react/dist/style.css';

const nodeTypes = {
  tmsNode: TMSNode,
  meroShareNode: MeroShareNode,
  portfolioNode: PortfolioNode,
};

const edgeTypes = {
  tradingEdge: TradingEdge,
  portfolioEdge: PortfolioEdge,
};

type LayoutType = 'horizontal' | 'triangle' | 'vertical';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const FlowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [layout, setLayout] = useState<LayoutType>('horizontal');

  const globalMoney = useGlobalStore((s) => s.globalMoney);

  // Responsive layout calculation
  const calculateLayout = useCallback((layoutType: LayoutType): Node[] => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const height = typeof window !== 'undefined' ? window.innerHeight : 800;

    const isSmall = width < 768; // breakpoint for small screens

    // Adjust gaps based on screen size
    const horizontalGap = isSmall ? width / 3 : width / 4;
    const verticalGap = isSmall ? height / 4 : height / 3;
    const centerX = width / 2;
    const centerY = height / 2;

    // On very small width, force vertical stacking regardless of selected layout
    if (width < 400) {
      return [
        { id: '1', type: 'tmsNode', position: { x: centerX, y: height / 6 }, data: {} },
        { id: '2', type: 'meroShareNode', position: { x: centerX, y: height / 2 }, data: {} },
        { id: '3', type: 'portfolioNode', position: { x: centerX, y: (height / 6) * 5 }, data: {} },
      ];
    }

    switch (layoutType) {
      case 'horizontal':
        return [
          { id: '1', type: 'tmsNode', position: { x: centerX - horizontalGap, y: centerY }, data: {} },
          { id: '2', type: 'meroShareNode', position: { x: centerX, y: centerY }, data: {} },
          { id: '3', type: 'portfolioNode', position: { x: centerX + horizontalGap, y: centerY }, data: {} },
        ];
      case 'triangle':
        return [
          { id: '1', type: 'tmsNode', position: { x: centerX, y: centerY - verticalGap }, data: {} },
          { id: '2', type: 'meroShareNode', position: { x: centerX - horizontalGap, y: centerY + verticalGap / 2 }, data: {} },
          { id: '3', type: 'portfolioNode', position: { x: centerX + horizontalGap, y: centerY + verticalGap / 2 }, data: {} },
        ];
      case 'vertical':
        return [
          { id: '1', type: 'tmsNode', position: { x: centerX, y: centerY - verticalGap }, data: {} },
          { id: '2', type: 'meroShareNode', position: { x: centerX, y: centerY }, data: {} },
          { id: '3', type: 'portfolioNode', position: { x: centerX, y: centerY + verticalGap }, data: {} },
        ];
    }
  }, []);

  // Apply layout initially and when layout changes
  useEffect(() => {
    const newNodes = calculateLayout(layout);
    setNodes(newNodes);

    setEdges([
      { id: 'e1-2', source: '1', target: '2', type: 'tradingEdge', data: {} },
      { id: 'e2-3', source: '2', target: '3', type: 'portfolioEdge' },
    ]);
  }, [layout, calculateLayout, setNodes, setEdges]);

  // Handle window resize to update nodes dynamically
  useEffect(() => {
    const handleResize = () => {
      const updatedNodes = calculateLayout(layout);
      setNodes(updatedNodes);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [layout, calculateLayout, setNodes]);

  // Monitor node distance and switch layout if needed (original logic preserved)
  useEffect(() => {
    if (nodes.length !== 3) return;

    const n1 = nodes.find((n) => n.id === '1');
    const n2 = nodes.find((n) => n.id === '2');

    if (!n1 || !n2) return;

    // Get expected positions for current layout
    const expectedLayoutNodes = calculateLayout(layout);
    const expectedN1Pos = expectedLayoutNodes.find((n) => n.id === '1')?.position;

    // Check if current position matches expected (means stable)
    const isStable = n1.position.x === expectedN1Pos?.x && n1.position.y === expectedN1Pos?.y;
    if (isStable) return; // prevent race condition

    // Calculate distance between node 1 and 2
    const distance = Math.hypot(
      n2.position.x - n1.position.x,
      n2.position.y - n1.position.y
    );

    if (distance < 20) {
      if (layout === 'horizontal') setLayout('triangle');
      else if (layout === 'triangle') setLayout('vertical');
    }
  }, [nodes, layout, calculateLayout]);

  return (
    <ReactFlowProvider>
      <div className="relative w-full h-screen bg-black">
        <div className="absolute top-4 right-4 bg-white shadow px-4 py-2 rounded text-black font-semibold z-50">
          Balance: Rs. {globalMoney.toLocaleString()}
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
        />
      </div>
    </ReactFlowProvider>
  );
};

export default FlowCanvas;
