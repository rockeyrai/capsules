// === components/nodes/MeroShareNode.tsx (Updated - Remove Handles) ===
import { NodeProps } from '@xyflow/react';
import { useGlobalStore } from '../../store/globalStore';

export default function MeroShareNode({ id }: NodeProps) {
  const { meroShares } = useGlobalStore();

  return (
    <div className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-lg w-64 shadow-lg transition-all hover:shadow-xl">
      <div className="font-bold text-yellow-800 mb-3 text-lg flex items-center">
        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
        Mero Share
      </div>
      
      {Object.values(meroShares).length === 0 ? (
        <div className="text-center py-4">
          <div className="text-4xl mb-2">📈</div>
          <p className="text-sm text-yellow-600 italic">No shares yet</p>
          <p className="text-xs text-yellow-500 mt-1">Buy some stocks to get started!</p>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-xs font-medium text-yellow-700 mb-2">Current Holdings:</div>
          {Object.values(meroShares).map((s) => (
            <div key={s.symbol} className="bg-white p-2 rounded border border-yellow-200">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">{s.symbol}</span>
                <span className="text-sm text-yellow-600">{s.quantity} shares</span>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                @ ${s.ltp} per share
              </div>
            </div>
          ))}
          <div className="mt-3 pt-2 border-t border-yellow-200">
            <div className="text-xs font-medium text-yellow-700">
              Total Holdings: {Object.values(meroShares).length} stocks
            </div>
          </div>
        </div>
      )}
    </div>
  );
}