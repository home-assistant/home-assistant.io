---
title: Sensor
description: Instructions on how to setup your sensors with Home Assistant.
ha_category:
  - Sensor
ha_release: 0.7
ha_quality_scale: internal
ha_domain: sensor
---

Sensors are a basic platform component in Home Assistant. They monitor the states and conditions of a variety of entities. An entity can be many things. This can include a physical device like a motion sensor that reports the battery level, a web service that retrieves the weather temperature, a built-in function that calculates the sun's elevation relative to your GPS position, or even a custom sensor you may have created to report the free space on your laptop. These are all *things* reporting different types of information.

Some of these sensors are built-in to Home Assistant, some are created automatically when you add an integration (see this [list](/integrations/#sensor)), and some can be created manually. The [Statistics](/integrations/statistics) and [Template](/integrations/template) sensors are two examples of the last case.

## Device Class

The type of data a sensor returns impacts how it is displayed in the frontend. This is controlled by the sensor's device class designation. Built-in sensors and many created from an integration will have this designation predefined. Those can be modified in the [customize section](/docs/configuration/customizing-devices/). When manually creating a new sensor the device class may be optionally assigned. A full list of available sensor device classes is below:

- **None**: Generic sensor. This is the default and doesn't need to be set.
- **battery**: Percentage of battery that is left.
- **current**: Current in A.
- **energy**: Energy in Wh or kWh.
- **humidity**: Percentage of humidity in the air.
- **illuminance**: The current light level in lx or lm.
- **signal_strength**: Signal strength in dB or dBm.
- **temperature**: Temperature in °C or °F.
- **power**: Power in W or kW.
- **power_factor**: Power factor in %.
- **pressure**: Pressure in hPa or mbar.
- **timestamp**: Datetime object or timestamp string (ISO 8601).
- **voltage**: Voltage in V.
- **carbon_monoxide**: Carbon Monoxide in CO (Gas CNG/LPG)
- **carbon_dioxine**: Carbon Dioxine in CO2 (Smoke)

<p class='img'>
<img src='/images/screenshots/sensor_device_classes_icons.png' />
Example of various device class icons for sensors.
</p>
