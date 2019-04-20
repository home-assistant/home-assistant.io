---
layout: page
title: "Dyson"
description: "Instructions on how to integrate Dyson into Home Assistant."
date: 2017-05-27 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: dyson.png
ha_category:
  - Hub
  - Climate
  - Fan
  - Sensor
  - Vacuum
ha_iot_class: Cloud Polling
ha_release: 0.47
redirect_from:
  - /components/vacuum.dyson/
  - /components/climate.dyson/
  - /components/fan.dyson/
  - /components/sensor.dyson/
---

The `dyson` component is the main component to integrate all [Dyson](https://www.dyson.com) related platforms.

There is currently support for the following device types within Home Assistant:

- Climate
- Fan
- Sensor
- Vacuum

## {% linkable_title Configuration %}

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
  description: "Dyson account language country code. Known working codes: `FR`, `NL`, `GB`, `AU`. Other codes should be supported."
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

<p class='note warning'>
Discovery is not yet supported for any robot vacuum models (Dyson 360 Eye). For these devices, you will need to provide them in the `devices` list.
</p>

To find a devices IP address, you can use your router or `nmap`:

```bash
$ nmap -p 1883 XXX.XXX.XXX.XXX/YY -- open
```

Where:

- **XXX.XXX.XXX.XXX** is your network address
- **YY** is your network mask

For example:

```bash
$ nmap -p 1883 192.168.0.0/24 -- open
```

## {% linkable_title Vacuum %}

The `dyson` vacuum platform allows you to control your Dyson 360 Eye robot vacuum.

### {% linkable_title Component services %}

This component support the following services (see [Vacuum Cleaner Robots](/components/vacuum/)):

- [`turn_on`](/components/vacuum/#service-vacuumturn_on)
- [`turn_off`](/components/vacuum/#service-vacuumturn_off)
- [`start_pause`](/components/vacuum/#service-vacuumstart_pause)
- [`stop`](/components/vacuum/#service-vacuumstop)
- [`return_to_home`](/components/vacuum/#service-vacuumreturn_to_home)
- [`set_fan_speed`](/components/vacuum/#service-vacuumset_fanspeed). Fan speed values:
  - `Quiet`
  - `Max`

## {% linkable_title Climate %}

The `dyson` climate platform allows you to control your Dyson Pure Hot+Cool Fan thermal control. For controlling the fan functionality, see the Dyson fan part on this page.

### {% linkable_title Component services %}

This component supports the following services (see [Climate](/components/climate/)):

- [`turn_on`](/components/climate/#service-climateturn_on)
- [`turn_off`](/components/climate/#service-climateturn_off)
- [`set_temperature`](/components/climate/#service-climateset_temperature)
- [`set_fan_mode`](/components/climate/#service-climateset_fan_mode)
- [`set_operation_mode`](/components/climate/#service-climateset_operation_mode)

## {% linkable_title Fan %}

The `dyson` fan platform allows you to control your Dyson Purifier fans.

### {% linkable_title Supported fan devices %}

- Pure Cool link (desk and tower)
- Pure Hot+cool link (see climate part) for thermal control

### {% linkable_title Attributes %}

There are several attributes which can be used for automations and templates.

| Attribute | Description |
| --------- | ----------- |
| `is_night_mode` | A boolean that indicates if the night mode of the fan device is on.
| `is_auto_mode` | A boolean that indicates if the auto mode of the fan device is on.

## {% linkable_title Sensor %}

The `dyson` sensor platform allows you to control your Dyson Purifier's filter life time.

### {% linkable_title Supported fan devices %}

- Pure Cool link (desk and tower)
- Pure Hot+cool link (see climate part) for thermal control
