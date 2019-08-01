
---
title: "Fronius"
description: "Instructions on how to connect your Fronius Inverter to Home Assistant."
ha_category:
  - Energy
  - Sensor
logo: fronius.png
ha_iot_class: Local Polling
ha_release: 0.96
---

The `fronius` sensor will poll a [Fronius](http://www.fronius.com/) solar inverter, battery system or smart meter and present the values as sensors in Home Assistant.

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
  description: "The IP address of the Fronius device"
  required: true
  type: string
monitored_conditions:
  description: "Conditions to display in the frontend"
  required: true
  type: list
  keys:
    type:
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
    Also live values such as
    - power fed to grid (if positive) or taken from grid (if negative)
    - power load as generator (if positive) or consumer (if negative) 
    - battery charging power (if positive) or discharging power (if negative) and information about backup or standby mode
    - photovoltaic production
    - current relative self consumption of produced energy
    - current relative autonomy

- `inverter`

    Cumulative data such as the energy produced in the current day or year and overall produced energy.
    Also, live values about AC/DC power, current, voltage and frequency.
    The data is only shown when choosing device scope.

- `meter`

    Detailed information about power, current and voltage, if supported split among the phases.
    The data is only shown when choosing device scope.
    
- `storage`

    Detailed information about current, voltage, state, cycle count, capacity and more about installed batteries.

## Examples

When including more of the components that one Fronius device offers, 
a list of sensors that are to be integrated can be given like below.

```yaml
sensor:
  - platform: fronius
    resource: FRONIUS_IP_ADDRESS
    monitored_conditions:
    - sensor_type: inverter
      device: 1
    - sensor_type: meter
      scope: system
    - sensor_type: meter
      device: 3
    - sensor_type: storage
      device: 0
    - sensor_type: power_flow
```
