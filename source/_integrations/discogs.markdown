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
- **Random record**: A randomly selected record from your collection, including details such as artist, title, label, catalog number, format, cover image, and release year. A new record is picked on each update.

Every sensor exposes your Discogs username as the `identity` state attribute.

## Data updates

The **Discogs** integration {% term polling polls %} the Discogs API every 10 minutes.

## YAML configuration

Configuring Discogs through YAML is deprecated. If you have an existing `discogs` entry in your {% term "`configuration.yaml`" %} file, Home Assistant imports it into a config entry automatically, using its `token` and `name` values. `monitored_conditions` isn't used during import, and the import always creates all three sensors listed above. The `name` value becomes the title of the imported config entry rather than an entity name prefix. YAML support for this integration is removed in a future Home Assistant release, so after the import, remove the `discogs` block from your `configuration.yaml` file.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
