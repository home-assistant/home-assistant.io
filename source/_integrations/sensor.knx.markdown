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

| KNX DPT | type                          | size in byte | range                      | unit           |
|--------:|-------------------------------|-------------:|:--------------------------:|----------------|
| 5.001   | percent                       | 1            | 0 ... 100                  | %              |
| 5.003   | angle                         | 1            | 0 ... 360                  | °              |
| 5.004   | percentU8                     | 1            | 0 ... 255                  | %              |
| 5.010   | pulse                         | 1            | 0 ... 255                  |                |
| 5.010   | 1byte_unsigned                | 1            | 0 ... 255                  |                |
| 6.001   | percentV8                     | 1            | -128 ... 127               | %              |
| 6.010   | counter_pulses                | 1            | -128 ... 127               | counter pulses |
| 7.001   | 2byte_unsigned                | 2            | 0 ... 65535                | pulses         |
| 7.002   | time_period_msec              | 2            | 0 ... 65535                | ms             |
| 7.003   | time_period_10msec            | 2            | 0 ... 65535                | ms             |
| 7.004   | time_period_100msec           | 2            | 0 ... 65535                | ms             |
| 7.005   | time_period_sec               | 2            | 0 ... 65535                | s              |
| 7.006   | time_period_min               | 2            | 0 ... 65535                | min            |
| 7.007   | time_period_hrs               | 2            | 0 ... 65535                | h              |
| 7.011   | length_mm                     | 2            | 0 ... 65535                | mm             |
| 7.012   | current                       | 2            | 0 ... 65535                | mA             |
| 7.013   | brightness                    | 2            | 0 ... 65535                | lx             |
| 7.600   | color_temperature             | 2            | 0 ... 65535                | K              |
| 8.001   | 2byte_signed                  | 2            | -32768 ... 32767           | pulses         |
| 8.002   | delta_time_ms                 | 2            | -32768 ... 32767           | ms             |
| 8.005   | delta_time_sec                | 2            | -32768 ... 32767           | s              |
| 8.006   | delta_time_min                | 2            | -32768 ... 32767           | min            |
| 8.007   | delta_time_hrs                | 2            | -32768 ... 32767           | h              |
| 8.010   | percentV16                    | 2            | -32768 ... 32767           | %              |
| 8.011   | rotation_angle                | 2            | -32768 ... 32767           | °              |
| 9.*     | enthalpy                      | 2            | -671088.64 ... 670760.96   | H              |
| 9.001   | temperature                   | 2            | -273 ... 670760            | °C             |
| 9.002   | temperature_difference_2byte  | 2            | -670760 ... 670760         | K              |
| 9.003   | temperature_a                 | 2            | -670760 ... 670760         | K/h            |
| 9.004   | illuminance                   | 2            | 0 ... 670760               | lx             |
| 9.005   | wind_speed_ms                 | 2            | 0 ... 670760               | m/s            |
| 9.006   | pressure_2byte                | 2            | 0 ... 670760               | Pa             |
| 9.007   | humidity                      | 2            | 0 ... 670760               | %              |
| 9.008   | ppm                           | 2            | -671088.64 ... 670760.96   | ppm            |
| 9.010   | time_1                        | 2            | -670760 ... 670760         | s              |
| 9.011   | time_2                        | 2            | -670760 ... 670760         | ms             |
| 9.020   | voltage                       | 2            | -671088.64 ... 670760.96   | mV             |
| 9.022   | power_density                 | 2            | -671088.64 ... 670760.96   | W/m²           |
| 9.023   | kelvin_per_percent            | 2            | -671088.64 ... 670760.96   | K/%            |
| 9.024   | power_2byte                   | 2            | -671088.64 ... 670760.96   | kW             |
| 9.025   | volume_flow                   | 2            | -671088.64 ... 670760.96   | l/h            |
| 9.026   | rain_amount                   | 2            | -671088.64 ... 670760.96   | l/m²           |
| 9.027   | temperature_f                 | 2            | -459.6 ... 670760          | °F             |
| 9.028   | wind_speed_kmh                | 2            | 0 ... 670760               | km/h           |
| 12.***  | 4byte_unsigned                | 4            | 0 ... 4294967295           |                |
| 13.***  | 4byte_signed                  | 4            | -2147483648 ... 2147483647 |                |
| 13.002  | flow_rate_m3h                 | 4            | -2147483648 ... 2147483647 | m³/h           |
| 13.010  | active_energy                 | 4            | -2147483648 ... 2147483647 | Wh             |
| 13.011  | apparant_energy               | 4            | -2147483648 ... 2147483647 | VAh            |
| 13.012  | reactive_energy               | 4            | -2147483648 ... 2147483647 | VARh           |
| 13.013  | active_energy_kwh             | 4            | -2147483648 ... 2147483647 | kWh            |
| 13.014  | apparant_energy_kvah          | 4            | -2147483648 ... 2147483647 | kVAh           |
| 13.015  | reactive_energy_kvarh         | 4            | -2147483648 ... 2147483647 | kVARh          |
| 13.100  | long_delta_timesec            | 4            | -2147483648 ... 2147483647 | s              |
| 14.000  | acceleration                  | 4            |                            | m/s²           |
| 14.***  | 4byte_float                   | 4            |                            |                |
| 14.001  | acceleration_angular          | 4            |                            | rad/s²         |
| 14.002  | activation_energy             | 4            |                            | J/mol          |
| 14.003  | activity                      | 4            |                            | s⁻¹            |
| 14.004  | mol                           | 4            |                            | mol            |
| 14.005  | amplitude                     | 4            |                            |                |
| 14.006  | angle_rad                     | 4            |                            | rad            |
| 14.007  | angle_deg                     | 4            |                            | °              |
| 14.008  | angular_momentum              | 4            |                            | J s            |
| 14.009  | angular_velocity              | 4            |                            | rad/s          |
| 14.010  | area                          | 4            |                            | m²             |
| 14.011  | capacitance                   | 4            |                            | F              |
| 14.012  | charge_density_surface        | 4            |                            | C/m²           |
| 14.013  | charge_density_volume         | 4            |                            | C/m³           |
| 14.014  | compressibility               | 4            |                            | m²/N           |
| 14.015  | conductance                   | 4            |                            | S              |
| 14.016  | electrical_conductivity       | 4            |                            | S/m            |
| 14.017  | density                       | 4            |                            | kg/m³          |
| 14.018  | electric_charge               | 4            |                            | C              |
| 14.019  | electric_current              | 4            |                            | A              |
| 14.020  | electric_current_density      | 4            |                            | A/m²           |
| 14.021  | electric_dipole_moment        | 4            |                            | C m            |
| 14.022  | electric_displacement         | 4            |                            | C/m²           |
| 14.023  | electric_field_strength       | 4            |                            | V/m            |
| 14.024  | electric_flux                 | 4            |                            | c              |
| 14.025  | electric_flux_density         | 4            |                            | C/m²           |
| 14.026  | electric_polarization         | 4            |                            | C/m²           |
| 14.027  | electric_potential            | 4            |                            | V              |
| 14.028  | electric_potential_difference | 4            |                            | V              |
| 14.029  | electromagnetic_moment        | 4            |                            | A m²           |
| 14.030  | electromotive_force           | 4            |                            | V              |
| 14.031  | energy                        | 4            |                            | J              |
| 14.032  | force                         | 4            |                            | N              |
| 14.033  | frequency                     | 4            |                            | Hz             |
| 14.034  | angular_frequency             | 4            |                            | rad/s          |
| 14.035  | heatcapacity                  | 4            |                            | J/K            |
| 14.036  | heatflowrate                  | 4            |                            | W              |
| 14.037  | heat_quantity                 | 4            |                            | J              |
| 14.038  | impedance                     | 4            |                            | Ω              |
| 14.039  | length                        | 4            |                            | m              |
| 14.040  | light_quantity                | 4            |                            | lm s           |
| 14.041  | luminance                     | 4            |                            | cd/m²          |
| 14.042  | luminous_flux                 | 4            |                            | lm             |
| 14.043  | luminous_intensity            | 4            |                            | cd             |
| 14.044  | magnetic_field_strength       | 4            |                            | A/m            |
| 14.045  | magnetic_flux                 | 4            |                            | Wb             |
| 14.046  | magnetic_flux_density         | 4            |                            | T              |
| 14.047  | magnetic_moment               | 4            |                            | A m²           |
| 14.048  | magnetic_polarization         | 4            |                            | T              |
| 14.049  | magnetization                 | 4            |                            | A/m            |
| 14.050  | magnetomotive_force           | 4            |                            | A              |
| 14.051  | mass                          | 4            |                            | kg             |
| 14.052  | mass_flux                     | 4            |                            | kg/s           |
| 14.053  | momentum                      | 4            |                            | N/s            |
| 14.054  | phaseanglerad                 | 4            |                            | rad            |
| 14.055  | phaseangledeg                 | 4            |                            | °              |
| 14.056  | power                         | 4            |                            | W              |
| 14.057  | powerfactor                   | 4            |                            | cosΦ           |
| 14.058  | pressure                      | 4            |                            | Pa             |
| 14.059  | reactance                     | 4            |                            | Ω              |
| 14.060  | resistance                    | 4            |                            | Ω              |
| 14.061  | resistivity                   | 4            |                            | Ω m            |
| 14.062  | self_inductance               | 4            |                            | H              |
| 14.063  | solid_angle                   | 4            |                            | sr             |
| 14.064  | sound_intensity               | 4            |                            | W/m²           |
| 14.065  | speed                         | 4            |                            | m/s            |
| 14.066  | stress                        | 4            |                            | Pa             |
| 14.067  | surface_tension               | 4            |                            | N/m            |
| 14.068  | common_temperature            | 4            |                            | °C             |
| 14.069  | absolute_temperature          | 4            |                            | K              |
| 14.070  | temperature_difference        | 4            |                            | K              |
| 14.071  | thermal_capacity              | 4            |                            | J/K            |
| 14.072  | thermal_conductivity          | 4            |                            | W/mK           |
| 14.073  | thermoelectric_power          | 4            |                            | V/K            |
| 14.074  | time_seconds                  | 4            |                            | s              |
| 14.075  | torque                        | 4            |                            | N m            |
| 14.076  | volume                        | 4            |                            | m³             |
| 14.077  | volume_flux                   | 4            |                            | m³/s           |
| 14.078  | weight                        | 4            |                            | N              |
| 14.079  | work                          | 4            |                            | J              |
| 16.000  | string                        | 14           |                            |                |
| 17.001  | scene_number                  | 1            | 1 ... 64                   |                |

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
