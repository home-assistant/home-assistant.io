---
title: "Xiaomi Philips Light"
description: "Instructions on how to integrate your Xiaomi Philips Lights within Home Assistant."
ha_category:
  - Light
ha_iot_class: Local Polling
ha_release: 0.53
ha_domain: xiaomi_miio
---

The `xiaomi_miio` platform allows you to control the state of your Xiaomi Philips LED Ball Lamp, Xiaomi Philips Zhirui LED Bulb E14 Candle Lamp, Xiaomi Philips Zhirui Downlight, Xiaomi Philips LED Ceiling Lamp, Xiaomi Philips Eyecare Lamp 2, Xiaomi Philips Moonlight Bedside Lamp and Philips Zhirui Desk Lamp.

## Features

### Philips LED Ball Lamp, Philips Zhirui LED Candle Lamp and Philips Zhirui Downlight

Supported models: `philips.light.bulb`, `philips.light.candle`, `philips.light.candle2`, `philips.light.downlight`

* Power (on, off)
* Brightness
* Color temperature (175...333 mireds)
* Scene (1, 2, 3, 4)
* Delayed turn off (Resolution in seconds)
* Attributes
  - model
  - scene
  - delayed_turn_off

### Philips LED Ceiling Lamp

Supported models: `philips.light.ceiling`, `philips.light.zyceiling`

* Power (on, off)
* Brightness
* Color temperature (175...370 mireds)
* Scene (1, 2, 3, 4)
* Night light mode (on, off)
* Delayed turn off (Resolution in seconds)
* Attributes
  - model
  - scene
  - delayed_turn_off
  - night_light_mode
  - automatic_color_temperature

### Philips Eyecare Smart Lamp 2

Supported models: `philips.light.sread1`

* Eyecare light (on, off)
* Ambient light (on, off)
* Brightness (of each light)
* Scene (1, 2, 3, 4)
* Night light mode (on, off)
* Delayed turn off (Resolution in seconds)
* Eye fatigue reminder / notification (on, off)
* Eyecare mode (on, off)
* Attributes
  - model
  - scene
  - delayed_turn_off
  - night_light_mode
  - reminder
  - eyecare_mode

### Philips Zhirui Desk Lamp

Supported models: `philips.light.mono1`

* Power (on, off)
* Brightness
* Scene (1, 2, 3, 4)
* Delayed turn off (Resolution in seconds)
* Attributes
  - model
  - scene
  - delayed_turn_off

### Philips Moonlight Bedside Lamp

Supported models: `philips.light.moonlight`

* Power (on, off)
* Brightness
* Color
* Color temperature (153...588 mireds)
* Scene (1, 2, 3, 4, 5, 6)
* Attributes
  - model
  - scene
  - sleep_assistant
  - sleep_off_time
  - total_assistant_sleep_time
  - brand_sleep
  - brand



Please follow the instructions on [Retrieving the Access Token](/integrations/vacuum.xiaomi_miio/#retrieving-the-access-token) to get the API token to use in the `configuration.yaml` file.

To add a Xiaomi Philips Light to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entries
light:
  - platform: xiaomi_miio
    name: Xiaomi Philips Smart LED Ball
    host: 192.168.130.67
    token: YOUR_TOKEN
    model: philips.light.bulb
```

{% configuration %}
host:
  description: The IP address of your miio light.
  required: true
  type: string
token:
  description: The API token of your miio light.
  required: true
  type: string
name:
  description: The name of your miio light.
  required: false
  type: string
  default: Xiaomi Philips Light
model:
  description: The model of your light. Valid values are `philips.light.sread1`, `philips.light.ceiling`, `philips.light.zyceiling`, `philips.light.moonlight`, `philips.light.bulb`, `philips.light.candle`, `philips.light.candle2`, `philips.light.mono1` and `philips.light.downlight`. This setting can be used to bypass the device model detection and is recommended if your device isn't always available.
  required: false
  type: string
{% endconfiguration %}

## Platform Services

### Service `xiaomi_miio.light_set_scene`

Set one of the 4 available fixed scenes.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO light entity.      |
| `scene`                   |       no | Scene, between 1 and 4.                               |

### Service `xiaomi_miio.light_set_delayed_turn_off`

Delayed turn off.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO light entity.      |
| `time_period`             |       no | Time period for the delayed turn off.                 |

### Service `xiaomi_miio.light_reminder_on` (Eyecare Smart Lamp 2 only)

Enable the eye fatigue reminder/notification.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO light entity.      |

### Service `xiaomi_miio.light_reminder_off` (Eyecare Smart Lamp 2 only)

Disable the eye fatigue reminder/notification.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO light entity.      |

### Service `xiaomi_miio.light_night_light_mode_on`  (Eyecare Smart Lamp 2 only)

Turn the smart night light mode on.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO light entity.      |

### Service `xiaomi_miio.light_night_light_mode_off`  (Eyecare Smart Lamp 2 only)

Turn the smart night light mode off.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO light entity.      |

### Service `xiaomi_miio.light_eyecare_mode_on`  (Eyecare Smart Lamp 2 only)

Turn the eyecare mode on.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO light entity.      |

### Service `xiaomi_miio.light_eyecare_mode_off`  (Eyecare Smart Lamp 2 only)

Turn the eyecare mode off.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO light entity.      |
