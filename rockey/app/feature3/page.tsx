
// === FlowCanvas.tsx (Updated - Use Floating Edges) ===
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
import { useGlobalStore } from './store/globalStore';
import '@xyflow/react/dist/style.css';
import FloatingTradingEdge from './components/edges/TradingEdge';
import FloatingPortfolioEdge from './components/edges/PortfolioEdge';

const nodeTypes = {
  tmsNode: TMSNode,
  meroShareNode: MeroShareNode,
  portfolioNode: PortfolioNode,
};

const edgeTypes = {
  floatingTradingEdge: FloatingTradingEdge,
  floatingPortfolioEdge: FloatingPortfolioEdge,
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

    const isSmall = width < 768;
    const horizontalGap = isSmall ? width / 3 : width / 4;
    const verticalGap = isSmall ? height / 4 : height / 3;
    const centerX = width / 2;
    const centerY = height / 2;

    // On very small width, force vertical stacking
    if (width < 400) {
      return [
        { id: '1', type: 'tmsNode', position: { x: centerX - 120, y: height / 6 }, data: {} },
        { id: '2', type: 'meroShareNode', position: { x: centerX - 120, y: height / 2 }, data: {} },
        { id: '3', type: 'portfolioNode', position: { x: centerX - 120, y: (height / 6) * 5 }, data: {} },
      ];
    }

    switch (layoutType) {
      case 'horizontal':
        return [
          { id: '1', type: 'tmsNode', position: { x: centerX - horizontalGap, y: centerY - 60 }, data: {} },
          { id: '2', type: 'meroShareNode', position: { x: centerX - 120, y: centerY - 60 }, data: {} },
          { id: '3', type: 'portfolioNode', position: { x: centerX + horizontalGap - 240, y: centerY - 60 }, data: {} },
        ];
      case 'triangle':
        return [
          { id: '1', type: 'tmsNode', position: { x: centerX - 120, y: centerY - verticalGap }, data: {} },
          { id: '2', type: 'meroShareNode', position: { x: centerX - horizontalGap, y: centerY + verticalGap / 2 }, data: {} },
          { id: '3', type: 'portfolioNode', position: { x: centerX + horizontalGap - 240, y: centerY + verticalGap / 2 }, data: {} },
        ];
      case 'vertical':
        return [
          { id: '1', type: 'tmsNode', position: { x: centerX - 120, y: centerY - verticalGap }, data: {} },
          { id: '2', type: 'meroShareNode', position: { x: centerX - 120, y: centerY - 60 }, data: {} },
          { id: '3', type: 'portfolioNode', position: { x: centerX - 120, y: centerY + verticalGap - 120 }, data: {} },
        ];
    }
  }, []);

  // Apply layout initially and when layout changes
  useEffect(() => {
    const newNodes = calculateLayout(layout);
    setNodes(newNodes);

    // Add a small delay to ensure nodes are rendered before creating edges
    const timeoutId = setTimeout(() => {
      setEdges([
        { 
          id: 'e1-2', 
          source: '1', 
          target: '2', 
          type: 'floatingTradingEdge', 
          data: {} 
        },
        { 
          id: 'e2-3', 
          source: '2', 
          target: '3', 
          type: 'floatingPortfolioEdge',
          data: {} 
        },
      ]);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [layout, calculateLayout, setNodes, setEdges]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const updatedNodes = calculateLayout(layout);
      setNodes(updatedNodes);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [layout, calculateLayout, setNodes]);

  // Monitor node distance for layout switching
  useEffect(() => {
    if (nodes.length !== 3) return;

    const n1 = nodes.find((n) => n.id === '1');
    const n2 = nodes.find((n) => n.id === '2');

    if (!n1 || !n2) return;

    const expectedLayoutNodes = calculateLayout(layout);
    const expectedN1Pos = expectedLayoutNodes.find((n) => n.id === '1')?.position;

    const isStable = n1.position.x === expectedN1Pos?.x && n1.position.y === expectedN1Pos?.y;
    if (isStable) return;

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
      <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Header with balance */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur shadow-lg px-6 py-3 rounded-xl text-black font-bold z-50 border">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Balance:</span>
            <span className="text-lg">Rs. {globalMoney.toLocaleString()}</span>
          </div>
        </div>

        {/* Layout indicator */}
        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-2 rounded-lg text-sm z-50">
          Layout: {layout}
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          minZoom={0.5}
          maxZoom={2}
          className="bg-transparent"
        />
      </div>
    </ReactFlowProvider>
  );
};

export default  FlowCanvas