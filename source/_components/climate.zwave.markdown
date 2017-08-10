---
layout: page
title: "Z-Wave Climate"
description: "Instructions how to setup the Z-Wave thermostat or HVAC within Home Assistant."
date: 2016-04-03 9:52
sidebar: true
comments: false
sharing: true
footer: true
logo: z-wave.png
ha_category: Climate
ha_release: 0.17
ha_iot_class: "Local Push"
---


To get your Z-Wave thermostat or HVAC unit working with Home Assistant, follow the instructions for the general [Z-Wave component](/getting-started/z-wave/).

<p class='note'>
Thermostats with support for fan modes or different operating modes, will be handled like a HVAC device and will also be detected as one. 

If the thermostat support different operating modes, you will get one thermostat entity for each mode. These can be hidden with settings using the customize setting in the `configuration.yaml` file.
</p>

To enable the climate component for your Z-Wave network, add the following to your `configuration.yaml` file.

```yaml
climate:
  - platform: zwave
```

Once enabled, any Z-Wave climate devices will be available to Home Assistant. Multiple entities may be created. The following entities are created for a Remotec ZXT-120.

- **climate.remotec_zxt120_heating_1_id** Allows you to control the connected device. See below for examples.
- **sensor.remotec_zxt120_temperature_38** A sensor which returns the current temperature set on the attached device.

### {% linkable_title Automating Z-Wave Climate Devices %}

The following examples will instruct a Remotec ZXT-120 to turn the attached device mode to Heating, and set the temperature at 24 degrees after 8pm. Add it to `automation.yaml`.

```yaml
automation:
  - alias: Turn on Heater at 8pm
    trigger:
      - platform: time
        at: "20:00:00"
    action:
      - service: climate.set_operation_mode
        entity_id: climate.remotec_zxt120_heating_1_id
        data:
          operation_mode: Heat
      - service: climate.set_temperature
        entity_id: climate.remotec_zxt120_heating_1_39
        data:
          temperature: 24
```

Generally in Home Assistant you can use the `homeassistant/turn_off` service to turn devices off. For the Remotec ZXT-120, you must instead make a service call like the following.

```yaml
automation:
  - alias: Turn off Heater at 9pm
    trigger:
      - platform: time
        at: "21:00:00"
    action:
      - service: climate.set_operation_mode
        entity_id: climate.remotec_zxt120_heating_1_id
        data:
          operation_mode: 'Off'
```

**Note:** In the example above, the word `Off` is encased in single quotes to be valid YAML.

### {% linkable_title Test if it works %}

A simple way to test if your Z-Wave climate device is working is to use <img src='/images/screenshots/developer-tool-services-icon.png' alt='service developer tool icon' class="no-shadow" height="38" /> **Services** from the **Developer Tools**. Choose the applicable Climate service from the list of **Available services:** and enter something like the sample below into  the **Service Data** field and then press **CALL SERVICE**.

```json
{
  "entity_id": "climate.remotec_zxt120_heating_1_id",
  "operation_mode": "Heat"
}
```

