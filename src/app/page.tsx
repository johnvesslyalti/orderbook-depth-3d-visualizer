// src/app/page.tsx (server component — default)
import ClientWrapper from "@/components/ClientWrapper";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-black text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Orderbook Depth 3D Visualizer</h1>
      <ClientWrapper />
    </div>
  );
}
