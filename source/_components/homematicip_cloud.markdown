---
layout: page
title: "HomematicIP Cloud"
description: "Instructions for integrating HomematicIP into Home Assistant."
date: 2018-04-02 13:40
sidebar: true
comments: false
sharing: true
footer: true
logo: homematicip_cloud.png
ha_category:
  - Hub
  - Alarm
  - Binary Sensor
  - Climate
  - Cover
  - Light
  - Sensor
  - Switch
ha_iot_class: "Cloud Push"
ha_release: 0.66
featured: false
redirect_from:
  - /components/alarm_control_panel.homematicip_cloud/
  - /components/binary_sensor.homematicip_cloud/
  - /components/climate.homematicip_cloud/
  - /components/cover.homematicip_cloud/
  - /components/light.homematicip_cloud/
  - /components/sensor.homematicip_cloud/
  - /components/switch.homematicip_cloud/
---

The [HomematicIP](http://www.homematic-ip.com) component platform is used as an interface to the cloud server. Since there is no official documentation about this API, everything was done via reverse engineering. The [homematicip-rest-api](https://github.com/coreGreenberet/homematicip-rest-api) is used for communicating. Use at your own risk.

There is currently support for the following device types within Home Assistant:

* Alarm
* Binary Sensor
* Climate
* Cover
* Light
* Sensor
* Switch

## {% linkable_title Setup the component via the frontend %}

Menu: *Configuration* -> *Integrations*

Fill the form:

* Your **access point ID** (SGTIN)
* Optional a **name** to identify your access point, this will be used to prefix your device names.

The authentification token will be generated and stored internally.

## {% linkable_title Setup the component using the configuration files %}

Generate the authentication token:

`generate_auth_token.py`

Add the information to your `configuration.yaml` file:

```yaml
homematicip_cloud:
  - accesspoint: IDENTIFIER
    authtoken: AUTHTOKEN
  - name: Location2
    accesspoint: IDENTIFIER2
    authtoken: AUTHTOKEN2
```

{% configuration %}
name:
  required: false
  description: Name to identify your access point, this will be used to prefix your device names.
  type: string
accesspoint:
  required: true
  description: This is the access point ID (SGTIN).
  type: string
authtoken:
  required: true
  description: "Authentication token generated with `generate_auth_token.py`."
  type: string
{% endconfiguration %}

## {% linkable_title Implemented and tested devices %}

* homematicip_cloud.alarm_control_panel
  * Security zones (*HmIP-SecurityZone*)

* homematicip_cloud.binary_sensor
  * Window and door contact (*HmIP-SWDO, -I*)
  * Rotary Handle Sensor (*HmIP-SRH*)
  * Smoke sensor and alarm (*HmIP-SWSD*)
  * Motion detectors (*HmIP-SMI*)
  * Water detector (*HmIP-SWD*)

* homematicip_cloud.climate
  * Radiator thermostat (*HmIP-eTRV,-2*) - should also work with (*HmIP-eTRV-2-UK, -B, -B1, -C*)
  * Climate group (*HmIP-HeatingGroup*)

* homematicip_cloud.light
  * Switch actuator and meter for brand switches (*HmIP-BSM*)
  * Dimming actuator for brand switches (*HmIP-BDT*)
  * Dimming actuator flush-mount (*HmIP-FDT*)
  * Switch Actuator and Meter – flush-mount (*HmIP-FSM*)

* homematicip_cloud.sensor
  * Accesspoint duty-cycle (*HmIP-HAP, -B1*)
  * Wall-mounted thermostat (*HmIP-WTH, -2*)
  * Temperature and humidity sensor (*HmIP-STH*)
  * Temperature and humidity Sensor with display (*HmIP-STHD*)
  * Outdoor temperature and humidity sensor (*HmIP-STHO, -A*)
  * Illuminance sensor (*HmIP-SMI*)

* homematicip_cloud.switch
  * Pluggable Switch (*HmIP-PS*)
  * Pluggable Switch and Meter (*HmIP-PSM*) - should also work with (*HmIP-PSM-CH, -IT, -UK, -PE*)

* homematicip_cloud.shutter
  * Blind actuator for brand switches (*HmIP-BBL*)
  * Shutter actuator brand-mount (*HmIP-BROLL*)
  * Shutter actuator flush-mount (*HmIP-FROLL*)
