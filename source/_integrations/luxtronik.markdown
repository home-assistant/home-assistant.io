---
title: Luxtronik
description: Instructions on how to integrate Luxtronik based heatpumps into Home Assistant.
ha_category:
  - Climate
  - Binary Sensor
  - Sensor
  - Number
  - Switch
  - System Monitor
  - Water Heater
  - Energy
ha_release: '2021.12'
ha_domain: luxtronik
ha_config_flow: true
ha_codeowners:
  - '@benpru'
ha_iot_class: Local Polling
ha_platforms:
  - binary_sensor
  - climate
  - number
  - sensor
  - switch
---

The Luxtronik integration allows you to control your Luxtronik based heatpump.

There is support for the following platform types within Home Assistant:

- **Binary sensor** - evu locked/unlocked, solar pump running.
- **Climate** - control heater and domestic water.
- **Number** - set heater temperature correction, heating threshold temperature and domestic water target temperature.
- **Sensor** - status, temperatures and statistics like operation hours and heat amount.
- **Switch** - toggle heater and domestic water between automatic and off.

## Services

Currently supported services are Platform specific:

- `luxtronik.write`

### Platform Services

#### Service `luxtronik.write`

Write a parameter value to heatpump.

| Service data attribute | Optional | Description                                                                                                    |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `parameter`            | no       | ID of the value to write. See [parameters](https://github.com/Bouni/python-luxtronik/blob/master/luxtronik/parameters.py) |
| `value`                | no       | Value to write.                                                                                                |


## Integration Options

It is possible to change some behaviors through the integration options.
These can be changed at **Luxtronik** -> **Configure** on the Integrations page.

- **Control thermostat on / off status through Home Assistant**: I.e. if the Home Assistant thermostat is in the idle status, the status off is transmitted to Luxtronik and Luxtronik cannot start this element.
- **Home Assistant sensor id for the current indoor temperature**: Let the heating thermostat know how to get the indoor temperature.
- **Language key Sensor Names**: Select the language for the sensor names.

### Supported devices (Manufacturers)

It is used by various manufacturers such as:

- Alpha Innotec
- Siemens Novelan
- Roth
- Elco
- Buderus
- Nibe
- Wolf Heiztechnik

### Add more sensors

In addition to the automatically created sensors, you can create more yourself.

Sensors are read-only. To write to the heatpump, use the provided service Luxtronik Integration - Service.

To use a Luxtronik sensor in your installation, add the following lines to your `configuration.yaml`, `binary_sensors.yaml` or `sensors.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: luxtronik2
    sensors:
      - group: calculations
        id: ID_WEB_Temperatur_TVL
```

- group:
  - description: Value group where the ID is located, possible values are `calculations`, `parameters`, `visibilities`.
  - required: true
  - type: string
- id:
  - description: The id of the value.
  - required: true
  - type: string
- friendly_name:
  - description: Sets a meaningful name for the sensor, if not provided the sensor will be named after the id, `luxtronik.id_webemperatur_tvl` for example, otherwise `luxtronik.temperature_forerun`.
  - required: false
  - type: string
- icon:
  - description: Set an icon for the sensor
  - required: false
  - type: string

#### Full example

```yaml
# Example configuration.yaml entry
sensor:
  - platform: luxtronik2
    sensors:
      - group: calculations
        id: ID_WEB_Temperatur_TVL
        friendly_name: Temperature forerun
        icon: mdi:thermometer
```

#### Binary Sensor

The Luxtronik binary sensor platform allows you to monitor the status values of a heat pump unit controlled by a Luxtronik controller.

Binary sensors are read-only. To write to the heatpump, use the provided service Luxtronik Integration - Service.

To use a Luxtronik binary sensor in your installation, add the following lines to your `configuration.yaml`, `binary_sensors.yaml` or `sensors.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: luxtronik2
    sensors:
      - group: calculations
        id: ID_WEB_EVUin
```

- group:
  - description: Value group where the ID is located, possible values are `calculations`, `parameters`, `visibilities`.
  - required: true
  - type: string
- id:
  - description: The id of the value.
  - required: true
  - type: string
- friendly_name:
  - description: Sets a meaningful name for the sensor, if not provided the sensor will be named after the id, `luxtronik.id_web_evuin` for example, otherwise `luxtronik.utility_company_lock`.
  - required: false
  - type: string
- icon:
  - description: Set an icon for the sensor
  - required: false
  - type: string
- invert:
  - description: Inverts the value
  - required: false
  - type: boolean
  - default: false

#### Full example

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: luxtronik2
    sensors:
      - group: calculations
        id: ID_WEB_EVUin
        friendly_name: Utility company lock
        icon: mdi:lock
```

{% include integrations/config_flow.md %}
