---
title: MobilityData
description: Instructions on how to track public transit departures from any GTFS feed in the Mobility Database within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 2026.9
ha_config_flow: true
ha_codeowners:
  - "@raman325"
ha_domain: mobilitydata
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: silver
---

The **MobilityData** {% term integration %} provides upcoming public transit departures for stops you choose, using any of the thousands of GTFS schedule feeds cataloged by the [Mobility Database](https://mobilitydatabase.org) — buses, trains, trams, and ferries from transit providers worldwide. Where a provider publishes GTFS-RT realtime data, departure times include live predictions and delays; otherwise the published schedule is used.

## Prerequisites

- A free [Mobility Database account](https://mobilitydatabase.org). Copy the **refresh token** from your account settings; the integration uses it to access the catalog.
- Some providers require their own API key to access realtime data. If the feed you select is one of them, the integration prompts for the key during setup and links to the provider's instructions.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Refresh token:
  description: "The long-lived refresh token from your Mobility Database account settings."
Search:
  description: "Free-text catalog search, for example a provider or city name. Submit a new search at any time to refine the results."
Feed:
  description: "The transit feed to add, picked from the search results."
API key:
  description: "Only shown for feeds whose realtime data requires a provider-issued API key."
{% endconfiguration_basic %}

After you pick a feed, the integration downloads the provider's schedule and builds a local index. For large networks this can take a few minutes; progress is shown while it runs. The index is cached, so this cost is only paid once per published schedule.

## Adding a transit stop

Departure sensors are created per stop. To add a stop:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **MobilityData** integration.
2. Select **Add transit stop**.
3. Choose a search area: pick one of your [zones](/integrations/zone/), or draw a circle on the map. The map starts centered on the feed's coverage area.
4. Select a stop from those found inside the area.
5. Optionally limit departures to specific **routes** serving the stop.
6. Optionally limit departures to specific **destinations** (headsigns).

Leaving a filter empty includes everything, which is right for most stops. Filters are useful at large stops or stations served by many lines when you only care about one of them.

{% note %}
If you add a stop immediately after setting up the feed, you may briefly see "The transit schedule is still being prepared" while the schedule index finishes loading. Wait a few seconds and try again.
{% endnote %}

### Changing a stop's filters

The route and destination filters of an existing stop can be changed without removing it: select the three-dot menu next to the stop and choose **Reconfigure**.

## Supported functionality

The integration creates a device per configured stop, with the following entities.

### Sensors

- **Next departure**
  - **Description**: The next upcoming departure at the stop that matches the stop's filters. When the provider publishes realtime predictions, the timestamp is the predicted departure; otherwise it is the scheduled one.
- **Second departure**
  - **Description**: The departure after the next one, useful for "just missed it" decisions.
  - **Remarks**: Disabled by default.
- **Third departure**
  - **Description**: The departure after that.
  - **Remarks**: Disabled by default.

All sensors expose attributes with the route, destination (headsign), scheduled and predicted times, delay in seconds, whether the value is realtime, and the trip identifier.

## Data updates

Departures are {% term polling polled %} every minute for feeds with a realtime trip-updates source, and every 5 minutes for schedule-only feeds. The schedule itself is re-checked once a day, and the local index is rebuilt automatically when the provider publishes a new dataset.

## Defining a custom polling interval

{% include common-tasks/define_custom_polling.md %}

## Known limitations

- The integration provides upcoming departures only. Realtime vehicle positions and service alerts are not yet exposed.
- Data quality depends entirely on what the transit provider publishes. Some providers do not publish realtime data, and some publish schedules with limited lookahead.

## Troubleshooting

### A stop's sensors became unavailable

Transit providers occasionally retire or renumber stops when publishing new schedules. If a configured stop disappears from the latest schedule, a repair issue is raised naming the stop, and its sensors become unavailable. Remove the stop and add its replacement from the map.

### Reauthentication

If your Mobility Database refresh token is revoked, or the provider rejects your realtime API key, the integration prompts you to reauthenticate with a new credential.

## Removing the integration

This integration follows standard integration removal; the cached schedule index is deleted automatically.

{% include integrations/remove_device_service.md %}
