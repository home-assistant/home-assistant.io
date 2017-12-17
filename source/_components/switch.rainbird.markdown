---
layout: page
title: "Rain Bird Switch"
description: "Instructions on how to integrate your Rain Bird LNK WiFi Module as Switches within Home Assistant."
date: 2017-08-25 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: rainbird.png
ha_category: Hub
ha_release: 0.57
ha_iot_class: "Local Polling"
---

This `rainbird` switch platform allows interacting with [LNK WiFi](http://www.rainbird.com/landscape/products/controllers/LNK-WiFi.htm) module of the Rain Bird Irrigation system in Home Assistant.

To enable stations as switches inside Home Assistant, add the following to your `configuration.yaml` file:

```yaml
switch:
    platform: rainbird
    host: '1.1.1.1'
    password: 'secretpassword'
    sprinkler_1:
      zone: 1
      friendly_name: "Front sprinklers"
      trigger_time: 20
      scan_interval: 10
    sprinkler_2:
      friendly_name: "Back sprinklers"
      zone: 2
      trigger_time: 20
      scan_interval: 10
```

Configuration variables:

- **stickip** (*Required*): The IP address of your LNK WiFi Module.
- **password** (*Required*): The password for accessing the module.
- **zone** (*Required*): Station zone identifier.
- **friendly_name** (*Optional*): Just a friendly name for the station.
- **trigger_time** (*Required*): The default duration to sprinkle the zone.
- **scan_interval** (*Optional*): How fast to refresh the switch.

Please note that due to the implementation of the API within the LNK Module, there is a concurrency issue. For example, the Rain Bird app will give connection issues (like already a connection active).
