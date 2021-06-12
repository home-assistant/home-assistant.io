---
title: Z-Wave (deprecated)
description: Instructions on how to integrate your existing Z-Wave within Home Assistant.
ha_category:
  - Hub
  - Binary Sensor
  - Climate
  - Cover
  - Fan
  - Light
  - Lock
  - Sensor
  - Switch
featured: false
ha_iot_class: Local Push
ha_release: 0.7
ha_config_flow: true
ha_codeowners:
  - '@home-assistant/z-wave'
ha_domain: zwave
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - fan
  - light
  - lock
  - sensor
  - switch
---

<div class='note warning'>

This integration is deprecated. We recommend using [the Z-Wave JS integration](/integrations/zwave_js).

The Z-Wave integration will no longer receive any updates. It will not be removed unless it becomes incompatible with a future version of Python.

</div>

The [Z-Wave](https://www.z-wave.com/) integration for Home Assistant allows you to observe and control connected Z-Wave devices. Please see the [Z-Wave getting started section](/docs/z-wave/) for in-depth documentation on how to use and setup the Z-Wave component.

There is currently support for the following device types within Home Assistant:

- Binary Sensor
- [Climate](#climate)
- [Cover](#cover)
- Fan
- Light
- [Lock](#lock)
- Sensor
- Switch

## Configuration

If you have setup the requirements, then add the following entry `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
zwave:
```

## Climate

To get your Z-Wave thermostat or HVAC unit working with Home Assistant, follow the instructions for the general [Z-Wave component](/getting-started/z-wave/).

<div class='note'>

Thermostats with support for fan modes or different operating modes, will be handled like a HVAC device and will also be detected as one.

If the thermostat supports different operating modes, you will get one thermostat entity for each mode.

</div>

Once enabled, any Z-Wave climate devices will be available to Home Assistant. Multiple entities may be created. The following entities are created for a Remotec ZXT-120.

- `climate.remotec_zxt120_heating_1_id`: Allows you to control the connected device. See below for examples.
- `sensor.remotec_zxt120_temperature_38`: A sensor which returns the current temperature set on the attached device.

### Automating Z-Wave Climate Devices

The following examples will instruct a Remotec ZXT-120 to turn the attached device mode to Heating, and set the temperature at 24 degrees after 8pm. Add it to `automation.yaml`.

```yaml
automation:
  - alias: "Turn on Heater at 8pm"
    trigger:
      - platform: time
        at: "20:00:00"
    action:
      - service: climate.set_hvac_mode
        target:
          entity_id: climate.remotec_zxt120_heating_1_id
        data:
          hvac_mode: Heat
      - service: climate.set_temperature
        target:
          entity_id: climate.remotec_zxt120_heating_1_39
        data:
          temperature: 24
```

Generally, in Home Assistant, you can use the `homeassistant.turn_off` service to turn devices off. For the Remotec ZXT-120, you must instead make a service call like the following.

```yaml
automation:
  - alias: "Turn off Heater at 9pm"
    trigger:
      - platform: time
        at: "21:00:00"
    action:
      - service: climate.set_hvac_mode
        target:
          entity_id: climate.remotec_zxt120_heating_1_id
        data:
          hvac_mode: "Off"
```

**Note:** In the example above, the word `Off` is encased in single quotes to be valid YAML.

### Test if it works

A simple way to test if your Z-Wave climate device is working is to use **Developer Tools** -> **Services**. Choose the applicable Climate service from the list of **Available services:** and enter something like the sample below into the **Service Data** field and then press **CALL SERVICE**.

```yaml
entity_id: climate.remotec_zxt120_heating_1_id
hvac_mode: Heat
```

## Cover

Z-Wave garage doors, blinds, and roller shutters are supported as cover in Home Assistant.

To get your Z-Wave covers working with Home Assistant, follow the instructions for the general [Z-Wave component](#configuration).

If you discover that you need to [invert the operation](/docs/z-wave/installation/#invert_openclose_buttons) of open/close for a particular device, you may change this behavior in your Z-Wave section of your `configuration.yaml` file as follows, in addition you can also [invert percent position](/docs/z-wave/installation/#invert_percent):

```yaml
zwave:
  device_config:
    cover.my_cover:
      invert_openclose_buttons: true
      invert_percent: true
```

## Lock

To get your Z-Wave locks working with Home Assistant, follow the instructions for the general [Z-Wave component](#configuration).

Z-Wave locks will expose three services under the lock domain to manage usercodes if the lock supports it:

| Service        | Description                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------------------ |
| clear_usercode | Clears a usercode at code_slot X. Valid code_slots are 1-254, but max is defined by the lock.          |
| get_usercode   | Get a usercode from the lock at code_slot. Valid code_slots are 1-254, but max is defined by the lock. |
| set_usercode   | Sets usercode to X at code_slot Y. Valid usercodes are at least 4 digits, and max defined by the lock. |
