import { APIClient } from './api'
    import { defaultConfigs } from './defaultConfigs'

    export class Agent {
      constructor(name, personality, guidelines, apiClient, config) {
        this.name = name
        this.personality = personality
        this.guidelines = guidelines
        this.apiClient = apiClient
        this.config = config
      }

      async generateResponse(input, otherAgent) {
        const prompt = `${otherAgent ? `Responding to ${otherAgent.name}: ` : ''}${input}`
        
        const response = await this.apiClient.generateResponse(prompt, {
          name: this.name,
          personality: this.personality,
          guidelines: this.guidelines,
          ...this.config
        })

        return {
          id: Date.now(),
          sender: this.name,
          content: response,
          timestamp: new Date().toLocaleTimeString(),
          isAgent: true,
          config: this.config
        }
      }
    }

    export function createAgents(apiConfig, agentConfigs) {
      const apiClient = new APIClient(apiConfig)
      
      return {
        planner: new Agent(
          agentConfigs.planner.name,
          agentConfigs.planner.personality,
          agentConfigs.planner.guidelines,
          apiClient,
          {
            avatar: agentConfigs.planner.avatar,
            color: agentConfigs.planner.color,
            responseStyle: agentConfigs.planner.responseStyle,
            tone: agentConfigs.planner.tone,
            expertise: agentConfigs.planner.expertise,
            communicationStyle: agentConfigs.planner.communicationStyle
          }
        ),
        creative: new Agent(
          agentConfigs.creative.name,
          agentConfigs.creative.personality,
          agentConfigs.creative.guidelines,
          apiClient,
          {
            avatar: agentConfigs.creative.avatar,
            color: agentConfigs.creative.color,
            responseStyle: agentConfigs.creative.responseStyle,
            tone: agentConfigs.creative.tone,
            expertise: agentConfigs.creative.expertise,
            communicationStyle: agentConfigs.creative.communicationStyle
          }
        )
      }
    }
