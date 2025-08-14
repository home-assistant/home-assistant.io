---
title: Image upload
description: The image upload integration handle image assets in Home Assistant.
ha_category:
  - Media source
  - Other
ha_release: 0.115
ha_codeowners:
  - '@home-assistant/core'
ha_domain: image_upload
ha_quality_scale: internal
ha_integration_type: system
---

The **Image upload** {% term integration %} allows Home Assistant to handle image assets in
Home Assistant, for example, the profile photos of your systems account.

Uploaded images are also viewable in the media browser.

## Configuration

This integration is by default enabled, unless you've disabled or removed the
[`default_config:`](/integrations/default_config/) line from your configuration.

If that is the case, the following example shows you how to enable this
integration manually:

```yaml
# Example configuration.yaml entry
image_upload:
```
