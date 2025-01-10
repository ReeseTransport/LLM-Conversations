import React, { useState, useEffect } from 'react'
    import AgentChat from '../components/AgentChat'
    import TaskInput from '../components/TaskInput'
    import SettingsPanel from '../components/SettingsPanel'
    import AgentStatus from '../components/AgentStatus'
    import HistoryPanel from '../components/HistoryPanel'
    import { AnimatedContainer } from '../components/AnimatedContainer'

    export default function Home() {
      const [showSettings, setShowSettings] = useState(false)
      const [settings, setSettings] = useState(null)
      const [darkMode, setDarkMode] = useState(false)
      const [agents, setAgents] = useState({
        planner: {
          name: 'Planner',
          avatar: '🧠',
          color: '#3b82f6',
          status: 'Idle'
        },
        creative: {
          name: 'Creative',
          avatar: '🎨',
          color: '#f59e0b',
          status: 'Idle'
        }
      })

      useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode') === 'true'
        setDarkMode(savedDarkMode)
      }, [])

      const toggleDarkMode = () => {
        const newDarkMode = !darkMode
        setDarkMode(newDarkMode)
        localStorage.setItem('darkMode', newDarkMode)
      }

      const handleSaveSettings = (newSettings) => {
        setSettings(newSettings)
        setAgents(prev => ({
          planner: {
            ...prev.planner,
            name: newSettings.planner.name,
            avatar: newSettings.planner.avatar,
            color: newSettings.planner.color
          },
          creative: {
            ...prev.creative,
            name: newSettings.creative.name,
            avatar: newSettings.creative.avatar,
            color: newSettings.creative.color
          }
        }))
      }

      return (
        <div className={`h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50'}`}>
          <header className={`p-4 border-b flex justify-between items-center transition-colors duration-300 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h1 className="text-2xl font-bold">Multi-Agent Collaboration</h1>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`px-4 py-2 rounded-lg transition-colors duration-300 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {showSettings ? 'Hide Settings' : 'Settings'}
            </button>
          </header>
          
          <main className="flex-1 overflow-hidden">
            <div className="h-full flex">
              <div className={`flex-1 ${showSettings ? 'w-2/3' : 'w-full'}`}>
                <div className="h-full flex flex-col">
                  <AnimatedContainer className="p-4">
                    <TaskInput onSubmit={(task) => console.log('Task:', task)} />
                    <AgentStatus agents={agents} />
                  </AnimatedContainer>
                  <div className="flex-1 overflow-hidden">
                    <AgentChat settings={settings} darkMode={darkMode} />
                  </div>
                  <HistoryPanel history={[]} />
                </div>
              </div>
              
              {showSettings && (
                <AnimatedContainer className={`w-1/3 border-l transition-colors duration-300 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <SettingsPanel 
                    onSave={handleSaveSettings}
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                </AnimatedContainer>
              )}
            </div>
          </main>
        </div>
      )
    }
