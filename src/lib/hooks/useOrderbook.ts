"use client";
import { useEffect, useRef } from "react";
import { useOrderbookStore } from "../store/orderbook";

export const useOrderbook = () => {
  const updateOrderbook = useOrderbookStore((s) => s.updateOrderbook);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (wsRef.current) return;

    const url = "wss://stream.binance.com:9443/ws/btcusdt@depth";
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("✅ WebSocket connected to:", url);
    };

    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        const bids = data.b?.slice(0, 10).map(([p, q]: [string, string]) => [parseFloat(p), parseFloat(q)]);
        const asks = data.a?.slice(0, 10).map(([p, q]: [string, string]) => [parseFloat(p), parseFloat(q)]);
        if (bids && asks) updateOrderbook(bids, asks);
      } catch (err) {
        console.error("⚠️ Failed to parse WebSocket message:", err);
      }
    };

    ws.onerror = (event) => {
      console.error("❌ WebSocket error:", event);
    };

    ws.onclose = (event) => {
      console.warn("🔌 WebSocket closed:", event.code, event.reason);
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [updateOrderbook]);
};
