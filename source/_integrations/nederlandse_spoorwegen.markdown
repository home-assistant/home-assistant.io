---
title: Nederlandse Spoorwegen (NS)
description: Instructions on how to integrate timetable data for traveling by train in the Netherlands within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.57
ha_codeowners:
  - '@YarmoM'
  - '@heindrichpaul'
ha_domain: nederlandse_spoorwegen
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: service
ha_quality_scale: legacy
ha_config_flow: true
---

The **Nederlandse Spoorwegen (NS)** {% term integration %} provides real-time information about Dutch train schedules using the [NS API](https://apiportal.ns.nl/). This integration allows you to monitor departure times, delays, and travel information for your regular routes.

## Prerequisites

To use this integration, you need an API key from the NS API Portal.

### Obtaining an API Key

1. Create an account on the [NS API Portal](https://apiportal.ns.nl/).
2. Request an API key for the `Reisinformatie` API, which is part of the `Ns-App` product.

{% include integrations/config_flow.md %}

### Managing routes

After adding the integration, you can manage your travel routes:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Find the **Nederlandse Spoorwegen** integration.
3. Click **Configure**.
4. Add or remove routes as needed.

The integration provides a station selector in the UI, so you don't need to manually look up station codes. Simply search for and select your departure and arrival stations from the dropdown menus during route configuration.

## Searching for a specific train vs. the next train

The default behavior (without specifying a time) gives you information about the *next* train that fits the criteria (from, to, via stations).

When you specify a departure time during route configuration, you can search for a specific train. This is convenient when searching for the next train doesn't give you enough time to base an automation on. For example, when you normally take the 08:06 train and want to get information about this specific train, but there is another train departing just minutes before your train, your time window to warn you about a delay might be too small.

Using a specific time only updates the route sensor during a time window around the chosen time. Outside this window, the route sensor's state is `unknown`. The window is from half an hour before the chosen time until half an hour after the chosen time. In this way, you can have multiple routes with specific trains before hitting the API usage limits.

## Data source

The data is provided by Nederlandse Spoorwegen through their official API, ensuring high-quality and up-to-date information about train schedules, delays, and service disruptions.

## Troubleshooting

### Authentication errors

If you encounter authentication errors:

- Verify your API key is correct.
- Ensure your NS API subscription is active.
- Check that you're using the correct API (Reisinformatie API).

### Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

All entities and data associated with the integration will be removed.
