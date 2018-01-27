---
layout: page
title: "Xiaomi AC Partner"
description: "Instructions on how to integrate your Xiaomi Air Conditioner Partner within Home Assistant."
date: 2017-11-23 08:45
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Climate
ha_version: 0.63
ha_iot_class: "Local Polling"
---

The `xiaomi_miio` platform allows you to control the  Air Conditioner Function of your Xiaomi and Aqara Air Conditioner Partner. For Gateway function please refer to [`xiaomi_aqara`](/components/xiaomi_aqara) platform.

Supported model:

Aqara Air Conditioner Partner: `KTBL01LM`
Mi Air Conditioner Partner: `KTBL02LM`

Currently, the supported features are `set_temperature`, `set_speed`, `set_operation_mode`, `set_swing_mode`, `set_fan_mode`.

You need Access Token to add this device to Home Assistant. Please follow the instructions on [Retrieving the Access Token](/components/vacuum.xiaomi_miio/#retrieving-the-access-token) to get the API token to use in the `configuration.yaml` file.

To add a Xiaomi AC Partner to your installation, add the following to your configuration.yaml file:

```yaml
# Example configuration.yaml entries
climate:
  - platform: xiaomi_miio
    name: Xiaomi AC Partner
    host: 192.168.0.1
    token: YOUR_TOKEN
    target_sensor: 
    customize:
```

Configuration variables:
- **host** (*Required*): The IP of your device.
- **token** (*Required*): The API token of your device.
- **name** (*Optional*): The name of your device.
- **target_sensor**(*Optional*): Entity_ID of component fetching present temperature. Configure this variable when your air conditioner shipped without own temperature sensor. 
- **customize**(*Optional*): Custom IR code for swing and fan mode.

Full `configuration.yaml`:

```yaml
climate:
  - platform: xiaomi_miio
    name: Xiaomi AC Partner
    host: 192.168.0.1
    token: YOUR_TOKEN
    target_sensor: sensor.temperature_158d00015a
    sync: 60
    customize:
      swing:
        top: 010501820000261801
        down: FEADASDSDSDSDSDSADSAFADSFASA
      fan:
        max: FEADASDSDSDSDSDSADSAFADSFASAD
        med: FEBDASDSDSDSDSDSADSAFADSFASAR
        min: 010501A20000261B01
```



