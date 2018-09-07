---
layout: page
title: "Telnet Switch"
description: "Instructions on how to integrate telnet switches into Home Assistant."
date: 2017-08-10 19:19
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Switch
ha_release: 0.54
ha_iot_class: "Local Polling"
---


The `telnet` switch platform allows you to control devices with telnet commands.

To enable this switch, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  platform: telnet
  switches:
    projector:
      resource: "host_or_ip"
      port: 4002
      command_on: "PWR ON"
      command_off: "PWR OFF"
      command_state: "PWR?"
      value_template: '{% raw %}{{ value == "PWR=01" }}{% endraw %}'
```

Configuration variables:

- **switches** (*Required*): The array that contains all switches.
  - **identifier** (*Required*): Name of the switch as slug. Multiple entries are possible.
    - **resource** (*Required*): Host or IP of the device.
    - **port** (*Optional*): Port to connect to. Default is 23 if not defined.
    - **command_on** (*Required*): Command to turn device on.
    - **command_off** (*Required*): Command to turn device off.
    - **command_state** (*Optional*): Command to determine the state of the switch. If not defined the switch will assume successful state changes.
    - **value_template** (*Optional*): The template evaluating to `true` will indicate that the switch is on.
    - **name** (*Optional*): The name used to display the switch in the frontend.
