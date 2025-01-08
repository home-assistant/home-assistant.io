---
title: OhmConnect
description: Documentation about the OhmConnect sensor.
ha_category:
  - Energy
ha_iot_class: Cloud Polling
ha_release: 0.26
ha_codeowners:
  - '@robbiet480'
ha_domain: ohmconnect
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `ohmconnect` {% term integration %} will show you the current [OhmConnect](https://www.ohmconnect.com/) status for the given OhmConnect ID.

OhmConnect monitors real-time conditions on the electricity grid. When dirty and unsustainable power plants turn on, our users receive a notification to save energy. By saving energy at that time, California does not have to turn on additional power plants and California's energy authorities pay you for that.

## Configuration

You can find your OhmConnect ID on the [OhmConnect API settings page](https://login.ohmconnect.com/api/v2/settings). It's the string after the last `/` in the URL, e.g., for the URL `https://login.ohmconnect.com/verify-ohm-hour/AbCd1e` your ID is `AbCd1e`.

To enable the OhMConnect {% term integration %}, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ohmconnect
    id: YOUR_OHMCONNECT_ID
```

{% configuration %}
id:
  description: Your OhmConnect ID.
  required: true
  type: string
name:
  description: A name to display on the sensor.
  required: false
  default: OhmConnect Status
  type: string
{% endconfiguration %}
