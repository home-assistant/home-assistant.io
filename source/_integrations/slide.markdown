---
title: Slide
description: Instructions on how to integrate the Innovation in Motion Slide covers with Home Assistant.
ha_category:
  - Cover
ha_iot_class: Local Polling
ha_release: 2024.06
ha_codeowners:
  - '@ualex73'
ha_domain: slide
ha_platforms:
  - cover
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `slide` {% term integration %} allows you to integrate your [slide.store](https://slide.store/) devices in Home Assistant using the Local API. Innovation in Motion company has closed down, the Cloud API will be stopped (or has stopped already).

### Configuration

To use the Slide {% term integration %} in your installation, add it to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
slide:
  - host: IP/HOSTNAME
    password: PASSWORD
    api_version: 2
    invert_position: False
```

{% configuration %}
host:
  description: The IP or hostname of the Slide
  required: true
  type: string
password:
  description: The device code of your Slide (inside of the Slide or in the box, length is 8 characters). Only required with api_version=1
  required: false
  type: string
api_version:
  description: 1 or 2. 1 is pre Aug-2023 firmware. 2 is for Aug-2023 or later
  required: false
  default: 2
  type: integer
invert_position:
  description: Invert position percentage.
  required: false
  default: false
  type: boolean
{% endconfiguration %}
