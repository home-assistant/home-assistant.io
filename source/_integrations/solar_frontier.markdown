---
title: Solar Frontier Inverter
description: Instructions on how to connect your Solar Frontier Inverter to Home Assistant.
ha_category:
  - Energy
ha_iot_class: Local Polling
ha_release: '2021.9'
ha_codeowners:
  - '@coen800'
ha_domain: solar_frontier
ha_platforms:
  - sensor
---

The Solar Frontier sensor will poll a [Solar Frontier](https://www.solar-frontier.eu/) solar inverter and present the values as sensors in Home Assistant.

This sensor uses the web interface and to use it, you have to be able to connect to the solar inverter from your web browser.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: solar_frontier
    host: IP_ADDRESS_OF_DEVICE
```

{% configuration %}
host:
  description: "The IP address of the Solar Frontier Inverter."
  required: true
  type: string
name:
  description: "An optional name for your Solar Frontier Inverter."
  required: false
  type: string
{% endconfiguration %}

## Sensors

Sensors available in the library:

| name               | Unit | Description                                                                  |
|--------------------|------|:-----------------------------------------------------------------------------|
| today_yield        | kWh  | Power yield for today.                                                       |
| month_yield        | kWh  | Power yield for the current month.                                           |
| year_yield         | kWh  | Power yield for the current year.                                            |

## Full configuration example

```yaml
sensor:
  - platform: solar_frontier
    name: MY_INVERTER_NAME
    host: IP_ADDRESS_OF_DEVICE
```
