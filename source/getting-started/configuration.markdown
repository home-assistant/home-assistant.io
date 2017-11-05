---
layout: page
title: "Configure Home Assistant"
description: "Instructions to get Home Assistant configured."
date: 2016-09-26 21:00
sidebar: true
comments: false
sharing: true
footer: true
---

When launched for the first time, Home Assistant will write a default configuration file, called `configuration.yaml`, enabling the web interface and [device discovery](/components/discovery/). It can take up to a minute for your devices to be discovered and appear in the user interface.

The `configuration.yaml` is written in [YAML](/docs/configuration/yaml/), stored in [`.homeassistant`](/docs/configuration/), and can be modified with a text editor.

See the [components overview page](/components/) to find sample entries for your devices and services. For a sensor that is showing [random values](/components/sensor.random/), the entry would look like the sample below:

```yaml
sensor:
  - platform: random
```

The [Setting up devices part](/docs/configuration/devices/) contains the additional documentation details about adding devices and services and [customization](/docs/configuration/customizing-devices/).

For further details about configuration, please take a look at the [configuration documentation](/docs/configuration/).

### [Next step: Automate Home Assistant &raquo;](/getting-started/automation/)
