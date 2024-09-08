---
title: Home Assistant Alerts
description: Home Assistant Alerts notifies you about alerts put out by the Home Assistant team affecting your system.
ha_release: 2022.8
ha_category:
  - Other
ha_codeowners:
  - '@home-assistant/core'
ha_domain: homeassistant_alerts
ha_integration_type: system
ha_quality_scale: internal
---

The Home Assistant Alerts integration integrates the 
[Home Assistant Alerts](https://alerts.home-assistant.io) website into
your Home Assistant instance.

This integration will pull in alerts put out by the Home Assistant team and
will raise them in the [Home Assistant Repairs](/integrations/repairs/)
dashboard if an alert is found that impacts your system.

## Configuration

This integration is by default enabled unless you've disabled or removed the
[`default_config:`](/integrations/default_config/) line from your {% term "`configuration.yaml`" %} file.
If that is the case, the following example shows you how to enable this
integration manually:

```yaml
# Example configuration.yaml entry
homeassistant_alerts:
```
