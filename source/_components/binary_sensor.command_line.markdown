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
ha_category: Utility
ha_release: 0.12
ha_iot_class: "Local Polling"
---


The `command_line` binary sensor platform issues specific commands to get data.

## {% linkable_title Configuration %}

To use your Command binary sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: command_line
    command: cat /proc/sys/net/ipv4/ip_forward
```

{% configuration %}
command:
  description: The action to take to get the value.
  required: true
  type: string
name:
  description: Let you overwrite the name of the device. By default *name* from the device is used.
  required: false
  default: name
  type: string
device_class:
  description: The [type/class](/components/binary_sensor/) of the sensor to set the icon in the frontend.
  required: false
  type: string
payload_on:
  description: The payload that represents enabled state.
  required: false
  default: ON
  type: string
payload_off:
  description: The payload that represents disabled state.
  required: false
  default: OFF
  type: string
value_template:
  description: Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload.
  required: false
  type: string
scan_interval:
  description: Defines number of seconds for polling interval.
  required: false
  default: 60
  type: integer
command_timeout:
  description: Defines number of seconds for command timeout.
  required: false
  default: 15
  type: integer
{% endconfiguration %}

## {% linkable_title Examples %}

In this section you find some real-life examples of how to use this sensor.

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

### {% linkable_title Check if a system service is running %}

The services running is listed in `/etc/systemd/system` and can be checked with the `systemctl` command:

```
$ systemctl is-active home-assistant@rock64.service
active
$ sudo service home-assistant@rock64.service stop
$ systemctl is-active home-assistant@rock64.service
inactive
```

A binary command line sensor can check this:

```yaml
binary_sensor:
  - platform: command_line
    command: '/bin/systemctl is-active home-assistant@rock64.service'
    payload_on: 'active'
    payload_off: 'inactive'
```

Note: Use single quotes!
