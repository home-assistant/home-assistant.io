---
description: Provides the AI tools that conversation agents and AI apps use to read information, control entities, and manage Home Assistant.
ha_categories:
  - ai_voice.ai_models
ha_release: 2026.7
ha_domain: llm
---

The **LLM** {% term integration %} provides the AI tools in Home Assistant. An AI tool is a function that conversation agents and AI apps can use to read information, control entities, or manage Home Assistant. For example, with AI tools, a conversation agent can tell you the temperature in the living room, turn on your lights, or reload an integration that failed to set up. <abbr title="Large Language Model">LLM</abbr> is short for large language model. It's the type of AI that AI conversation agents use.

The AI tools are grouped into [sets](#sets-of-ai-tools). You choose which sets each conversation agent can use, in its **AI tools** option. AI apps outside Home Assistant can use the same sets through the [Model Context Protocol](/integrations/mcp_server/) integration.

The **LLM** integration is an internal system integration. It loads as part of the [default configuration](/integrations/default_config/). Every AI integration that adds a conversation agent loads it too. You can't add or remove it, and it has no options.

## Sets of AI tools

Each set contains related AI tools. Home Assistant has two built-in sets:

- **Device control**: Reads and controls the {% term entities %} you expose to voice assistants. For example, it can check the bedroom temperature or turn off the kitchen light. Any user can use it.
- **Home Assistant**: Looks into and manages Home Assistant itself. For example, it can read the logs, look up past sensor values, or reload an integration that failed to set up. It can reach all of Home Assistant, not only exposed entities. Only administrators can use it.

On this page, the tools in the **Home Assistant** set are called the Home Assistant AI tools.

Integrations can add more sets. For example, [KNX](/integrations/knx/) adds a **KNX** set, and the [Model Context Protocol Client](/integrations/mcp/) adds a set for each server that you connect.

You choose the sets in the **AI tools** option of each conversation agent. For example, [Anthropic](/integrations/anthropic/), [Google Gemini](/integrations/google_generative_ai_conversation/), [Ollama](/integrations/ollama/), and [OpenAI](/integrations/openai_conversation/) have this option. A new conversation agent starts with **Device control** only. In Ollama, it starts with no sets.

## What the Home Assistant AI tools can reach

The Home Assistant AI tools are not limited to the entities that you expose to voice assistants. They can read the state of every entity, the status of your integrations, your logs, and the history of your sensors. For the full list, refer to [List of Home Assistant AI tools](#list-of-home-assistant-ai-tools).

Most of the Home Assistant AI tools only read. Two tools can change things:

- **Call action** can perform any action in Home Assistant, on any entity, device, or area. This includes entities that you didn't expose. For example, it can turn off a light, run a script, or restart Home Assistant.
- **Reload config entry** can reload an integration.

## Adding the Home Assistant AI tools to your conversation agent

Use this procedure if only administrators use your conversation agent. For example, they use it in Assist in Home Assistant or in the [Home Assistant Companion app](https://companion.home-assistant.io/). There, each request comes from the user account that is signed in.

Afterwards, the conversation agent you already use can also look into Home Assistant itself. For example, you can ask it why an integration isn't working, or which errors are in the logs.

The conversation agent then only works for administrators. Requests from a voice satellite, such as [Home Assistant Voice Preview Edition](/voice-pe/), don't belong to any user, so they fail. Requests from users who aren't administrators fail too. This also stops **Device control** on this conversation agent. If voice satellites or users who aren't administrators use your assistant, under {% my voice_assistants title="**Settings** > **Voice assistants**" %}, set up a separate assistant instead. For the steps, refer to [Setting up a separate assistant for the Home Assistant AI tools](#setting-up-a-separate-assistant-for-the-home-assistant-ai-tools).

Prerequisites:

- An administrator account in Home Assistant.
- A conversation agent from an AI integration. For example, [OpenAI](/integrations/openai_conversation/) adds conversation agents.

To add the Home Assistant AI tools to your conversation agent, follow these steps:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select your AI integration.
   - For example, select **OpenAI**.
2. In the row of the conversation agent, select **Reconfigure conversation agent** {% icon "mdi:cog-outline" %}.
   - The right row shows **Conversation agent** under the name. For example, OpenAI calls it **OpenAI Conversation**.
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
- The new assistant can also look into Home Assistant itself. You select it in Assist when you want to ask about Home Assistant. For example, you can ask why an integration isn't working.

Prerequisites:

- An administrator account in Home Assistant.
- An AI integration that adds conversation agents. For example, [OpenAI](/integrations/openai_conversation/) adds them.

To set up a separate assistant for the Home Assistant AI tools, follow these steps:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select your AI integration.
   - For example, select **OpenAI**.
2. Select **Add conversation agent**.
3. Under **Name**, enter a name for the new conversation agent.
   - For example, enter `Home Assistant helper`.
4. Under **AI tools**, select **Home Assistant**.
   - To also control your devices with it, leave **Device control** selected.
5. Select **Submit**. If the dialog shows more options, select **Submit** again.
6. Go to {% my voice_assistants title="**Settings** > **Voice assistants**" %}, and select **Add assistant**.
7. Enter a name for the assistant. Under **Conversation agent**, select the conversation agent that you just added.
8. Select **Create**.
9. To use the new assistant, open the Assist dialog. At the top, select the name of the current assistant, and then select the new assistant.
   - Result: The new assistant can use the Home Assistant AI tools in the Assist dialog of Home Assistant and of the [Home Assistant Companion app](https://companion.home-assistant.io/). This works when you're signed in with an administrator account.

## Supported functionality

### List of Home Assistant AI tools

You don't call these tools yourself. When you ask the conversation agent something, it decides which tools to call. You can't select single tools. You give the conversation agent the entire set, as described in [Adding the Home Assistant AI tools to your conversation agent](#adding-the-home-assistant-ai-tools-to-your-conversation-agent).

The **Home Assistant** set of AI tools contains the following tools. Each entry starts with the title of the tool, followed by its ID. The Assist dialog shows the ID under **Show details**. Many tools do something that you can also do yourself in the UI, without a conversation agent. Where you can, the entry says how. For example, you can check what the conversation agent tells you.

- **Render template** (`homeassistant__render_template`): Renders a [template](/docs/templating/) and returns the result. Templates can read the state and attributes of all entities. Only reads.
  - To do this yourself: Use the **Template** tab, under {% my developer_template title="**Settings** > **Tools** > **Template**" %}.
- **Search actions** (`homeassistant__search_actions`): Finds the actions that Home Assistant can perform, with their targets and fields. Only reads.
  - To do this yourself: Use the **Actions** tab, under {% my developer_services title="**Settings** > **Tools** > **Actions**" %}.
- **Call action** (`homeassistant__call_action`): Performs an action, and returns its response if it has one. Changes things.
  - To do this yourself: Use the **Actions** tab, under {% my developer_services title="**Settings** > **Tools** > **Actions**" %}.
  - To see which actions the conversation agent performed: Go to **Settings** > **Tools** > **Action history**.
- **Get config entries** (`config__get_config_entries`): Lists the integrations and helpers that are set up, with their status, such as loaded or failed to set up, and the reason for an error. It can filter by integration and by status. Only reads.
  - To do this yourself: Go to {% my integrations title="**Settings** > **Devices & services**" %}.
- **Reload config entry** (`config__reload_config_entry`): Reloads an integration that is set up. For example, it helps after a temporary connection error. Changes things.
  - To do this yourself: On the integration page, under {% my integrations title="**Settings** > **Devices & services**" %}, select **Menu** {% icon "mdi:dots-vertical" %} > **Reload** on the integration entry.
- **Search available integrations** (`config__search_integrations`): Searches the integrations and helpers that you can set up from the UI, including ones that you haven't added yet. Only reads.
  - To do this yourself: Select **Add integration**, under {% my integrations title="**Settings** > **Devices & services**" %}.
- **Search Home Assistant** (`search__search`): Finds entities, devices, areas, labels, automations, scripts, and scenes by name. Only reads.
  - To do this yourself: Use the [quick search](/docs/tools/quick-search/).
- **Get system info** (`system_health__get_system_info`): Returns the installation type, the time zone, and the versions of Home Assistant Core, the frontend, Python, the operating system, and the Supervisor. For example, you can use it to fill in a bug report. Only reads.
  - To do this yourself: Under {% my repairs title="**Settings** > **System** > **Repairs**" %}, select **Menu** {% icon "mdi:dots-vertical" %} > **System information**.
- **Get history** (`history__get_history`): Returns statistics of entities, not their individual state changes. For example, it can return the mean, minimum, and maximum temperature per 5 minutes or per hour. It only works for entities with statistics, such as sensors with a state class. Only reads.
  - To do this yourself: Use the {% my history title="**History**" %} panel.
- **Get system log entries** (`system_log__get_entries`): Returns recent errors and warnings from the system log. It doesn't include info or debug messages. It can filter by level and by integration. Only reads.
  - To do this yourself: Go to {% my logs title="**Settings** > **System** > **Logs**" %}.
- **Get logs** (`system_log__get_logs` or `hassio__get_logs`): Reads the full logs in a time window, including info and debug messages. Values that look like credentials are masked. Only reads.
  - On {% term "Home Assistant Operating System" %} and {% term "Home Assistant Supervised" %} installations, the ID is `hassio__get_logs`. It also reads the logs of the Supervisor, the operating system, the DNS, audio, and multicast plugins, and your apps.
  - On {% term "Home Assistant Container" %} installations, and on other installations without the Supervisor, the ID is `system_log__get_logs`. It only reads the Home Assistant log, and it needs the log file.
  - To do this yourself: Under {% my logs title="**Settings** > **System** > **Logs**" %}, select **Menu** {% icon "mdi:dots-vertical" %} > **Show raw logs**.
- **Get date and time** (`llm__GetDateTime`): Returns the current date and time. Both built-in sets of AI tools, **Device control** and **Home Assistant**, have this tool. Only reads.
