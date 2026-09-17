---
title: GeoSphere Austria Warnings
description: Instructions on how to integrate official GeoSphere Austria weather warnings within Home Assistant.
ha_category:
  - Sensor
  - Weather
ha_release: 2026.8
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
- Trigger automations when the warning level rises that close covers or disable irrigation, for example.
- Show the current warning level on your dashboard.

## Prerequisites

Warnings are provided for Austrian municipalities only. The integration determines the municipality from the location you select, so that location must be within Austria.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Location:
  description: The location to monitor. Warnings are provided for the Austrian municipality at this location. Defaults to your Home Assistant location.
{% endconfiguration_basic %}

To monitor multiple municipalities, add a separate entry for each location. Each entry covers exactly one municipality. If you select a location in a municipality you already monitor, the entry is not added again.

## Supported functionality

Each entry adds one service {% term device %} named after the monitored municipality, providing the following {% term entities %}. The device links to [warnungen.zamg.at](https://warnungen.zamg.at/), where you can look up the details of each warning.

### Sensors

- **Warning level**
  - **Description**: The highest severity level of all currently active warnings.
  - **Possible states**: No warning, Yellow, Orange, Red.
- **Active warnings**
  - **Description**: The number of currently active warnings.
  - **Unit**: warnings

## Automation examples

The real power of this integration is to allow the creation of automations based on official weather warnings.

{% include docs/paste_yaml_tip.md %}

### Automation: sending a weather warning notification

Get a notification when a weather warning becomes active.

Entities are named after the monitored municipality, for example `sensor.innsbruck_warning_level`.

- **Trigger**: State
  - **Entity**: Innsbruck warning level (`sensor.innsbruck_warning_level`)
  - **To**: Yellow
  - **To**: Orange
  - **To**: Red
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: `Warning level {{ states('sensor.innsbruck_warning_level') }} with {{ states('sensor.innsbruck_active_warnings') }} active warning(s) for Innsbruck.`
  - **Title**: `Weather warning`

{% details "YAML example for notifying on weather warning" %}

{% example %}
automation: |
  alias: "Notify on weather warning"
  triggers:
    - trigger: state
      entity_id: sensor.innsbruck_warning_level
      to:
        - yellow
        - orange
        - red
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Weather warning"
        message: >-
          Warning level {{ states('sensor.innsbruck_warning_level') }}
          with {{ states('sensor.innsbruck_active_warnings') }}
          active warning(s) for Innsbruck.
{% endexample %}

{% enddetails %}

## Data updates

The integration {% term polling polls %} the GeoSphere Austria warning service every 5 minutes. Each poll first checks whether GeoSphere Austria published new warning data, and only downloads the full data when something changed. No authentication or API key is required.

## Known limitations

- Warnings are only available for locations within Austria.
- Warnings are resolved per municipality. Locations within the same municipality receive identical warnings, even if conditions differ locally.
- The integration reports the warnings published by GeoSphere Austria as-is; it does not forecast or interpret weather data itself.

## Troubleshooting

### No Austrian municipality was found

The selected location is outside of Austria, or too far from any municipality boundary. Check the latitude and longitude, and select a location within Austria.

If this message appears for an entry that already worked before, the configured location can no longer be resolved to a municipality. Delete the entry and add it again with a location within Austria.

### Entities are unavailable

The GeoSphere Austria warning service could not be reached. Check your internet connection and whether [warnungen.zamg.at](https://warnungen.zamg.at/) is reachable. The integration recovers automatically once the service is available again.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
