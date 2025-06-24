---
title: Garages Amsterdam
description: Instructions on how to integrate Garages Amsterdam within Home Assistant.
ha_category:
  - Binary sensor
  - Sensor
ha_release: 2021.6
ha_codeowners:
  - '@klaasnicolaas'
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_domain: garages_amsterdam
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

The **Garages Amsterdam** {% term integration %} uses an API provided by the municipality of Amsterdam, to measure the occupancy of Amsterdam parking garages in the Netherlands. You can track multiple garages by adding the integration multiple times.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Garage name:
  description: The name of the parking garage you want to monitor.
{% endconfiguration_basic %}

## Data updates

The integration will poll the API of Amsterdam every 10 minutes to update the data in Home Assistant.

### Sensor

When you add a parking garage, 4 sensors are created in your configuration by default:

- **Free space long** - Number of free parking spaces for cardholders or reserved spaces
- **Free space short** - Number of free parking spaces for regular paid parking
- **Long capacity** - Total of parking spaces for cardholders or reserved spaces
- **Short capacity** - Total of parking spaces for regular paid parking

{% note %}
Some parking garages don't have long-term parking spaces, in which case the 2 specific **Long** sensors will not be created.
{% endnote %}

### Binary sensor

Each parking garage also has a binary sensor, which indicates whether there are problems in the data provision from the API. When it indicates `ok` everything is fine. If the state changes to `problem`, the upstream data might not be up to date or reliable and will remain in this state until new data is coming in.

## Removing the integration

You can remove each parking garage instance by following the default removal process.

{% include integrations/remove_device_service.md %}
