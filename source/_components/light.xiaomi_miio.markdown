---
layout: page
title: "Xiaomi Philips Light"
description: "Instructions how to integrate your Xiaomi Philips Lights within Home Assistant."
date: 2017-08-26 08:45
sidebar: true
comments: false
sharing: true
footer: true
logo: philips.png
ha_category: Light
ha_version: 0.53
ha_iot_class: "Local Polling"
---

The `xiaomi_miio` platform allows you to control the state of your Xiaomi Philips LED Ball Lamp and Xiaomi Philips LED Ceiling Lamp.

Currently, the supported features are `on`, `off`, `set_cct` (colortemp) , `set_bright` (brightness).

Please follow the instructions on [Retrieving the Access Token](/components/vacuum.xiaomi_miio/#retrieving-the-access-token) to get the API token to use in the `configuration.yaml` file.

To add a Xiaomi Philips Light to your installation, add the following to your configuration.yaml file:

```yaml
# Example configuration.yaml entries
light:
  - platform: xiaomi_miio
    name: Xiaomi Philips Smart LED Ball
    host: 192.168.130.67
    token: YOUR_TOKEN
```

Configuration variables:
- **host** (*Required*): The IP of your light.
- **token** (*Required*): The API token of your light.
- **name** (*Optional*): The name of your light.
