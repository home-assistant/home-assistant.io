---
title: "Troubleshooting your configuration"
description: "Common problems with tweaking your configuration and their solutions."
related:
  - docs: /docs/configuration/
  - docs: /docs/configuration/customizing-devices/
    title: Changing entity name and ID
---

It can happen that you run into trouble while configuring Home Assistant. Perhaps an integration is not showing up or is acting strangely. This page will discuss a few of the most common problems.

Before we dive into common issues, make sure you know where your configuration directory is. Home Assistant will print out the configuration directory it is using when starting up.

Whenever an integration or configuration option results in a warning, it will be stored in `home-assistant.log` in the configuration directory. This file is reset on start of Home Assistant.

## My integration does not show up

When an integration does not show up, many different things can be the case. Before you try any of these steps, make sure to look at the `home-assistant.log` file and see if there are any errors related to your integration you are trying to set up.

If you have incorrect entries in your configuration files you can use the configuration check command (below) to assist in identifying them.

### Problems with the configuration

One of the most common problems with Home Assistant is an invalid {% term "`configuration.yaml`" %} or other configuration file.

- Home Assistant provides a CLI that allows you to see how it interprets them, each installation type has its own section in the common-tasks about this:
  - [Operating System](/common-tasks/os/#configuration-check)
  - [Container](/common-tasks/container/#configuration-check)
  - [Core](/common-tasks/core/#configuration-check)
  - [Supervised](/common-tasks/supervised/#configuration-check)

- The configuration files, including {% term "`configuration.yaml`" %} must be UTF-8 encoded. If you see error like `'utf-8' codec can't decode byte`, edit the offending configuration and re-save it as UTF-8.
- You can verify your configuration's {% term YAML %} structure using [this online YAML parser](https://yaml-online-parser.appspot.com/) or [YAML Validator](https://codebeautify.org/yaml-validator/).
- To learn more about the quirks of {% term YAML %}, read [YAML IDIOSYNCRASIES](https://docs.saltproject.io/en/latest/topics/troubleshooting/yaml_idiosyncrasies.html) by SaltStack (the examples there are specific to SaltStack, but do explain YAML issues well).

`configuration.yaml` does not allow multiple sections to have the same name. If you want to load multiple platforms for one integration, you can append a number or string to the name or nest them:

```yaml
sensor:
  - platform: forecast
    ...
  - platform: bitcoin
    ...
```

Another common problem is that a required configuration setting is missing. If this is the case, the integration will report this to `home-assistant.log`. You can have a look at [the various integration pages](/integrations/) for instructions on how to setup the integrations.

See the [logger](/integrations/logger/) integration for instructions on how to define the level of logging you require for specific modules.

If you find any errors or want to expand the documentation, please [let us know](https://github.com/home-assistant/home-assistant.io/issues).

#### Problems with dependencies

Almost all integrations have external dependencies to communicate with your devices and services. Sometimes Home Assistant is unable to install the necessary dependencies. If this is the case, it should show up in `home-assistant.log`.

The first step is trying to restart Home Assistant and see if the problem persists. If it does, look at the log to see what the error is. If you can't figure it out, please [report it](https://github.com/home-assistant/core/issues) so we can investigate what is going on.

#### Problems with integrations

It can happen that some integrations either do not work right away or stop working after Home Assistant has been running for a while. If this happens to you, please [report it](https://github.com/home-assistant/core/issues) so that we can have a look.

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

For instructions on how to change an entity name, refer to the section on [customizing entities](/docs/configuration/customizing-devices/).

## Debug logs and diagnostics

The first thing you will need before reporting an issue online is debug logs and diagnostics (if available) for the integration giving you trouble. Getting those ahead of time will ensure someone can help resolve your issue in the fastest possible manner.

### Enabling debug logging

To enable debug logging for a specific integration, follow these steps:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select the integration card to open the detail page of the integration for which you want to enable debug logging.
3. On the left side of the integration detail page, select **Enable Debug Logging**.
   - The screenshot uses the MQTT integration as an example for illustration purposes. It does not mean you need to install the MQTT integration.

    <p class='img'>
      <img src='/images/docs/configuration/enable-debug-logging.png' alt='Screenshot showing the Enable debug logging button on an integration detail page'>
      Screenshot showing the <b>Enable debug logging</b> button on an integration detail page. The MQTT integration is used as an example to show where the button can be found.
    </p>
4. To see the error in the logs, you need to reproduce the error. Continue with the steps on [disabling debug logging and download logs](#disable-debug-logging-and-download-logs).

### Disable debug logging and download logs

Once you enable debug logging, you ideally need to make the error happen. Run your automation, change up your device or whatever was giving you an error and then come back and disable the debug logging. Disabling the debug logging is the same as enabling, but now the button says **Disable Debug Logging**. After you disable it, you will be automatically prompted you to download your log file. Save this to a safe location to upload later.

### Download diagnostics

After you download logs, you will also want to download the diagnostics for the integration giving you trouble. If the integration provides diagnostics, it will appear in the three dot menu next to the integration configuration.

<p class='img'>
  <img src='/images/docs/configuration/download-diagnostics.png' alt='Example of Download Diagnostics'>
  Example of Download Diagnostics.
</p>

### Handling unexpected restarts or crashes

Suppose you find that Home Assistant unexpectedly restarts or crashes; it's likely that you have a misbehaving integration impacting system stability. Home Assistant has a built-in debug option that can help find implementation errors. It can also block many unsafe thread operations from crashing the system. Enabling debug has a slight performance impact on the system and is not recommended for long-term use. To enable debug, add the following to your {% term "`configuration.yaml`" %}:

```yaml
homeassistant:
  debug: true
```

Once debug is enabled, periodically check [Home Assistant System Logs](https://my.home-assistant.io/redirect/logs) for new messages.