---
layout: page
title: "Xiaomi Air Purifier"
description: "Instructions how to integrate your Xiaomi Air Purifier and Xiaomi Air Humidifier within Home Assistant."
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

The `xiaomi_miio` fan platform allows you to control the Xiaomi Air Purifier 2, Air Purifier 2S, Air Purifier Pro and Xiaomi Air Humidifier.

Please follow the instructions on [Retrieving the Access Token](/components/vacuum.xiaomi_miio/#retrieving-the-access-token) to get the API token.

Currently, the supported features are:

## Features

### Air Purifier 2 et al.

* Power (on, off)
* Operation modes (auto, silent, favorite, idle)
* Buzzer (on, off)
* Child lock (on, off)
* LED (on, off), LED brightness (bright, dim, off)
* Favorite Level (0...16)
* Attributes
  - model
  - temperature
  - humidity
  - aqi
  - mode
  - filter_hours_used
  - filter_life_remaining
  - favorite_level
  - child_lock
  - led
  - motor_speed
  - average_aqi
  - purify_volume
  - learn_mode
  - sleep_time
  - sleep_mode_learn_count
  - extra_features
  - turbo_mode_supported
  - auto_detect
  - use_time
  - button_pressed
  - buzzer
  - led_brightness
  - sleep_mode


### Air Purifier Pro (zhimi.airpurifier.v6)

* Power (on, off)
* Operation modes (auto, silent, favorite)
* Child lock (on, off)
* LED (on, off)
* Favorite Level (0...16)
* Attributes
  - model
  - temperature
  - humidity
  - aqi
  - mode
  - filter_hours_used
  - filter_life_remaining
  - favorite_level
  - child_lock
  - led
  - motor_speed
  - average_aqi
  - purify_volume
  - learn_mode
  - sleep_time
  - sleep_mode_learn_count
  - extra_features
  - turbo_mode_supported
  - auto_detect
  - use_time
  - button_pressed
  - filter_rfid_product_id
  - filter_rfid_tag
  - filter_type
  - illuminance
  - motor2_speed
  - volume


### Air Purifier V3 (zhimi.airpurifier.v3)

* Power (on, off)
* Operation modes (auto, silent, favorite, idle, medium, high, strong)
* Child lock (on, off)
* LED (on, off)
* Attributes
  - model
  - aqi
  - mode
  - led
  - buzzer
  - child_lock
  - illuminance
  - filter_hours_used
  - filter_life_remaining
  - motor_speed
  - average_aqi
  - volume
  - motor2_speed
  - filter_rfid_product_id
  - filter_rfid_tag
  - filter_type
  - purify_volume
  - learn_mode
  - sleep_time
  - sleep_mode_learn_count
  - extra_features
  - auto_detect
  - use_time
  - button_pressed


### Air Humidifier (zhimi.humidifier.v1)

* On, Off
* Operation modes (silent, medium, high)
* Buzzer (on, off)
* Child lock (on, off)
* LED brightness (bright, dim, off)
* Target humidity (30, 40, 50, 60, 70, 80)
* Attributes
  - model
  - temperature
  - humidity
  - mode
  - buzzer
  - child_lock
  - trans_level
  - target_humidity
  - led_brightness
  - button_pressed
  - use_time
  - hardware_version


### Air Humidifier CA (zhimi.humidifier.ca1)

* On, Off
* Operation modes (silent, medium, high, auto)
* Buzzer (on, off)
* Child lock (on, off)
* LED brightness (bright, dim, off)
* Target humidity (30, 40, 50, 60, 70, 80)
* Dry mode (on, off)
* Attributes
  - model
  - temperature
  - humidity
  - mode
  - buzzer
  - child_lock
  - trans_level
  - target_humidity
  - led_brightness
  - button_pressed
  - use_time
  - hardware_version
  - speed
  - depth
  - dry

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

### {% linkable_title Service `fan.xiaomi_miio_set_buzzer_on` %} (Air Purifier Pro excluded)

Turn the buzzer on.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific air purifier. Else targets all.  |

### {% linkable_title Service `fan.xiaomi_miio_set_buzzer_off` %} (Air Purifier Pro excluded)

Turn the buzzer off.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific air purifier. Else targets all.  |

### {% linkable_title Service `fan.xiaomi_miio_set_led_on` %} (Air Purifier only)

Turn the led on.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific air purifier. Else targets all.  |

### {% linkable_title Service `fan.xiaomi_miio_set_led_off` %} (Air Purifier only)

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

### {% linkable_title Service `fan.xiaomi_miio_set_led_brightness` %} (Air Purifier Pro excluded)

Set the led brightness. Supported values are 0 (Bright), 1 (Dim), 2 (Off).

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific air purifier. Else targets all.  |
| `brightness`              |       no | Brightness, between 0 and 2.                            |

### {% linkable_title Service `fan.xiaomi_miio_set_favorite_level` %} (Air Purifier only)

Set the favorite level of the operation mode "favorite".

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific air purifier. Else targets all.  |
| `level`                   |       no | Level, between 0 and 16.                                |

### {% linkable_title Service `fan.xiaomi_miio_set_auto_detect_on` %} (Air Purifier Pro only)

Turn the auto detect on.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific air purifier. Else targets all.  |

### {% linkable_title Service `fan.xiaomi_miio_set_auto_detect_off` %} (Air Purifier Pro only)

Turn the auto detect off.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific air purifier. Else targets all.  |

### {% linkable_title Service `fan.xiaomi_miio_set_learn_mode_on` %} (Air Purifier 2 only)

Turn the learn mode on.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific air purifier. Else targets all.  |

### {% linkable_title Service `fan.xiaomi_miio_set_learn_mode_off` %} (Air Purifier 2 only)

Turn the learn mode off.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific air purifier. Else targets all.  |

### {% linkable_title Service `fan.xiaomi_miio_set_volume` %} (Air Purifier Pro only)

Set the sound volume.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific air purifier. Else targets all.  |
| `volume`                  |       no | Volume, between 0 and 100.                              |

### {% linkable_title Service `fan.xiaomi_miio_reset_filter` %} (Air Purifier 2 only)

Reset the filter lifetime and usage.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific air purifier. Else targets all.  |

### {% linkable_title Service `fan.xiaomi_miio_set_extra_features` %} (Air Purifier only)

Set the extra features.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific air purifier. Else targets all.  |
| `features`                |       no | Integer, known values are 0 and 1.                      |

### {% linkable_title Service `fan.xiaomi_miio_set_target_humidity` %} (Air Humidifier only)

Set the target humidity.

| Service data attribute    | Optional | Description                                                     |
|---------------------------|----------|-----------------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific air purifier. Else targets all.          |
| `humidity`                |       no | Target humidity. Allowed values are 30, 40, 50, 60, 70 and 80   |

### {% linkable_title Service `fan.xiaomi_miio_set_dry_on` %} (Air Humidifier CA only)

Turn the dry mode on.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific air purifier. Else targets all.  |

### {% linkable_title Service `fan.xiaomi_miio_set_dry_off` %} (Air Humidifier CA only)

Turn the dry mode off.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific air purifier. Else targets all.  |
