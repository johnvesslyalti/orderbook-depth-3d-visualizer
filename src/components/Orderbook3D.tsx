'use client';
import { Canvas } from '@react-three/fiber';
import { useOrderbookStore } from '@/lib/store/orderbook';
import { OrbitControls } from '@react-three/drei';

export function Orderbook3D() {
  const bids = useOrderbookStore((s) => s.bids);
  const asks = useOrderbookStore((s) => s.asks);

  return (
    <Canvas camera={{ position: [0, 20, 40], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <OrbitControls />

      {/* Bids */}
      {bids.map(([price, qty], i) => (
        <mesh key={`bid-${i}`} position={[price, qty / 2, -i]}>
          <boxGeometry args={[1, qty, 1]} />
          <meshStandardMaterial color="green" />
        </mesh>
      ))}

      {/* Asks */}
      {asks.map(([price, qty], i) => (
        <mesh key={`ask-${i}`} position={[price, qty / 2, i]}>
          <boxGeometry args={[1, qty, 1]} />
          <meshStandardMaterial color="red" />
        </mesh>
      ))}
    </Canvas>
  );
}
