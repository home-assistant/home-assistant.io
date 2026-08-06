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
- **Current warning level**
  - **Description**: The highest numeric severity level of all currently active
    warnings. This sensor provides warning details as attributes and is intended
    for compatibility with automations using the DWD Weather Warnings sensor
    format.
  - **Possible states**: `0` when no warning is active, otherwise the numeric
    warning level reported by GeoSphere Austria.
- **Advance warning level**
  - **Description**: The highest numeric severity level of all advance warnings.
    This sensor provides warning details as attributes and is intended for
    compatibility with automations using the DWD Weather Warnings sensor format.
  - **Possible states**: `0` when no advance warning is active, otherwise the
    numeric warning level reported by GeoSphere Austria.

### Warning attributes

The **Current warning level** and **Advance warning level** sensors expose the
following attributes:

- **Municipality**
  - **Attribute**: `municipality`
  - **Description**: Name of the monitored Austrian municipality.
- **Warning count**
  - **Attribute**: `warning_count`
  - **Description**: Number of warnings represented by the sensor.
- **Warning details**
  - **Attribute format**: `warning_<x>_<field>`
  - **Description**: Details of warning number `x`, starting with `1`.
    Warnings are ordered by severity, with the highest severity first.
  - **Fields**:
    - **Level** (`warning_<x>_level`): Numeric warning severity level.
    - **Color** (`warning_<x>_color`): Severity color name, such as `yellow`,
      `orange`, or `red`.
    - **Type** (`warning_<x>_type`): GeoSphere warning type identifier.
    - **Name** (`warning_<x>_name`): Lowercase GeoSphere warning type name.
    - **Start** (`warning_<x>_start`): Warning start time in ISO 8601 format.
    - **End** (`warning_<x>_end`): Warning end time in ISO 8601 format.
    - **Description** (`warning_<x>_description`): Warning text.
    - **Impacts** (`warning_<x>_impacts`): Expected impacts.
    - **Instruction** (`warning_<x>_instruction`): Recommended actions.
    - **Meteorological text** (`warning_<x>_meteo_text`): Additional
      meteorological information.
    - **Update reason** (`warning_<x>_update_reason`): Reason for the warning
      update, if provided.
    - **Warning ID** (`warning_<x>_warning_id`): GeoSphere warning identifier.
    - **Change ID** (`warning_<x>_change_id`): GeoSphere warning change
      identifier.
    - **Course ID** (`warning_<x>_course_id`): GeoSphere warning course
      identifier.

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
