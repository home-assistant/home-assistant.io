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
---

`iammeter` provides real-time readings of single-phase (WEM3080, WEM3162) and three-phase (WEM3080T) meters from [IAMMETER](https://www.iammeter.com) over Wi-Fi.

Example Lovelace Dashboard:

<p class='img'>
  <img src='/images/integrations/iammeter/demo.jpg' />
</p>

## Configuration

To use this sensor in your installation, add the following to your `configuration.yaml` file:

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

| name               | Unit | Description                                           |
|--------------------|------|:-----------------------------------------------------------------------------|
| wem3080_voltage       | V    | Voltage.                                     |
| wem3080_current       | A    | current.                                           |
| wem3080_power         | W    | active power.                                    |
| wem3080_importenergy  | kWh  | Energy consumption from gird |
| wem3080_exportgrid    | kWh  | Energy export to grid    |

### Three-phase energy meter (WEM3080T)

| name               | Unit | Description                                           |
|--------------------|------|:-----------------------------------------------------------------------------|
| wem3080t_voltage_a      | V    | A phase voltage       |
| wem3080t_current_a      | A    | A phase current |
| wem3080t_power_a        | W    | A phase active power  |
| wem3080t_importenergy_a | kWh  | A phase import energy |
| wem3080t_exportgrid_a   | kWh  | A phase export energy |
| wem3080t_frequency_a    | kWh  | A phase frequency     |
| wem3080t_pf_a           | kWh  | A phase power factor  |
|                       |      |                |
| wem3080t_voltage_b      | V    | B phase voltage       |
| wem3080t_current_b      | A    | B phase current       |
| wem3080t_power_b        | W    | B phase active power  |
| wem3080t_importenergy_b | kWh  | B phase import energy |
| wem3080t_exportgrid_b   | kWh  | B phase export energy |
| wem3080t_frequency_b    | kWh  | B phase frequency     |
| wem3080t_pf_b           | kWh | B phase power factor  |
|                       |      |                |
| wem3080t_voltage_c      | V    | C phase voltage       |
| wem3080t_current_c      | A    | C phase current |
| wem3080t_power_c        | W    | C phase active power |
| wem3080t_importenergy_c | kWh  | C phase import energy |
| wem3080t_exportgrid_c   | kWh  | C phase export energy |
| wem3080t_frequency_c    | kWh  | C phase frequency |
| wem3080t_pf_c           | kWh  | C phase power factor |
