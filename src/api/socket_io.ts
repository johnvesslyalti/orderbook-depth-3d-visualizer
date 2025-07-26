import { Server as HTTPServer } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Socket as NetSocket } from 'net';
import { Server as SocketIOServer, Socket } from 'socket.io';
import WebSocket, { RawData } from 'ws';

interface SocketWithIO extends NetSocket {
  server: HTTPServer & {
    io?: SocketIOServer;
  };
}

export const config = {
  api: { bodyParser: false },
};

let binanceWs: WebSocket | null = null;
let connectedClients = 0;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const socket = res.socket as SocketWithIO;

  if (!socket.server.io) {
    console.log('🛠️ Initializing new Socket.IO server...');
    const io = new SocketIOServer(socket.server, {
      path: '/api/socket_io',
    });
    socket.server.io = io;

    io.on('connection', (clientSocket: Socket) => {
      connectedClients++;
      console.log(`🌐 Client connected (${connectedClients})`);

      if (!binanceWs) {
        binanceWs = new WebSocket(
          'wss://stream.binance.com:9443/ws/btcusdt@depth'
        );

        binanceWs.on('open', () => {
          console.log('✅ Connected to Binance');
        });

        binanceWs.on('message', (data: RawData) => {
          try {
            const parsed = JSON.parse(data.toString());
            io.emit('orderbook', parsed);
          } catch (err) {
            console.error('❌ Parse error:', err);
          }
        });

        binanceWs.on('close', () => {
          console.warn('🔌 Binance WS closed');
          binanceWs = null;
        });

        binanceWs.on('error', (err) => {
          console.error('❌ Binance error:', err.message);
        });
      }

      clientSocket.on('disconnect', () => {
        connectedClients--;
        console.log(`👋 Client disconnected (${connectedClients})`);

        if (connectedClients === 0 && binanceWs) {
          binanceWs.close();
          binanceWs = null;
        }
      });
    });
  }

  res.end();
}
