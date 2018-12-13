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
ha_iot_class: "Local Polling"
ha_release: 0.56
---

The `xiaomi_miio` switch platform allows you to control the state of your Xiaomi Smart WiFi Socket aka Plug, Xiaomi Smart Power Strip and Xiaomi Chuangmi Plug V1.

Please follow the instructions on [Retrieving the Access Token](/components/vacuum.xiaomi_miio/#retrieving-the-access-token) to get the API token to use in the `configuration.yaml` file.

## Features

### Xiaomi Smart WiFi Socket

Supported models: `chuangmi.plug.m1`, `chuangmi.plug.v2`, `chuangmi.plug.hmi205`

* Power (on, off)
* Attributes
  - Temperature

### Xiaomi Chuangmi Plug V1

Supported models: `chuangmi.plug.v1`, `chuangmi.plug.v3`

* Power (on, off)
* USB (on, off)
* Attributes
  - Temperature

### Xiaomi Smart Power Strip

Supported models: `qmi.powerstrip.v1`, `zimi.powerstrip.v2`

* Power (on, off)
* Wifi LED (on, off)
* Power Price (0...999)
* Power Mode (green, normal) (Power Strip V1 only)
* Attributes
  - Temperature
  - Current
  - Load power
  - Wifi LED
  - Mode (Power Strip V1 only)

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

{% configuration %}
host:
  description: The IP address of your miio device.
  required: true
  type: string
token:
  description: The API token of your miio device.
  required: true
  type: string
name:
  description: The name of your miio device.
  required: false
  type: string
  default: Xiaomi Miio Switch
model:
  description: The model of your miio device. Valid values are `chuangmi.plug.v1`, `qmi.powerstrip.v1`, `zimi.powerstrip.v2`, `chuangmi.plug.m1`, `chuangmi.plug.v2`, `chuangmi.plug.v3` and `chuangmi.plug.hmi205`. This setting can be used to bypass the device model detection and is recommended if your device isn't always available.
  required: false
  type: string
{% endconfiguration %}

## {% linkable_title Platform Services %}

### {% linkable_title Service `switch.xiaomi_miio_set_wifi_led_on` %} (Power Strip only)

Turn the wifi led on.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific xiaomi miio switch entity. Else targets all.  |

### {% linkable_title Service `switch.xiaomi_miio_set_wifi_led_off` %} (Power Strip only)

Turn the wifi led off.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific xiaomi miio switch entity. Else targets all.  |

### {% linkable_title Service `switch.xiaomi_miio_set_power_price` %} (Power Strip)

Set the power price.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific xiaomi miio switch entity. Else targets all.  |
| `price`                   |       no | Power price, between 0 and 999.                         |

### {% linkable_title Service `switch.xiaomi_miio_set_power_mode` %} (Power Strip V1 only)

Set the power mode.

| Service data attribute    | Optional | Description                                                   |
|---------------------------|----------|---------------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific xiaomi miio switch entity. Else targets all.  |
| `mode`                    |       no | Power mode, valid values are 'normal' and 'green'             |
