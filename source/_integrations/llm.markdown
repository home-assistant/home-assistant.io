---
description: Provides the AI tools that conversation agents and AI apps use to read information, control entities, and manage Home Assistant.
ha_categories:
  - ai_voice.ai_models
ha_release: 2026.7
ha_domain: llm
---

The **<abbr title="Large Language Model">LLM</abbr>** {% term integration %} provides the {% term "AI tools" %} in Home Assistant. An AI tool is a function that {% term "conversation agents" %} and {% term "AI apps" %} can use to read information, control {% term entities %}, or manage Home Assistant. For example, with AI tools, a conversation agent can tell you the temperature in the living room, turn on your lights, or reload an integration that failed to set up.

The AI tools are grouped into [sets](#sets-of-ai-tools). You choose which sets each conversation agent can use, in its **AI tools** option. AI apps outside Home Assistant can use the same sets through the [Model Context Protocol](/integrations/mcp_server/) integration.

The **LLM** integration is an internal system integration. It loads as part of the [default configuration](/integrations/default_config/). Every AI integration that adds a conversation agent loads it too. You can't add or remove it, and it has no options.

## Sets of AI tools

Each set contains related {% term "AI tools" %}. Home Assistant has two built-in sets:

- **Device control**: Reads and controls the {% term entities %} you expose to voice assistants. For example, it can check the bedroom temperature or turn off the kitchen light. Any user can use it.
- **Home Assistant**: Looks into and manages Home Assistant itself. For example, it can read the logs, look up past sensor values, or reload an {% term integration %} that failed to set up. It can reach all of Home Assistant, not only exposed entities. Only administrators can use it.

On this page, the tools in the **Home Assistant** set are called the Home Assistant AI tools.

Integrations can add more sets. For example, [KNX](/integrations/knx/) adds a **KNX** set, and the [Model Context Protocol Client](/integrations/mcp/) adds a set for each server that you connect.

You choose the sets in the **AI tools** option of each {% term "conversation agent" %}. For example, [Anthropic](/integrations/anthropic/), [Google Gemini](/integrations/google_generative_ai_conversation/), [Ollama](/integrations/ollama/), and [OpenAI](/integrations/openai_conversation/) have this option. A new conversation agent starts with **Device control** only. In Ollama, it starts with no sets.

{% important %}
**Risk of unintended device actions**

The **Home Assistant** set of AI tools can control every entity and change Home Assistant itself. It doesn't ask you before it acts. It also isn't limited to the entities that you expose to voice assistants. If the conversation agent misunderstands a request, it can turn off {% term devices %} or change settings that you didn't intend to change.

To avoid this:

- Only select the **Home Assistant** set for a conversation agent that you use to manage Home Assistant.
- For everyday voice control, use a separate {% term assistant %} whose conversation agent only uses **Device control**. For the steps, refer to [Setting up a separate assistant for the Home Assistant AI tools](#setting-up-a-separate-assistant-for-the-home-assistant-ai-tools).
{% endimportant %}

## What the Home Assistant AI tools can reach

The Home Assistant {% term "AI tools" %} can read the state of every entity, the status of your {% term integrations %}, your logs, and the history of your sensors. For the full list, refer to [List of Home Assistant AI tools](#list-of-home-assistant-ai-tools).

Most of the Home Assistant AI tools only read. Two tools can change things:

- **Call action** can perform any {% term action %} in Home Assistant, on any entity, device, or area. This includes entities that you didn't expose. For example, it can turn off a light, run a script, or restart Home Assistant.
- **Reload config entry** can reload an integration.

## Who can use the Home Assistant AI tools

Only administrators can use the Home Assistant {% term "AI tools" %}. Home Assistant checks the user account that each request comes from. When you talk to a {% term "conversation agent" %} in {% term Assist %} in Home Assistant or in the {% term "Home Assistant Companion app" %}, the request comes from the user account that is signed in.

A {% term "voice satellite" %} isn't signed in to a user account. For example, [Home Assistant Voice Preview Edition](/voice-pe/) is a voice satellite. Its requests don't belong to any user. If its conversation agent has the **Home Assistant** set selected, every request from the voice satellite fails. This also stops **Device control** on that conversation agent. This means the voice satellite can't turn on a light either. Requests from users who aren't administrators fail the same way.

## Adding the Home Assistant AI tools to your conversation agent

Use this procedure if only administrators use your {% term "conversation agent" %}. Afterwards, you can ask it why an {% term integration %} isn't working, or which errors are in the logs. The conversation agent then no longer works for {% term "voice satellites" %} or for users who aren't administrators. For details, refer to [Who can use the Home Assistant AI tools](#who-can-use-the-home-assistant-ai-tools).

Prerequisites:

- An administrator account in Home Assistant.
- A conversation agent from an AI integration. For example, [OpenAI](/integrations/openai_conversation/) adds conversation agents.

To add the Home Assistant {% term "AI tools" %} to your conversation agent:

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

Use this procedure if {% term "voice satellites" %} or users who aren't administrators use your {% term assistant %}. Your current assistant stays as it is for them. You get a second assistant that you can ask why an {% term integration %} isn't working. For details, refer to [Who can use the Home Assistant AI tools](#who-can-use-the-home-assistant-ai-tools).

Prerequisites:

- An administrator account in Home Assistant.
- An AI integration that adds conversation agents. For example, [OpenAI](/integrations/openai_conversation/) adds them.

To set up a separate assistant for the Home Assistant AI tools:

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
   - Result: The new assistant can use the Home Assistant AI tools in the Assist dialog of Home Assistant and of the {% term "Home Assistant Companion app" %}. This works when you're signed in with an administrator account.

## Supported functionality

### List of Home Assistant AI tools

You don't call these tools yourself. When you ask the {% term "conversation agent" %} something, it decides which tools to call. You can't select single tools. You give the conversation agent the entire set, as described in [Adding the Home Assistant AI tools to your conversation agent](#adding-the-home-assistant-ai-tools-to-your-conversation-agent).

The **Home Assistant** set of {% term "AI tools" %} contains the following tools. Each entry starts with the title of the tool, followed by its ID. The {% term Assist %} dialog shows the ID under **Show details**. Many tools do something that you can also do yourself in the UI, without a conversation agent. Where you can, the entry says how. For example, you can check what the conversation agent tells you.

- **Render template** (`homeassistant__render_template`): Renders a [template](/docs/templating/) and returns the result. Templates can read the state and attributes of all {% term entities %}. Only reads.
  - To do this yourself: Use the **Template** tab, under {% my developer_template title="**Settings** > **Tools** > **Template**" %}.
- **Search actions** (`homeassistant__search_actions`): Finds the {% term actions %} that Home Assistant can perform, with their targets and fields. Only reads.
  - To do this yourself: Use the **Actions** tab, under {% my developer_services title="**Settings** > **Tools** > **Actions**" %}.
- **Call action** (`homeassistant__call_action`): Performs an action, and returns its response if it has one. Changes things.
  - To do this yourself: Use the **Actions** tab, under {% my developer_services title="**Settings** > **Tools** > **Actions**" %}.
  - To see which actions the conversation agent performed: Go to **Settings** > **Tools** > **Action history**.
- **Get config entries** (`config__get_config_entries`): Lists the {% term integrations %} and helpers that are set up, with their status, such as loaded or failed to set up, and the reason for an error. It can filter by integration and by status. Only reads.
  - To do this yourself: Go to {% my integrations title="**Settings** > **Devices & services**" %}.
- **Reload config entry** (`config__reload_config_entry`): Reloads an integration that is set up. For example, it helps after a temporary connection error. Changes things.
  - To do this yourself: On the integration page, under {% my integrations title="**Settings** > **Devices & services**" %}, select **Menu** {% icon "mdi:dots-vertical" %} > **Reload** on the integration entry.
- **Search available integrations** (`config__search_integrations`): Searches the integrations and helpers that you can set up from the UI, including ones that you haven't added yet. Only reads.
  - To do this yourself: Select **Add integration**, under {% my integrations title="**Settings** > **Devices & services**" %}.
- **Search Home Assistant** (`search__search`): Finds entities, devices, areas, labels, automations, scripts, and scenes by name. Only reads.
  - To do this yourself: Use the [quick search](/docs/tools/quick-search/).
- **Get system info** (`system_health__get_system_info`): Returns the installation type, the CPU architecture, the time zone, and the versions of Home Assistant Core, the frontend, Python, the operating system, and the Supervisor. For example, you can use it to fill in a bug report. Only reads.
  - To do this yourself: Under {% my repairs title="**Settings** > **System** > **Repairs**" %}, select **Menu** {% icon "mdi:dots-vertical" %} > **System information**.
- **Get history** (`history__get_history`): Returns statistics of entities, not their individual state changes. For example, it can return the mean, minimum, and maximum temperature per 5 minutes or per hour. It only works for entities with statistics, such as sensors with a state class. Only reads.
  - To do this yourself: Use the {% my history title="**History**" %} panel.
- **Get system log entries** (`system_log__get_entries`): Returns recent errors and warnings from the system log. It doesn't include info or debug messages. It can filter by level and by integration. Only reads.
  - To do this yourself: Go to {% my logs title="**Settings** > **System** > **Logs**" %}.
- **Get logs** (`system_log__get_logs` or `hassio__get_logs`): Reads the full logs in a time window. This includes info and debug messages, if Home Assistant logs them. Values that look like credentials are masked. Only reads.
  - On {% term "Home Assistant Operating System" %} and {% term "Home Assistant Supervised" %} installations, the ID is `hassio__get_logs`. It also reads the logs of the Supervisor, the operating system, the DNS, audio, and multicast plugins, and your apps.
  - On {% term "Home Assistant Container" %} installations, and on other installations without the Supervisor, the ID is `system_log__get_logs`. It only reads the Home Assistant log, and it needs the log file.
  - To do this yourself: Under {% my logs title="**Settings** > **System** > **Logs**" %}, select **Menu** {% icon "mdi:dots-vertical" %} > **Show raw logs**.
- **Get date and time** (`llm__GetDateTime`): Returns the current date and time. Both built-in sets of AI tools, **Device control** and **Home Assistant**, have this tool. Only reads.

### List of Device control AI tools

The {% term "AI tools" %} in **Device control** depend on what you expose to voice assistants. Most AI tools only appear if you expose at least one {% term entity %} that they can control. For example, **Set light** only appears if you expose a light. The AI tools only reach the entities that you expose, unless the entry says otherwise. For how to expose entities, refer to [Exposing entities to voice assistants](/voice_control/voice_remote_expose_devices/).

#### General AI tools

**Device control** has the following AI tools, no matter which entities you expose. {% term "AI apps" %} and [AI tasks](/integrations/ai_task/) get all of them except **Schedule command**.

- **Get live context** (`homeassistant__GetLiveContext`): Returns the current state of the entities that you expose. For example, it can check if a light is on, or what the temperature in the living room is.
- **Get date and time** (`llm__GetDateTime`): Returns the current date and time.
- **Turn on** (`intent__HassTurnOn`): Turns on, opens, or presses an entity. For a lock, it locks it.
- **Turn off** (`intent__HassTurnOff`): Turns off or closes an entity. For a lock, it unlocks it.
- **Cancel all timers** (`intent__HassCancelAllTimers`): Cancels all [voice timers](/voice_control/builtin_sentences/#timers). It can also cancel only the voice timers in one area.
- **Broadcast message** (`assist_satellite__broadcast`): Plays a message on your other {% term "voice satellites" %} that can play announcements. It also reaches voice satellites that you didn't expose. It can play the message in one area or on one floor only. For example, you can say *tell the kitchen that dinner is ready*.
  - For which voice satellites get the message, refer to [Broadcasting](/voice_control/builtin_sentences/#broadcasting).
- **Schedule command** (`intent__schedule_command`): Runs a command after a delay. For example, you can say *turn off the lights in the living room in 5 minutes*. It also works where voice timers aren't supported. For example, it works in the {% term Assist %} dialog in Home Assistant.
  - When the delay ends, the {% term "conversation agent" %} runs the command in a new conversation. It doesn't remember the earlier conversation.
  - Only conversation agents can use this tool. {% term "AI apps" %} and [AI tasks](/integrations/ai_task/) can't.

#### Voice timer AI tools

When you talk to a {% term "voice satellite" %} that supports voice timers, **Device control** also has the following AI tools. For example, [Home Assistant Voice Preview Edition](/voice-pe/) supports voice timers.

- **Start timer** (`intent__HassStartTimer`): Starts a voice timer.
- **Cancel timer** (`intent__HassCancelTimer`): Cancels a voice timer.
- **Add time to timer** (`intent__HassIncreaseTimer`): Adds time to a voice timer.
- **Remove time from timer** (`intent__HassDecreaseTimer`): Removes time from a voice timer.
- **Pause timer** (`intent__HassPauseTimer`): Pauses a voice timer.
- **Resume timer** (`intent__HassUnpauseTimer`): Resumes a paused voice timer.
- **Get timer status** (`intent__HassTimerStatus`): Returns how much time is left on your voice timers.

#### AI tools per entity type

When you expose at least one entity of the following types, **Device control** also has the AI tools for that type:

- Covers and valves:
  - **Set position** (`intent__HassSetPosition`): Sets the position of a cover or valve. For example, it can open the blinds halfway.
  - **Stop moving** (`intent__HassStopMoving`): Stops a cover or valve that is moving.
- Lights:
  - **Set light** (`light__HassLightSet`): Sets the brightness, the color, or the color temperature of a light.
- Climate devices:
  - **Set temperature** (`climate__HassClimateSetTemperature`): Sets the target temperature.
- Fans:
  - **Set fan speed** (`fan__HassFanSetSpeed`): Sets the speed of a fan, in percent.
- Humidifiers:
  - **Set humidity** (`humidifier__HassHumidifierSetpoint`): Sets the target humidity.
  - **Set humidifier mode** (`humidifier__HassHumidifierMode`): Sets the mode of a humidifier.
- Media players:
  - **Pause media** (`media_player__HassMediaPause`) and **Resume media** (`media_player__HassMediaUnpause`): Pause and resume playback.
  - **Next track** (`media_player__HassMediaNext`) and **Previous track** (`media_player__HassMediaPrevious`): Skip to the next item, or play the previous item again.
  - **Set volume** (`media_player__HassSetVolume`): Sets the volume, in percent.
  - **Change volume** (`media_player__HassSetVolumeRelative`): Turns the volume up or down.
  - **Mute player** (`media_player__HassMediaPlayerMute`) and **Unmute player** (`media_player__HassMediaPlayerUnmute`): Mute and unmute a media player.
  - **Search media** (`media_player__search_media`) and **Play media** (`media_player__play_media`): Search a media player for music or other media, and play the result. These AI tools only appear if one of the media players that you expose supports searching and playing media.
- Vacuums:
  - **Start vacuum** (`vacuum__HassVacuumStart`): Starts a vacuum.
  - **Return vacuum to base** (`vacuum__HassVacuumReturnToBase`): Sends a vacuum back to its base.
  - **Clean area** (`vacuum__HassVacuumCleanArea`): Tells a vacuum to clean one area. This only works if you mapped the segments of your vacuum to areas. For the steps, refer to [Mapping your vacuum areas to Home Assistant areas](/integrations/vacuum/#mapping-your-vacuum-areas-to-home-assistant-areas).
- Lawn mowers:
  - **Start mowing** (`lawn_mower__HassLawnMowerStartMowing`): Starts a lawn mower.
  - **Dock lawn mower** (`lawn_mower__HassLawnMowerDock`): Sends a lawn mower back to its dock.
- To-do lists:
  - **Get to-do list items** (`todo__get_items`): Returns the items on a to-do list. By default, it only returns the items that aren't completed.
  - **Add to-do list item** (`todo__HassListAddItem`): Adds an item to a to-do list.
  - **Complete to-do list item** (`todo__HassListCompleteItem`): Marks an item on a to-do list as completed.
  - **Remove to-do list item** (`todo__HassListRemoveItem`): Removes items from a to-do list.
- Calendars:
  - **Get calendar events** (`calendar__get_events`): Returns the events of a calendar for today or for the next 7 days.

#### AI tools from your scripts

Your own scripts can also become AI tools:

- Each {% term script %} that you expose becomes its own AI tool. Its ID starts with `script__`, followed by the script's ID. The script can also control entities that you didn't expose. For details, refer to [Exposing scripts to conversation agents that use AI](/voice_control/exposing_scripts_to_llms/).
- Each [intent script](/integrations/intent_script/) becomes its own AI tool. Its ID starts with `intent_script__`, followed by the intent name. In the ID, characters other than letters and numbers become underscores. If an intent script only works for some types of entities, it only appears if you expose an entity of that type.

## Known limitations

### Access to AI tools

- Only administrators can use the Home Assistant {% term "AI tools" %}. Requests without an administrator account fail. For example, requests from a {% term "voice satellite" %} fail, and so do requests from users who aren't administrators. This also stops **Device control** on that {% term "conversation agent" %}, because the agent can't prepare any of its sets of AI tools.
- The **Home Assistant Cloud** conversation agent of [Home Assistant Cloud](/integrations/cloud/) can't use the Home Assistant AI tools. It always uses **Device control**.

### Entity history

- **Get history** returns statistics, not individual state changes. {% term Entities %} without statistics have no history for this tool. For example, a switch has no statistics, and neither does a sensor without a [state class](/integrations/sensor/#state-class). For how statistics work, refer to [Long-term statistics](/docs/configuration/long-term-statistics/).

### Logs and credentials

- In {% term "Home Assistant Container" %} installations, and in other installations without the Supervisor, **Get logs** needs the Home Assistant log file. If Home Assistant doesn't write a log file, this tool isn't available. For example, the `HA_DISABLE_LOG_FILE` environment variable turns off the log file.
- **Get logs** masks values that look like credentials, such as tokens, passwords, and API keys. It can't recognize every credential, so other secrets in your logs can still reach the AI provider.

### Scheduled commands

- You can't cancel, pause, or change a scheduled command.
- If Home Assistant restarts before the delay ends, the command doesn't run.
- You don't hear the result. If the command fails, Home Assistant writes a warning to the [logs](/common-tasks/general/logs/).

## Troubleshooting

{% details "The conversation agent answers “Error preparing LLM API”" %}

### Symptom: "Error preparing LLM API"

When you talk to a {% term "conversation agent" %}, it doesn't do what you asked. Instead, it answers "Error preparing LLM API".

#### Description

The conversation agent couldn't prepare its sets of {% term "AI tools" %}. This happens in the following situations:

- The conversation agent has the Home Assistant AI tools, and the request doesn't come from an administrator. For example, it comes from a {% term "voice satellite" %}, or from a user who isn't an administrator. In this case, **Device control** doesn't work on this conversation agent either.
- A set of AI tools that the conversation agent uses no longer exists. For example, you removed the {% term integration %} that added it.

#### Resolution

The Home Assistant AI tools only work for administrators. You can't make them available to other users or to voice satellites. If a voice satellite or a user who isn't an administrator uses this conversation agent, remove the Home Assistant AI tools from it:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select your AI integration.
2. In the row of the conversation agent, select **Reconfigure conversation agent** {% icon "mdi:cog-outline" %}.
   - In some integrations, this button is called **Configure**.
3. Under **AI tools**, clear **Home Assistant**.
   - To keep controlling your devices with this conversation agent, make sure **Device control** is selected.
4. Select **Submit**. If the dialog shows more options, select **Submit** again.
   - Result: The conversation agent controls your devices again, for everyone who uses it.

To keep using the Home Assistant AI tools yourself, set up a separate assistant for them. For the steps, refer to [Setting up a separate assistant for the Home Assistant AI tools](#setting-up-a-separate-assistant-for-the-home-assistant-ai-tools).

If you removed the integration that added a set of AI tools, open the settings of the conversation agent, as described in steps 1 and 2 above. Then, select **Submit**. If the dialog shows more options, select **Submit** again. The settings only show the sets of AI tools that still exist, so saving them removes the missing set.

{% enddetails %}

{% details "Get history: “No statistics are recorded for this entity”" %}

### Symptom: The conversation agent can't tell you the past values of an entity

You ask the {% term "conversation agent" %} about the past values of an {% term entity %}, and it can't answer. Under **Show details** in the {% term Assist %} dialog, the result of `history__get_history` says "No statistics are recorded for this entity."

#### Description

**Get history** only reads statistics, not individual state changes. Home Assistant only keeps statistics for entities that measure something over time, such as a temperature sensor or an energy meter. Other entities have no statistics. For example, a switch has none. For how statistics work, refer to [Long-term statistics](/docs/configuration/long-term-statistics/).

#### Resolution

- To see the past states of the entity yourself, use the {% my history title="**History**" %} panel.
- If the entity is a sensor that should have statistics, check for an issue under {% my developer_statistics title="**Settings** > **Tools** > **Statistics**" %}. For how to fix it, refer to [Fixing a statistics issue](/docs/tools/dev-tools/#fixing-a-statistics-issue).

{% enddetails %}
