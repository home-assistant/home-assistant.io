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

1. Check [the logs](/integrations/logger/#viewing-logs) for errors related to the integration.
   - To get more details, [turn on debug logging](#enabling-debug-logging) for the integration.
2. Check the troubleshooting section on the documentation page of the integration.
3. If you can't find the cause, [report the issue](/help/reporting_issues/) and include the logs.

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

## Debug logs and diagnostics

When an integration doesn't work as expected, debug logs and diagnostics help find the cause. Debug logs show in detail what the integration does. Diagnostics describe how the integration is set up.

### Enabling debug logging

Debug logging writes detailed messages of one integration to the log. Turn it on, make the problem happen again, and then turn it off to get the log.

Debug logging writes many messages, which uses disk space. Turn it off as soon as you have made the problem happen again.

Debug logging stays on if you restart Home Assistant once, so the log also shows what happens during startup. After the next restart, it's off again.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select the integration.
2. Select **Menu** {% icon "mdi:dots-vertical" %} > **Enable debug logging**.
   - Result: The integration page shows **Debug logging enabled**.
3. Make the problem happen again.
   - For example, run the automation that fails, or use the device that doesn't respond.
4. To get the log, continue with [Disabling debug logging and downloading the log](#disabling-debug-logging-and-downloading-the-log).

### Disabling debug logging and downloading the log

When you turn off debug logging, Home Assistant downloads the log right away. The log contains all messages of Home Assistant, including the debug messages of the integration.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select the integration.
2. Select **Menu** {% icon "mdi:dots-vertical" %} > **Disable debug logging**.
   - You can also select **Disable** next to **Debug logging enabled**.
   - Result: Your browser saves the log as a file, for example, `home-assistant_<integration>_<date and time>.log`.

### Setting log levels in YAML

Debug logging from the UI is temporary. It turns itself off after the second restart. To keep debug logging on, or to set the log level of a library that an integration uses, set the log levels in your {% term "`configuration.yaml`" %} file. For the steps, refer to the [Logger integration](/integrations/logger/).

### Downloading diagnostics

Diagnostics describe how an integration is set up, for example, its settings. Not all integrations provide diagnostics.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select the integration.
2. Next to the entry of the integration, select **Menu** {% icon "mdi:dots-vertical" %} > **Download diagnostics**.
   - If **Download diagnostics** isn't shown, the integration doesn't provide diagnostics.
   - Result: Your browser saves the diagnostics as a file.
