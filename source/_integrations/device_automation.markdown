---
title: Device Automation
ha_category:
  - Automation
ha_release: 0.7
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: device_automation
ha_integration_type: system
---

Device Automations is a plugin for the automation integration to allow other integrations to provide device specific triggers, conditions and actions.

There is no device automation specific configuration. Instead, it is configured as part of the normal automations.

Device automations are meant to be configured via the UI.

Example:

```yaml
- id: "123456789"
  alias: "Light turns off"
  trigger:
    - platform: device
      device_id: 7a92d5ee74014a0b86903fc669b0bcd6
      domain: light
      type: turn_off
      entity_id: light.bowl
  action:
    - service: camera.turn_off
```
