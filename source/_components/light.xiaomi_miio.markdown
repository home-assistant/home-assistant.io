---
layout: page
title: "Xiaomi Philips Light"
description: "Instructions on how to integrate your Xiaomi Philips Lights within Home Assistant."
date: 2017-08-26 08:45
sidebar: true
comments: false
sharing: true
footer: true
logo: philips.png
ha_category: Light
ha_version: 0.53
ha_iot_class: "Local Polling"
---

The `xiaomi_miio` platform allows you to control the state of your Xiaomi Philips LED Ball Lamp, Xiaomi Philips LED Ceiling Lamp and Xiaomi Philips Eyecare Lamp 2.

Currently, the supported features are `on`, `off`, `set_cct` (colortemp) , `set_bright` (brightness).

Please follow the instructions on [Retrieving the Access Token](/components/vacuum.xiaomi_miio/#retrieving-the-access-token) to get the API token to use in the `configuration.yaml` file.

To add a Xiaomi Philips Light to your installation, add the following to your configuration.yaml file:

```yaml
# Example configuration.yaml entries
light:
  - platform: xiaomi_miio
    name: Xiaomi Philips Smart LED Ball
    host: 192.168.130.67
    token: YOUR_TOKEN
    model: philips.light.bulb
```

Configuration variables:
- **host** (*Required*): The IP of your light.
- **token** (*Required*): The API token of your light.
- **name** (*Optional*): The name of your light.
- **model** (*Optional*): The model of your light. Valid values are `philips.light.bulb`, `philips.light.sread1`, `philips.light.ceiling` and `philips.light.zyceiling`. This setting can be used to bypass the device model detection and is recommended if your device isn't always available.

{% configuration %}
host:
  description: The IP address of your device.
  required: true
  type: string
token:
  description: The API token of your device.
  required: true
  type: string
name:
  description: The name of your device.
  required: false
  type: string
  default: Xiaomi Philips Light
model:
  description: The model of your device.
  required: false
  type: string
{% endconfiguration %}

## {% linkable_title Platform Services %}

### {% linkable_title Service `light.xiaomi_miio_set_scene` %}

Set one of the 4 available fixed scenes.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific light. Else targets all.       |
| `scene`                   |       no | Scene, between 1 and 4.                               |

### {% linkable_title Service `light.xiaomi_miio_set_delayed_turn_off` %}

Delayed turn off.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific light. Else targets all.       |
| `time_period`             |       no | Time period for the delayed turn off.                 |
