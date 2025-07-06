import { useState, useEffect, useCallback, useRef } from 'react';

// Mock WebSocket implementation - no backend required!
export const useWebSocket = (baseUrl: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mockWsRef = useRef<any>(null);

  const connect = useCallback((endpoint: string) => {
    try {
      console.log(`Mock WebSocket: Connecting to ${baseUrl}${endpoint}`);
      
      // Mock WebSocket object
      const mockWs = {
        readyState: 1, // OPEN
        send: (data: string) => {
          console.log('Mock WebSocket: Sending data:', data);
        },
        close: () => {
          console.log('Mock WebSocket: Closing connection');
          setIsConnected(false);
          mockWsRef.current = null;
        },
        onopen: null as any,
        onclose: null as any,
        onerror: null as any,
        onmessage: null as any,
      };

      mockWsRef.current = mockWs;

      // Simulate successful connection
      setTimeout(() => {
        setIsConnected(true);
        setError(null);
        console.log('Mock WebSocket: Connected successfully');
        
        // Simulate receiving mock prediction data every 2 seconds
        const mockInterval = setInterval(() => {
          if (mockWsRef.current && mockWs.onmessage) {
            const mockPrediction = {
              feature: ['hand_open', 'hand_close', 'wrist_flex', 'wrist_extend'][Math.floor(Math.random() * 4)],
              confidence: Math.random() * 0.4 + 0.6,
              timestamp: new Date().toISOString()
            };
            
            mockWs.onmessage({
              data: JSON.stringify({
                type: 'prediction',
                data: mockPrediction
              })
            });
          }
        }, 2000);

        // Store interval reference to clean up later
        (mockWs as any).mockInterval = mockInterval;
      }, 500);

      return mockWs;
    } catch (err) {
      setError('Mock WebSocket connection failed');
      setIsConnected(false);
      mockWsRef.current = null;
      return null;
    }
  }, [baseUrl]);

  const disconnect = useCallback(() => {
    if (mockWsRef.current) {
      // Clean up mock interval
      if ((mockWsRef.current as any).mockInterval) {
        clearInterval((mockWsRef.current as any).mockInterval);
      }
      
      mockWsRef.current.close();
      mockWsRef.current = null;
    }
    setIsConnected(false);
  }, []);

  const sendMessage = useCallback((message: any) => {
    if (mockWsRef.current && isConnected) {
      mockWsRef.current.send(JSON.stringify(message));
      return true;
    }
    return false;
  }, [isConnected]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    isConnected,
    error,
    connect,
    disconnect,
    sendMessage,
  };
};