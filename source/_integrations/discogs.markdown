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

Setting up the integration through the UI creates all of the following sensors. When configuring the integration in YAML, use `monitored_conditions` to create only a subset.

- **Collection**: The number of records in your collection.
- **Wantlist**: The number of records in your wantlist.
- **Random record**: A randomly selected record from your collection, including details such as artist, title, label, catalog number, format, cover image, and release year. A new record is picked on each update.

Every sensor exposes your Discogs username as the `identity` state attribute.

## Data updates

The integration polls the Discogs API every 10 minutes.

## YAML configuration

The `sensor` platform remains fully supported and can be used instead of, or alongside, the config entry. Configuring it in YAML lets you create only a subset of the sensors through `monitored_conditions` and set a custom entity name prefix. Setting the integration up through the UI always creates all three sensors; disable the ones you don't need from their entity settings.

To configure the sensors in YAML, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: discogs
    token: YOUR_TOKEN
```

{% include integrations/restart_ha_after_config_inclusion.md %}

{% configuration %}
token:
  description: Your personal access token from the Discogs developer settings.
  required: true
  type: string
name:
  description: Name prefix for the created sensor entities.
  required: false
  default: Discogs
  type: string
monitored_conditions:
  description: The sensors to create. Omit to create all of them.
  required: false
  default: "[collection, wantlist, random_record]"
  type: list
  keys:
    collection:
      description: The number of records in your collection.
    wantlist:
      description: The number of records in your wantlist.
    random_record:
      description: A randomly selected record from your collection.
{% endconfiguration %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
