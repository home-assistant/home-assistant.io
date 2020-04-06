---
title: "KNX Sensor"
description: "Instructions on how to use a KNX Sensor with Home Assistant."
ha_category:
  - Sensor
ha_release: 0.29
ha_iot_class: Local Push
ha_domain: knx
---

<div class='note'>
  
The `knx` integration must be configured correctly to use this integration, see [KNX Integration](/integrations/knx).

</div>

The `knx` sensor platform allows you to monitor [KNX](https://www.knx.org/) sensors. 

Sensors are read-only. To write to the knx-bus configure an exposure [KNX Integration - Expose](/integrations/knx/#exposing-sensor-values-or-time-to-knx-bus).


## Configuration

To use your KNX sensor in your installation, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: knx
    name: Heating.Valve1
    state_address: '2/0/0'
```

{% configuration %}
state_address:
  description: KNX group address of the sensor.
  required: true
  type: string
name:
  description: A name for this device used within Home Assistant.
  required: false
  type: string
sync_state:
  description: Actively read the value from the bus. If `False` no GroupValueRead telegrams will be sent to the bus.
  required: false
  type: boolean
  default: True
type:
  description: A type from the following table must be defined. The DPT of the group address should match the expected KNX DPT to be parsed correctly.
  required: true
  type: string
{% endconfiguration %}

| KNX DPT | type               | size in byte | unit           |
|--------:|--------------------|-------------:|----------------|
| 5.001   | percent            | 1            | %              |
| 5.003   | angle              | 1            | °              |
| 5.004   | percentU8          | 1            | %              |
| 5.010   | pulse              | 1            |                |
| 5.010   | DPT-5              | 1            |                |
| 5.010   | 1byte_unsigned     | 1            |                |
| 6.001   | percentV8          | 1            | %              |
| 6.010   | counter_pulses     | 1            | counter pulses |
| 7.***   | DPT-7              | 2            |                |
| 7.001   | 2byte_unsigned     | 2            | pulses         |
| 7.012   | current            | 2            | mA             |
| 7.013   | brightness         | 2            | lx             |
| 7.600   | color_temperature  | 2            | K              |
| 8.***   | DPT-8              | 2            |                |
| 8.001   | 2byte_signed       | 2            | pulses         |
| 8.002   | delta_time_ms      | 2            | ms             |
| 8.005   | delta_time_sec     | 2            | s              |
| 8.006   | delta_time_min     | 2            | min            |
| 8.007   | delta_time_hrs     | 2            | h              |
| 8.010   | percentV16         | 2            | %              |
| 8.011   | rotation_angle     | 2            | °              |
| 9.*     | enthalpy           | 2            | H              |
| 9.***   | DPT-9              | 2            |                |
| 9.001   | temperature        | 2            | °C             |
| 9.004   | illuminance        | 2            | lx             |
| 9.005   | speed_ms           | 2            | m/s            |
| 9.006   | pressure_2byte     | 2            | Pa             |
| 9.007   | humidity           | 2            | %              |
| 9.008   | ppm                | 2            | ppm            |
| 9.020   | voltage            | 2            | mV             |
| 12.***  | DPT-12             | 4            |                |
| 12.***  | 4byte_unsigned     | 4            |                |
| 13.***  | DPT-13             | 4            |                |
| 13.***  | 4byte_signed       | 4            |                |
| 14.***  | DPT-14             | 4            |                |
| 14.***  | 4byte_float        | 4            |                |
| 14.019  | electric_current   | 4            | A              |
| 14.027  | electric_potential | 4            | V              |
| 14.031  | energy             | 4            | J              |
| 14.033  | frequency          | 4            | Hz             |
| 14.036  | heatflowrate       | 4            | W              |
| 14.042  | luminous_flux      | 4            | lm             |
| 14.054  | phaseanglerad      | 4            | rad            |
| 14.055  | phaseangledeg      | 4            | °              |
| 14.056  | power              | 4            | W              |
| 14.057  | powerfactor        | 4            |                |
| 14.058  | pressure           | 4            | Pa             |
| 14.065  | speed              | 4            | m/s            |
| 16.000  | string             | 14           |                |
| 17.001  | scene_number       | 1            |                |

## Full example

```yaml
# Example configuration.yaml entry
sensor:
  - platform: knx
    name: Heating.Valve1
    state_address: '2/0/0'
    type: 'percent'
  - platform: knx
    name: Kitchen.Temperature
    state_address: '6/2/1'
    sync_state: False
    type: 'temperature'
```
