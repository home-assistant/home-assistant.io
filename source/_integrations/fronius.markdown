---
title: Fronius
description: Instructions on how to connect your Fronius Inverter to Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_iot_class: Local Polling
ha_release: 0.96
ha_codeowners:
  - '@nielstron'
ha_domain: fronius
ha_platforms:
  - sensor
---

The `fronius` sensor polls a [Fronius](https://www.fronius.com/) solar inverter, battery system or smart meter and present the values as sensors in Home Assistant.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
sensor:
  - platform: fronius
    resource: FRONIUS_URL
    monitored_conditions:
    - sensor_type: inverter
```

{% configuration %}
resource:
  description: "The URL of the Fronius device (e.g., `http://192.0.2.0` or `http://fronius.local`)"
  required: true
  type: string
monitored_conditions:
  description: "Conditions to display in the frontend"
  required: true
  type: list
  keys:
    sensor_type:
      description: "The kind of device, can be one of \"inverter\", \"storage\", \"meter\", or \"power_flow\""
      required: true
      type: string
    scope:
      description: "The device type for storage and inverter, can be either \"device\" or \"system\""
      required: false
      type: string
      default: "device"
    device:
      description: "The id of the device to poll"
      required: false
      default: "\"1\" for inverters and \"0\" for other devices such as storages in compliance with Fronius Specs"
{% endconfiguration %}

## Monitored data

Each sensor type chosen as monitored condition adds a set of sensors to Home Assistant.

- `power_flow`

    Cumulative data such as the energy produced in the current day or year and overall produced energy.
    Also, live values such as:
    
    - Power fed to the grid (if positive) or taken from the grid (if negative).
    - Power load as a generator (if positive) or consumer (if negative).
    - Battery charging power (if positive) or discharging power (if negative) and information about backup or standby mode.
    - Photovoltaic production.
    - Current relative self-consumption of produced energy.
    - Current relative autonomy.

- `inverter`

    Cumulative data such as the energy produced in the current day or year and overall produced energy.
    Also, live values about AC/DC power, current, voltage and frequency.
    The data is only shown when choosing device scope.

- `meter`

    Detailed information about power, current and voltage, if supported split among the phases.
    The data is only shown when choosing device scope.
    
- `storage`

    Detailed information about current, voltage, state, cycle count, capacity and more about installed batteries.

Note that some data (like photovoltaic production) is only provided by the Fronius device when non-zero.
The corresponding sensors are added to Home Assistant as entities as soon as they are available.
This means for example that when Home Assistant is started at night,
there might be no sensor providing photovoltaic related data.
This does not need to be problematic as the values will be added on sunrise,
when the Fronius devices begins providing the needed data.

## Examples

When including more of the components that one Fronius device offers, 
a list of sensors that are to be integrated can be given like below.

```yaml
sensor:
  - platform: fronius
    resource: FRONIUS_URL
    monitored_conditions:
    - sensor_type: inverter
      device: 1
    - sensor_type: meter
      device: 3
    - sensor_type: storage
      device: 0
    - sensor_type: power_flow
```
