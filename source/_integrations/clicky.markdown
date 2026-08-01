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

To set up the Clicky integration, you need your site's Site ID and Site key. You can find these in Clicky under **Dashboard** > (your site) > **Prefs**.

This means you must have at least one website set up in Clicky.

You can use this integration with Clicky's free plan.

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

The integration adds the following sensors for each website that you set up:

- Number of visitors online
- Total time spent

## Troubleshooting

- Before opening an issue, ensure that your site ID and site key credentials accurately reflect what you see in your Clicky account website preferences.

## Removing the integration

{% include integrations/remove_device_service.md %}
