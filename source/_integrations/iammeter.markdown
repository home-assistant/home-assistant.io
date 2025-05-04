---
title: IamMeter
description: Instructions on how to integrate IAMMETER sensor within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 0.107
ha_iot_class: Local Polling
ha_domain: iammeter
ha_codeowners:
  - '@lewei50'
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

[IAMMETER](https://www.iammeter.com/) provides both a bi-directional single-phase energy meter([WEM3080](https://www.iammeter.com/products/single-phase-meter)) and a bi-directional three-phase energy monitor ([WEM3080T](https://www.iammeter.com/products/three-phase-meter)). Both of them can be integrated into Home Assistant.
The [WEM3050T](https://www.iammeter.com/products/3phase-meter-3050t) is the latest three-phase/split-phase meter, released by IAMMETER on Nov 2023.
The WEM3050T provides nearly all of the features the WEM3080T provides, with the exception of the cloud service.
The WEM3050T can be integrated into Home Assistant by [all of the methods](https://community.home-assistant.io/t/four-ways-to-integrate-the-electricity-usage-monitor-iammeter-into-the-home-assistant/485520/) that WEM3080T supports.
Because there is no cloud service by default, the WEM3050T is much cheaper than the WEM3080T.

## Configuration

To use this {% term integration %} in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: iammeter
    host: IP_ADDRESS_OF_HOST
```

{% configuration %}
host:
  description: The IP address of your IAMMETER.
  required: true
  type: string
port:
  description: port of your IAMMETER.
  required: false
  default: 80
  type: integer
name:
  description: Name for the sensor entity.
  required: false
  type: string
  default: IamMeter
{% endconfiguration %}

## Sensors

Sensors available in the library:

### Single-phase energy meter (WEM3080/WEM3162)

| name                 | Unit | Description                  |
| -------------------- | ---- | :--------------------------- |
| wem3080_voltage      | V    | Voltage.                     |
| wem3080_current      | A    | current.                     |
| wem3080_power        | W    | active power.                |
| wem3080_importenergy | kWh  | Energy consumption from grid |
| wem3080_exportgrid   | kWh  | Energy export to grid        |

### Three-phase energy meter (WEM3080T)

| name                    | Unit | Description           |
| ----------------------- | ---- | :-------------------- |
| wem3080t_voltage_a      | V    | A phase voltage       |
| wem3080t_current_a      | A    | A phase current       |
| wem3080t_power_a        | W    | A phase active power  |
| wem3080t_importenergy_a | kWh  | A phase import energy |
| wem3080t_exportgrid_a   | kWh  | A phase export energy |
| wem3080t_frequency_a    | Hz   | A phase frequency     |
| wem3080t_pf_a           |      | A phase power factor  |
|                         |      |                       |
| wem3080t_voltage_b      | V    | B phase voltage       |
| wem3080t_current_b      | A    | B phase current       |
| wem3080t_power_b        | W    | B phase active power  |
| wem3080t_importenergy_b | kWh  | B phase import energy |
| wem3080t_exportgrid_b   | kWh  | B phase export energy |
| wem3080t_frequency_b    | Hz   | B phase frequency     |
| wem3080t_pf_b           |      | B phase power factor  |
|                         |      |                       |
| wem3080t_voltage_c      | V    | C phase voltage       |
| wem3080t_current_c      | A    | C phase current       |
| wem3080t_power_c        | W    | C phase active power  |
| wem3080t_importenergy_c | kWh  | C phase import energy |
| wem3080t_exportgrid_c   | kWh  | C phase export energy |
| wem3080t_frequency_c    | Hz   | C phase frequency     |
| wem3080t_pf_c           |      | C phase power factor  |
