---
title: "Troubleshooting your configuration"
description: "Common problems with your Home Assistant configuration and how to fix them, including how to read the logs and check your YAML before restarting."
related:
  - docs: /docs/configuration/
  - docs: /docs/configuration/customizing-entities/
    title: Changing entity name and ID
---

It can happen that you run into trouble while configuring Home Assistant. Perhaps an integration is not showing up or is acting strangely. This page will discuss a few of the most common problems.

Before we dive into common issues, make sure you know where your configuration directory is. Home Assistant will print out the configuration directory it is using when starting up.

Whenever an integration or configuration option results in a warning, it will be stored in [the logs](/integrations/logger/#viewing-logs).

## My integration does not show up

When an integration does not show up, many different things can be the case. Before you try any of these steps, make sure to look at the [the logs](/integrations/logger/#viewing-logs) and see if there are any errors related to your integration you are trying to set up.

If you have incorrect entries in your configuration files you can use the configuration check command (below) to assist in identifying them.

### Problems with the configuration

One of the most common problems with Home Assistant is an invalid {% term "`configuration.yaml`" %} or other configuration file. To find problems, check your configuration under {% my tools_yaml title="**Settings** > **Tools** > **YAML**" %} > **Check configuration**. You can also run the configuration check from the command line:

- [Home Assistant Operating System](/common-tasks/os/#running-a-configuration-check-from-the-cli)
- [Home Assistant Container](/common-tasks/container/#configuration-check)

{% details "Home Assistant reports an invalid configuration" %}

#### Symptom: An "Invalid config for" error

The configuration check, or the logs, show an error that starts with `Invalid config for`, followed by the name of an integration. For example: `Invalid config for 'example' at configuration.yaml, line 12: required key 'host' not provided`.

##### Description

The configuration of that integration doesn't match what the integration expects. For example, a required setting is missing, an option is misspelled, or a value has the wrong type. The error usually shows the file and line where the problem is.

##### Resolution

1. Open the file mentioned in the error and go to the line it mentions.
2. Compare the configuration with the documentation of the integration. You can find it on [the integration pages](/integrations/).
   - If a required setting is missing, add it.
   - If an option is invalid, check its spelling. The error often suggests the option you might have meant.
3. If you're not sure the {% term YAML %} structure is correct, check it with an online tool such as [YAML online parser](https://yaml-online-parser.appspot.com/) or [YAML Validator](https://codebeautify.org/yaml-validator/). To learn more about common YAML mistakes, read [YAML IDIOSYNCRASIES](https://docs.saltproject.io/en/latest/topics/troubleshooting/yaml_idiosyncrasies.html) by SaltStack. The examples there are specific to SaltStack, but they explain YAML issues well.
4. Check your configuration again.

{% enddetails %}

{% details "Only one of several sections with the same name works" %}

#### Symptom: "contains duplicate key"

You added the same top-level section more than once, for example `sensor:` twice, and only one of them works. The logs show a warning like `YAML file configuration.yaml contains duplicate key "sensor". Check lines 10 and 20`.

##### Description

A {% term YAML %} file can only have each top-level section once. If a section appears twice, Home Assistant only uses the last one.

##### Resolution

Combine the sections into one, and list each platform under it:

```yaml
sensor:
  - platform: forecast
    ...
  - platform: bitcoin
    ...
```

{% enddetails %}

{% details "Home Assistant can't read a configuration file" %}

#### Symptom: "'utf-8' codec can't decode byte"

The logs show an error like `Unable to read file configuration.yaml: 'utf-8' codec can't decode byte`.

##### Description

All configuration files, including {% term "`configuration.yaml`" %}, must be saved with UTF-8 encoding. Some editors save files in a different encoding, for example when the file contains special characters.

##### Resolution

Open the file mentioned in the error in a text editor, and save it again with UTF-8 encoding.

{% enddetails %}

{% details "Unexpected error validating config" %}

#### Symptom: "Unexpected error calling config validator"

When you check your configuration, you see an error that starts with `Unexpected error calling config validator:`. The logs then show `Unexpected error validating config`.

##### Description

The code that checks the configuration of one of your integrations stopped unexpectedly, instead of reporting what is wrong. This is usually caused by a bug in the integration, often a custom integration, or by a configuration that the integration doesn't expect.

##### Resolution

1. Go to {% my logs title="**Settings** > **System** > **Logs**" %} and open the `Unexpected error validating config` entry.
   - The entry is logged by `homeassistant.helpers.check_config`, so it can look like a problem in Home Assistant itself.
   - To find the integration that caused it, look in the full error for a path like `custom_components/<name>/` for a custom integration, or `homeassistant/components/<name>/` for a built-in integration.
2. Check the {% term YAML %} configuration of that integration for mistakes, such as a value in the wrong place or a value of the wrong type. Compare it with the documentation of the integration.
3. If it's a custom integration, update it to the latest version. If the error stays, report it to the author of the custom integration.
4. If it's a built-in integration and your configuration looks correct, [report the issue](/help/reporting_issues/) and include the error from the logs.

{% enddetails %}

{% details "An integration can't install its dependencies" %}

#### Symptom: A "Requirements for … not found" error

The integration doesn't start, and the logs show an error like `Setup failed for 'example': Requirements for example not found`.

##### Description

Almost all integrations use extra software packages to communicate with your devices and services. Home Assistant installs these packages when it sets up the integration. Sometimes, it can't install them, for example because there is no internet connection.

##### Resolution

1. Make sure Home Assistant is connected to the internet.
2. Restart Home Assistant, and check if the problem persists.
3. If it does, check [the logs](/integrations/logger/#viewing-logs) for more details about the error.
4. If you can't find the cause, [report the issue](/help/reporting_issues/) and include the error from the logs.

{% enddetails %}

{% details "An integration stops working" %}

#### Symptom: An integration doesn't work, or stops working after a while

An integration doesn't work right after you set it up, or it stops working after Home Assistant has been running for a while.

##### Description

This can have many causes, such as a problem with the device or service, the network, or a bug in the integration.

##### Resolution

1. [Check the health of the integration](#checking-the-health-of-an-integration).
2. Check [the logs](/integrations/logger/#viewing-logs) for errors related to the integration.
   - To get more details, [turn on debug logging](#enabling-debug-logging) for the integration.
3. Check the troubleshooting section on the documentation page of the integration.
4. If you can't find the cause, [report the issue](/help/reporting_issues/) and include the logs.

{% enddetails %}

#### Multiple files

If you are using multiple files for your setup, make sure that the pointers are correct and the format of the files is valid. It's important to understand the different types of `!include` and how the contents of each file should be structured - more information on the various methods of splitting your configuration into multiple files can be found [here](/docs/configuration/splitting_configuration).

```yaml
light: !include devices/lights.yaml
sensor: !include devices/sensors.yaml
```

Contents of `lights.yaml` (notice it does not contain `light:`):

```yaml
- platform: hyperion
  host: 192.168.1.98
  ...
```

Contents of `sensors.yaml`:

```yaml
- platform: mqtt
  name: "Room Humidity"
  state_topic: "room/humidity"
- platform: mqtt
  name: "Door Motion"
  state_topic: "door/motion"
  ...
```

{% note %}
Whenever you report an issue, be aware that we are volunteers who do not have access to every single device in the world nor unlimited time to fix every problem out there.
{% endnote %}

### Entity names

The only characters valid in entity names are:

- Lowercase letters
- Numbers
- Underscores

The entity name must not start or end with an underscore. If you create an entity with other characters from the UI, Home Assistant validates the name. If you change the name directly in the {% term YAML %} file, then Home Assistant may not generate an error for that entity. However, attempts to use that entity will generate errors (or possibly fail silently).

For instructions on how to change an entity name, refer to the section on [customizing entities](/docs/configuration/customizing-entities/).

## Asking AI to help find a problem

AI can help you find out why an {% term integration %} doesn't work. You can ask a {% term "conversation agent" %} in {% term Assist %}, or an {% term "AI app" %}, such as Claude or ChatGPT. With the **Home Assistant** set of {% term "AI tools" %}, a conversation agent or an AI app can read your logs, the status of your integrations, and information about your system. You can check the answers with the steps in [Debug logs and diagnostics](#debug-logs-and-diagnostics).

{% important %}
**Risk of sharing sensitive information**

The conversation agent or AI app sends what it reads to its AI provider. This includes your logs. The **Get logs** AI tool masks values that look like credentials, but it can't recognize every secret. Logs can also contain other sensitive information. For example, they can contain IP addresses, user names, or your location.

To avoid this:

- Before you ask, check what your logs contain. For details, refer to [Sensitive information in logs](/common-tasks/general/logs/#sensitive-information-in-logs).
- Turn off debug logging when you don't need it. Debug logs often contain more sensitive information.
- Use a local AI model. Then your logs don't leave your network. For example, use a conversation agent from [Ollama](/integrations/ollama/), which runs the AI model on a computer in your home. For an AI app, refer to [Asking an AI app](#asking-an-ai-app).
{% endimportant %}

### Asking a conversation agent in Assist

You can ask a conversation agent in the Assist dialog of Home Assistant. The **Home Assistant** AI tools can also change things without asking you first. For example, they can reload an integration or perform actions. For details, refer to [Sets of AI tools](/integrations/llm/#sets-of-ai-tools).

Prerequisites:

- An administrator account in Home Assistant.
- An assistant whose conversation agent uses the **Home Assistant** set of AI tools. For the steps, refer to [Setting up a separate assistant for the Home Assistant AI tools](/integrations/llm/#setting-up-a-separate-assistant-for-the-home-assistant-ai-tools).

To ask a conversation agent in Assist:

1. On a dashboard, in the top-right corner, select **Assist** {% icon "mdi:comment-processing-outline" %}.
   - On a narrow screen, it's under **Menu** {% icon "mdi:dots-vertical" %}. On a computer, you can also press <kbd>A</kbd>.
2. At the top of the dialog, select the name of the assistant, and choose the assistant that uses the Home Assistant AI tools.
3. Describe the problem, and ask what causes it.
   - For example, ask "Why isn't my integration working?" or "Which errors are in the logs?"
4. Optional: To see what the conversation agent looked at, select **Show details** above the answer.
   - Result: The details list the AI tools that the conversation agent used, with the result it got back.
5. Check the answer before you act on it.
   - The conversation agent can be wrong. Compare its answer with the [logs](/common-tasks/general/logs/).

### Asking an AI app

You can also ask an {% term "AI app" %}. For example, you can ask Claude, ChatGPT, Claude Code, Codex, or OpenCode. The AI app connects to Home Assistant through the [Model Context Protocol](/integrations/mcp_server/) integration. It then uses the same AI tools as a conversation agent.

To keep your logs on your network, use an AI app with a local AI model. For example, OpenCode can use a model from an Ollama server on a computer in your home. For the steps, refer to [OpenCode](https://docs.ollama.com/integrations/opencode) in the Ollama documentation.

Prerequisites:

- An administrator account in Home Assistant.
- An AI app that supports <abbr title="Model Context Protocol">MCP</abbr> servers.

To ask an AI app:

1. Connect your AI app to Home Assistant, and sign in with an administrator account.
   - For the steps, refer to the [Prerequisites](/integrations/mcp_server/#prerequisites) and [Client configuration](/integrations/mcp_server/#client-configuration) in the Model Context Protocol documentation.
   - Use the **Main URL**. The individual URLs ignore the configuration options of the integration, including **Read-only**.
   - The AI app needs the **Home Assistant** set of AI tools. When you enable the integration, the main URL includes it. If you set it up earlier, check that **Expose all AI tools** is turned on, or that **Home Assistant** is selected under **AI tools**.
2. Optional: To keep the AI app from changing anything, turn on **Read-only**. For details, refer to [Configuration options](/integrations/mcp_server/#configuration-options).
   - This option only applies to the main URL. The individual URLs ignore it.
   - Result: The AI app can still read your logs, but it can't change anything. For example, it can't reload integrations or perform actions.
3. In the AI app, describe the problem, and ask what causes it.
   - For example, ask "Why isn't my integration working?" or "Which errors are in the logs?"
4. Check the answer before you act on it.
   - The AI app can be wrong. Compare its answer with the [logs](/common-tasks/general/logs/).

## Checking the health of an integration

When an integration doesn't work as expected, check its health first. The health check shows in one place if the integration is set up, which of its entities are unavailable, and if there are open repairs or errors in the log. For most problems, it also links to the page where you can fix them.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select the integration.
2. On the entry that has the problem, select **Menu** {% icon "mdi:dots-vertical" %} > **Health** {% icon "mdi:heart-pulse" %}.
   - If you set up the integration more than once, the integration page lists an entry for each.
   - Result: The **Health of …** dialog opens. At the top, it says if everything looks fine, if some things need a look, or if the integration has a problem.
3. Check the lines below this summary:
   - The state of the entry. For example, **Loaded** or **Failed setup, will retry**. If the setup failed, the line also shows the error.
   - If the entry needs to be reauthenticated or reconfigured. To do this, select **Go to the integrations**.
   - How many of its entities are available. The dialog lists up to 5 unavailable entities. To see all entities of the entry, select **View entities**.
   - The number of open repairs. To see them, select **View repairs**.
   - The number of errors and warnings in the recent log. To see them, select **View logs**. The logs open with a filter for the integration.
   - How long the integration took to start.
   - The repairs, the log messages, and the startup time are for the entire integration, not for one entry. If you set up the integration more than once, they can come from another entry.
4. If the health check doesn't show the cause, [turn on debug logging](#enabling-debug-logging), or [download diagnostics](#downloading-diagnostics).

## Debug logs and diagnostics

When an integration doesn't work as expected, debug logs and diagnostics help find the cause. Debug logs show in detail what the integration does. Diagnostics describe how the integration is set up. Before you collect them, [check the health of the integration](#checking-the-health-of-an-integration).

### Enabling debug logging

Debug logging writes detailed messages of one integration to the log. Turn it on, make the problem happen again, and then turn it off to get the log.

Debug logging writes many messages, which uses disk space. Turn it off as soon as you have made the problem happen again.

Debug logging stays on if you restart Home Assistant once, so the log also shows what happens during startup. After the next restart, it's off again.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select the integration.
2. Select **Menu** {% icon "mdi:dots-vertical" %} > **Enable debug logging**.
   - Result: The integration page shows **Debug logging enabled**.
3. Make the problem happen again. If you want to follow the messages as they come in while you reproduce the problem, see [Viewing the live log of an integration](#viewing-the-live-log-of-an-integration).
   - For example, run the automation that fails, or use the device that doesn't respond.
4. To get the log, continue with [Disabling debug logging and downloading the log](#disabling-debug-logging-and-downloading-the-log).

### Disabling debug logging and downloading the log

When you turn off debug logging, Home Assistant downloads the log right away. The log contains all messages of Home Assistant, including the debug messages of the integration.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select the integration.
2. Select **Menu** {% icon "mdi:dots-vertical" %} > **Disable debug logging**.
   - You can also select **Disable** next to **Debug logging enabled**.
   - Result: Your browser saves the log as a file, for example, `home-assistant_<integration>_<date and time>.log`.

### Viewing the live log of an integration

 While debug logging is on, you can follow the log messages of one integration as they come in, without going through the full log.
 
 Prerequisite: Debug logging is enabled for the integration. For the steps, refer to [enabling debug logging](#enabling-debug-logging).

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select the integration.
2. Next to **Debug logging enabled**, select **Show logs**.
   - Result: The **Live log** dialog opens. It shows the messages that the integration and its libraries logged since Home Assistant started, followed by new messages as they come in.
3. Make the problem happen again, and watch the messages.
   - To find a message, use the search field.
   - To turn line wrapping on or off, use the wrap button.
4. Optional: To keep a copy of the messages in the dialog, select **Download**.

### Setting log levels in YAML

Debug logging from the UI is temporary. It turns itself off after the second restart. To keep debug logging on, or to set the log level of a library that an integration uses, set the log levels in your {% term "`configuration.yaml`" %} file. For the steps, refer to the [Logger integration](/integrations/logger/).

### Downloading diagnostics

Diagnostics describe how an integration is set up, for example, its settings. Not all integrations provide diagnostics.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select the integration.
2. Next to the entry of the integration, select **Menu** {% icon "mdi:dots-vertical" %} > **Download diagnostics**.
   - If **Download diagnostics** isn't shown, the integration doesn't provide diagnostics.
   - Result: Your browser saves the diagnostics as a file.
