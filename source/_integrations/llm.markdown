---
description: Provides the sets of AI tools that conversation agents and AI apps use to control your devices and to look into Home Assistant itself.
ha_categories:
  - ai_voice.ai_models
ha_release: 2026.7
ha_domain: llm
---

The **LLM** {% term integration %} provides the AI tools in Home Assistant. AI tools let a conversation agent do more than chat. With them, it can turn on your lights, tell you the temperature in the living room, or find out why an integration isn't working. <abbr title="Large Language Model">LLM</abbr> is short for large language model, the type of AI behind conversation agents.

The AI tools are grouped into sets. You choose which sets each conversation agent can use, in its **AI tools** option. AI apps outside Home Assistant can use the same sets through the [Model Context Protocol](/integrations/mcp_server/) integration.

The **LLM** integration is an internal system integration. It loads as part of the [default configuration](/integrations/default_config/). Every AI integration that adds a conversation agent loads it too. You can't add or remove it, and it has no options.

## Sets of AI tools

Each set contains related AI tools. Home Assistant has two built-in sets:

- **Device control**: Reads and controls the {% term entities %} you expose to voice assistants. For example, it can check the bedroom temperature or turn off the kitchen light. Any user can use it.
- **Home Assistant**: Looks into and manages Home Assistant itself. For example, to read the logs, look up past sensor values, or reload an integration that failed to set up. It can reach all of Home Assistant, not only exposed entities. Only administrators can use it.

On this page, the tools in the **Home Assistant** set are called the Home Assistant AI tools.

Integrations can add more sets. For example, [KNX](/integrations/knx/) adds a **KNX** set, and the [Model Context Protocol Client](/integrations/mcp/) adds a set for each server that you connect.

You choose the sets in the **AI tools** option of each conversation agent. For example, in [Anthropic](/integrations/anthropic/), [Google Gemini](/integrations/google_generative_ai_conversation/), [Ollama](/integrations/ollama/), or [OpenAI](/integrations/openai_conversation/). A new conversation agent starts with **Device control** only. In Ollama, it starts with no sets.

## Adding the Home Assistant AI tools to your conversation agent

Use this procedure if only administrators use your conversation agent. For example, in Assist in Home Assistant or in the [Home Assistant Companion app](https://companion.home-assistant.io/). There, each request comes from the user account that is signed in.

Afterwards, the conversation agent you already use can also look into Home Assistant itself. For example, you can ask it why an integration isn't working, or which errors are in the logs.

The conversation agent then only works for administrators. Requests from a voice satellite, such as [Home Assistant Voice Preview Edition](/voice-pe/), don't belong to any user, so they fail. Requests from users who aren't administrators fail too. This also stops **Device control** on this conversation agent. If voice satellites or users who aren't administrators use your assistant, under {% my voice_assistants title="**Settings** > **Voice assistants**" %}, set up a separate assistant instead. For the steps, refer to [Setting up a separate assistant for the Home Assistant AI tools](#setting-up-a-separate-assistant-for-the-home-assistant-ai-tools).

Prerequisites:

- An administrator account in Home Assistant.
- A conversation agent from an AI integration. For example, [OpenAI](/integrations/openai_conversation/).

To add the Home Assistant AI tools to your conversation agent, follow these steps:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select your AI integration.
   - For example, **OpenAI**.
2. In the row of the conversation agent, select **Reconfigure conversation agent** {% icon "mdi:cog-outline" %}.
   - The right row shows **Conversation agent** under the name. For example, **OpenAI Conversation**.
   - Don't use the rows below it. They show its devices.
   - Some integrations call this button **Configure**.
3. Under **AI tools**, select **Home Assistant**.
   - To keep controlling your devices, leave **Device control** selected.
4. Select **Submit**. If the dialog shows more options, select **Submit** again.
   - Result: The conversation agent can use the Home Assistant AI tools the next time you talk to it.

## Setting up a separate assistant for the Home Assistant AI tools

Use this procedure if voice satellites or users who aren't administrators use your assistant. An assistant is what you talk to in Assist and on a voice satellite. You find your assistants under {% my voice_assistants title="**Settings** > **Voice assistants**" %}, and each one uses a conversation agent.

Requests from a voice satellite, such as [Home Assistant Voice Preview Edition](/voice-pe/), don't belong to any user. Requests from users who aren't administrators can't use the Home Assistant AI tools either. So you leave your current assistant as it is. Instead, you add a conversation agent with the Home Assistant AI tools, and a new assistant that uses it.

Afterwards, you have two assistants:

- Your current assistant stays as it is, for voice satellites and users who aren't administrators.
- The new assistant can also look into Home Assistant itself. You select it in Assist when you want to ask about Home Assistant. For example, why an integration isn't working.

Prerequisites:

- An administrator account in Home Assistant.
- An AI integration that adds conversation agents. For example, [OpenAI](/integrations/openai_conversation/).

To set up a separate assistant for the Home Assistant AI tools, follow these steps:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select your AI integration.
   - For example, **OpenAI**.
2. Select **Add conversation agent**.
3. Under **Name**, enter a name for the new conversation agent.
   - For example, `Home Assistant helper`.
4. Under **AI tools**, select **Home Assistant**.
   - To also control your devices with it, leave **Device control** selected.
5. Select **Submit**. If the dialog shows more options, select **Submit** again.
6. Go to {% my voice_assistants title="**Settings** > **Voice assistants**" %}, and select **Add assistant**.
7. Enter a name for the assistant. Under **Conversation agent**, select the conversation agent that you just added.
8. Select **Create**.
9. To use the new assistant, open the Assist dialog. At the top, select the name of the current assistant, and then select the new assistant.
   - Result: The new assistant can use the Home Assistant AI tools in the Assist dialog of Home Assistant and of the [Home Assistant Companion app](https://companion.home-assistant.io/). This works when you're signed in with an administrator account.
