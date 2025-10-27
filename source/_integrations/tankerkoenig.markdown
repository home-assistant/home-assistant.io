---
title: Tankerkoenig
description: Instructions on how to integrate Tankerkoenig sensors within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 0.107
ha_iot_class: Cloud Polling
ha_domain: tankerkoenig
ha_codeowners:
  - '@guillempages'
  - '@mib1185'
  - '@jpbede'
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_config_flow: true
related:
  - docs: /common-tasks/general/#defining-a-custom-polling-interval
    title: Defining a custom polling interval
ha_integration_type: integration
ha_quality_scale: platinum
---

The `tankerkoenig` integration allows you to monitor the fuel prices with [tankerkoenig.de](https://www.tankerkoenig.de/) from within Home Assistant and setup automations based on the information.

## Prerequisites

To use this integration, you need an API key from tankerkoenig. 
1. Go to [tankerkoenig API](https://creativecommons.tankerkoenig.de) and in the top right, select **API-KEY**.
2. Fill out the form and request a free API key.

{% important %}
The Terms & Conditions of tankerkoenig.de specify that the API is not meant for massive data fetching, but it does not explicitly mention a limit. Having a maximum of 10 monitored fuel stations is recommended, and a warning will be issued otherwise.
If you consider to [define a custom polling interval](/common-tasks/general/#defining-a-custom-polling-interval), then please keep in mind that requests should be limited to less than once every 5 minutes.
{% endimportant %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Region name:
    description: "The name of the particular region to be added."
API Key:
    description: "The tankerkoenig API-KEY to be used (_see [Prerequisites](#prerequisites)_)."
Location:
    description: "Pick the location where to search for gas stations (_defaults to the location of your Home which was et during [onboarding](/getting-started/onboarding)_)"
Search radius:
    description: "The radius in kilometers to search for gas stations around the selected location (_default: 2km_)"
Stations:
    description: "Select the gas stations you want to add to Home Assistant."
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Stations:
    description: "Select the gas stations you want to add to Home Assistant."
Show stations on map:
    description: "Weather to show the station sensors on the map or not."
{% endconfiguration_basic %}

## Data updates

This integration fetches the data every 30 minutes from the [tankerkoenig API](https://creativecommons.tankerkoenig.de).

## Provides entities

This integrations provides a set of {% term "Binary sensor" %} and {% term Sensor %} entities for each selected gas station.

| Sensors | Description |
| --- | --- |
| Status | Indicates if the gas station is opened or closed at the moment. |
| Diesel | The current price of Diesel fuel. |
| Super | The current price of Super fuel. |
| Super E10 | The current price of Super E10 fuel. |

{% note %}
As the data of [tankerkoenig.de](https://www.tankerkoenig.de/) is based on data from the German market transparency office for fuels (_[Markttransparenzstelle für Kraftstoffe](https://www.bundeskartellamt.de/DE/Aufgaben/MarkttransparenzstelleFuerKraftstoffe/MTS-K_Infotext/mts-k_node.html) MTS-K_), only the three base fuel types `Diesel`, `Super`, and `Super E10` are available.
{% endnote %}

## Usage examples

### Show current fuel price only when station is opened

The example below uses the common [sensor card](/dashboards/sensor/) in the {% term frontend %} and adds a visibility condition.

```yaml
graph: line
type: sensor
entity: sensor.my_favorite_gas_station_super
detail: 1
name: Favorite Gas Station
visibility:
  - condition: state
    entity: binary_sensor.my_favorite_gas_station_status
    state: "on"
```

## Troubleshooting

Before reporting an issue, enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics) and restart the integration. As soon as the issue re-occurs, stop the debug logging again (_download of debug log file will start automatically_). Further, _if still possible_, download the {% term diagnostics %} data. If you have collected the debug log and the diagnostics data, include them in the issue report.

## Remove the integration

{% include integrations/remove_device_service.md %}
