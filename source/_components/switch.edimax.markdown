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

{% configuration %}
host:
  description: "The IP address of your Edimax switch, e.g., `192.168.1.32`."
  required: true
  type: string
username:
  description: Your username for the Edimax switch.
  required: false
  default: admin
  type: string
password:
  description: Your password for the Edimax switch.
  required: false
  default: 1234
  type: string
name:
  description: The name to use when displaying this switch.
  required: false
  default: Edimax Smart Plug
  type: string
{% endconfiguration %}
