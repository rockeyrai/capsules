// === store/globalStore.ts ===
import { create } from 'zustand';

export type Stock = {
  symbol: string;
  quantity: number;
  ltp: number;
};

interface GlobalState {
  globalMoney: number;
  meroShares: Record<string, Stock>; // keyed by symbol
  portfolio: Record<string, Stock>;
  buyStock: (stock: Stock) => void;
  sellStock: (symbol: string, quantity: number) => void;
  setMoney: (amount: number) => void;
}

export const useGlobalStore = create<GlobalState>((set, get) => ({
  globalMoney: 100000,
  meroShares: {},
  portfolio: {},

  setMoney: (amount) => set({ globalMoney: amount }),

  buyStock: (stock) => {
    const cost = stock.ltp * stock.quantity;
    const { globalMoney, meroShares } = get();
    if (globalMoney >= cost) {
      const existing = meroShares[stock.symbol] || { ...stock, quantity: 0 };
      const updatedStock = {
        ...stock,
        quantity: existing.quantity + stock.quantity,
      };
      set({
        globalMoney: globalMoney - cost,
        meroShares: { ...meroShares, [stock.symbol]: updatedStock },
      });
    }
  },

  sellStock: (symbol, quantity) => {
    const { meroShares, globalMoney } = get();
    const stock = meroShares[symbol];
    if (stock && stock.quantity >= quantity) {
      const updatedQty = stock.quantity - quantity;
      const updatedShares = { ...meroShares };
      if (updatedQty === 0) delete updatedShares[symbol];
      else updatedShares[symbol] = { ...stock, quantity: updatedQty };
      const total = stock.ltp * quantity;
      set({
        globalMoney: globalMoney + total,
        meroShares: updatedShares,
      });
    }
  },
}));