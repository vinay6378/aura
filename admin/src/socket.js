// Shared-hosting-safe realtime helper.
// The admin dashboard should use short polling/SSE instead of Socket.IO.
// This compatibility export intentionally performs no WebSocket connection.
export function connectRealtime(_token, handlers = {}) {
  return {
    close() {},
    disconnect() {},
    on() {},
    handlers
  };
}
