---
title: MTA New York City Transit
description: Instructions on how to integrate real-time NYC subway and bus arrival information within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 2026.3
ha_config_flow: true
ha_codeowners:
  - '@OnFreund'
ha_domain: mta
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: silver
---

The **MTA New York City Transit** {% term integration %} provides real-time subway and bus arrival predictions for NYC transit lines using GTFS-RT data from the [Metropolitan Transportation Authority (MTA)](https://new.mta.info/).

## Prerequisites

- **Subway tracking**: No API key is required.
- **Bus tracking**: An [MTA Bus Time API key](https://bustime.mta.info/wiki/Developers/Index) is required.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "Your MTA Bus Time API key. Required for bus tracking, optional for subway only."
{% endconfiguration_basic %}

## Adding a subway stop

To add a subway arrival sensor:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **MTA New York City Transit** integration.
2. Select **Add subway stop**.
3. Select the subway line you want to monitor from the dropdown.
4. Select the stop and direction (indicated by N/S suffix for northbound/southbound).

## Adding a bus stop

To add a bus arrival sensor:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **MTA New York City Transit** integration.
2. Select **Add bus stop**.
3. Enter the bus route (for example, `M15`, `B46`, `Q10`).
4. Select the stop from the list. Direction information is included with each stop.

{% note %}
Bus tracking requires an API key. If you did not provide one during initial setup, you will be prompted to enter one when you attempt to add a bus stop.
{% endnote %}

## Supported functionality

The integration creates a device per stop with 9 sensors, covering the next 3 upcoming arrivals.

### Sensors

For each of the next 3 arrivals, the following sensors are created:

- **Arrival**: A timestamp sensor showing the predicted arrival time.
- **Arrival destination**: The final destination of the train or bus.
- **Arrival route**: The route identifier of the train or bus.

## Defining a custom polling interval

{% include common-tasks/define_custom_polling.md %}

The default {% term polling %} interval is 30 seconds.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
