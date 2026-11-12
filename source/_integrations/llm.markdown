---
description: Provides the sets of tools that AI assistants use to control your devices and to look into Home Assistant itself.
ha_release: 2026.7
ha_domain: llm
---

The **LLM** {% term integration %} provides the AI tools in Home Assistant. AI tools let an AI assistant do more than chat. With them, a conversation agent can turn on your lights, tell you the temperature in the living room, or find out why an integration isn't working. <abbr title="Large Language Model">LLM</abbr> is short for large language model, the type of AI behind these assistants.

The tools are grouped into sets of tools. You choose which sets each conversation agent can use, in its **AI tools** option. AI apps outside Home Assistant can use the same sets through the [Model Context Protocol](/integrations/mcp_server/) integration. On this page, an AI assistant is either a conversation agent in Home Assistant or such an AI app.

The **LLM** integration is an internal system integration. Home Assistant sets it up automatically, together with the [Conversation](/integrations/conversation/) integration. You can't add or remove it, and it has no options.

## Sets of tools

A set of tools is a group of tools that an AI assistant can call. Home Assistant has two built-in sets:

- **Device control**: Controls and reads the {% term entities %} that you expose to voice assistants. For example, to turn off the kitchen light, or to read the temperature of a bedroom sensor. Any user can use it.
- **Home Assistant**: Looks into and manages Home Assistant itself. For example, to read the logs, look up past sensor values, or reload an integration that failed to set up. It reaches everything in Home Assistant, not only exposed entities. Only administrators can use it.

On this page, the tools in the **Home Assistant** set are called the Home Assistant AI tools.

Integrations can add more sets. For example, [KNX](/integrations/knx/) adds a **KNX** set, and the [Model Context Protocol Client](/integrations/mcp/) adds a set for each server that you connect.

You choose the sets in the **AI tools** option of each conversation agent. For example, in [Anthropic](/integrations/anthropic/), [Google Gemini](/integrations/google_generative_ai_conversation/), [Ollama](/integrations/ollama/), or [OpenAI](/integrations/openai_conversation/). A new conversation agent starts with **Device control** only. In Ollama, it starts with no sets.

## What the Home Assistant AI tools can reach

The Home Assistant AI tools are not limited to the entities that you expose to voice assistants. They can read the state of every entity, the status of your integrations, your logs, and the history of your sensors. For the full list, refer to [List of Home Assistant AI tools](#list-of-home-assistant-ai-tools).

Most of the Home Assistant AI tools only read. Two tools can change things:

- **Call action** can perform any action in Home Assistant, on any entity, device, or area. This includes entities that you didn't expose. For example, it can turn off a light, run a script, or restart Home Assistant.
- **Reload config entry** can reload an integration.

## Giving a conversation agent the Home Assistant AI tools

To let a conversation agent help you look into Home Assistant, give it the **Home Assistant** set of tools. You can then ask it about Home Assistant. For example, why an integration isn't working, or which errors are in the logs.

Only administrators can use the Home Assistant AI tools. Voice assistant devices don't sign in as a user, so they can't use them either. If you talk to your conversation agent through a voice assistant device, you can add a second conversation agent for this, and keep the first one on **Device control**.

Prerequisites:

- An administrator account in Home Assistant.
- A conversation agent from an AI integration. For example, [OpenAI](/integrations/openai_conversation/).

To give a conversation agent the Home Assistant AI tools, follow these steps:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select the integration of your AI service.
   - For example, **OpenAI**.
2. In the row of the conversation agent, select **Reconfigure conversation agent** {% icon "mdi:cog-outline" %}.
   - The row of a conversation agent shows **Conversation agent** under its name. For example, **OpenAI Conversation**.
   - Don't use the rows below it. They are the devices of the conversation agent.
   - In some integrations, this button is called **Configure**.
3. Under **AI tools**, select **Home Assistant**.
   - To keep controlling your devices with this conversation agent, leave **Device control** selected too.
4. Select **Submit**. If the dialog shows more options, select **Submit** again.
   - Result: The conversation agent can use the Home Assistant AI tools the next time you talk to it.

## Supported functionality

### List of Home Assistant AI tools

You don't call these tools yourself. When you ask the AI assistant something, it decides which tools to call. You can't select single tools. You give the conversation agent the entire set, as described in [Giving a conversation agent the Home Assistant AI tools](#giving-a-conversation-agent-the-home-assistant-ai-tools).

The **Home Assistant** set of tools contains the following tools. Each entry starts with the title of the tool, followed by its ID. The Assist dialog shows the ID under **Show details**. Many tools do something that you can also do yourself in the UI, without an AI assistant. Where you can, the entry says how. For example, to check what the AI assistant tells you.

- **Render template** (`homeassistant__render_template`): Renders a [template](/docs/templating/) and returns the result. Templates can read the state and attributes of all entities. Only reads.
  - To do this yourself: Use the **Template** tab, under {% my developer_template title="**Settings** > **Tools** > **Template**" %}.
- **Search actions** (`homeassistant__search_actions`): Finds the actions that Home Assistant can perform, with their targets and fields. Only reads.
  - To do this yourself: Use the **Actions** tab, under {% my developer_services title="**Settings** > **Tools** > **Actions**" %}.
- **Call action** (`homeassistant__call_action`): Performs an action, and returns its response if it has one. Changes things.
  - To do this yourself: Use the **Actions** tab, under {% my developer_services title="**Settings** > **Tools** > **Actions**" %}.
  - To see which actions the AI assistant performed: Go to **Settings** > **Tools** > **Action history**.
- **Get config entries** (`config__get_config_entries`): Lists the integrations and helpers that are set up, with their status, such as loaded or failed to set up, and the reason for an error. It can filter by integration and by status. Only reads.
  - To do this yourself: Go to {% my integrations title="**Settings** > **Devices & services**" %}.
- **Reload config entry** (`config__reload_config_entry`): Reloads an integration that is set up. For example, after a temporary connection error. Changes things.
  - To do this yourself: On the integration page, under {% my integrations title="**Settings** > **Devices & services**" %}, select **Menu** {% icon "mdi:dots-vertical" %} > **Reload** on the integration entry.
- **Search available integrations** (`config__search_integrations`): Searches the integrations and helpers that you can set up from the UI, including ones that you haven't added yet. Only reads.
  - To do this yourself: Select **Add integration**, under {% my integrations title="**Settings** > **Devices & services**" %}.
- **Search Home Assistant** (`search__search`): Finds entities, devices, areas, labels, automations, scripts, and scenes by name. Only reads.
  - To do this yourself: Use the [quick search](/docs/tools/quick-search/).
- **Get system info** (`system_health__get_system_info`): Returns the installation type, the time zone, and the versions of Home Assistant Core, the frontend, Python, the operating system, and the Supervisor. For example, to fill in a bug report. Only reads.
  - To do this yourself: Under {% my repairs title="**Settings** > **System** > **Repairs**" %}, select **Menu** {% icon "mdi:dots-vertical" %} > **System information**.
- **Get history** (`history__get_history`): Returns statistics of entities, not their individual state changes. For example, the mean, minimum, and maximum temperature per 5 minutes or per hour. It only works for entities with statistics, such as sensors with a state class. Only reads.
  - To do this yourself: Use the {% my history title="**History**" %} panel.
- **Get system log entries** (`system_log__get_entries`): Returns recent errors and warnings from the system log. It doesn't include info or debug messages. It can filter by level and by integration. Only reads.
  - To do this yourself: Go to {% my logs title="**Settings** > **System** > **Logs**" %}.
- **Get logs** (`system_log__get_logs` or `hassio__get_logs`): Reads the full logs in a time window, including info and debug messages. Values that look like credentials are masked. Only reads.
  - On {% term "Home Assistant Operating System" %} and {% term "Home Assistant Supervised" %} installations, the ID is `hassio__get_logs`. It also reads the logs of the Supervisor, the operating system, the DNS, audio, and multicast plugins, and your apps.
  - On {% term "Home Assistant Container" %} installations, and on other installations without the Supervisor, the ID is `system_log__get_logs`. It only reads the Home Assistant log, and it needs the log file.
  - To do this yourself: Under {% my logs title="**Settings** > **System** > **Logs**" %}, select **Menu** {% icon "mdi:dots-vertical" %} > **Show raw logs**.
- **Get date and time** (`llm__GetDateTime`): Returns the current date and time. Both built-in sets of tools, **Device control** and **Home Assistant**, have this tool. Only reads.

## Known limitations

- Only administrators can use the Home Assistant LLM tools. Requests without an administrator account fail. For example, requests from a voice assistant device, or from a user who isn't an administrator. This also stops **Device control** on that conversation agent, because the agent can't prepare any of its sets of tools.
- The **Home Assistant Cloud** conversation agent of [Home Assistant Cloud](/integrations/cloud/) can't use the Home Assistant LLM tools. It always uses **Device control**.
- **Get history** returns statistics, not individual state changes. Entities without statistics have no history for this tool. For example, a switch or a sensor without a [state class](/integrations/sensor/#state-class). For how statistics work, refer to [Long-term statistics](/docs/configuration/long-term-statistics/).
- In {% term "Home Assistant Container" %} installations, and in other installations without the Supervisor, **Get logs** needs the Home Assistant log file. If Home Assistant doesn't write a log file, this tool isn't available. For example, the `HA_DISABLE_LOG_FILE` environment variable turns off the log file.
- **Get logs** masks values that look like credentials, such as tokens, passwords, and API keys. It can't recognize every credential, so other secrets in your logs can still reach the AI provider.
