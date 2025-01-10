export class APIClient {
      constructor(config) {
        this.config = config
      }

      async generateResponse(prompt, agentConfig) {
        try {
          const response = await fetch(this.config.endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.config.apiKey}`
            },
            body: JSON.stringify({
              model: this.config.model,
              messages: [{
                role: 'user',
                content: `You are ${agentConfig.name}, ${agentConfig.personality}. ${agentConfig.guidelines}. Respond to: ${prompt}`
              }],
              temperature: this.config.temperature,
              max_tokens: this.config.maxTokens
            })
          })

          if (!response.ok) {
            throw new Error(`API Error: ${response.status}`)
          }

          const data = await response.json()
          return data.choices[0].message.content
        } catch (error) {
          console.error('API Error:', error)
          return `Error generating response: ${error.message}`
        }
      }
    }
