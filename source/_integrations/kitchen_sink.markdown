---
title: Everything but the Kitchen Sink
description: Instructions on how to set up the Everything but the Kitchen Sink integration
ha_category:
  - Other
ha_release: 2023.2
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: kitchen_sink
ha_iot_class: Calculated
ha_platforms:
  - lock
  - sensor
ha_integration_type: integration
---

The Kitchen Sink integration contains demonstrations of various odds and ends.

This sets up a demo environment of features which are obscure or which represent incorrect behavior, and are thus not wanted in the `demo` integration.

To enable the `kitchen_sink` integration in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry

kitchen_sink:
```
