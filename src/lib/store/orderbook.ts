import { create } from 'zustand';

type Order = [number, number];

type OrderbookState = {
    bids: Order[];
    asks: Order[];
    updateOrderbook: (bids: Order[], asks: Order[]) => void;
}

export const useOrderbookStore = create<OrderbookState>((set) => ({
    bids: [],
    asks: [],
    updateOrderbook: (bids, asks) => set({ bids, asks }),
}))