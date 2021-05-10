---
title: Hayward Omnilogic
description: Instructions on how to configure Hayward OmniLogic integration.
ha_category:
  - Sensor
  - Switch
  - Light
ha_release: 0.116
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@oliver84'
  - '@djtimca'
  - '@gentoosu'
ha_domain: omnilogic
ha_platforms:
  - sensor
  - switch
  - light
---

[Hayward OmniLogic](https://www.hayward-pool.com/shop/en/pools/omnilogic-i-auomni--1) smart pool and spa technology control.

There is currently support for the following device types within Home Assistant:

- ***Sensor*** - Air Temperature, Water Temperature, Variable Pump Speed, Chlorinator Setting, Salt Level, pH, and ORP
- ***Switch*** - All relays, pumps (single, dual, variable speed), and relay-based lights.
- ***Light*** - Colorlogic Lights (V1 and V2).

{% include integrations/config_flow.md %}

## Sensor Platform Options

If you have pH sensors in your Omnilogic setup, you can add an offset to correct reporting from the sensor in the integration configuration.

## Switch Platform

The switch platform contains a custom service to allow you to set the speed on variable speed pumps.

To set pump speed, call the `omnilogic.set_pump_speed` service as following:

```yaml
service: omnilogic.set_pump_speed
data:
  entity_id: Entity ID of the Pump
  speed: Speed (0-100%)
```

## Light Platform

The light platform allows you to set the color or effect of your lights from the effect list supported by your light version.

If you have V2 Colorlogic lights you can also set the brightness and speed of the lights using the custom service `omnilogic.set_v2_lights` as following:

```yaml
service: omnilogic.set_v2_lights
data:
  entity_id: Entity ID of the Lights
  speed: Speed (0-8) for the light effect (optional)
  brightness: Brightness (0-4) for the lights (optional)
```

## Known limitations

- The platform only supports sensors, lights and switches at the current release. A future release will include water heater for control of pool heaters.

## Debugging integration

If you have problems with the integration you can add debug prints to the log to aid in troubleshooting.

```yaml
logger:
  default: info
  logs:
    omnilogic: debug
    homeassistant.components.omnilogic: debug
```
