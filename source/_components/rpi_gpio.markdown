---
layout: page
title: "Raspberry Pi GPIO"
description: "Instructions on how to integrate the GPIO capability of a Raspberry Pi or Orange Pi into Home Assistant."
date: 2016-08-30 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: raspberry-pi.png
ha_category: DIY
ha_release: pre 0.7
ha_iot_class: "Local Push"
---

The `rpi_gpio` component is the base for all related GPIO platforms in Home Assistant. This component supports both Raspberry Pi, as well as the Orange Pi boards.

```yaml
# Example configuration.yaml entry
rpi_gpio:
  board_family: raspberry_pi
```

{% configuration %}
board_family:
  description: The type of board. The default is "raspberry_pi", but "orange_pi" is also supported.
  required: false
  type: string
{% endconfiguration %}
