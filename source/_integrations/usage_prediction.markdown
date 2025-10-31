---
title: Usage Prediction
description: Instructions on how to configure the usage prediction integration for Home Assistant.
ha_category:
  - History
ha_release: '2025.10'
ha_quality_scale: internal
ha_domain: usage_prediction
ha_iot_class: Calculated
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: system
---

The **Usage Prediction** {% term integration %} is an internal integration that provides predictions of what entities the user is most likely to interact with. This is used in the frontend to surface the most relevant entities to the user.

## Configuration

While this integration is part of [`default_config:`](/integrations/default_config/) to enable features in the default experience, it will only be enabled by setting up the configuration flow, or manually adding it to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
usage_prediction:
```
