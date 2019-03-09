---
layout: page
title: "Osram Lightify"
description: "Instructions on how to integrate Osram Lightify into Home Assistant."
date: 2016-05-29 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: osramlightify.png
ha_category: Light
ha_release: 0.21
---

The `osramlightify` platform allows you to integrate your [Osram Lightify](http://www.osram.com/osram_com/products/led-technology/lightify/index.jsp) into Home Assistant.

```yaml
# Example configuration.yaml entry
light:
  - platform: osramlightify
    host: 192.168.0.50
```

{% configuration %}
host:
  description: "IP address of the Osram Lightify bridge, e.g., `192.168.1.50`."
  required: true
  type: string
allow_lightify_nodes:
  description: (true/false) Edit this to stop homeassistant from importing the lightify lights.
  required: false
  default: true
  type: boolean
allow_lightify_groups:
  description: (true/false) Edit this to stop homeassistant from importing the lightify groups.
  required: false
  default: true
  type: boolean
{% endconfiguration %}
