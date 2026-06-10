---
title: Karakeep
description: Instructions on how to integrate Karakeep into Home Assistant.
ha_release: 2026.7
ha_category:
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: karakeep
ha_codeowners:
  - '@sli-cka'
ha_integration_type: service
ha_quality_scale: bronze
related:
  - url: https://karakeep.app/
    title: Karakeep
  - url: https://docs.karakeep.app/
    title: Karakeep documentation
ha_platforms:
  - sensor
---

The **Karakeep** {% term integration %} allows you to connect your [Karakeep](https://karakeep.app/) instance to Home Assistant and monitor bookmark statistics.

Karakeep is a self-hostable bookmarking and read-it-later service for saving, organizing, and tagging links, notes, images, and other content.

## Prerequisites

To use this integration, you need:

- A running Karakeep instance that Home Assistant can reach.
- A Karakeep API key.

{% details "Create an API key" %}

1. Log in to your Karakeep instance.
2. Go to **Settings** > **API Keys**.
3. Create a new API key.
4. If your Karakeep instance is version `v0.32.0` or later and uses granular scopes, grant the API key the **User account** > **read** scope.
5. Copy the API key and use it during setup in Home Assistant.

{% enddetails %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: "The URL of your Karakeep instance, for example `https://karakeep.example.com`."
API key:
  description: "The Karakeep API key used to connect to your instance."
{% endconfiguration_basic %}

## Supported functionality

The Karakeep integration provides sensors for account statistics.

## Sensors

For each config entry, the integration creates the following {% term sensors %}:

| Sensor | Description |
| ------ | ----------- |
| **Bookmarks** | Number of bookmarks in Karakeep. |
| **Favorites** | Number of favorite bookmarks. |
| **Archived** | Number of archived items. |
| **Highlights** | Number of highlights. |
| **Lists** | Number of lists. |
| **Tags** | Number of tags. |

## Data updates

This integration retrieves data from Karakeep using a pull-based mechanism. Statistic sensors are updated every 5 minutes.

## Removing the integration

{% include integrations/remove_device_service.md %}

If the API key is not used anymore, you can remove it from your Karakeep instance.

## Troubleshooting

{% details "The integration cannot connect to Karakeep" %}

1. Make sure the URL includes `http://` or `https://`.
2. Make sure Home Assistant can reach the Karakeep instance over the network.
3. Check whether a reverse proxy, firewall, or TLS certificate issue is blocking access from Home Assistant.

{% enddetails %}

{% details "Authentication fails during setup" %}

Verify that the API key is copied correctly and is still valid in Karakeep.

{% enddetails %}
