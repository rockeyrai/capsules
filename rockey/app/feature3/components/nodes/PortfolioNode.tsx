
// === components/nodes/PortfolioNode.tsx (Updated - Remove Handles) ===
import { NodeProps } from '@xyflow/react';
import { useGlobalStore } from '../../store/globalStore';

export default function PortfolioNode({ id }: NodeProps) {
  const { meroShares } = useGlobalStore();

  const totalValue = Object.values(meroShares).reduce(
    (sum, stock) => sum + (stock.ltp * stock.quantity),
    0
  );

  const totalShares = Object.values(meroShares).reduce(
    (sum, stock) => sum + stock.quantity,
    0
  );

  return (
    <div className="bg-green-50 border-2 border-green-200 p-4 rounded-lg w-68 shadow-lg transition-all hover:shadow-xl">
      <div className="font-bold text-green-800 mb-3 text-lg flex items-center">
        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
        Portfolio
      </div>

      {Object.values(meroShares).length === 0 ? (
        <div className="text-center py-4">
          <div className="text-4xl mb-2">💼</div>
          <p className="text-sm text-green-600 italic">Empty portfolio</p>
          <p className="text-xs text-green-500 mt-1">Start trading to build your portfolio!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Summary */}
          <div className="bg-green-100 p-3 rounded border border-green-200">
            <div className="text-sm font-semibold text-green-800 mb-1">Portfolio Summary</div>
            <div className="flex justify-between text-xs">
              <span className="text-green-700">Total Value:</span>
              <span className="font-bold text-green-800">${totalValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-green-700">Total Shares:</span>
              <span className="font-bold text-green-800">{totalShares}</span>
            </div>
          </div>

          {/* Holdings */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-green-700">Holdings:</div>
            {Object.values(meroShares).map((s) => (
              <div key={s.symbol} className="bg-white p-2 rounded border border-green-200">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-medium text-gray-800">{s.symbol}</span>
                    <div className="text-xs text-gray-600">
                      {s.quantity} × ${s.ltp}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-600">
                      ${(s.ltp * s.quantity).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {((s.ltp * s.quantity / totalValue) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}