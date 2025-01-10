export class WebSocketClient {
      constructor(url) {
        this.url = url
        this.socket = null
        this.listeners = new Map()
      }

      connect() {
        this.socket = new WebSocket(this.url)
        
        this.socket.onopen = () => {
          this.emit('connect')
        }

        this.socket.onmessage = (event) => {
          const data = JSON.parse(event.data)
          this.emit(data.type, data.payload)
        }

        this.socket.onclose = () => {
          this.emit('disconnect')
        }
      }

      on(event, callback) {
        if (!this.listeners.has(event)) {
          this.listeners.set(event, [])
        }
        this.listeners.get(event).push(callback)
      }

      emit(event, data) {
        if (this.listeners.has(event)) {
          this.listeners.get(event).forEach(callback => callback(data))
        }
      }

      send(type, payload) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(JSON.stringify({ type, payload }))
        }
      }

      disconnect() {
        if (this.socket) {
          this.socket.close()
        }
      }
    }
