---
layout: page
title: "Troubleshooting your configuration"
description: "Common problems with tweaking your configuration and their solutions."
date: 2015-01-20 22:36
sidebar: false
comments: false
sharing: true
footer: true
---

It can happen that you run into trouble while configuring Home Assistant. A component is not showing up or is acting weird. This page will discuss a few of the most common problems.

Before we dive into common issues, make sure you know where your configuration directory is. Home Assistant will print out the configuration directory it is using when starting up.

Whenever a component or configuration option results in a warning, it will be stored in `home-assistant.log`. This file is reset on start of Home Assistant.

### {% linkable_title YAML %}

Home Assistant uses the YAML syntax for configuration. YAML can be confusing at start but it is really powerful in allowing you to express complex configurations.

The basics of YAML are lists and lookup tables containing key-value pairs. Lists will have each item start with a `-` while lookup tables will have the format `key: value`. The last value for a key is used in case you specify a duplicate key.

```yaml
# A list
- hello
- how
- are
- you

# Lookup table
beer: ice cold  # <-- will be ignored because key specified twice
beer: warm
wine: room temperature
water: cold

# Nesting tables
device_tracker:
  platform: mqtt

# Nesting a list of tables in a table
sensor:
  - platform: mqtt
    state_topic: sensor/topic
  - platform: mqtt
    state_topic: sensor2/topic
```

Indentation is used to specify which objects are nested under one anohter. Getting the right indentation can be tricky if you're not using an editor with a fixed width font. Tabs are not allowed to be used for indentation. You can test your configuration using [online YAML parser](http://yaml-online-parser.appspot.com/) or [YAML Lint](http://www.yamllint.com/).

 - To learn more about the quirks of YAML, read [YAML IDIOSYNCRASIES](https://docs.saltstack.com/en/latest/topics/troubleshooting/yaml_idiosyncrasies.html) by SaltStack.
 - You can test your configuration using [this online YAML parser](http://yaml-online-parser.appspot.com/).

### {% linkable_title My component does not show up %}

When a component does not show up, many different things can be the case. Before you try any of these steps, make sure to look at the `home-assistant.log` file and see if there are any errors related to your component you are trying to set up.

#### {% linkable_title Problems with the configuration %}

`configuration.yaml` does not allow multiple sections to have the same name. If you want a specific platform to be loaded twice, append a [number/string](/getting-started/devices/#style-2) to the name or use [this style](/getting-started/devices/#style-1).

```yaml
sensor:
  platform: forecast
  [...]

sensor 2:
  platform: bitcoin
  [...]
```

Another common problem is that a required configuration setting is missing. If this is the case, the component will report this to `home-assistant.log`. You can have a look at [the component page](/components/) for instructions how to setup the components.

If you find any errors or want to expand the documentation, please [let us know](https://github.com/balloob/home-assistant.io/issues).

#### {% linkable_title Problems with dependencies %}

Almost all components have external dependencies to communicate with your devices and services. Sometimes Home Assistant is unable to install the necessary dependencies. If this is the case, it should show up in `home-assistant.log`.

First step is trying to restart Home Assistant and see if the problem persists. If it does, please [report it](https://github.com/balloob/home-assistant/issues) so we can investigate what is going on.

#### {% linkable_title Problems with components %}

It can happen that some components either do not work right away or stop working after Home Assistant has been running for a while. If this happens to you, please [report it](https://github.com/balloob/home-assistant/issues) so that we can have a look.

#### {% linkable_title Multiple files %}

If you are using multiple files for your setup, make sure that the pointers are correct and the format of the files is valid. 

```yaml
light: !include devices/lights.yaml
sensor: !include devices/sensors.yaml
```
Contents of `lights.yaml`:

```yaml
- platform: hyperion
  host: 192.168.1.98
  [...]
```

Contents of `sensors.yaml`:

```yaml
- platform: mqtt
  name: "Room Humidity"
  state_topic: "room/humidity"
- platform: mqtt
  name: "Door Motion"
  state_topic: "door/motion"
  [...]
```

<p class='note'>
Whenever you report an issue, be aware that we are a group of volunteers that do not have access to every single device in the world nor unlimited time to fix every problem out there.
</p>
