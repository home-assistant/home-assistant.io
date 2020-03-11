---
title: Automation
description: Instructions on how to setup automation within Home Assistant.
ha_category:
  - Automation
ha_release: 0.7
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: automation
---

Please see the [automation section](/docs/automation/) for in-depth
documentation on how to use the automation integration.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/automation-switches.png' />
</p>

You can also use `initial_state: 'false'` so that the automation
is not automatically turned on after a Home Assistant reboot.

```yaml
automation:
  - alias: Door alarm
    initial_state: true
    trigger:
      - platform: state
  ...
```

## Configuration

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](https://www.home-assistant.io/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

```yaml
# Example configuration.yaml entry
automation:
```
