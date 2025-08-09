import { Handle, Position, NodeProps } from '@xyflow/react';
import { useGlobalStore } from '../../store/globalStore';
import { useState, useEffect } from 'react';

export default function MeroShareNode({ id }: NodeProps) {
  const { meroShares } = useGlobalStore();

  // Responsive window width tracking
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Change handle positions on mobile
  const targetPosition = windowWidth < 768 ? Position.Top : Position.Left;
  const sourcePosition = windowWidth < 768 ? Position.Bottom : Position.Right;

  return (
    <div className="bg-yellow-100 border p-4 rounded-md w-56">
      <div className="font-bold mb-2">Mero Share</div>
      {Object.values(meroShares).length === 0 && <p className="text-sm">No shares</p>}
      <ul className="text-sm list-disc ml-4">
        {Object.values(meroShares).map((s) => (
          <li key={s.symbol}>
            {s.symbol}: {s.quantity}
          </li>
        ))}
      </ul>
      <Handle type="target" position={targetPosition} />
      <Handle type="source" position={sourcePosition} />
    </div>
  );
}
