import { Handle, Position, NodeProps } from '@xyflow/react';
import { useGlobalStore } from '../../store/globalStore';
import { useState, useEffect } from 'react';

export default function PortfolioNode({ id }: NodeProps) {
  const { meroShares } = useGlobalStore();

  // Track window width for responsive handle position
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Use top handle on mobile (width < 768), else left
  const handlePosition = windowWidth < 768 ? Position.Top : Position.Left;

  return (
    <div className="bg-green-100 border p-4 rounded-md w-60">
      <div className="font-bold mb-2">Portfolio</div>
      {Object.values(meroShares).length === 0 && <p className="text-sm">No holdings</p>}
      <ul className="text-sm list-disc ml-4">
        {Object.values(meroShares).map((s) => (
          <li key={s.symbol}>
            {s.symbol} - Qty: {s.quantity} - Value: ${s.ltp * s.quantity}
          </li>
        ))}
      </ul>
      <Handle type="target" position={handlePosition} />
    </div>
  );
}
