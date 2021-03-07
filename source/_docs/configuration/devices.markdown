---
title: "Adding devices to Home Assistant"
description: "Steps to help you get your devices in Home Assistant."
---

Home Assistant will be able to automatically discover many devices and services available on your network if you have [the discovery component](/integrations/discovery/) enabled (the default setting).

See the [integrations overview page](/integrations/) to find installation instructions for your devices and services. If you can't find support for your favorite device or service, [consider adding support](/developers/add_new_platform/).

Classification for the available integrations:

- [IoT class](/blog/2016/02/12/classifying-the-internet-of-things): Classifier for the device's behavior.
- [Quality scale](/docs/quality_scale/): Representation of the integration's quality.

Integrations that are automatically discovered, added and configured via the UI typically don't need an extra entry in the `configuration.yaml` file. Required parameters are directly entered during setup in the UI. Note, that once configured, it is standard behaviour that configuration paramters of integrations cannot be changed anymore. To change the paramters, delete the integration from the UI, let the system discover it again or add it manually back.

Entites of integrations without an UI configuration usually need their own entry in the `configuration.yaml` file. There are two styles for multiple entries:

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

## Style 2: List each device separately

You need to append numbers or strings to differentiate the entries, as in the example below. The appended number or string must be unique.

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

## Grouping devices

Once you have several devices set up, it is time to organize them into groups.
Each group consists of a name and a list of entity IDs. Entity IDs can be retrieved from the web interface by using the {% my developer_states title="States page in the Developer Tools" %}.

```yaml
# Example configuration.yaml entry
group:
  living_room:
    entities:
      - light.table_lamp
      - switch.ac
  bedroom:
    entities:
      - light.bedroom
      - media_player.nexus_player
```

For more details please check the [Group](/integrations/group/) page.
