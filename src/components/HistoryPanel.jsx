import React from 'react'

    export default function HistoryPanel({ history }) {
      return (
        <div className="p-4 border-t">
          <h3 className="text-lg font-semibold mb-2">Conversation History</h3>
          <div className="space-y-2">
            {history.map((item, index) => (
              <div key={index} className="p-2 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">{item.timestamp}</div>
                <div className="font-medium">{item.sender}:</div>
                <div>{item.content}</div>
              </div>
            ))}
          </div>
        </div>
      )
    }
