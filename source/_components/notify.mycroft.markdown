---
layout: page
title: "Mycroft AI"
description: "Instructions how to add Mycroft AI notifications to Home Assistant."
date: 2017-08-26 17:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mycroft.png
ha_category: Notifications
ha_release: "0.52"
---

The `mycroft` notification platform allows you to deliver notifications from Home Assistant to [Mycroft AI](https://mycroft.ai/).

To use this notification platform you simply need to input into the configuration your mycroft instance IP.  This can be a mark 1 or a picroft, etc.  You will input this IP in the settings below.


To enable the Mycroft AI notification in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - platform: mycroft
    mycroft_ip: MYCROFT_IP_ADDRESS
```

Configuration variables:
- **mycroft_ip** (*Required*): Your mycroft ip address, IE 0.0.0.0

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
