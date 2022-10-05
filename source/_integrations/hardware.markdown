---
title: Hardware
ha_category:
  - Other
ha_release: 2022.6
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: hardware
ha_integration_type: system
---

The Hardware integration provides an API which offers information about certain board types, USB dongles, and resource usage.

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

```yaml
# Example configuration.yaml entry
hardware:
```
