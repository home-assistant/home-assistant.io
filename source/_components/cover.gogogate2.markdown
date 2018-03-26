---
layout: page
title: "Gogogate2 Cover"
description: "Instructions on how to integrate Gogogate2-Enabled garage door covers into Home Assistant."
date: 2018-03-26 20:02
sidebar: true
comments: false
sharing: true
footer: true
logo: gogogate2.png
ha_category: Cover
ha_release: 0.67
ha_iot_class: Local Polling
---

The `gogogate2` cover platform lets you control Gogogate2-Enabled garage doors through Home Assistant. Device names in Home Assistant are generated based on the names defined in your Gogogate2 mobile app.

To use your Gogogate2 cover in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
cover:
  - platform: gogogate2
    username: email@email.com
    password: password
    ip_address: 192.168.1.200
```

Configuration variables:

- **username** (*Required*): Your Gogogate2 account username.
- **password** (*Required*): Your Gogogate2 account password.
- **ip_address** (*Required*): IP address of your Gogogate2 device
