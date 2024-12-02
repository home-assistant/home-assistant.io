---
title: PEGELONLINE
description: Instructions on how to integrate PEGELONLINE measurements into Home Assistant.
ha_category:
  - Environment
  - Sensor
ha_release: 2023.8
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_domain: pegel_online
ha_platforms:
  - diagnostics
  - sensor
ha_codeowners:
  - '@mib1185'
ha_integration_type: service
---

This integration uses the data from the German Federal Waterways and Shipping Administration (_Wasserstraßen- und Schifffahrtsverwaltung des Bundes_) [PEGELONLINE](https://www.pegelonline.wsv.de/) to provide different [sensors](#sensors), based on the available data of the selected measurement station.

## Data fetching and limitations

The data are polled every 5 minutes. You can add as many measurement stations as want, there is no authentication needed nor any official usage limitation, but keep the "fair use" in mind.

{% include integrations/config_flow.md %}

### Step 1 - Location selection

Select the area, where you want to search for available water measuring stations

{% configuration_basic %}
Latitude:
  description: "The latitude of the center of the search area (_automatically filled by the location picker_)."
Longitude:
  description: "The longitude of the center of the search area (_automatically filled by the location picker_)."
Radius:
  description: "Search radius (_in km_)"
{% endconfiguration_basic %}

### Step 2 - Station selection

{% configuration_basic %}
Station:
  description: "Select the measurement station you want to add."
{% endconfiguration_basic %}

## Sensors

The following {% term sensors %} are created, based on the capabilities of the selected measurement station:

| Sensor name | Common unit of measurement |
| --- | --- |
| Air temperature | °C |
| Clearance height (_only for bridges_) | cm |
| Oxygen level | mg/l |
| pH | `None` |
| Water flow speed | m/s |
| Water level | cm |
| Water temperature | °C |
| Water volume flow | m³/s |

## Usage example

### Flood alert level notification

Create an automation to get notified, when your local river reaches a specific flood alert level.

```yaml
mode: single
triggers:
  - trigger: numeric_state
    entity_id:
      - sensor.dresden_elbe_water_level
    above: 500
actions:
  - action: notify.persistent_notification
    metadata: {}
    data:
      message: Flood alert level 2 reached!
```

## Troubleshooting

In any case, when reporting an issue, please enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), restart the integration, and as soon as the issue reoccurs stop the debug logging again (_download of debug log file will start automatically_). Further _if still possible_, please also download the [diagnostics](/integrations/diagnostics) data. If you have collected the debug log and the diagnostics data, provide them with the issue report.

## Remove the integration

{% include integrations/remove_device_service.md %}
