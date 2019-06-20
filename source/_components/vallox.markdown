---
layout: page
title: "Vallox Ventilation Units"
description: "Instructions on how to integrate Vallox ventilation units into Home Assistant."
date: 2019-06-19 20:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category:
  - Fan
  - Sensor
ha_release: 0.96
ha_iot_class: Local Polling
---

The `vallox` component lets you control any Vallox ventilation unit that is supported by the [vallox_websocket_api](https://github.com/yozik04/vallox_websocket_api) (follow the link for a list of supported units).

The component's fan platform allows you to either turn on/off the complete unit via toggle switch, or select a ventilation profile from a dropdown menu and therefore indirectly the fan speed. The four standard Vallox profiles are provided:

- `At Home`
- `Away`
- `Boost`
- `Fireplace`

Also, there is a sensor platform that exposes a number of relevant metrics like fan speed, various air temperatures and humidity.

### {% linkable_title Configuration %}

```yaml
vallox:
  host: IP_ADDRESS
```

{% configuration %}
host:
  description: The IP or hostname of the ventilation unit in your home network.
  required: true
  type: string
name:
  description: The name of this device as you want to see it in Home Assistant.
  required: false
  default: Vallox
  type: string
sensors:
  description: Include sensor reports. Optionally, provide a list of specific sensors.
  required: false
  default: All sensors.
  type: list
{% endconfiguration %}

## {% linkable_title Fan Services %}

### {% linkable_title Service `fan.vallox_set_profile_fan_speed_home` %}

Set the fan speed of the `Home` profile.

| Service data attribute | Optional | Description                                     |
|------------------------|----------|-------------------------------------------------|
| `entity_id`            |       no | Entitiy id of the fan, e.g.`fan.vallox`.        |
| `fan_speed`            |       no | Fan speed in %. `Integer`, between 0 and 100.   |


### {% linkable_title Service `fan.vallox_set_profile_fan_speed_away` %}

Set the fan speed of the `Away` profile.

| Service data attribute | Optional | Description                                     |
|------------------------|----------|-------------------------------------------------|
| `entity_id`            |       no | Entitiy id of the fan, e.g.`fan.vallox`.        |
| `fan_speed`            |       no | Fan speed in %. `Integer`, between 0 and 100.   |

### {% linkable_title Service `fan.vallox_set_profile_fan_speed_boost` %}

Set the fan speed of the `Boost` profile.

| Service data attribute | Optional | Description                                     |
|------------------------|----------|-------------------------------------------------|
| `entity_id`            |       no | Entitiy id of the fan, e.g.`fan.vallox`.        |
| `fan_speed`            |       no | Fan speed in %. `Integer`, between 0 and 100.   |

## {% linkable_title Sensors %}

The following sensors are available:

- `fan_speed`
- `temp_extract_air`
- `temp_exhaust_air`
- `temp_outdoor_air`
- `temp_supply_air`
- `humidity`
- `remaining_time_filter`

To activate _all_ sensors, add `sensors:` to your configuration:

```yaml
vallox:
  host: IP_ADDRESS
  sensors:
```

In case you only want a subset, provide a reduced list of your choice, e.g.:

```yaml
vallox:
  host: IP_ADDRESS
  sensors:
    - fan_speed
    - temp_outdoor_air
    - temp_supply_air
```
