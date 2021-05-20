---
title: Dyson
description: Instructions on how to integrate Dyson into Home Assistant.
ha_category:
  - Hub
  - Climate
  - Fan
  - Sensor
  - Vacuum
ha_iot_class: Local Push
ha_release: 0.47
ha_domain: dyson
ha_platforms:
  - air_quality
  - climate
  - fan
  - sensor
  - vacuum
---

The `dyson` integration is the main integration to integrate all [Dyson](https://www.dyson.com) related platforms.

There is currently support for the following device types within Home Assistant:

- Climate
- Fan
- Sensor
- Vacuum
- Air Quality

## Configuration

To enable this component, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
dyson:
  username: YOUR_DYSON_USERNAME
  password: YOUR_DYSON_PASSWORD
  language: YOUR_DYSON_ACCOUNT_LANGUAGE
  devices:
    - device_id: DEVICE_ID_1 # e.g., Serial number: XXX-XX-XXXXXXXX
      device_ip: DEVICE_IP_1
    - device_id: DEVICE_ID_2
      device_ip: DEVICE_IP_2
```

{% configuration %}
username:
  description: Dyson account username (email address).
  required: true
  type: string
password:
  description: Dyson account password.
  required: true
  type: string
language:
  description: "Dyson account language country code. Known working codes: `US`, `FR`, `NL`, `GB`, `AU`. Other codes should be supported."
  required: true
  type: string
devices:
  description: List of devices.
  required:  false
  type: map
  keys:
    device_id:
      description: Device ID. The Serial Number of the device. Found in the smart phone app device settings page.
      required: true
      type: string
    device_ip:
      description: Device IP address.
      required: true
      type: string
{% endconfiguration %}

The `devices` list is optional, but you'll have to provide them if discovery is not working (warnings in the logs and the devices are not available in Home Assistant web interface).

<div class='note warning'>

Discovery is not yet supported for any robot vacuum models (Dyson 360 Eye). For these devices, you will need to provide them in the `devices` list.

</div>

To find a devices IP address, you can use your router or `nmap`:

```bash
nmap -p 1883 XXX.XXX.XXX.XXX/YY --open
```

Where:

- **XXX.XXX.XXX.XXX** is your network address
- **YY** is your network mask

For example:

```bash
nmap -p 1883 192.168.0.0/24 --open
```

## Vacuum

The `dyson` vacuum platform allows you to control your Dyson 360 Eye robot vacuum.

### Component services

This integration support the following services (see [Vacuum Cleaner Robots](/integrations/vacuum/)):

- [`turn_on`](/integrations/vacuum/#service-vacuumturn_on)
- [`turn_off`](/integrations/vacuum/#service-vacuumturn_off)
- [`start_pause`](/integrations/vacuum/#service-vacuumstart_pause)
- [`stop`](/integrations/vacuum/#service-vacuumstop)
- [`return_to_home`](/integrations/vacuum/#service-vacuumreturn_to_home)
- [`set_fan_speed`](/integrations/vacuum/#service-vacuumset_fanspeed). Fan speed values:
  - `Quiet`
  - `Max`

## Climate

The `dyson` climate platform allows you to control your Dyson Pure Hot+Cool Fan thermal control. For controlling the fan functionality, see the Dyson fan part on this page.

### Component services

This integration supports the following services (see [Climate](/integrations/climate/)):

- [`turn_on`](/integrations/climate/#service-climateturn_on)
- [`turn_off`](/integrations/climate/#service-climateturn_off)
- [`set_temperature`](/integrations/climate/#service-climateset_temperature)
- [`set_fan_mode`](/integrations/climate/#service-climateset_fan_mode)
- [`set_hvac_mode`](/integrations/climate/#service-climateset_hvac_mode)

## Fan

The `dyson` fan platform allows you to control your Dyson Purifier fans.

### Supported fan devices

- Pure Cool link (desk and tower)
- Pure Hot+cool link (see climate part) for thermal control
- Pure Cool 2018 (DP04 and TP04)
- Pure Cool Cryptomic (TP06)
- Pure Humidify+Cool (PH01)

### Attributes

There are several attributes which can be used for automations and templates.

| Attribute | Description |
| --------- | ----------- |
| `dyson_speed` | The exact speed (1-10 or "AUTO") of the fan device.|
| `night_mode` | A boolean that indicates if the night mode of the fan device is on.|
| `auto_mode` | A boolean that indicates if the auto mode of the fan device is on.|
| `angle_low` | Int (between 5 and 355) that indicates the low angle of oscillation (only for DP04 and TP04).|
| `angle_high` | Int (between 5 and 355) that indicates the high angle of oscillation (only for DP04 and TP04).|
| `flow_direction_front` | Boolean that indicates if the frontal flow direction is enabled (only for DP04, TP04 and PH01).|
| `timer` | Attribute that indicates the status of the auto power off timer, can be either 'OFF' or an integer representing the time remaining until shutdown in minutes (only for DP04 and TP04).|
| `hepa filter` | Remaining life of the fan's HEPA filter in % (only for DP04 and TP04 — Combi filter for PH01).|
| `carbon filter` | Remaining life of the fan's carbon filter in % (only for DP04 and TP04).|


### Additional Services

#### Service `dyson.set_speed`

Set the exact speed (1-10) of the fan.

| Service data attribute | Required | Description | Example |
| --- | --- | --- | --- |
| `entity_id` | No | Name(s) of the entities to set the speed for | "fan.pure_cool" |
| `dyson_speed` | Yes | The exact speed to be set | 5 |

#### Service `dyson.set_auto_mode`

Set the fan in auto mode.

| Service data attribute | Required | Description | Example |
| --- | --- | --- | --- |
| `entity_id` | No | Name(s) of the entities to enable/disable auto mode | "fan.pure_cool" |
| `auto_mode` | Yes | Auto mode status | true |

#### Service `dyson.set_night_mode`

Set the fan in night mode.

| Service data attribute | Required | Description | Example |
| --- | --- | --- | --- |
| `entity_id` | No | Name(s) of the entities to enable/disable night mode | "fan.pure_cool" |
| `night_mode` | Yes | Night mode status | true |

#### Service `dyson.set_angle` (only for DP04 and TP04)

Set the oscillation angle of the selected fan(s).

| Service data attribute | Required | Description | Example |
| --- | --- | --- | --- |
| `entity_id` | No | Name(s) of the entities for which to set the angle | "fan.pure_cool" |
| `angle_low` | Yes | The angle at which the oscillation should start | 1 |
| `angle_high` | Yes | The angle at which the oscillation should end | 255 |

#### Service `dyson.set_flow_direction_front` (only for DP04 and TP04)

Set the fan flow direction.

| Service data attribute | Required | Description | Example |
| --- | --- | --- | --- |
| `entity_id` | No | Name(s) of the entities to set frontal flow direction for | "fan.pure_cool" |
| `flow_direction_front` | Yes | Frontal flow direction | true |

#### Service `dyson.set_timer` (only for DP04 and TP04)

Set the sleep timer.

| Service data attribute | Required | Description | Example |
| --- | --- | --- | --- |
| `entity_id` | No | Name(s) of the entities to set the sleep timer for | "fan.pure_cool" |
| `timer` | Yes | The value in minutes to set the timer to, 0 to disable it | 30 |

## Sensor

The `dyson` sensor platform provides temperature and humidity sensors.

For compatible models (i.e. DP04, TP04, PH01), remaining life percentage for the filters (HEPA and Carbon, or Combi) is provided as sensors.

## Air Quality

The `dyson` air quality platform provides the following levels (only for DP04, TP04, PH01):

- Particulate matter 2.5 (<= 2.5 μm) level.
- Particulate matter 10 (<= 10 μm) level.
- Air Quality Index (AQI).
- NO2 (nitrogen dioxide) level.
- VOC (Volatile organic compounds) level.
