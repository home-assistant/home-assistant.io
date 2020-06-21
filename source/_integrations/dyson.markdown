---
title: Dyson
description: Instructions on how to integrate Dyson into Home Assistant.
ha_category:
  - Hub
  - Climate
  - Fan
  - Sensor
  - Vacuum
ha_iot_class: Cloud Polling
ha_release: 0.47
ha_codeowners:
  - '@etheralm'
ha_domain: dyson
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

### Attributes

There are several attributes which can be used for automations and templates.

| Attribute | Description |
| --------- | ----------- |
| `night_mode` | A boolean that indicates if the night mode of the fan device is on.|
| `auto_mode` | A boolean that indicates if the auto mode of the fan device is on.|
| `angle_low` | Int (between 5 and 355) that indicates the low angle of oscillation (only for DP04 and TP04).|
| `angle_high` | Int (between 5 and 355) that indicates the high angle of oscillation (only for DP04 and TP04).|
| `flow_direction_front` | Boolean that indicates if the frontal flow direction is enabled (only for DP04 and TP04).|
| `timer` | Attribute that indicates the status of the auto power off timer, can be either 'OFF' or an integer representing the time remaining until shutdown in minutes (only for DP04 and TP04).|
| `hepa filter` |  State of the fan's HEPA filter in % (only for DP04 and TP04).|
| `carbon filter` | State of the fan's carbon filter in % (only for DP04 and TP04).|

## Sensor

The `dyson` sensor platform provides temperature and humidity sensors.

## Air Quality

The `dyson` air quality platform provides the following levels:

- Particulate matter 2.5 (<= 2.5 μm) level.
- Particulate matter 10 (<= 10 μm) level.
- Air Quality Index (AQI).
- NO2 (nitrogen dioxide) level.
- VOC (Volatile organic compounds) level.

Note: currently only the 2018 dyson fans are supported(TP04 and DP04).

### Supported fan devices

- Pure Cool link (desk and tower)
- Pure Hot+cool link (see climate part) for thermal control
- Pure Cool 2018 Models (TP04 and DP04)
- Pure Cool Cryptomic (TP06)
