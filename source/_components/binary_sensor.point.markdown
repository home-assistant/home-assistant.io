---
layout: page
title: "Minut Point Binary Sensor"
description: "Access your Minut Point Events as binary sensors."
date: 2018-11-19
sidebar: true
comments: false
sharing: true
footer: true
logo: minut.svg
ha_category: Binary Sensor
ha_release: "0.83"
ha_iot_class: "Cloud Push"
ha_qa_scale: silver
---

Each Point exposes the following binary sensors:

- **battery**: `On` means low, `Off` means normal
- **button_press**: `On` means the button was pressed, `Off` means normal
- **cold**: `On` means cold, `Off` means normal
- **connectivity**: `On` means connected, `Off` means disconnected
- **dry**: `On` means too dry, `Off` means normal
- **heat**: `On` means hot, `Off` means normal
- **light**: `On` means light detected, `Off` means no light
- **moisture**: `On` means moisture detected (wet), `Off` means no moisture (dry)
- **motion**: `On` means motion detected, `Off` means no motion (clear)
- **sound**: `On` means sound detected, `Off` means no sound (clear)
- **tamper**: `On` means the point was removed or attached

For installation instructions, see [the Point component](/components/point/).

<p class='note'>
The events sent from the Point is also sent as a webhook back to Home Assistant with `event_type` as `point_webhook_received`, please consider the documentation for the [IFTT](/components/ifttt/) component on how to write automations for webhooks.
</p>
