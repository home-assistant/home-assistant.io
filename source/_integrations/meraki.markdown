---
title: Meraki
description: Instructions on how to integrate Meraki-based presence detection into Home Assistant.
ha_category:
  - Presence detection
ha_iot_class: Cloud Polling
ha_release: '0.60'
ha_domain: meraki
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

Use your Meraki AP as device tracker. Note that Meraki will see all devices, not only connected to the network.

### Prerequisites

1. Go to Network-wide/General page, and find the Location and scanning section.
2. Make sure analytics and Scanning API are both enabled.
3. Make note of the Validator string, which will be used in the `device_tracker` configuration.
4. Click **Add a Post URL**:
   1. Set the Post URL to `https://YOUR_HOSTNAME/api/meraki`
   2. Set the Secret to a randomly generated string, and make note of it for the `device_tracker` configuration.
   3. Make sure the API Version is set to `2.0`.
   4. Hit **Save** in the bottom right of the page.

## Configuration

After you configure access to the Meraki CMX API, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: meraki
    secret: your_secret
    validator: meraki_validator
```

{% configuration %}
  secret:
    description: Secret code added in Meraki.
    required: true
    type: string
  validator:
    description: Validation string from Meraki.
    required: true
    type: string
{% endconfiguration %}
