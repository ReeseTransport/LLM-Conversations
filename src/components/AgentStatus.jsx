import React from 'react'

    export default function AgentStatus({ agents }) {
      return (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Agent Status</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(agents).map(([key, agent]) => (
              <div key={key} className="p-4 rounded-lg" style={{ backgroundColor: agent.color + '20' }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{agent.avatar}</span>
                  <div>
                    <h4 className="font-medium">{agent.name}</h4>
                    <p className="text-sm text-gray-600">{agent.status || 'Idle'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
