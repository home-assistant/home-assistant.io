---
layout: component
title: "Command binary sensor"
description: "Instructions how to integrate Command binary sensors within Home Assistant."
date: 2016-01-13 12:15
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Binary Sensor
---


The `command` binary sensor platform issues specific commands to get data.

To use your Command binary sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  platform: command_sensor
  command: cat /proc/sys/net/ipv4/ip_forward
  name: 'IP4 forwarding'
  payload_on: "1"
  payload_of: "0"
  value_template: '{% raw %}{{ value.x }}{% endraw %}'
```

Configuration variables:

- **command** (*Required*): The action to take to get the value.
- **name** (*Optional*): Let you overwrite the the name of the device. By default *name* from the device is used.
- **payload_on** (*Optional*): The payload that represents enabled state. Default is "ON".
- **payload_off** (*Optional*): The payload that represents disabled state. Default is "OFF".
- **value_template** (*Optional*): Defines a [template](/getting-started/templating/) to extract a value from the payload.

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

### {% linkable_title SickRage %}

Check the state of an [SickRage](https://github.com/sickragetv/sickrage) instance.

```yaml
# Example configuration.yaml entry
binary_sensor:
  platform: command_sensor
  command: netstat -na | find "33322" | find /c "LISTENING" > nul && (Echo 1 ) || (Echo 0)
  name: 'sickragerunning'
  payload_on: "1"
  payload_of: "0"
```

### {% linkable_title Check RasPlex %}

Check if [RasPlex](http://www.rasplex.com/) is `online`.

```yaml
binary_sensor:
  platform: command_sensor
  command: 'ping rasplex.local -c 1 | grep "1 received" | wc -l'
  name: 'is_rasplex_online'
  payload_on: 1
  payload_off: 0
```

