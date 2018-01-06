---
layout: page
title: "Leviton Decora Wi-Fi"
description: "Instructions on how to setup Leviton Decora Smart Wi-Fi switches/dimmers within Home Assistant."
date: 2017-07-19 12:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Light
ha_iot_class: "Local Polling"
logo: leviton.png
ha_release: 0.51
---

Support for [Leviton Decora Wi-Fi](http://www.leviton.com/en/products/lighting-controls/decora-smart-with-wifi) dimmers/switches.

Supported devices (tested):

- [DW6HD1-BZ](https://www.leviton.com/en/products/dw6hd-1bz) (Decora Smart Wi-Fi 600W Dimmer)
- [DW15S-1BZ](https://www.leviton.com/en/products/dw15s-1bz) (Decora Smart Wi-Fi 15A Switch)

To enable these lights, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: decora_wifi
    username: my_leviton_user_email@email.com
    password: my_leviton_password
```

Configuration variables:

- **username** (*Required*): Your "My Leviton" app email address/user name.
- **password** (*Required*): Your "My Leviton" app password.


