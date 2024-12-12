---
title: myStrom
description: Instructions on how to integrate myStrom WiFi Switches and Bulbs into Home Assistant.
ha_category:
  - Binary sensor
  - Light
  - Switch
ha_release: 0.43
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@fabaff'
ha_domain: mystrom
ha_platforms:
  - binary_sensor
  - light
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

There is currently support for the following device types within Home Assistant:

- [Lights and switches](#lights-and-switches)
- [Binary sensor](#binary-sensor)

## Lights and switches

The myStrom {% term integration %} allows you to control your [myStrom](https://mystrom.ch/) Wi-Fi Bulbs and Wi-Fi Switches. Make sure that you have enabled the REST API under **Advanced** in the web frontend of the switch.

Supported devices are:

- Switch CH v1 (101)
- Bulb (102)
- LED strip (105)
- Switch CH v2 (106)
- Switch EU (107)
- Switch Zero (120)

Two sensors are available for switches:

- Temperature
- Energy consumption

{%include integrations/config_flow.md %}

Check if you are able to access the light located at `IP_ADRRESS`. The details about your light is provided as a JSON response.

```bash
$ curl http://[IP_ADDRESS]/api/v1/device/[MAC_ADDRESS]

{
  "MAC_ADDRESS": {
    "type": "rgblamp",
    "battery": false,
    "reachable": true,
    "meshroot": false,
    "on": true,
    "color": "0;0;100",
    "mode": "hsv",
    "ramp": 409,
    "power": 5.1,
    "fw_version": "2.25"
  }
}
```

## Binary sensor

The `mystrom` binary sensor platform allows you to use [myStrom Wifi Buttons](https://mystrom.ch/wifi-button/) with Home Assistant. The myStrom Wifi Buttons support three and the myStrom WiFi Button + four different push pattern:

- `single`: Short push (approx. 1/2 seconds)
- `double`: 2x sequential short pushes (within 2 seconds)
- `long`: Long push (approx. 2 seconds)
- `touch`: Touch of the button's surface (only affective for WiFi Button +)

The first usage of the pattern will create the binary sensor for the pattern. If the WiFi Button is pushed one time then a binary sensor for the `single` pattern will be created. The same applies for the other patterns. With the second usage of the pattern the binary sensors become fully functional.

The buttons will give you feedback with its built-in LED:

- white then green: Pattern was submitted successfully
- white then red: There is a problem with the communication

To use your myStrom WiFi Button in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: mystrom
```

{% important %}
The firmware version 2.56 doesn't support TLS/SSL. This means that you are only able to use the WiFi Buttons if you are using plain-text communication between Home Assistant and the clients/entities.
{% endimportant %}
