import React, { useState } from 'react'
    import { AnimatedContainer, AnimatedList, AnimatedListItem } from './AnimatedContainer'
    import ExportControls from './ExportControls'

    export default function AgentChat({ settings }) {
      const [messages, setMessages] = useState([])
      const [input, setInput] = useState('')
      const [isTyping, setIsTyping] = useState(false)

      const handleSend = () => {
        if (input.trim()) {
          const userMessage = {
            id: messages.length + 1,
            sender: 'User',
            content: input,
            timestamp: new Date().toLocaleTimeString(),
            isAgent: false
          }
          
          setMessages(prev => [...prev, userMessage])
          setInput('')
          
          // Simulate agent response
          setTimeout(() => {
            const agentMessage = {
              id: messages.length + 2,
              sender: 'Agent',
              content: 'This is a sample response',
              timestamp: new Date().toLocaleTimeString(),
              isAgent: true
            }
            setMessages(prev => [...prev, agentMessage])
          }, 1000)
        }
      }

      return (
        <AnimatedContainer className="flex flex-col h-full">
          <div className="flex-1 p-4 overflow-y-auto">
            <AnimatedList>
              {messages.map(msg => (
                <AnimatedListItem key={msg.id}>
                  <div className={`mb-4 ${msg.isAgent ? 'ml-8' : ''}`}>
                    <div className={`text-sm font-medium ${msg.isAgent ? 'text-blue-600' : 'text-gray-600'}`}>
                      {msg.sender} <span className="text-xs text-gray-400">{msg.timestamp}</span>
                    </div>
                    <div className={`mt-1 p-2 rounded-lg ${msg.isAgent ? 'bg-blue-50' : 'bg-gray-100'}`}>
                      {msg.content}
                    </div>
                  </div>
                </AnimatedListItem>
              ))}
              
              {isTyping && (
                <AnimatedListItem>
                  <div className="ml-8">
                    <div className="text-sm font-medium text-blue-600">
                      Agent is typing...
                    </div>
                    <div className="mt-1 p-2 bg-blue-50 rounded-lg w-24">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </AnimatedListItem>
              )}
            </AnimatedList>
          </div>
          
          <AnimatedContainer className="p-4 border-t space-y-4">
            <ExportControls messages={messages} />
            
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </AnimatedContainer>
        </AnimatedContainer>
      )
    }
