---
title: GeoSphere Austria Warnings
description: Instructions on how to integrate official GeoSphere Austria weather warnings within Home Assistant.
ha_category:
  - Binary sensor
  - Sensor
  - Weather
ha_release: 2026.7
ha_iot_class: Cloud Polling
ha_domain: geosphere_austria_warnings
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: service
ha_codeowners:
  - '@tklecka'
ha_quality_scale: bronze
---

The **GeoSphere Austria Warnings** {% term integration %} provides official weather warnings issued by the Austrian national weather service [GeoSphere Austria](https://www.geosphere.at) (formerly known as ZAMG).

Warnings are published per Austrian municipality and cover storm, rain, snow, black ice, thunderstorm, heat, and cold events with the severity levels yellow, orange, and red.

Warning data is provided by GeoSphere Austria under the [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/) license.

## Use cases

- Get notified when an official weather warning is issued for your home or another location in Austria.
- Trigger automations on specific warning types, for example closing covers on a storm warning or disabling irrigation on a rain warning.
- Show the current warning level on your dashboard.

## Prerequisites

Warnings are provided for Austrian municipalities only. The integration determines the municipality from the location of a Home Assistant [zone](/integrations/zone/), so the zone you select must be located within Austria.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Zone:
  description: The zone to monitor. Warnings are provided for the Austrian municipality at the location of this zone. Defaults to your home zone.
{% endconfiguration_basic %}

To monitor multiple municipalities, add a separate config entry for each zone. The zone of an existing entry can be changed later via reconfiguration, as long as the new zone is located in the same municipality.

## Supported functionality

### Sensors

| Sensor | Description |
| ------ | ----------- |
| Warning level | The highest severity level of all currently active warnings: `No warning`, `Yellow`, `Orange`, or `Red`. |
| Active warnings | The number of currently active warnings. |

### Binary sensors

One binary sensor per warning type turns on while a warning of that type is active for the municipality:

- Storm warning
- Rain warning
- Snow warning
- Black ice warning
- Thunderstorm warning
- Heat warning
- Cold warning

Each active warning exposes its severity level, start and end time, warning text, impacts, and recommendations as attributes.

Additionally, an **Automatic thunderstorm warning** binary sensor is available. It reflects short-lived, automatically generated thunderstorm warnings and is disabled by default. You can enable it from the entity settings if needed.

## Data updates

The integration {% term polling polls %} the GeoSphere Austria warning service every 5 minutes. No authentication or API key is required.

## Automation examples

Entities are named after the monitored municipality, for example `binary_sensor.innsbruck_storm_warning`.

Get a notification when a storm warning becomes active:

```yaml
automation:
  - alias: "Notify on storm warning"
    triggers:
      - trigger: state
        entity_id: binary_sensor.innsbruck_storm_warning
        to: "on"
    actions:
      - action: notify.mobile_app_your_phone
        data:
          title: "Storm warning"
          message: >-
            Level {{ state_attr('binary_sensor.innsbruck_storm_warning', 'level') }}
            storm warning until
            {{ state_attr('binary_sensor.innsbruck_storm_warning', 'end') }}.
```

## Known limitations

- Warnings are only available for locations within Austria.
- Warnings are resolved per municipality. Locations within the same municipality receive identical warnings, even if conditions differ locally.
- The integration reports the warnings published by GeoSphere Austria as-is; it does not forecast or interpret weather data itself.

## Troubleshooting

### No Austrian municipality was found

The selected zone is located outside of Austria, or too far from any municipality boundary. Check the latitude and longitude of the zone and select a zone within Austria.

### Entities are unavailable

The GeoSphere Austria warning service could not be reached. Check your internet connection and whether [warnungen.zamg.at](https://warnungen.zamg.at/) is reachable. The integration recovers automatically once the service is available again.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
