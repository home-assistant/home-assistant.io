---
layout: page
title: "Intergas InComfort"
description: "Instructions on how to integrate an Intergas Lan2RF gateway with Home Assistant."
date: 2019-03-03 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: incomfort.png
ha_category:
  - Water heater
  - Climate
  - Sensor
  - Binary sensor
ha_release: 0.93
ha_iot_class: Local Polling
---

The `incomfort` integration links Home Assistant with your Intergas Lan2RF gateway for integrating the boiler and any room thermostats attached to it.

The boiler is represented as a **Water Heater** device. It will report the boiler's `state` and `temperature` (current temperature). The gateway does not expose any means to directly control the boiler or change its configuration.

Any room thermostats (there can be 0, 1 or 2) are represented as **Climate** devices. They will report the thermostat's `target_temperature` (setpoint) and `current_temperature` and the setpoint can be changed.

In addition, there is a **Sensor** for CV pressure, CV temperature, and Tap temperature, and a **Binary Sensor** that will be `True` if there is a fault with the boiler.

Other properties are available via each device's attributes.

### {% linkable_title Configuration %}

To add your Lan2RF gateway into your Home Assistant installation, add one of the following to your `configuration.yaml` file.

The hub does not have to be in the same network as HA.

Older gateways do not require user authentication::

```yaml
# Example configuration.yaml entry, older firmware with no user credentials
incomfort:
  host: IP_ADDRESS
```
Alternatively, if a **username** & **password** is printed on the back of the gateway:

```yaml
# Example configuration.yaml entry, newer firmware with user credentials
incomfort:
  host: IP_ADDRESS
  username: USERNAME
  password: PASSWORD
```

{% configuration %}
host:
  description: The hostname/IP address of the Lan2RF gateway.
  required: true
  type: string
username:
  description: The username of the Lan2RF gateway, if any.
  required: inclusive
  type: string
password:
  description: The password of the Lan2RF gateway, if any.
  required: inclusive
  type: string
{% endconfiguration %}
