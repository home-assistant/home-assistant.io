---
title: Slide
description: Instructions on how to integrate the Innovation in Motion Slide covers with Home Assistant.
ha_category:
  - Cover
  - Hub
ha_iot_class: Cloud Polling
ha_release: 0.99
ha_codeowners:
  - '@ualex73'
ha_domain: slide
ha_platforms:
  - cover
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `slide` {% term integration %} allows you to integrate your [slide.store](https://slide.store/) devices in Home Assistant using the [official API](https://documenter.getpostman.com/view/6223391/S1Lu2pSf?version=latest).

### Configuration

To use the Slide {% term integration %} in your installation, add it to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
slide:
  username: YOUR_SLIDE_APP_USERNAME
  password: YOUR_SLIDE_APP_PASSWORD
```

{% configuration %}
username:
  description: Username needed to log in to Slide App.
  required: true
  type: string
password:
  description: Password needed to log in to Slide App.
  required: true
  type: string
scan_interval:
  description: "Minimum time interval between updates."
  required: false
  default: 30 seconds
  type: integer
invert_position:
  description: Invert position percentage.
  required: false
  default: false
  type: boolean
{% endconfiguration %}
