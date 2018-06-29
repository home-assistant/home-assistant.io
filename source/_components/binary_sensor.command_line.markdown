---
layout: page
title: "Command line Binary Sensor"
description: "Instructions on how to integrate Command binary sensors within Home Assistant."
date: 2016-01-13 12:15
sidebar: true
comments: false
sharing: true
footer: true
logo: command_line.png
ha_category: Binary Sensor
ha_release: 0.12
ha_iot_class: "Local Polling"
---


The `command_line` binary sensor platform issues specific commands to get data.

To use your Command binary sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: command_line
    command: cat /proc/sys/net/ipv4/ip_forward
```

Configuration variables:

- **command** (*Required*): The action to take to get the value.
- **name** (*Optional*): Let you overwrite the name of the device. By default *name* from the device is used.
- **device_class** (*Optional*): The [type/class](/components/binary_sensor/) of the sensor to set the icon in the frontend.
- **payload_on** (*Optional*): The payload that represents enabled state. Default is "ON".
- **payload_off** (*Optional*): The payload that represents disabled state. Default is "OFF".
- **value_template** (*Optional*): Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload.
- **scan_interval** (*Optional*): Defines number of seconds for polling interval (defaults to 60 seconds). 

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

### {% linkable_title SickRage %}

Check the state of an [SickRage](https://github.com/sickragetv/sickrage) instance.

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: command_line
    command: netstat -na | find "33322" | find /c "LISTENING" > nul && (echo "Running") || (echo "Not running")
    name: 'sickragerunning'
    device_class: moving
    payload_on: "Running"
    payload_off: "Not running"
```

### {% linkable_title Check RasPlex %}

Check if [RasPlex](http://www.rasplex.com/) is `online`.

```yaml
binary_sensor:
  - platform: command_line
    command: 'ping -c 1 rasplex.local | grep "1 received" | wc -l'
    name: 'is_rasplex_online'
    device_class: connectivity
    payload_on: 1
    payload_off: 0
```

An alternative solution could look like this:

```yaml
binary_sensor:
  - platform: command_line
    name: Printer
    command: ping -W 1 -c 1 192.168.1.10 > /dev/null 2>&1 && echo success || echo fail
    device_class: connectivity
    payload_on: "success"
    payload_off: "fail"
```

Consider to use the [`ping` sensor ](/components/binary_sensor.ping/) as an alternative to the samples above.
