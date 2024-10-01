---
title: Nanoleaf
description: Instructions how to integrate Nanoleaf Panels into Home Assistant.
ha_category:
  - Button
  - Event
  - Light
ha_codeowners:
  - '@milanmeu'
  - '@joostlek'
ha_config_flow: true
ha_homekit: true
ha_iot_class: Local Push
ha_release: 0.67
ha_domain: nanoleaf
ha_platforms:
  - button
  - diagnostics
  - event
  - light
ha_zeroconf: true
ha_ssdp: true
ha_integration_type: integration
---

The Nanoleaf integration allows you to control and monitor Nanoleaf Light Panels, Canvas, Shapes, Elements, and Lines.

This integration does not support the Nanoleaf Remote and Essentials lights. Controlling Nanoleaf Essentials lights is possible over Thread and Bluetooth through the HomeKit Controller integration.

{% include integrations/config_flow.md %}

# Transition and brightness

When using a transition in an action (such as `light.turn_on`), the transition is only applied to brightness and does not apply to color. When an action has a transition set, but no brightness is included, the light will automatically transition to 100% brightness.
