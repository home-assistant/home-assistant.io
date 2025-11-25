---
title: Start.ca
description: Instructions on how to integrate Start.ca data usage within Home Assistant.
ha_category:
  - Network
ha_release: 0.64
ha_iot_class: Cloud Polling
ha_domain: startca
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

Integrate your [Start.ca](https://www.start.ca/) account information into Home Assistant.

## Setup

You can get your API key from: [Start.ca Usage API](https://portal.start.ca/account/usage/api)

## Configuration

To use your Start.ca {% term integration %} in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: startca
    api_key: API_KEY
    total_bandwidth: 400
    monitored_variables:
      - usage
      - usage_gb
      - limit
      - used_download
      - used_upload
      - used_total
      - grace_download
      - grace_upload
      - grace_total
      - total_download
      - total_upload
      - used_remaining
```

{% configuration %}
api_key:
  description: The Start.ca API key to access the service.
  required: true
  type: string
total_bandwidth:
  description: Your data limit in gigabytes. Set to `0` for unlimited plans without a cap.
  required: true
  type: string
monitored_conditions:
  description: Conditions to display in the frontend.
  required: true
  type: list
  keys:
    usage:
      description: Data usage (percentage). This sensor is not supported for unlimited plans.
    usage_gb:
      description: Data usage (gigabytes).
    limit:
      description: Monthly data limit (gigabytes). This sensor is not supported for unlimited plans.
    used_download:
      description: Data used by download outside the grace period (gigabytes).
    used_upload:
      description: Data used by upload outside the grace period (gigabytes).
    used_total:
      description: Total data (download and upload sum calculation) used outside the grace period (gigabytes).
    grace_download:
      description: Data used by download during the grace period (gigabytes).
    grace_upload:
      description: Data used by upload during the grace period (gigabytes).
    grace_total:
      description: Total data (download and upload sum calculation) used during the unlimited period (gigabytes).
    total_download:
      description: Total data download (Grace + Used) (gigabytes).
    total_upload:
      description: Total data upload (Grace + Used) (gigabytes).
    used_remaining:
      description: Remaining bandwidth calculated from used and supplied total bandwidth (gigabytes). This sensor is not supported for unlimited plans.
{% endconfiguration %}
