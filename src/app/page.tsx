'use client';

import { useOrderbook } from "@/lib/hooks/useOrderbook";


export default function HomePage() {
  const orderbook = useOrderbook();

  return (
    <main style={{ padding: '1rem' }}>
      <h1>📊 Binance Orderbook (BTC/USDT)</h1>
      {orderbook ? (
        <>
          <h2>🟢 Bids</h2>
          <ul>
            {orderbook.b.slice(0, 5).map(([price, qty], i) => (
              <li key={i}>{price} | {qty}</li>
            ))}
          </ul>

          <h2>🔴 Asks</h2>
          <ul>
            {orderbook.a.slice(0, 5).map(([price, qty], i) => (
              <li key={i}>{price} | {qty}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading orderbook...</p>
      )}
    </main>
  );
}
