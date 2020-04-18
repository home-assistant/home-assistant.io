---
title: "Xiaomi Air Purifier"
description: "Instructions on how to integrate your Xiaomi Air Purifier and Xiaomi Air Humidifier within Home Assistant."
ha_category:
  - Fan
ha_iot_class: Local Polling
ha_release: 0.57
ha_domain: xiaomi_miio
---

The `xiaomi_miio` fan platform allows you to control the Xiaomi Air Purifier, Air Humidifier and Air Fresh.

Supported devices:

| Name                | Model                  | Model no. |
| ------------------- | ---------------------- | --------- |
Air Purifier          | zhimi.airpurifier.v1   | |
Air Purifier 2        | zhimi.airpurifier.v2   | FJY4006CN |
Air Purifier V3       | zhimi.airpurifier.v3   | |
Air Purifier V5       | zhimi.airpurifier.v5   | |
Air Purifier Pro      | zhimi.airpurifier.v6   | |
Air Purifier Pro V7   | zhimi.airpurifier.v7   | |
Air Purifier 2 (mini) | zhimi.airpurifier.m1   | |
Air Purifier (mini)   | zhimi.airpurifier.m2   | |
Air Purifier MA1      | zhimi.airpurifier.ma1  | |
Air Purifier 2S       | zhimi.airpurifier.ma2  | |
Air Purifier 2S       | zhimi.airpurifier.mc1  | |
Air Purifier Super    | zhimi.airpurifier.sa1  | |
Air Purifier Super 2  | zhimi.airpurifier.sa2  | |
Air Humidifier        | zhimi.humidifier.v1    | |
Air Humidifier CA1    | zhimi.humidifier.ca1   | |
Air Humidifier CB1    | zhimi.humidifier.cb1   | |
Air Fresh VA2         | zhimi.airfresh.va2     | |


## Features

### Air Purifier 2 et al.

- Power (on, off)
- Operation modes (auto, silent, favorite, idle)
- Buzzer (on, off)
- Child lock (on, off)
- LED (on, off), LED brightness (bright, dim, off)
- Favorite Level (0...16)
- Attributes
  - `model`
  - `temperature`
  - `humidity`
  - `aqi`
  - `mode`
  - `filter_hours_used`
  - `filter_life_remaining`
  - `favorite_level`
  - `child_lock`
  - `led`
  - `motor_speed`
  - `average_aqi`
  - `purify_volume`
  - `learn_mode`
  - `sleep_time`
  - `sleep_mode_learn_count`
  - `extra_features`
  - `turbo_mode_supported`
  - `auto_detect`
  - `use_time`
  - `button_pressed`
  - `buzzer`
  - `led_brightness`
  - `sleep_mode`

### Air Purifier Pro (zhimi.airpurifier.v6)

- Power (on, off)
- Operation modes (auto, silent, favorite)
- Child lock (on, off)
- LED (on, off)
- Favorite Level (0...16)
- Attributes
  - `model`
  - `temperature`
  - `humidity`
  - `aqi`
  - `mode`
  - `filter_hours_used`
  - `filter_life_remaining`
  - `favorite_level`
  - `child_lock`
  - `led`
  - `motor_speed`
  - `average_aqi`
  - `purify_volume`
  - `learn_mode`
  - `sleep_time`
  - `sleep_mode_learn_count`
  - `extra_features`
  - `turbo_mode_supported`
  - `auto_detect`
  - `use_time`
  - `button_pressed`
  - `filter_rfid_product_id`
  - `filter_rfid_tag`
  - `filter_type`
  - `illuminance`
  - `motor2_speed`
  - `volume`

### Air Purifier Pro V7 (zhimi.airpurifier.v7)

- Power (on, off)
- Operation modes (auto, silent, favorite)
- Child lock (on, off)
- LED (on, off)
- Favorite Level (0...16)
- Attributes
  - `model`
  - `temperature`
  - `humidity`
  - `aqi`
  - `mode`
  - `filter_hours_used`
  - `filter_life_remaining`
  - `favorite_level`
  - `child_lock`
  - `led`
  - `motor_speed`
  - `average_aqi`
  - `learn_mode`
  - `extra_features`
  - `turbo_mode_supported`
  - `button_pressed`
  - `filter_rfid_product_id`
  - `filter_rfid_tag`
  - `filter_type`
  - `illuminance`
  - `motor2_speed`
  - `volume`

### Air Purifier 2S (zhimi.airpurifier.mc1)

- Power (on, off)
- Operation modes (auto, silent, favorite)
- Buzzer (on, off)
- Child lock (on, off)
- LED (on, off)
- Favorite Level (0...16)
- Attributes
  - `model`
  - `temperature`
  - `humidity`
  - `aqi`
  - `mode`
  - `filter_hours_used`
  - `filter_life_remaining`
  - `favorite_level`
  - `child_lock`
  - `led`
  - `motor_speed`
  - `average_aqi`
  - `learn_mode`
  - `extra_features`
  - `turbo_mode_supported`
  - `button_pressed`
  - `filter_rfid_product_id`
  - `filter_rfid_tag`
  - `filter_type`
  - `illuminance`
  - `buzzer`

### Air Purifier V3 (zhimi.airpurifier.v3)

- Power (on, off)
- Operation modes (auto, silent, favorite, idle, medium, high, strong)
- Child lock (on, off)
- LED (on, off)
- Attributes
  - `model`
  - `aqi`
  - `mode`
  - `led`
  - `buzzer`
  - `child_lock`
  - `illuminance`
  - `filter_hours_used`
  - `filter_life_remaining`
  - `motor_speed`
  - `average_aqi`
  - `volume`
  - `motor2_speed`
  - `filter_rfid_product_id`
  - `filter_rfid_tag`
  - `filter_type`
  - `purify_volume`
  - `learn_mode`
  - `sleep_time`
  - `sleep_mode_learn_count`
  - `extra_features`
  - `auto_detect`
  - `use_time`
  - `button_pressed`

### Air Humidifier (zhimi.humidifier.v1)

- On, Off
- Operation modes (silent, medium, high, strong)
- Buzzer (on, off)
- Child lock (on, off)
- LED (on, off), LED brightness (bright, dim, off)
- Target humidity (30, 40, 50, 60, 70, 80)
- Attributes
  - `model`
  - `temperature`
  - `humidity`
  - `mode`
  - `buzzer`
  - `child_lock`
  - `trans_level`
  - `target_humidity`
  - `led_brightness`
  - `button_pressed`
  - `use_time`
  - `hardware_version`

### Air Humidifier CA (zhimi.humidifier.ca1)

- On, Off
- Operation modes (silent, medium, high, auto)
- Buzzer (on, off)
- Child lock (on, off)
- LED (on, off), LED brightness (bright, dim, off)
- Target humidity (30, 40, 50, 60, 70, 80)
- Dry mode (on, off)
- Attributes
  - `model`
  - `temperature`
  - `humidity`
  - `mode`
  - `buzzer`
  - `child_lock`
  - `trans_level`
  - `target_humidity`
  - `led_brightness`
  - `button_pressed`
  - `use_time`
  - `hardware_version`
  - `motor_speed`
  - `depth`
  - `dry`

### Air Humidifier CB (zhimi.humidifier.cb1)

- On, Off
- Operation modes (silent, medium, high, auto)
- Buzzer (on, off)
- Child lock (on, off)
- LED (on, off), LED brightness (bright, dim, off)
- Target humidity (30, 40, 50, 60, 70, 80)
- Dry mode (on, off)
- Attributes
  - `speed`
  - `speed_list`
  - `model`
  - `temperature`
  - `humidity`
  - `mode`
  - `buzzer`
  - `child_lock`
  - `target_humidity`
  - `led_brightness`
  - `use_time`
  - `hardware_version`
  - `motor_speed`
  - `depth`
  - `dry`
  - `supported_features`

### Air Fresh VA2

* Power (on, off)
* Operation modes (auto, silent, interval, low, middle, strong)
* Buzzer (on, off)
* Child lock (on, off)
* LED (on, off), LED brightness (bright, dim, off)
* Attributes
  - `model`
  - `aqi`
  - `average_aqi`
  - `temperature`
  - `humidity`
  - `co2`
  - `mode`
  - `led`
  - `led_brightness`
  - `buzzer`
  - `child_lock`
  - `filter_life_remaining`
  - `filter_hours_used`
  - `use_time`
  - `motor_speed`
  - `extra_features`

Please follow the instructions on [Retrieving the Access Token](/integrations/vacuum.xiaomi_miio/#retrieving-the-access-token) to get the API token to use in the `configuration.yaml` file.

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
  description: The IP address of your miio fan.
  required: true
  type: string
token:
  description: The API token of your miio fan.
  required: true
  type: string
name:
  description: The name of your miio fan.
  required: false
  type: string
  default: Xiaomi Air Purifier
model:
  description: The model of your miio fan. See the table above for valid values (f.e. `zhimi.airpurifier.v2`). This setting can be used to bypass the device model detection and is recommended if your device isn't always available.
  required: false
  type: string
{% endconfiguration %}

## Platform Services

### Service `fan.set_speed`

Set the fan speed/operation mode.

| Service data attribute    | Optional | Description                                                         |
|---------------------------|----------|---------------------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.                      |
| `speed`                   |       no | Fan speed. Valid values are 'Auto', 'Silent', 'Favorite' and 'Idle' |

### Service `xiaomi_miio.fan_set_buzzer_on` (Air Purifier Pro excluded)

Turn the buzzer on.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

### Service `xiaomi_miio.fan_set_buzzer_off` (Air Purifier Pro excluded)

Turn the buzzer off.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

### Service `xiaomi_miio.fan_set_led_on` (Air Purifiers only)

Turn the LED on.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

### Service `xiaomi_miio.fan_set_led_off` (Air Purifiers only)

Turn the LED off.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

### Service `xiaomi_miio.fan_set_child_lock_on`

Turn the child lock on.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

### Service `xiaomi_miio.fan_set_child_lock_off`

Turn the child lock off.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

### Service `xiaomi_miio.fan_set_led_brightness` (Air Purifier 2S and Air Purifier Pro excluded)

Set the LED brightness. Supported values are 0 (Bright), 1 (Dim), 2 (Off).

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |
| `brightness`              |       no | Brightness, between 0 and 2.                            |

### Service `xiaomi_miio.fan_set_favorite_level` (Air Purifiers only)

Set the favorite level of the operation mode "favorite".

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |
| `level`                   |       no | Level, between 0 and 16.                                |

### Service `xiaomi_miio.fan_set_auto_detect_on` (Air Purifier 2S and Air Purifier Pro only)

Turn the auto detect on.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

### Service `xiaomi_miio.fan_set_auto_detect_off` (Air Purifier 2S and Air Purifier Pro only)

Turn the auto detect off.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

### Service `xiaomi_miio.fan_set_learn_mode_on` (Air Purifier 2 only)

Turn the learn mode on.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

### Service `xiaomi_miio.fan_set_learn_mode_off` (Air Purifier 2 only)

Turn the learn mode off.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

### Service `xiaomi_miio.fan_set_volume` (Air Purifier Pro only)

Set the sound volume.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |
| `volume`                  |       no | Volume, between 0 and 100.                              |

### Service `xiaomi_miio.fan_reset_filter` (Air Purifier 2 only)

Reset the filter lifetime and usage.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

### Service `xiaomi_miio.fan_set_extra_features` (Air Purifier only)

Set the extra features.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |
| `features`                |       no | Integer, known values are 0 and 1.                      |

### Service `xiaomi_miio.fan_set_target_humidity` (Air Humidifier only)

Set the target humidity.

| Service data attribute    | Optional | Description                                                     |
|---------------------------|----------|-----------------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.                  |
| `humidity`                |       no | Target humidity. Allowed values are 30, 40, 50, 60, 70 and 80   |

### Service `fan.xiaomi_miio_set_dry_on` (Air Humidifier CA and CB)

Turn the dry mode on.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

### Service `fan.xiaomi_miio_set_dry_off` (Air Humidifier CA and CB)

Turn the dry mode off.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

## Troubleshooting `Unable to find device` error messages

Check if the device is in the same subnet as the Home Assistant instance. Otherwise, you should configure your router/firewall to put this device in the same VLAN as the Home Assistant instance.

If it's not possible to use VLANs for some reason, your last resort may be using NAT translation, between the IPs.
