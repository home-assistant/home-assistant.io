---
title: TekSavvy
description: Instructions on how to integrate TekSavvy data usage within Home Assistant.
ha_category:
  - Network
ha_release: 0.62
ha_iot_class: Cloud Polling
ha_domain: teksavvy
---

Integrate your [TekSavvy](https://myaccount.teksavvy.com/) account information into Home Assistant.

You can get your API key from [TekSavvy My Account](https://myaccount.teksavvy.com/ApiKey/ApiKeyManagement).

## Configuration

To use your TekSavvy sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: teksavvy
    api_key: API_KEY
    total_bandwidth: 400
    monitored_variables:
      - usage
      - usage_gb
      - limit
      - onpeak_download
      - onpeak_upload
      - onpeak_total
      - offpeak_download
      - offpeak_upload
      - offpeak_total
      - onpeak_remaining
```

{% configuration %}
api_key:
  description: The TekSavvy API key to access the service.
  required: true
  type: string
total_bandwidth:
  description: Your bandwidth limit in gigabytes. Set to `0` for unlimited plans without a cap.
  required: true
  type: string
monitored_conditions:
  description: Conditions to display in the frontend.
  required: true
  type: list
  keys:
    usage:
      description: Bandwidth usage (percentage).
    usage_gb:
      description: Bandwidth usage (gigabytes).
    limit:
      description: Monthly bandwidth limit (gigabytes).
    onpeak_download:
      description: Bandwidth used by download outside the unmetered period (gigabytes).
    onpeak_upload:
      description: Bandwidth used by upload outside the unmetered period (gigabytes).
    onpeak_total:
      description: Total bandwidth used outside the unmetered period (gigabytes).
    offpeak_download:
      description: Bandwidth used by download during the unlimited period (gigabytes).
    offpeak_upload:
      description: Bandwidth used by upload during the unlimited period (gigabytes).
    offpeak_total:
      description: Total bandwidth used during the unlimited period (gigabytes).
    onpeak_remaining:
      description: Remaining bandwidth (gigabytes).
{% endconfiguration %}
