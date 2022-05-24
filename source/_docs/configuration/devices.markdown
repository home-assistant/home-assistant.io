---
title: "Adding devices to Home Assistant"
description: "Steps to help you get your devices in Home Assistant."
---

Home Assistant will be able to automatically discover many devices and services
available on your network.

See the [integrations overview page](/integrations/) to find installation
instructions for your devices and services. Most integration can be
fully configured via the user interface these days; however, some older or
more complex integrations may need to be configured manually using YAML.

For some of these integrations, every entity needs its own entry in the
`configuration.yaml` file. There are two styles for multiple entity entries:

## Style 1: Collect every entity under the "parent"

```yaml
sensor:
  - platform: mqtt
    state_topic: "home/bedroom/temperature"
    name: "MQTT Sensor 1"
  - platform: mqtt
    state_topic: "home/kitchen/temperature"
    name: "MQTT Sensor 2"
  - platform: rest
    resource: "http://IP_ADDRESS/ENDPOINT"
    name: "Weather"

switch:
  - platform: vera
```

## Style 2: List each entity separately

You need to append numbers or strings to differentiate the entries, as in the
example below. The appended number or string must be unique.

```yaml
sensor bedroom:
  platform: mqtt
  state_topic: "home/bedroom/temperature"
  name: "MQTT Sensor 1"

sensor kitchen:
  platform: mqtt
  state_topic: "home/kitchen/temperature"
  name: "MQTT Sensor 2"

sensor weather:
  platform: rest
  resource: "http://IP_ADDRESS/ENDPOINT"
  name: "Weather"

switch 1:
  platform: vera

switch 2:
  platform: vera
```
