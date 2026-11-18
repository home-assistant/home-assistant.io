---
description: Instructions on how to integrate Home Assistant Analytics Insights within Home Assistant.
ha_release: '2024.2'
ha_domain: analytics_insights
---

The **Analytics Insights** {% term integration %} allows you to get integration usage statistics into Home Assistant.
The data comes from [Home Assistant Analytics](https://analytics.home-assistant.io/).
For more information about the component that collects analytics, checkout [Analytics](/integrations/analytics).

For a custom integration to show up, it must be listed in the [Marketplace](/integrations/marketplace/). After it is listed, it can take a few days for its statistics to become available.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Apps:
  description: "The apps you want to track."
Integrations:
  description: "The integrations you want to track."
Custom integrations:
  description: "The custom integrations you want to track."
{% endconfiguration_basic %}

You need to select at least one app, integration, or custom integration.

{% include integrations/option_flow.md %}

The options are the same three lists, so you can change what you track at any time.

## Data updates

The integration {% term polling polls %} the Home Assistant analytics service every 12 hours. If an update fails, it tries again after 15 minutes.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
