'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface OrderBookUpdate {
  u: number;
  b: [string, string][];
  a: [string, string][];
}

let socket: Socket | null = null;

export function useOrderbook() {
  const [orderbook, setOrderbook] = useState<OrderBookUpdate | null>(null);

  useEffect(() => {
    // trigger API once to make sure server initializes
    fetch('/api/socket_io');

    if (!socket) {
      socket = io('http://localhost:3000', {
        path: '/api/socket_io',
        transports: ['websocket'],
      });

      socket.on('connect', () => {
        console.log('✅ Connected to Socket.IO server');
      });

      socket.on('orderbook', (data: OrderBookUpdate) => {
        setOrderbook(data);
      });

      socket.on('connect_error', (err) => {
        console.error('❌ Socket.IO connection error:', err.message);
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
        console.log('👋 Disconnected from Socket.IO');
      }
    };
  }, []);

  return orderbook;
}
