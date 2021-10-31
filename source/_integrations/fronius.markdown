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

The `fronius` sensor polls a [Fronius](https://www.fronius.com/) solar inverter, battery system or smart meter and presents the values as sensors in Home Assistant. Data is gathered directly from a Fronius device connected to your local network, this integration doesn't access the cloud. 

## Prerequisites

You will need to either set a static IP on the Fronius device or assign a static DHCP lease for it, or alternatively access it through the local DNS name if your network is properly configured for this.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
sensor:
  - platform: fronius
    resource: FRONIUS_URL_OR_IP
    monitored_conditions:
    - sensor_type: logger_info
    - sensor_type: inverter
      scope: system
    - sensor_type: meter
      device: 1
```

{% configuration %}
resource:
  description: "The hostname or IP address of the Fronius device (e.g., `192.0.2.0` or `http://fronius.local`)"
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
      description: "The ID of the device to poll"
      required: false
      default: "\"1\" for inverters and \"0\" for other devices such as storages in compliance with Fronius Specs"
{% endconfiguration %}

## Monitored data

Each sensor type chosen as monitored condition adds a set of sensors to Home Assistant.

- `logger_info`

    General information about the Fronius Datalogger. Not available on "Gen24" devices.

    - The serial number and software and hardware platforms
    - The current price of energy consumed from the grid ("cash factor")
    - The current price of energy returned to the grid ("delivery factor")

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

## Finding out devices IDs

To find out the device ID of the inverter visit the URL:
`http://FRONIUS_IP/solar_api/v1/GetPowerFlowRealtimeData.fcgi`
In the returned JSON, under the key Body > Data > Inverters you should see your inverters listed with IDs starting from 1.

To find out the device ID of the meter visit the URL:
`http://FRONIUS_IP/solar_api/v1/GetMeterRealtimeData.cgi?Scope=System`
In the returned JSON, under the key Body > Data you should see your meters listed with IDs starting from 0.

To find out which API version your system runs, visit the URL:
`http://FRONIUS_IP/solar_api/GetAPIVersion.cgi`

## Examples

When including more of the components that one Fronius device offers, 
a list of sensors that are to be integrated can be given like below.

```yaml
sensor:
  - platform: fronius
    resource: FRONIUS_URL
    monitored_conditions:
    - sensor_type: logger_info
    - sensor_type: inverter
      scope: system
    - sensor_type: meter
      device: 1
    - sensor_type: storage
      device: 0
    - sensor_type: power_flow
```

## Note

Fronius often provides firmware updates for the datamanager interfaces and the devices in their system, it's recommended to check and apply them regularly. This integration relies on functionality present in rather recent firmware.
