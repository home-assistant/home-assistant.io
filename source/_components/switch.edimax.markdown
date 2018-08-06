---
layout: page
title: "Edimax Switch"
description: "Instructions on how to integrate Edimax switches into Home Assistant."
date: 2015-06-10 22:54
sidebar: true
comments: false
sharing: true
footer: true
logo: edimax.png
ha_category: Switch
ha_release: pre 0.7
---


This `edimax` switch platform allows you to control the state of your [Edimax](http://www.edimax.com/edimax/merchandise/merchandise_list/data/edimax/global/home_automation_smart_plug/) switches.

To use your Edimax switch in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: edimax
    host: 192.168.1.32
```

Configuration variables:

- **host** (*Required*): The IP address of your Edimax switch, eg. `192.168.1.32`.
- **username** (*Optional*): Your username for the Edimax switch. Defaults to `admin`.
- **password** (*Optional*): Your password for the Edimax switch. Defaults to `1234`.
- **name** (*Optional*): The name to use when displaying this switch.

