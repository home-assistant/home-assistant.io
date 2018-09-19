---
layout: page
title: "RainMachine"
description: "Instructions on how to integrate RainMachine units within Home Assistant."
date: 2018-04-25 20:32
sidebar: true
comments: false
sharing: true
footer: true
logo: rainmachine.png
ha_category: Irrigation
ha_release: 0.69
ha_iot_class: "Local Polling"
---

The `rainmachine` component is the main component to integrate all platforms
related to [RainMachine smart Wi-Fi sprinkler controllers](http://www.rainmachine.com/).

## {% linkable_title Base Configuration %}

To connect to your RainMachine device, add the following to your
`configuration.yaml` file:

```yaml
rainmachine:
  ip_address: 192.168.1.100
  password: YOUR_PASSWORD
```

To configure additional functionality, add configuration options beneath
a `binary_sensor`, `sensor`, and/or `switches` key within the `rainmachine`
sections of `configuration.yaml` as below:

```yaml
rainmachine:
  ip_address: 192.168.1.100
  password: YOUR_PASSWORD
  binary_sensors:
    # binary sensor configuration options...
  sensors:
    # sensor configuration options...
  switches:
    # switch configuration options...
```

{% configuration %}
ip_address:
  description: the IP address or hostname of your RainMachine unit
  required: optional
  type: string
password:
  description: your RainMachine password.
  required: true
  type: string
port:
  description: the TCP port used by your unit for the REST API
  required: false
  type: int
  default: 8080
ssl:
  description: whether communication with the local device should occur over HTTPS
  required: false
  type: boolean
  default: true
scan_interval:
  description: the frequency (in seconds) between data updates
  required: false
  type: int
  default: 60
binary_sensors:
  description: binary sensor-related configuration options
  required: false
  type: map
  keys:
    monitored_conditions:
      description: the conditions to create sensors from
      required: false
      type: list
      default: all (`extra_water_on_hot_days`, `freeze`, `freeze_protection`, `hourly`, `month`, `raindelay`, `rainsensor`, `weekday`)
sensors:
  description: sensor-related configuration options
  required: false
  type: map
  keys:
    monitored_conditions:
      description: the conditions to create sensors from
      required: false
      type: list
      default: all (`freeze_protect_temp`)
switches:
  description: switch-related configuration options
  required: false
  type: map
  keys:
    zone_run_time:
      description: the default number of seconds that a zone should run when turned on
      required: false
      type: int
      default: 600
{% endconfiguration %}

## {% linkable_title Services %}

### {% linkable_title `rainmachine.start_program` %}

Start a RainMachine program.

| Service Data Attribute    | Optional | Description          |
|---------------------------|----------|----------------------|
| `program_id`              |      no  | The program to start |

### {% linkable_title `rainmachine.start_zone` %}

Start a RainMachine zone for a set number of seconds.

| Service Data Attribute    | Optional | Description                                          |
|---------------------------|----------|------------------------------------------------------|
| `zone_id`                 |      no  | The zone to start                                    |
| `zone_run_time`           |      yes | The number of seconds to run; defaults to 60 seconds |

### {% linkable_title `rainmachine.stop_all` %}

Stop all watering activities.

### {% linkable_title `rainmachine.stop_program` %}

Stop a RainMachine program.

| Service Data Attribute    | Optional | Description          |
|---------------------------|----------|----------------------|
| `program_id`              |      no  | The program to stop  |

### {% linkable_title `rainmachine.stop_zone` %}

Stop a RainMachine zone.

| Service Data Attribute    | Optional | Description          |
|---------------------------|----------|----------------------|
| `zone_id`                 |      no  | The zone to stop     |

