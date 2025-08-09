"use client";
import { useGlobalStore } from '../../store/globalStore';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { useState, useEffect } from 'react';

const stocks = [
  { symbol: 'AAPL', ltp: 150 },
  { symbol: 'GOOGL', ltp: 2800 },
  { symbol: 'TSLA', ltp: 700 },
];

export default function TMSNode({ id }: NodeProps) {
  const { buyStock, sellStock, meroShares } = useGlobalStore();
  const [tab, setTab] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState(0);
  const [selected, setSelected] = useState<{ symbol: string; ltp: number } | null>(null);

  // Track window width for responsive handle position
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Use bottom handle on mobile (width < 768), else right
  const handlePosition = windowWidth < 768 ? Position.Bottom : Position.Right;

  const handleBuyConfirm = () => {
    if (selected && quantity > 0) {
      buyStock({ symbol: selected.symbol, ltp: selected.ltp, quantity });
      setSelected(null);
      setQuantity(0);
    }
  };

  const handleSellConfirm = () => {
    if (selected && quantity > 0) {
      sellStock(selected.symbol, quantity);
      setSelected(null);
      setQuantity(0);
    }
  };

  return (
    <div className="bg-white border shadow-md p-4 rounded-md w-60">
      <div className="flex justify-between mb-2">
        <button onClick={() => setTab('buy')} className={tab === 'buy' ? 'font-bold' : ''}>
          Buy
        </button>
        <button onClick={() => setTab('sell')} className={tab === 'sell' ? 'font-bold' : ''}>
          Sell
        </button>
      </div>

      {tab === 'buy' ? (
        <div className="space-y-2">
          {stocks.map((s) => (
            <div key={s.symbol} className="flex justify-between items-center">
              <span>{s.symbol}</span>
              <button onClick={() => setSelected(s)} className="text-blue-600 underline">
                Buy
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {Object.values(meroShares).map((s) => (
            <div key={s.symbol} className="flex justify-between items-center">
              <span>
                {s.symbol} ({s.quantity})
              </span>
              <button
                onClick={() => setSelected({ symbol: s.symbol, ltp: s.ltp })}
                className="text-red-600 underline"
              >
                Sell
              </button>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="mt-3 space-y-1">
          <input
            type="number"
            min={1}
            className="border px-2 py-1 w-full text-sm"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <button
            onClick={tab === 'buy' ? handleBuyConfirm : handleSellConfirm}
            className="bg-black text-white text-sm w-full py-1 rounded"
          >
            Confirm {tab.toUpperCase()}
          </button>
        </div>
      )}

      <Handle type="source" position={handlePosition} />
    </div>
  );
}
