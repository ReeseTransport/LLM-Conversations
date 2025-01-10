import React, { useState, useEffect } from 'react'
    import { defaultConfigs } from '../lib/defaultConfigs'

    export default function SettingsPanel({ onSave, darkMode, toggleDarkMode }) {
      const [settings, setSettings] = useState(defaultConfigs)

      const handleChange = (section, field, value) => {
        setSettings(prev => ({
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value
          }
        }))
      }

      const handleSave = () => {
        localStorage.setItem('agentSettings', JSON.stringify(settings))
        onSave(settings)
      }

      const resetToDefaults = () => {
        setSettings(defaultConfigs)
        localStorage.removeItem('agentSettings')
        onSave(defaultConfigs)
      }

      return (
        <div className={`p-4 rounded-lg shadow h-full flex flex-col ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <h2 className="text-xl font-bold mb-4">Configuration</h2>
          
          <div className="overflow-y-auto flex-1 pr-2">
            {/* API Settings */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">API Settings</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium mb-1">Endpoint</label>
                  <input
                    type="text"
                    value={settings.api.endpoint}
                    onChange={(e) => handleChange('api', 'endpoint', e.target.value)}
                    className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">API Key</label>
                  <input
                    type="password"
                    value={settings.api.apiKey}
                    onChange={(e) => handleChange('api', 'apiKey', e.target.value)}
                    className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Model</label>
                  <input
                    type="text"
                    value={settings.api.model}
                    onChange={(e) => handleChange('api', 'model', e.target.value)}
                    className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Temperature</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="2"
                    value={settings.api.temperature}
                    onChange={(e) => handleChange('api', 'temperature', parseFloat(e.target.value))}
                    className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Max Tokens</label>
                  <input
                    type="number"
                    value={settings.api.maxTokens}
                    onChange={(e) => handleChange('api', 'maxTokens', parseInt(e.target.value))}
                    className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                  />
                </div>
              </div>
            </div>

            {/* Agent Settings */}
            {Object.entries(settings).filter(([key]) => key !== 'api').map(([key, config]) => (
              <div key={key} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{config.name} Settings</h3>
                
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      value={config.name}
                      onChange={(e) => handleChange(key, 'name', e.target.value)}
                      className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Avatar</label>
                    <input
                      type="text"
                      value={config.avatar}
                      onChange={(e) => handleChange(key, 'avatar', e.target.value)}
                      className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Color</label>
                    <input
                      type="color"
                      value={config.color}
                      onChange={(e) => handleChange(key, 'color', e.target.value)}
                      className="w-full h-10"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Personality</label>
                    <textarea
                      value={config.personality}
                      onChange={(e) => handleChange(key, 'personality', e.target.value)}
                      className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                      rows="2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Guidelines</label>
                    <textarea
                      value={config.guidelines}
                      onChange={(e) => handleChange(key, 'guidelines', e.target.value)}
                      className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                      rows="3"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Response Style</label>
                    <select
                      value={config.responseStyle}
                      onChange={(e) => handleChange(key, 'responseStyle', e.target.value)}
                      className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                    >
                      <option value="concise">Concise</option>
                      <option value="detailed">Detailed</option>
                      <option value="technical">Technical</option>
                      <option value="creative">Creative</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Tone</label>
                    <select
                      value={config.tone}
                      onChange={(e) => handleChange(key, 'tone', e.target.value)}
                      className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                    >
                      <option value="professional">Professional</option>
                      <option value="friendly">Friendly</option>
                      <option value="enthusiastic">Enthusiastic</option>
                      <option value="formal">Formal</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Expertise</label>
                    <input
                      type="text"
                      value={config.expertise}
                      onChange={(e) => handleChange(key, 'expertise', e.target.value)}
                      className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Communication Style</label>
                    <select
                      value={config.communicationStyle}
                      onChange={(e) => handleChange(key, 'communicationStyle', e.target.value)}
                      className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                    >
                      <option value="direct">Direct</option>
                      <option value="diplomatic">Diplomatic</option>
                      <option value="expressive">Expressive</option>
                      <option value="analytical">Analytical</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            <button
              onClick={handleSave}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save Configuration
            </button>
            
            <button
              onClick={resetToDefaults}
              className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Reset to Defaults
            </button>
            
            <button
              onClick={toggleDarkMode}
              className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      )
    }
