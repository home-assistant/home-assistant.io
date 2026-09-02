---
title: De Lijn
description: Instructions on how to integrate De Lijn public transport departures within Home Assistant.
ha_category:
  - Sensor
  - Transport
ha_release: 0.97
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bollewolle'
  - '@Emilv2'
ha_domain: delijn
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: legacy
---

The **De Lijn** {% term integration %} shows real-time departure information
for stops of [De Lijn](https://www.delijn.be/), the public transport company
of Flanders (Belgium).

## Prerequisites

You need a free De Lijn Open Data API key:

1. Create a developer account at the [De Lijn API portal](https://data.delijn.be/).
2. Subscribe to the free **Open Data** product.
3. Copy the subscription key from your profile page.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: Your De Lijn Open Data subscription key. It is entered once and shared by all your stops; you can view or change it later via the integration's reconfigure option.
{% endconfiguration_basic %}

Existing YAML configuration is imported automatically: one integration
entry is created for the API key, and each configured stop is added to it.
After the import, the YAML configuration can be removed from your
`configuration.yaml`.

## Adding stops

Each stop is added under the De Lijn entry with the **Add stop** button:

{% configuration_basic %}
Stop:
  description: A De Lijn stop number (shown on the physical stop sign and on delijn.be), or part of a stop name to search for. Leave empty to get suggestions near a location instead.
Search near a location:
  description: Pick a location on the map to find nearby stops. If both fields are left empty, stops near your Home Assistant home location are suggested.
{% endconfiguration_basic %}

Before a stop is added, a confirmation step shows its next departures and
links to the stop's location, so you can verify you picked the platform in
the right direction - useful when both sides of the road share a stop name.

Stops can be renamed or removed individually, and each stop's settings can
be changed via its settings icon:

{% configuration_basic %}
Number of departures:
  description: How many upcoming departures to keep as sensor attributes (1-20, default 5).
{% endconfiguration_basic %}

## Sensors

Each stop provides a **Next departure** timestamp sensor. Its attributes
contain the details of the upcoming departures, including the line number,
destination, transport type, real-time status, cancellation status, and the
line's display colors — in the same format as earlier versions of this
integration, so existing dashboard cards keep working.

The stop's device page shows the stop number and links to the stop's page
on delijn.be, where you can see its location and live departure board.

## Data updates

The integration polls the De Lijn API once per minute per stop. If the API
is unreachable, the sensors become unavailable until the connection is
restored; if the API key is no longer valid, you are asked to
reauthenticate once for all stops.

## Removing the integration

This integration follows standard integration removal; individual stops
can also be removed separately from the De Lijn entry. No extra steps are
required.

{% include integrations/remove_device_service.md %}
