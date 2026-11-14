---
description: Instructions how to integrate Nanoleaf Panels into Home Assistant.
ha_release: 0.67
ha_domain: nanoleaf
---

The **Nanoleaf** {% term integration %} allows you to control and monitor Nanoleaf Light Panels, Canvas, Shapes, Elements, Lines, and Essentials lights. The Nanoleaf Remote is not supported.

Nanoleaf Essentials lights do not send state changes to Home Assistant, so changes made outside of Home Assistant (for example in the Nanoleaf app) can take up to a minute to show up. Controlling Nanoleaf Essentials lights over Thread and Bluetooth is also possible using the [HomeKit Controller](/integrations/homekit_controller/) integration.

{% include integrations/config_flow.md %}

## Transition and brightness

When using a transition in an action (such as `light.turn_on`), the transition is only applied to brightness and does not apply to color. When an action has a transition set, but no brightness is included, the light will automatically transition to 100% brightness.

## Screen mirroring modes

For the Nanoleaf 4D, the Screen Mirroring modes (1D, 2D, 3D, and 4D) are available as effects of the light entity. Selecting one of them activates the mode, and the active mode is shown as the current effect.

## Touch gestures

Devices with touch support expose a **Touch gesture** event entity. You can use it in automations to respond to a single tap, double tap, swipe up, swipe down, swipe left, or swipe right.

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
