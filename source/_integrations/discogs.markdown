---
title: Discogs
description: Instructions on how to set up Discogs sensors within Home Assistant.
ha_category:
  - Multimedia
ha_release: 0.61
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@thibmaek'
ha_domain: discogs
ha_platforms:
  - sensor
ha_integration_type: service
ha_config_flow: true
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The **Discogs** {% term integration %} allows you to see the current amount of records in your [Discogs](https://www.discogs.com) collection.

## Prerequisites

You need a personal access token from your Discogs account. You can generate one from your profile's [Developer settings](https://www.discogs.com/settings/developers).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Token:
  description: Your personal access token from the Discogs developer settings.
{% endconfiguration_basic %}

## Sensors

This integration creates the following sensors:

- **Collection**: The number of records in your collection.
- **Wantlist**: The number of records in your wantlist.
- **Random record**: A randomly selected record from your collection, including details such as artist, title, label, catalog number, format, cover image, and release year.

## Data updates

The integration polls the Discogs API every 10 minutes.

## YAML configuration

YAML configuration is still supported and will automatically create a config entry on the next restart.

To enable this integration using YAML, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: discogs
    token: YOUR_TOKEN
```

{% configuration %}
token:
  description: Your personal access token from the Discogs developer settings.
  required: true
  type: string
{% endconfiguration %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
