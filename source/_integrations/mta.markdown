---
title: MTA New York City Transit
description: Instructions on how to integrate real-time NYC subway arrival information within Home Assistant.
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
ha_integration_type: integration
---

The **MTA New York City Transit** {% term integration %} provides real-time subway arrival predictions for all NYC subway lines using GTFS-RT data from the [Metropolitan Transportation Authority (MTA)](https://new.mta.info/).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Line:
  description: "The subway line to monitor (for example, `1`, `A`, `L`)."
Stop:
  description: "The stop and direction to monitor arrivals for."
{% endconfiguration_basic %}

## Adding a subway arrival sensor

To add a subway arrival sensor:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select **Add integration** and search for **MTA New York City Transit**.
3. Select the subway line you want to monitor from the dropdown.
4. Select the stop and direction (indicated by N/S suffix for northbound/southbound).

You can add multiple entries to monitor different stops or lines.

## Supported functionality

The integration creates 3 timestamp sensors per line & stop combination for the 3 upcoming arrivals.

### Sensor attributes

Each sensor includes the following attributes:

- **Stop ID**: The transit stop identifier.
- **Route**: The train route identifier.
- **Destination**: The final destination of the train.

## Defining a custom polling interval

{% include common-tasks/define_custom_polling.md %}

The default {% term polling %} interval is 30 seconds.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
