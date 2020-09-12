---
title: "KNX Weather"
description: "Instructions on how to integrate KNX weather stations with Home Assistant."
ha_category:
  - Weather
ha_release: 0.115
ha_iot_class: Local Push
ha_domain: knx
---

The `knx` weather platform is used as an interface to KNX weather stations.

To use your KNX weather station in your installation, add the following lines to your top level [KNX Integration](/integrations/knx) configuration key in `configuration.yaml`:

```yaml
# Example configuration.yaml entry
knx:
  weather:
    - name: "home"
      address_temperature: "7/0/0"
      address_brightness_south: "7/0/1"
      address_brightness_west: "7/0/2"
      address_brightness_east: "7/0/3"
      address_wind_speed: "7/0/4"
      address_rain_alarm: "7/0/5"
      address_frost_alarm: "7/0/6"
      address_wind_alarm: "7/0/7"
      address_day_night: "7/0/8"
      address_air_pressure: "7/0/9"
      address_humidity: "7/0/10"
      expose_sensors: False
      sync_state: True
```

{% configuration %}
name:
  description: A name for this device used within Home Assistant.
  required: false
  default: KNX Weather
  type: string
address_temperature:
  description: KNX group address for reading current outside temperature from KNX bus. *DPT 9.001*
  required: true
  type: string
address_brightness_south:
  description: KNX group address for reading current brightness to south coordinate from KNX bus. *DPT 9.004*
  required: false
  type: string
address_brightness_west:
  description: KNX group address for reading current brightness to west coordinate from KNX bus. *DPT 9.004*
  required: false
  type: string
address_brightness_east:
  description: KNX group address for reading current brightness to east coordinate from KNX bus. *DPT 9.004*
  required: false
  type: string
address_wind_speed:
  description: KNX group address for reading current wind speed from KNX bus. *DPT 9.005*
  required: false
  type: string
address_rain_alarm:
  description: KNX group address for reading if rain alarm is on/off.
  required: false
  type: string
address_frost_alarm:
  description: KNX group address for reading if frost alarm is on/off.
  required: false
  type: string
address_wind_alarm:
  description: KNX group address for reading if wind alarm is on/off.
  required: false
  type: string
address_day_night:
  description: KNX group address for reading if it's day/night.
  required: false
  type: string
address_air_pressure:
  description: KNX address reading current air pressure. *DPT 9.006*
  required: false
  type: string
address_humidity:
  description: KNX address for reading current humidity. *DPT 9.007*
  required: false
  type: string
expose_sensors:
  description: If true, exposes all sensor values as dedicated sensors to HA.
  required: false
  type: boolean
  default: False
sync_state:
  description: Actively read the value from the bus. If `False` no GroupValueRead telegrams will be sent to the bus.
  required: false
  type: boolean
  default: True
{% endconfiguration %}
