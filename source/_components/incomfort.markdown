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
ha_release: 0.93
ha_iot_class: Local Polling
---

The `incomfort` integration links Home Assistant with your Intergas Lan2RF gateway for controlling water_heater devices (the hub does not have to be in the same network as HA).

The **Water Heater** device will report back the `state` and `temperature`. Other properties are available via the device's attributes.

In the future, other entities will be added to this integration (e.g. a **Sensor** for CV pressure, and a **Climate** device for room temperature).

### {% linkable_title Configuration %}

To add your Lan2RF gateway into your Home Assistant installation, add one of the following to your `configuration.yaml` file.

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
  description: The hostname/IP address of the Lan2RF gateway
  required: true
  type: string
username:
  description: The username of the Lan2RF gateway
  required: inclusive
  type: string
password:
  description: The password of the Lan2RF gateway
  required: inclusive
  type: string
{% endconfiguration %}
