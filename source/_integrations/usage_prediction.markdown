---
description: Instructions on how to configure the usage prediction integration for Home Assistant.
ha_release: '2025.10'
ha_domain: usage_prediction
---

The **Usage Prediction** {% term integration %} is an internal integration that provides predictions of what entities the user is most likely to interact with. This is used in the frontend to surface the most relevant entities to the user.

## Configuration

While this integration is part of [`default_config:`](/integrations/default_config/) to enable features in the default experience, it will only be enabled by setting up the configuration flow, or manually adding it to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
usage_prediction:
```
