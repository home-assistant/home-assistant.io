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
ha_quality_scale: bronze
---

The **De Lijn** {% term integration %} shows realtime departure information
for stops of [De Lijn](https://www.delijn.be/), the public transport company
of Flanders (Belgium).

## Prerequisites

You need a free De Lijn Open Data API key:

1. Create a developer account at the [De Lijn API portal](https://data.delijn.be/).
2. Subscribe to the free **Open Data** product.
3. Copy the subscription key from your profile page.

{% include integrations/config_flow.md %}

Existing YAML configuration is imported automatically: each configured stop
becomes its own integration entry. After the import, the YAML configuration
can be removed from your `configuration.yaml`.

{% configuration_basic %}
API key:
  description: Your De Lijn Open Data subscription key. When you add more stops, the key from an existing stop is prefilled.
Stop:
  description: A De Lijn stop number (shown on the physical stop sign and on delijn.be), or part of a stop name to search for. Leave empty to get suggestions near a location instead.
Search near a location:
  description: Pick a location on the map to find nearby stops. If both fields are left empty, stops near your Home Assistant home location are suggested.
{% endconfiguration_basic %}

Before a stop is added, a confirmation step shows its next departures and
links to the stop's location, so you can verify you picked the platform in
the right direction — useful when both sides of the road share a stop name.

## Options

Under **Settings** > **Devices & services** > **De Lijn** > **Configure**:

{% configuration_basic %}
Number of departures:
  description: How many upcoming departures to keep as sensor attributes (1-20, default 5).
{% endconfiguration_basic %}

## Sensors

Each stop provides a **Next departure** timestamp sensor. Its attributes
contain the details of the upcoming departures, including the line number,
destination, transport type, realtime status, cancellation status, and the
line's display colours — in the same format as earlier versions of this
integration, so existing dashboard cards keep working.

## Data updates

The integration polls the De Lijn API once per minute. If the API is
unreachable, the sensors become unavailable until the connection is
restored; if the API key is no longer valid, you are asked to reauthenticate.

## Removing the integration

This integration follows standard integration removal; each stop is removed
individually. No extra steps are required.

{% include integrations/remove_device_service.md %}
