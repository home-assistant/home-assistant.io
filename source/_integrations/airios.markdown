---
title: Airios
description: Instructions on how to integrate Airios ventilation units into Home Assistant.
ha_category:
  - Climate
  - Fan
ha_config_flow: true
ha_release: 2025.4
ha_iot_class: Local Polling
ha_domain: airios
ha_platforms:
  - binary_sensor
  - button
  - fan
  - number
  - select
  - sensor
ha_codeowners:
  - '@scabrero'
ha_integration_type: hub
---

The **Airios** {% term integration %} allows you to control and monitor ventilation units and accessories from different manufacturers.

**Airios** develop and produce components for residential ventilation systems that final manufacturers use to build their products upon, from controller boards to remote controls or sensors. These components communicate over a proprietary RF protocol from Honeywell called Ramses II in the 868Mhz band.

A RF bridge is needed for Home Assistant to access the RF network. There are two bridge models with different interfaces. The **Airios** BRDG-02R13 has a RS485 serial interface (Modbus-RTU) and the BRDG-02EM23 is an Ethernet device (Modbus-TCP).

{% warning %}
Only the RS485 serial bridge is supported by this {% term integration %}.
{% endwarning %}

This {% term integration %} has been tested with the following manufacturers. Check each virtual integration page for the list of supported devices from each one.

* [Siber](/integrations/siber)

{% include integrations/config_flow.md %}

## Platforms

### Fan

The fan platform allows you to turn the unit on/off using the toggle switch and select the speed preset:

- `Away`
- `Low`
- `Medium`
- `High`
- `Boost`
- `Auto`
- `Low (temporary override)`
- `Medium (temporary override)`
- `High (temporary override)`

{% note %}
If a `temporary override` preset is selected it will be active for **1 hour**, automatically returning back to the previous preset after the override period.
{% endnote %}

### Sensor

The sensor platform allows you to monitor various metrics such as fan speeds, air temperatures, humidity, remaining filter life, and more.

### Binary sensor

The binary sensor platform allows you to monitor the status of different aspects of the unit and accessories, like air filter status, RF communication status and fault status.

{% note %}
It can take hours or days for battery powered accessories to report the status.
{% endnote %}

### Select

The select platform allows you to change the heat recovery bypass operating mode:

- `Open`
- `Close`
- `Auto`

{% note %}
In `Auto` mode, the unit automatically determines the bypass position.
{% endnote %}

### Number

The number platform gives you advanced control over the unit configuration. The available entities depend on the unit capabilities.

### Button

The button platform allows you to reset the filter counter.

## Fan actions

### Action `airios.set_preset_mode_duration`

Set a preset mode for a fixed duration.

| Data attribute       | Optional | Description                                  |
|----------------------|----------|----------------------------------------------|
| `preset_mode`          |       no | The preset name (`Low`, `Mid` or `High`).       |
| `preset_override_time` |       no | The preset mode override duration, between 10 minutes and 18 hours.   |

### Action `airios.set_preset_fan_speed_away`

Set the fan speed of the `Away` preset.

| Data attribute     | Optional | Description                                  |
|--------------------|----------|----------------------------------------------|
| `supply_fan_speed`   |       no | Fan speed in %. `Integer`, between 0 and 40.   |
| `exhaust_fan_speed`  |       no | Fan speed in %. `Integer`, between 0 and 40.   |

### Action `airios.set_preset_fan_speed_low`

Set the fan speed of the `Low` preset.

| Data attribute     | Optional | Description                                  |
|--------------------|----------|----------------------------------------------|
| `supply_fan_speed`   |       no | Fan speed in %. `Integer`, between 0 and 80.   |
| `exhaust_fan_speed`  |       no | Fan speed in %. `Integer`, between 0 and 80.   |

### Action `airios.set_preset_fan_speed_medium`

Set the fan speed of the `Medium` preset.

| Data attribute     | Optional | Description                                  |
|--------------------|----------|----------------------------------------------|
| `supply_fan_speed`   |       no | Fan speed in %. `Integer`, between 0 and 100.   |
| `exhaust_fan_speed`  |       no | Fan speed in %. `Integer`, between 0 and 100.   |

### Action `airios.set_preset_fan_speed_high`

Set the fan speed of the `High` preset.

| Data attribute     | Optional | Description                                  |
|--------------------|----------|----------------------------------------------|
| `supply_fan_speed`   |       no | Fan speed in %. `Integer`, between 0 and 100.   |
| `exhaust_fan_speed`  |       no | Fan speed in %. `Integer`, between 0 and 100.   |

{% tip %}
It is recommended to set supply fan speed slightly higher than exhaust.
{% endtip %}

## Other actions

### Action `airios.filter_reset`

Resets the filter counter.

### Action airios.device_reset

Resets the device preserving the configuration.

### Action airios.factory_reset

Resets the device to factory defaults.
