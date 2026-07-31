---
title: Clicky
description: Instructions on how to integrate Clicky within Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.9
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@avclicky'
ha_domain: clicky
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: bronze
---

The **Clicky** {% term integration %} allows you to get website visitor information from [Clicky](https://clicky.com/), a real-time, privacy-friendly web analytics service.

## Prerequisites

When you add the Clicky integration to Home Assistant, you will need to provide your website's site ID and site key details. This means that you must have at least one website using Clicky.

This information is located in the preferences section for each website in your account accessed via Dashboard > \[Website\] > Prefs.

Free accounts are welcome to use this integration!

{% include integrations/config_flow.md %}

{% configuration_basic %}
Website Name:
  description: "How you want your website's name to appear in Home Assistant."
Site ID:
  description: "Your website's ID within Clicky."
Site key:
  description: "Your website's site key within Clicky."
{% endconfiguration_basic %}

## Sensors

The integration adds the following sensors for each website that you setup:

- Number of visitors online
- Total time spent

## Troubleshooting

- Before opening an issue, ensure that your site ID and site key credentials accurately reflect what you see in your Clicky account website preferences.

## Removing the integration

{% include integrations/remove_device_service.md %}
