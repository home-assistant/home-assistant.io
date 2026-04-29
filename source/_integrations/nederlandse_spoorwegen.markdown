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

The default behavior (without specifying a time) gives you information about the next available train that fits your route criteria (from, to, via stations).

When you specify a departure time during route configuration, the integration filters trips to show only those departing at or after your specified time. This time-based filter compares only the time component (for example, 17:00), ignoring the date, so it works continuously throughout the day.

This is useful when you want to focus on specific parts of your daily schedule. For example:

- Set time to "08:00" for morning commute trains
- Set time to "17:00" to only see evening trains home
- Avoid seeing very early morning trains when you're interested in your regular departure

The sensor automatically handles day transitions. If the current time is past your configured time, it will show tomorrow's first trip at or after that time. This ensures you always see relevant upcoming trips matching your schedule, without the sensor becoming unavailable.

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
