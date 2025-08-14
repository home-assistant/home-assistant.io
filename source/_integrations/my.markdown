---
title: My Home Assistant
description: Support for the my.home-assistant.io redirect service.
ha_category:
  - Other
ha_release: 2021.3
ha_domain: my
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: system
---

This integration handles redirects from the [My Home Assistant](https://my.home-assistant.io) service.

My Home Assistant allows the documentation to link you to specific pages in your Home Assistant instance. See the [My Home Assistant FAQ](https://my.home-assistant.io/faq/) for more information.

## Configuration

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

Add the following section to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
my:
```
