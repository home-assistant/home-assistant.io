---
description: Provides the sets of tools that AI assistants use to control your devices and to look into Home Assistant itself.
ha_release: 2026.7
ha_domain: llm
---

The **LLM** {% term integration %} provides the AI tools in Home Assistant. AI tools let an AI assistant do more than chat. With them, a conversation agent can turn on your lights, tell you the temperature in the living room, or find out why an integration isn't working. <abbr title="Large Language Model">LLM</abbr> is short for large language model, the type of AI behind these assistants.

The tools are grouped into sets of tools. You choose which sets each conversation agent can use, in its **AI tools** option. AI apps outside Home Assistant can use the same sets through the [Model Context Protocol](/integrations/mcp_server/) integration.

The **LLM** integration is an internal system integration. Home Assistant sets it up automatically, together with the [Conversation](/integrations/conversation/) integration. You can't add or remove it, and it has no options.

## Sets of tools

A set of tools is a group of tools that an AI assistant can call. Home Assistant has two built-in sets:

- **Device control**: Controls and reads the {% term entities %} that you expose to voice assistants. For example, to turn off the kitchen light, or to read the temperature of a bedroom sensor. Any user can use it.
- **Home Assistant**: Looks into and manages Home Assistant itself. For example, to read the logs, look up past sensor values, or reload an integration that failed to set up. It reaches everything in Home Assistant, not only exposed entities. Only administrators can use it.

Integrations can add more sets. For example, [KNX](/integrations/knx/) adds a **KNX** set, and the [Model Context Protocol Client](/integrations/mcp/) adds a set for each server that you connect.

You choose the sets in the **AI tools** option of each conversation agent, for example in [Anthropic](/integrations/anthropic/), [Google Gemini](/integrations/google_generative_ai_conversation/), [Ollama](/integrations/ollama/), or [OpenAI](/integrations/openai_conversation/). A new conversation agent starts with **Device control** only. In Ollama, it starts with no sets.

## Giving a conversation agent the Home Assistant tools

To let a conversation agent help you look into Home Assistant, give it the **Home Assistant** set of tools. You can then ask it, for example, why an integration isn't working, or which errors are in the logs.

Only administrators can use the **Home Assistant** tools. Voice assistant devices don't sign in as a user, so they can't use them either. If you talk to your conversation agent through a voice assistant device, you can add a second conversation agent for this, and keep the first one on **Device control**.

Prerequisites:

- An administrator account in Home Assistant
- A conversation agent from an AI integration, for example [OpenAI](/integrations/openai_conversation/)

To give a conversation agent the Home Assistant tools, follow these steps:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select the integration of your AI service.
   - For example, **OpenAI**.
2. In the row of the conversation agent, select **Reconfigure conversation agent** {% icon "mdi:cog-outline" %}.
   - The row of a conversation agent shows **Conversation agent** under its name. For example, **OpenAI Conversation**.
   - Don't use the rows below it. They are the devices of the conversation agent.
   - In some integrations, this button is called **Configure**.
3. Under **AI tools**, select **Home Assistant**.
   - To keep controlling your devices with this conversation agent, leave **Device control** selected too.
4. Select **Submit**. If the dialog shows more options, select **Submit** again.
   - Result: The conversation agent can use the **Home Assistant** tools the next time you talk to it.
