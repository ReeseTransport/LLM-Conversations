import React from 'react'

    export default function ExportControls({ messages }) {
      const exportJSON = () => {
        const data = {
          timestamp: new Date().toISOString(),
          messages: messages.map(msg => ({
            sender: msg.sender,
            content: msg.content,
            timestamp: msg.timestamp
          }))
        }

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `conversation-${new Date().toISOString()}.json`
        link.click()
        URL.revokeObjectURL(url)
      }

      const exportText = () => {
        const text = messages.map(msg => 
          `[${msg.timestamp}] ${msg.sender}: ${msg.content}`
        ).join('\n')

        const blob = new Blob([text], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `conversation-${new Date().toISOString()}.txt`
        link.click()
        URL.revokeObjectURL(url)
      }

      return (
        <div className="flex gap-2">
          <button
            onClick={exportJSON}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Export as JSON
          </button>
          <button
            onClick={exportText}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Export as Text
          </button>
        </div>
      )
    }
