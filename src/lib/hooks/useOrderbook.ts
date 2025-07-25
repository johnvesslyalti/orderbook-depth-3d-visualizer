// src/lib/hooks/useOrderbook.ts
import { useEffect } from 'react';
import { useOrderbookStore } from '../store/orderbook';

export const useOrderbook = () => {
  const updateOrderbook = useOrderbookStore((s) => s.updateOrderbook);

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@depth');

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const bids = data.b.slice(0, 10).map(([p, q]: [string, string]) => [parseFloat(p), parseFloat(q)]);
      const asks = data.a.slice(0, 10).map(([p, q]: [string, string]) => [parseFloat(p), parseFloat(q)]);
      updateOrderbook(bids, asks);
    };

    return () => ws.close();
  }, [updateOrderbook]);
};
