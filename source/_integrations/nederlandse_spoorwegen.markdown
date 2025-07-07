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
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: silver
---

The **Nederlandse Spoorwegen (NS)** {% term integration %} provides real-time timetable information for [Nederlandse Spoorwegen](https://www.ns.nl/) (NS), the Dutch national railway, directly in Home Assistant.

## Prerequisites

### Obtaining an API Key

To use this integration, you need an API key from NS:

1. Create an account on the [NS API Portal](https://apiportal.ns.nl/).
2. Request an API key for the `Reisinformatie` API, which is part of the `Ns-App` product.

Station codes are required. You can look them up in the [list of railway stations in the Netherlands](https://nl.wikipedia.org/wiki/Lijst_van_spoorwegstations_in_Nederland).

{% include integrations/config_flow.md %}
1. Enter your NS API key when prompted.
2. Add one or more train routes by specifying the departure station, arrival station, and optionally a via station.
3. Save your configuration. The integration will create sensors for each route.

You can edit, add, or remove routes at any time using the integration's options flow in the UI. If your API key changes or expires, use the reauthentication flow to update it. For other configuration changes, use the reconfiguration flow, both without removing your integration.

{% configuration_basic %}
api_key:
    description: "API key obtained from the NS API Portal."
from:
    description: "Departure station code (for example `Rtd`)."
to:
    description: "Arrival station code (for example `Asd`)."
via:
    description: "Optional intermediate station code."
name:
    description: "A descriptive name for this route."
{% endconfiguration_basic %}

### Station codes

Station codes are required. You can look them up in the [list of railway stations in the Netherlands](https://nl.wikipedia.org/wiki/Lijst_van_spoorwegstations_in_Nederland).

### Searching a specific train vs. the next train

The default behavior (without configuration variable `time`) gives you the information about the *next* train that fits the criteria (`from`, `to`, `via`).
When using the configuration variable `time`, you can search for a specific train.
This is convenient when searching for the next train doesn't give you enough time to base an automation on.
E.g., when you normally take the 08h06m train and want to get information about this train, but there is another train
that's departing just minutes before your train, your time window to warn you on a delay might be too small.

Using `time` only updates the route sensor during a time window around the chosen time.
Outside this window, the route sensor's state is `unknown`.
The window is from half an hour before the chosen time until half an hour after the chosen time.
In this way, you can have multiple routes with specific trains before hitting the FUP threshold for using NS API.

### Data source

Data is provided by [Nederlandse Spoorwegen](https://www.ns.nl/).

This integration meets the [Silver quality-scale requirements](https://developers.home-assistant.io/docs/integration_quality_scale_index/), ensuring reliable configuration via the Home Assistant UI and robust error handling.
