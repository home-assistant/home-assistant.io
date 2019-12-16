---
title: "iammeter"
description: "Instructions on how to integrate iammeter sensor within Home Assistant."
logo: iammeter-logo.png
ha_category:
  - Energy
  - Sensor
ha_release: 0.103
ha_iot_class: Local Polling
---

[https://www.iammeter.com](https://www.iammeter.com) is our energy management platform/cloud. Our Bi-Directional Wi-Fi Energy Meters can measure the real-time reading and report to our cloud. These meters can also be easily integrated into home assistant system. We have both single phase (WEM3080, WEM3162) and three phase (WEM3080T) meters.



## Configuration

Use the meter's sensors in your installation, and add the following to your configuration.yaml file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: iammeter
    host: ip address of host
    name: your device name
```

{% configuration %}
host:
  (string)(Required)
  The IP address of your iammeter.
name:
  (string)(Required)
{% endconfiguration %}

## Sensors

Sensors available in the library: 
 - single phase energy meter.(WEM3080/WEM3162 name: wem3080/wem3162)

| name               | Unit | Description                                           |
|--------------------|------|:-----------------------------------------------------------------------------|
| wem3080_voltage       | V    | Voltage.                                     |
| wem3080_current       | A    | current.                                           |
| wem3080_power         | W    | active power.                                    |
| wem3080_importenergy  | kWh  | Energy consumption from gird |
| wem3080_exportgrid    | kWh  | Energy export to grid    |

 - three phased energy meter.(WEM3080T name: wem3080t)

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