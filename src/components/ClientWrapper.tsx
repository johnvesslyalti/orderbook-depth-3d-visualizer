// src/components/ClientWrapper.tsx
"use client";

import dynamic from "next/dynamic";

// Dynamically import the Orderbook3D component with no SSR
const Orderbook3D = dynamic(() =>
  import("./Orderbook3D").then((mod) => mod.Orderbook3D),
  { ssr: false }
);

export default function ClientWrapper() {
  return (
    <div className="w-full h-[90vh] border rounded-lg overflow-hidden">
      <Orderbook3D />
    </div>
  );
}
