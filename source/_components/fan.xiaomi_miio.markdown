---
layout: page
title: "Xiaomi Air Purifier"
description: "Instructions how to integrate your Xiaomi Air Purifier within Home Assistant."
date: 2017-10-13 12:35
sidebar: true
comments: false
sharing: true
footer: true
logo: xiaomi.png
ha_category: Fan
ha_version: 0.57
ha_iot_class: "Local Polling"
---

The `xiaomi_miio` fan platform allows you to control the Xiaomi Air Purifier 2, Air Purifier 2S and Air Purifier Pro.

Currently, the supported features are:

* On, Off
* Operation modes (auto, silent, favorite, idle)
* Buzzer (on, off)
* Child lock (on, off)
* LED (on, off), LED brightness (bright, dim, off)
* Favorite Level (0...16)
* Attributes
  - power
  - aqi
  - average_aqi
  - humidity
  - temperature
  - mode
  - favorite_level
  - led
  - led_brightness
  - buzzer
  - child_lock
  - purify_volume
  - filter_life_remaining
  - filter_hours_used
  - motor_speed


Please follow the instructions on [Retrieving the Access Token](/components/vacuum.xiaomi_miio/#retrieving-the-access-token) to get the API token.

To add a Xiaomi Air Purifier to your installation, add the following to your `configuration.yaml` file:

```yaml
fan:
# Example configuration.yaml entry
  - platform: xiaomi_miio
    host: 192.168.130.66
    token: YOUR_TOKEN
```

{% configuration %}
host:
  description: The IP address of your fan.
  required: true
  type: string
token:
  description: The API token of your fan.
  required: true
  type: string
name:
  description: The name of your fan.
  required: false
  type: string
  default: Xiaomi Air Purifier
{% endconfiguration %}

## {% linkable_title Platform Services %}

### {% linkable_title Service `fan.set_speed` %}

Set the fan speed / operation mode.

| Service data attribute    | Optional | Description                                                         |
|---------------------------|----------|---------------------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific air purifier. Else targets all.              |
| `speed`                   |       no | Fan speed. Valid values are 'Auto', 'Silent', 'Favorite' and 'Idle' |

### {% linkable_title Service `fan.xiaomi_miio_set_buzzer_on` %}

Turn the buzzer on.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific air purifier. Else targets all.  |

### {% linkable_title Service `fan.xiaomi_miio_set_buzzer_off` %}

Turn the buzzer off.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific air purifier. Else targets all.  |

### {% linkable_title Service `fan.xiaomi_miio_set_led_on` %}

Turn the led on.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific air purifier. Else targets all.  |

### {% linkable_title Service `fan.xiaomi_miio_set_led_off` %}

Turn the led off.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific air purifier. Else targets all.  |

### {% linkable_title Service `fan.xiaomi_miio_set_child_lock_on` %}

Turn the child lock on.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific air purifier. Else targets all.  |

### {% linkable_title Service `fan.xiaomi_miio_set_child_lock_off` %}

Turn the child lock off.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific air purifier. Else targets all.  |

### {% linkable_title Service `fan.xiaomi_miio_set_led_brightness` %}

Set the led brightness. Supported values are 0 (Bright), 1 (Dim), 2 (Off).

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific air purifier. Else targets all.  |
| `brightness`              |       no | Brightness, between 0 and 2.                            |

### {% linkable_title Service `fan.xiaomi_miio_set_favorite_level` %}

Set the favorite level of the operation mode "favorite".

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific air purifier. Else targets all.  |
| `level`                   |       no | Level, between 0 and 16.                                |

