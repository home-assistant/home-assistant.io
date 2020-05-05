---
title: "Xiaomi Smart WiFi Socket and Smart Power Strip"
description: "Instructions on how to integrate your Xiaomi Smart WiFi Socket aka Plug or Xiaomi Smart Power Strip within Home Assistant."
ha_category:
  - Switch
ha_iot_class: Local Polling
ha_release: 0.56
ha_domain: xiaomi_miio
---

The `xiaomi_miio` switch platform allows you to control the state of your Xiaomi Smart WiFi Socket aka Plug, Xiaomi Smart Power Strip and Xiaomi Chuangmi Plug V1.

Please follow the instructions on [Retrieving the Access Token](/integrations/vacuum.xiaomi_miio/#retrieving-the-access-token) to get the API token to use in the `configuration.yaml` file.

## Features

### Xiaomi Smart WiFi Socket

Supported models: `chuangmi.plug.m1`, `chuangmi.plug.m3`, `chuangmi.plug.v2`, `chuangmi.plug.hmi205`

- Power (on, off)
- Attributes
  - Temperature

### Xiaomi Chuangmi Plug V1

Supported models: `chuangmi.plug.v1`, `chuangmi.plug.v3`

- Power (on, off)
- USB (on, off)
- Attributes
  - Temperature

### Xiaomi Smart Power Strip

Supported models: `qmi.powerstrip.v1`, `zimi.powerstrip.v2`

- Power (on, off)
- Wifi LED (on, off)
- Power Price (0...999)
- Power Mode (green, normal) (Power Strip V1 only)
- Attributes
  - Temperature
  - Current
  - Load power
  - Wifi LED
  - Mode (Power Strip V1 only)

### Xiaomi Air Conditioning Companion V3

Supported models: `lumi.acpartner.v3` (the socket of the `acpartner.v1` and `v2` isn't switchable!)

* Power (on, off)
* Attributes
  - Load power

## Configuration

To add a plug to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entries
switch:
  - platform: xiaomi_miio
    host: MIIO_IP_ADDRESS
    token: YOUR_TOKEN
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
  description: The model of your miio device. Valid values are `chuangmi.plug.v1`, `qmi.powerstrip.v1`, `zimi.powerstrip.v2`, `chuangmi.plug.m1`, `chuangmi.plug.m3`, `chuangmi.plug.v2`, `chuangmi.plug.v3` and `chuangmi.plug.hmi205`. This setting can be used to bypass the device model detection and is recommended if your device isn't always available.
  required: false
  type: string
{% endconfiguration %}

## Platform Services

### Service `xiaomi_miio.switch_set_wifi_led_on` (Power Strip only)

Turn the wifi LED on.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO switch entity.       |

### Service `xiaomi_miio.switch_set_wifi_led_off` (Power Strip only)

Turn the wifi LED off.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO switch entity.       |

### Service `xiaomi_miio.switch_set_power_price` (Power Strip)

Set the power price.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO switch entity.       |
| `price`                   |       no | Power price, between 0 and 999.                         |

### Service `xiaomi_miio.switch_set_power_mode` (Power Strip V1 only)

Set the power mode.

| Service data attribute    | Optional | Description                                                   |
|---------------------------|----------|---------------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO switch entity.             |
| `mode`                    |       no | Power mode, valid values are 'normal' and 'green'             |
