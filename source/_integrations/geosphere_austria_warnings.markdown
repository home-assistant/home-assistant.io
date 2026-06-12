---
title: GeoSphere Austria Warnings
description: Instructions on how to integrate official GeoSphere Austria weather warnings within Home Assistant.
ha_category:
  - Sensor
  - Weather
ha_release: 2026.7
ha_iot_class: Cloud Polling
ha_domain: geosphere_austria_warnings
ha_config_flow: true
ha_platforms:
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
- Trigger automations when the warning level rises, for example closing covers or disabling irrigation.
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

## Data updates

The integration {% term polling polls %} the GeoSphere Austria warning service every 5 minutes. No authentication or API key is required.

## Automation examples

Entities are named after the monitored municipality, for example `sensor.innsbruck_warning_level`.

Get a notification when a weather warning becomes active:

```yaml
automation:
  - alias: "Notify on weather warning"
    triggers:
      - trigger: state
        entity_id: sensor.innsbruck_warning_level
        to:
          - yellow
          - orange
          - red
    actions:
      - action: notify.mobile_app_your_phone
        data:
          title: "Weather warning"
          message: >-
            Warning level {{ states('sensor.innsbruck_warning_level') }}
            with {{ states('sensor.innsbruck_active_warnings') }}
            active warning(s) for Innsbruck.
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
