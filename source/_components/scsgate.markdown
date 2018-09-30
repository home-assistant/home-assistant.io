---
layout: page
title: "SCSGate"
description: "Instructions on how to integrate SCSGate into Home Assistant."
date: 2016-01-31 19:20
sidebar: true
comments: false
sharing: true
footer: true
logo: bus_scs.png
ha_category: Hub
ha_release: 0.13
ha_iot_class: "Local Polling"
---

The SCSGate component support the [SCSGate](https://translate.google.com/translate?hl=en&sl=it&tl=en&u=http%3A%2F%2Fguidopic.altervista.org%2Feibscsgt%2Finterface.html) device. This a home-brew device allows to interact with the MyHome system from BTicino/Legrande.

To enable SCSGate in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
scsgate:
  device: PATH_TO_DEVICE
```

Configuration variables:

- **device** (*Required*): The path to your device, e.g., `/dev/ttyACM0`

### {% linkable_title How to find the scs_id for your devices %}

The SCSGate component relies on the [scsgate](https://github.com/flavio/scsgate) Python module.

This module provides also a command line tool called `scs-monitor`. This program can be used to find the IDs of your lights, switches and roller shutters and produce the YAML snippet to insert into your `configuration.yaml` file.

For more information checkout [this](http://scsgate.readthedocs.org/en/latest/?badge=latest#creation-of-a-home-assistant-configuration-file) section of `scsgate`'s documentation.
