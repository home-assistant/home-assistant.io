---
title: Zehnder ComfoAir Q
description: Instructions on how to integrate Zehnder ComfoAir Q350/450/600 ventilation systems into Home Assistant.
ha_category:
  - Fan
  - Sensor
ha_release: 0.48
ha_iot_class: Local Push
ha_codeowners:
  - '@michaelarnauts'
ha_domain: comfoconnect
ha_platforms:
  - fan
  - sensor
ha_integration_type: integration
ha_quality_scale: legacy
---

The `comfoconnect` integration lets you control Zehnder ComfoAir [Q350](https://products.zehnder-systems.com/en/product/zehnder-comfoair-q350-tr)/[Q450](https://products.zehnder-systems.com/en/product/zehnder-comfoair-q450-tr)/[Q600](https://products.zehnder-systems.com/en/product/zehnder-comfoair-q600-st)
ventilation units from Home Assistant. You need a [ComfoConnect LAN C](https://www.zehnder.co.uk/products-and-systems/comfortable-indoor-ventilation/ms-comfoair-q/ideal-control#node-21233)
bridge to connect the unit to your local network.

There is an official iPhone and Android app to configure and control your unit. This platform connects with the help of
the unofficial [pycomfoconnect](https://github.com/michaelarnauts/comfoconnect) library.

The integration has a fan platform to view and control the ventilation speed, and a sensors platform to read out the outdoor temperature and humidity, the indoor temperature and humidity, and the extract and supply air flow (in m³ per hour).

To set it up, add the following information to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
comfoconnect:
  host: IP_ADDRESS
```

{% configuration %}
host:
  description: The IP or hostname of the ComfoConnect LAN C bridge.
  required: true
  type: string
name:
  description: The name of this device as you want to see it in Home Assistant.
  required: false
  default: ComfoAirQ
  type: string
token:
  description: The token you want to use when registering with the device. This is a random 32 char hexadecimal string.
  required: false
  default: "`00000000000000000000000000000001`"
  type: string
user_agent:
  description: The name you want to supply when registering with the device.
  required: false
  default: "`Home Assistant`"
  type: string
pin:
  description: The pin code to use when registering. You only need to change this if you have changed the factory default pin.
  required: false
  default: "`0000`"
  type: integer
{% endconfiguration %}

To register the sensors, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
sensor:
  - platform: comfoconnect
    resources:
      - air_flow_exhaust
      - air_flow_supply
      - bypass_state
      - current_humidity
      - current_rmot
      - current_temperature
      - days_to_replace_filter
      - exhaust_fan_duty
      - exhaust_fan_speed
      - exhaust_humidity
      - exhaust_temperature
      - outside_humidity
      - outside_temperature
      - power_total
      - power_usage
      - preheater_power_total
      - preheater_power_usage
      - supply_fan_duty
      - supply_fan_speed
      - supply_humidity
      - supply_temperature
```

The list above indicates all supported sensors. It is recommended to only include the ones you need.

{% note %}
Note that multiple connections to the bridge only work version >= U1.2.6 of the ComfoConnect LAN C bridge.
In older versions it's not possible to have multiple connections to the bridge at the same time. This integration will then keep the connection open, and if you open the app, it will ask you to disconnect Home Assistant. If you close the app again, Home Assistant will reconnect automatically.
{% endnote %}
