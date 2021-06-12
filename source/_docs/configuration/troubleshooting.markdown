---
title: "Troubleshooting your configuration"
description: "Common problems with tweaking your configuration and their solutions."
---

It can happen that you run into trouble while configuring Home Assistant. Perhaps an integration is not showing up or is acting strangely. This page will discuss a few of the most common problems.

Before we dive into common issues, make sure you know where your configuration directory is. Home Assistant will print out the configuration directory it is using when starting up.

Whenever an integration or configuration option results in a warning, it will be stored in `home-assistant.log` in the configuration directory. This file is reset on start of Home Assistant.

## My integration does not show up

When an integration does not show up, many different things can be the case. Before you try any of these steps, make sure to look at the `home-assistant.log` file and see if there are any errors related to your integration you are trying to set up.

If you have incorrect entries in your configuration files you can use the configuration check command (below) to assist in identifying them.

### Problems with the configuration

One of the most common problems with Home Assistant is an invalid `configuration.yaml` or other configuration file.

- With Home Assistant OS and Supervised you can use the [`ha` command](/hassio/commandline/#home-assistant): `ha core check`.
  - You can test your configuration with Home Assistant Core using the command line with: `hass --script check_config`. If you need to provide the path for your configuration you can do this using the `-c` argument like this: `hass --script check_config -c /path/to/your/config/dir`.
  - On Docker you can use `docker exec home-assistant python -m homeassistant --script check_config --config /config` - where `home-assistant` is the name of the container.
- The configuration files, including `configuration.yaml` must be UTF-8 encoded. If you see error like `'utf-8' codec can't decode byte`, edit the offending configuration and re-save it as UTF-8.
- You can verify your configuration's YAML structure using [this online YAML parser](http://yaml-online-parser.appspot.com/) or [YAML Lint](http://www.yamllint.com/).
- To learn more about the quirks of YAML, read [YAML IDIOSYNCRASIES](https://docs.saltstack.com/en/latest/topics/troubleshooting/yaml_idiosyncrasies.html) by SaltStack (the examples there are specific to SaltStack, but do explain YAML issues well).

`configuration.yaml` does not allow multiple sections to have the same name. If you want to load multiple platforms for one component, you can append a [number or string](/getting-started/devices/#style-2-list-each-device-separately) to the name or nest them using [this style](/getting-started/devices/#style-1-collect-every-entity-under-the-parent):

```yaml
sensor:
  - platform: forecast
    ...
  - platform: bitcoin
    ...
```

Another common problem is that a required configuration setting is missing. If this is the case, the integration will report this to `home-assistant.log`. You can have a look at [the various integration pages](/integrations/) for instructions on how to setup the components.

See the [logger](/integrations/logger/) integration for instructions on how to define the level of logging you require for specific modules.

If you find any errors or want to expand the documentation, please [let us know](https://github.com/home-assistant/home-assistant.io/issues).

#### Problems with dependencies

Almost all integrations have external dependencies to communicate with your devices and services. Sometimes Home Assistant is unable to install the necessary dependencies. If this is the case, it should show up in `home-assistant.log`.

The first step is trying to restart Home Assistant and see if the problem persists. If it does, look at the log to see what the error is. If you can't figure it out, please [report it](https://github.com/home-assistant/home-assistant/issues) so we can investigate what is going on.

#### Problems with integrations

It can happen that some integrations either do not work right away or stop working after Home Assistant has been running for a while. If this happens to you, please [report it](https://github.com/home-assistant/home-assistant/issues) so that we can have a look.

#### Multiple files

If you are using multiple files for your setup, make sure that the pointers are correct and the format of the files is valid.

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

<div class='note'>
Whenever you report an issue, be aware that we are volunteers who do not have access to every single device in the world nor unlimited time to fix every problem out there.
</div>

### Entity names

The only characters valid in entity names are:

- Lowercase letters
- Numbers
- Underscores

If you create an entity with other characters then Home Assistant may not generate an error for that entity. However you will find that attempts to use that entity will generate errors (or possibly fail silently).
