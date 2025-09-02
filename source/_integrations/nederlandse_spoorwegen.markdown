---
title: Nederlandse Spoorwegen (NS)
description: Instructions on how to integrate timetable data for traveling by train in the Netherlands within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.57
ha_codeowners:
  - '@heindrichpaul'
  - '@YarmoM'
ha_domain: nederlandse_spoorwegen
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: bronze
---

The **Nederlandse Spoorwegen (NS)** {% term integration %} provides real-time information about Dutch train schedules using the [NS API](https://apiportal.ns.nl/). This integration allows you to monitor departure times, delays, and travel information for your regular routes.

{% include integrations/config_flow.md %}

To use this integration, you need an API key and station codes.

### Obtaining an API Key

To use this integration, you need an API key from NS:

1. Create an account on the [NS API Portal](https://apiportal.ns.nl/).
2. Request an API key for the `Reisinformatie` API, which is part of the `Ns-App` product.

## Configuration

### Adding the integration

1. In the Home Assistant UI, go to **Settings** → **Devices & Services**
2. Click **Add Integration**
3. Search for and select **Nederlandse Spoorwegen (NS)**
4. Enter your NS API key
5. Click **Submit**

### Managing routes

After adding the integration, you can manage your travel routes:

1. Go to **Settings** → **Devices & Services**
2. Find the Nederlandse Spoorwegen integration
3. Click **Configure**
4. Add or remove routes as needed

The integration provides a station selector in the UI, so you don't need to manually look up station codes. Simply search for and select your departure and arrival stations from the dropdown menus during route configuration.

## Migration from YAML

{% important %}
YAML configuration for Nederlandse Spoorwegen is now deprecated and will be removed in a future release.
{% endimportant %}

The integration automatically migrates existing YAML configuration and creates repair notifications to guide users. If you have an existing YAML configuration, the integration will automatically import your routes when you add the integration through the UI.

To complete the migration:

1. Remove the `nederlandse_spoorwegen:` section from your `configuration.yaml`
2. Remove any `sensor:` entries with `platform: nederlandse_spoorwegen`
3. Restart Home Assistant to clear the repair notifications

Your existing routes and settings are automatically preserved in the new UI-based configuration.

## Data source

The data is provided by Nederlandse Spoorwegen through their official API, ensuring high-quality and up-to-date information about train schedules, delays, and service disruptions.

## Troubleshooting

### Authentication errors

If you encounter authentication errors:

- Verify your API key is correct
- Ensure your NS API subscription is active
- Check that you're using the correct API (Reisinformatie API)

### Station not found errors

If stations are not found:

- Verify station codes are correct (case-sensitive)
- Use the official NS station codes from Wikipedia or the NS API
- Ensure the station code exists and is currently in service

### Reconfiguration

To update your API key or modify settings:

1. Go to **Settings** → **Devices & Services**
2. Find the Nederlandse Spoorwegen integration
3. Click the three-dot menu and select **Reconfigure**
4. Enter your new API key or modify settings

### Removing the integration

To completely remove the integration:

1. Go to **Settings** → **Devices & Services**
2. Find the Nederlandse Spoorwegen integration
3. Click the three-dot menu and select **Delete**
4. Confirm the removal

All entities and data associated with the integration will be removed.
