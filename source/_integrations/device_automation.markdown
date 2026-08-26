---
title: Device automation
description: Information about the device automation plugin.
ha_category:
  - Automation
ha_release: 0.7
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: device_automation
ha_integration_type: system
---

**Device automation** is a plugin for the automation integration that allows other integrations to provide device-specific triggers, conditions, and actions.

There is no device automation-specific configuration. Instead, device automations are configured as part of regular automations.

Device automations are meant to be configured in the UI. In the automation editor, a device trigger can represent a state change, a button press on a remote, or another event provided by the integration. Unlike a state trigger, a device trigger is tied to a device and does not always need to target a specific entity.

[MQTT device triggers](/integrations/device_trigger.mqtt/) are set up through [MQTT discovery](/integrations/mqtt/#mqtt-discovery).

If you need YAML for an automation that is not managed in the UI, create the trigger in the automation editor first, then copy the YAML from the trigger.

Example:

```yaml
- alias: "Light turns off"
  triggers:
    - trigger: device
      device_id: 7a92d5ee74014a0b86903fc669b0bcd6
      domain: light
      type: turn_off
      entity_id: light.bowl
  actions:
    - action: camera.turn_off
```
