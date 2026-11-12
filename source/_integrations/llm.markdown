---
description: Provides the sets of tools that conversation agents and AI apps use to control your devices and to look into Home Assistant itself.
ha_release: 2026.7
ha_domain: llm
---

The **LLM** {% term integration %} provides the AI tools in Home Assistant. AI tools let a conversation agent do more than chat. With them, it can turn on your lights, tell you the temperature in the living room, or find out why an integration isn't working. <abbr title="Large Language Model">LLM</abbr> is short for large language model, the type of AI behind conversation agents.

The tools are grouped into sets of tools. You choose which sets each conversation agent can use, in its **AI tools** option. AI apps outside Home Assistant can use the same sets through the [Model Context Protocol](/integrations/mcp_server/) integration.

The **LLM** integration is an internal system integration. Home Assistant sets it up automatically, together with the [Conversation](/integrations/conversation/) integration. You can't add or remove it, and it has no options.

## Sets of tools

A set of tools is a group of tools that a conversation agent or an AI app can call. Home Assistant has two built-in sets:

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

You don't call these tools yourself. When you ask the conversation agent something, it decides which tools to call. You can't select single tools. You give the conversation agent the entire set, as described in [Giving a conversation agent the Home Assistant AI tools](#giving-a-conversation-agent-the-home-assistant-ai-tools).

The **Home Assistant** set of tools contains the following tools. Each entry starts with the title of the tool, followed by its ID. The Assist dialog shows the ID under **Show details**. Many tools do something that you can also do yourself in the UI, without a conversation agent. Where you can, the entry says how. For example, to check what the conversation agent tells you.

- **Render template** (`homeassistant__render_template`): Renders a [template](/docs/templating/) and returns the result. Templates can read the state and attributes of all entities. Only reads.
  - To do this yourself: Use the **Template** tab, under {% my developer_template title="**Settings** > **Tools** > **Template**" %}.
- **Search actions** (`homeassistant__search_actions`): Finds the actions that Home Assistant can perform, with their targets and fields. Only reads.
  - To do this yourself: Use the **Actions** tab, under {% my developer_services title="**Settings** > **Tools** > **Actions**" %}.
- **Call action** (`homeassistant__call_action`): Performs an action, and returns its response if it has one. Changes things.
  - To do this yourself: Use the **Actions** tab, under {% my developer_services title="**Settings** > **Tools** > **Actions**" %}.
  - To see which actions the conversation agent performed: Go to **Settings** > **Tools** > **Action history**.
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

- Only administrators can use the Home Assistant AI tools. Requests without an administrator account fail. For example, requests from a voice assistant device, or from a user who isn't an administrator. This also stops **Device control** on that conversation agent, because the agent can't prepare any of its sets of tools.
- The **Home Assistant Cloud** conversation agent of [Home Assistant Cloud](/integrations/cloud/) can't use the Home Assistant AI tools. It always uses **Device control**.
- **Get history** returns statistics, not individual state changes. Entities without statistics have no history for this tool. For example, a switch or a sensor without a [state class](/integrations/sensor/#state-class). For how statistics work, refer to [Long-term statistics](/docs/configuration/long-term-statistics/).
- In {% term "Home Assistant Container" %} installations, and in other installations without the Supervisor, **Get logs** needs the Home Assistant log file. If Home Assistant doesn't write a log file, this tool isn't available. For example, the `HA_DISABLE_LOG_FILE` environment variable turns off the log file.
- **Get logs** masks values that look like credentials, such as tokens, passwords, and API keys. It can't recognize every credential, so other secrets in your logs can still reach the AI provider.

## Troubleshooting

{% details "The conversation agent answers “Error preparing LLM API”" %}

### Symptom: "Error preparing LLM API"

When you talk to a conversation agent, it doesn't do what you asked. Instead, it answers "Error preparing LLM API".

#### Description

The conversation agent couldn't prepare its sets of tools. This happens in the following situations:

- The conversation agent has the Home Assistant AI tools, and the request doesn't come from an administrator. For example, it comes from a voice assistant device, or from a user who isn't an administrator. In this case, **Device control** doesn't work on this conversation agent either.
- A set of tools that the conversation agent uses no longer exists. For example, because you removed the integration that added it.

#### Resolution

The Home Assistant AI tools only work for administrators. You can't make them available to other users or to voice assistant devices. If a voice assistant device or a user who isn't an administrator uses this conversation agent, remove the Home Assistant AI tools from it:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select the integration of your AI service.
2. In the row of the conversation agent, select **Reconfigure conversation agent** {% icon "mdi:cog-outline" %}.
   - In some integrations, this button is called **Configure**.
3. Under **AI tools**, clear **Home Assistant**.
   - To keep controlling your devices with this conversation agent, make sure **Device control** is selected.
4. Select **Submit**. If the dialog shows more options, select **Submit** again.
   - Result: The conversation agent controls your devices again, for everyone who uses it.

To keep using the Home Assistant AI tools yourself, add a second conversation agent, and give it the Home Assistant AI tools. For the steps, refer to [Giving a conversation agent the Home Assistant AI tools](#giving-a-conversation-agent-the-home-assistant-ai-tools). Use this second conversation agent in its own assistant, under {% my voice_assistants title="**Settings** > **Voice assistants**" %}. Don't use that assistant on your voice assistant devices. Other users can also select it in the Assist dialog, but it only works for administrators.

If you removed the integration that added a set of tools, open the settings of the conversation agent, as described in steps 1 and 2 above. Then, select **Submit**. If the dialog shows more options, select **Submit** again. The settings only show the sets of tools that still exist, so saving them removes the missing set.

{% enddetails %}

{% details "Get history: “No statistics are recorded for this entity”" %}

### Symptom: The conversation agent can't tell you the past values of an entity

You ask the conversation agent about the past values of an entity, and it can't answer. Under **Show details** in the Assist dialog, the result of `history__get_history` says "No statistics are recorded for this entity."

#### Description

**Get history** only reads statistics, not individual state changes. Home Assistant only keeps statistics for entities that measure something over time, such as a temperature sensor or an energy meter. Other entities have no statistics. For example, a switch. For how statistics work, refer to [Long-term statistics](/docs/configuration/long-term-statistics/).

#### Resolution

- To see the past states of the entity yourself, use the {% my history title="**History**" %} panel.
- If the entity is a sensor that should have statistics, check for an issue under {% my developer_statistics title="**Settings** > **Tools** > **Statistics**" %}. For how to fix it, refer to [Fixing a statistics issue](/docs/tools/dev-tools/#fixing-a-statistics-issue).

{% enddetails %}
