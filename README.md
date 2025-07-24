Assignment Title 
    
    Orderbook Depth 3D Visualizer

Objective

    Create a Next.js application that displays a rotating 3D graph visualization of cryptocurrency orderbook data with real-time updates, venue filtering, and pressure zone analysis. The visualization should represent price (X-axis), quantity (Y-axis), and time (Z-axis) in an interactive 3D environment.

Tech Stack:

    Next.js (App Router)
    @react-three/fiber
    WebSocket for real-time data
    Zustand for state management
    Tailwind CSS + Shadcn UI for styling
    Custom logic for pressure zone analysis

Folder Structure:

    orderbook-depth-3d-visualizer/
        |- public/
        |- src/
            |- app/
                |- favicon.ico
                |- globals.css
                |- layout.tsx
                |- page.tsx
            |- components/

Installation:

    npm install three @types/three @react-three/fiber
    npm install zustand
    npx shadcn@latest init