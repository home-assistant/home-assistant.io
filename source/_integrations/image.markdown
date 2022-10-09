---
title: Image
description: The image integration handle image assets in Home Assistant.
ha_category:
  - Other
ha_release: 0.115
ha_codeowners:
  - '@home-assistant/core'
ha_domain: image
ha_quality_scale: internal
ha_integration_type: system
---

The Image integration allows Home Assistant to handle image assets in Home Assistant, for example,
the profile photos of your systems account.

## Configuration

This integration is by default enabled, unless you've disabled or removed the
[`default_config:`](/integrations/default_config/) line from your configuration.

If that is the case, the following example shows you how to enable this
integration manually:

```yaml
# Example configuration.yaml entry
image:
```
