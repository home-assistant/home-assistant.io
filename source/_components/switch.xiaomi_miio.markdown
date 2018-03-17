---
layout: page
title: "Xiaomi Smart WiFi Socket and Smart Power Strip"
description: "Instructions on how to integrate your Xiaomi Smart WiFi Socket aka Plug or Xiaomi Smart Power Strip within Home Assistant."
date: 2017-08-26 10:18
sidebar: true
comments: false
sharing: true
footer: true
logo: xiaomi.png
ha_category: Switch
ha_version: 0.56
ha_iot_class: "Local Polling"
---

The `xiaomi_miio` switch platform allows you to control the state of your Xiaomi Smart WiFi Socket aka Plug or Xiaomi Smart Power Strip.

Currently, the supported features are `on`, `off`. If the device provides the current load, it will be reported.

Please follow the instructions on [Retrieving the Access Token](/components/vacuum.xiaomi_miio/#retrieving-the-access-token) to get the API token to use in the `configuration.yaml` file.

To add a plug to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entries
switch:
  - platform: xiaomi_miio
    name: Original Xiaomi Mi Smart WiFi Socket
    host: 192.168.130.59
    token: YOUR_TOKEN
    model: chuangmi.plug.m1
```

Configuration variables:
- **host** (*Required*): The IP of your miio device.
- **token** (*Required*): The API token of your miio device.
- **name** (*Optional*): The name of your miio device.
- **model** (*Optional*): The model of your miio device. Valid values are chuangmi.plug.v1`, `qmi.powerstrip.v1`, `zimi.powerstrip.v2`, `chuangmi.plug.m1` and `chuangmi.plug.v2`. This setting can be used to bypass the device model detection and is recommended if your device isn't always available.

{% configuration %}
host:
  description: The IP address of your device.
  required: true
  type: string
token:
  description: The API token of your device.
  required: true
  type: string
name:
  description: The name of your device.
  required: false
  type: string
  default: Xiaomi Miio Switch
model:
  description: The model of your device.
  required: false
  type: string
{% endconfiguration %}
