
// === components/nodes/TMSNode.tsx (Updated - Remove Handles) ===
"use client";
import { useGlobalStore } from '../../store/globalStore';
import { NodeProps } from '@xyflow/react';
import { useState } from 'react';

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
    <div className="bg-white border shadow-lg p-4 rounded-lg w-60 transition-all hover:shadow-xl">
      <div className="flex justify-between mb-3 border-b pb-2">
        <button 
          onClick={() => setTab('buy')} 
          className={`px-3 py-1 rounded transition-colors ${
            tab === 'buy' 
              ? 'bg-blue-500 text-white font-semibold' 
              : 'text-gray-600 hover:text-blue-500'
          }`}
        >
          Buy
        </button>
        <button 
          onClick={() => setTab('sell')} 
          className={`px-3 py-1 rounded transition-colors ${
            tab === 'sell' 
              ? 'bg-red-500 text-white font-semibold' 
              : 'text-gray-600 hover:text-red-500'
          }`}
        >
          Sell
        </button>
      </div>

      {tab === 'buy' ? (
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700 mb-2">Available Stocks:</div>
          {stocks.map((s) => (
            <div key={s.symbol} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <div>
                <span className="font-medium">{s.symbol}</span>
                <span className="text-sm text-gray-600 ml-2">${s.ltp}</span>
              </div>
              <button 
                onClick={() => setSelected(s)} 
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
              >
                Buy
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700 mb-2">Your Holdings:</div>
          {Object.values(meroShares).length === 0 ? (
            <p className="text-sm text-gray-500 italic">No holdings to sell</p>
          ) : (
            Object.values(meroShares).map((s) => (
              <div key={s.symbol} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div>
                  <span className="font-medium">{s.symbol}</span>
                  <span className="text-sm text-gray-600 ml-2">({s.quantity} shares)</span>
                </div>
                <button
                  onClick={() => setSelected({ symbol: s.symbol, ltp: s.ltp })}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Sell
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {selected && (
        <div className="mt-4 p-3 bg-gray-100 rounded space-y-2">
          <div className="text-sm font-medium">
            {tab === 'buy' ? 'Buying' : 'Selling'}: {selected.symbol}
          </div>
          <input
            type="number"
            min={1}
            max={tab === 'sell' ? meroShares[selected.symbol]?.quantity : undefined}
            className="border border-gray-300 px-3 py-2 w-full text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter quantity"
            value={quantity || ''}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
          />
          <div className="flex space-x-2">
            <button
              onClick={tab === 'buy' ? handleBuyConfirm : handleSellConfirm}
              className="bg-green-600 text-white text-sm flex-1 py-2 rounded hover:bg-green-700 transition-colors font-medium"
            >
              Confirm {tab.toUpperCase()}
            </button>
            <button
              onClick={() => {
                setSelected(null);
                setQuantity(0);
              }}
              className="bg-gray-500 text-white text-sm px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
