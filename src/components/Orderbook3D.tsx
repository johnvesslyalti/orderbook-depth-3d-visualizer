'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useOrderbook } from '@/lib/hooks/useOrderbook';
import { useOrderbookStore } from '@/lib/store/orderbook';

export function Orderbook3D() {
  useOrderbook();

  const bids = useOrderbookStore((s) => s.bids);
  const asks = useOrderbookStore((s) => s.asks);

  return (
    <Canvas camera={{ position: [0, 20, 40], fov: 60 }}>
      <ambientLight />
      <OrbitControls />
      {bids.map(([price, qty], i) => (
        <mesh key={`bid-${i}`} position={[price, qty / 2, -i]}>
          <boxGeometry args={[1, qty, 1]} />
          <meshStandardMaterial color="green" />
        </mesh>
      ))}
      {asks.map(([price, qty], i) => (
        <mesh key={`ask-${i}`} position={[price, qty / 2, i]}>
          <boxGeometry args={[1, qty, 1]} />
          <meshStandardMaterial color="red" />
        </mesh>
      ))}
    </Canvas>
  );
}
