---
title: Nanoleaf
description: Instructions how to integrate Nanoleaf Panels into Home Assistant.
ha_category:
  - Button
  - Light
ha_codeowners:
  - '@milanmeu'
ha_config_flow: true
ha_homekit: true
ha_iot_class: Local Push
ha_release: 0.67
ha_domain: nanoleaf
ha_platforms:
  - button
  - diagnostics
  - light
ha_zeroconf: true
ha_ssdp: true
---

The Nanoleaf integration allows you to control and monitor Nanoleaf Light Panels, Canvas, Shapes, Elements, and Lines.

This integration does not support the Nanoleaf Remote and Essentials lights.

{% include integrations/config_flow.md %}

## Transition and brightness

When using a transition in service calls (such as `light.turn_on`), the transition is only applied to brightness and does not apply to color. When a service call has a transition set but no brightness is included, the light will automatically transition to 100% brightness.

## Touch events (Gestures)

Nanoleaf Canvas, Shapes and Elements panels support touch events. These events are exposed to Home Assistant as `nanoleaf_event` with a payload of `device_id` and `type`, where `device_id` is a unique device identifier and `type` contains the captured gesture.

| Gesture    | type |
|------------|------------|
| Swipe up   | swipe_up   |
| Swipe down | swipe_down |
| Swipe left | swipe_left |
| Swipe right| swipe_right|

Touch events need to be enabled for the device through the Nanoleaf app. Note that gestures are only detected when swiping across multiple panels.
