---
title: Season
description: Instructions on how to add season sensors into Home Assistant.
ha_category:
  - Sensor
  - Utility
ha_iot_class: Local Polling
ha_release: 0.53
ha_quality_scale: internal
ha_domain: season
ha_config_flow: true
ha_platforms:
  - sensor
ha_codeowners:
  - '@frenck'
ha_integration_type: service
---

The **Season** {% term integration %} provides a sensor that reports the current season (spring, summer, autumn, or winter) based on your configured home location.

Use cases for this integration include:

- Adjusting your heating or cooling schedule based on the current season.
- Changing irrigation duration or frequency throughout the year.
- Toggling seasonal automations on and off when the season changes.
- Setting different default lighting scenes for summer evenings versus winter evenings.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Type of season definition:
  description: "Choose how seasons are determined."
{% endconfiguration_basic %}

You can choose between two types:

- **Astronomical**: Seasons are based on the actual solstice and equinox dates, calculated using the position of the Earth relative to the Sun. In the Northern Hemisphere, spring starts around March 20.
- **Meteorological**: Seasons are based on fixed calendar months. In the Northern Hemisphere, spring starts on March 1.

You can set up the integration twice to have both types available at the same time.

For more information on the difference between the two, see [Meteorological versus astronomical seasons](https://www.ncei.noaa.gov/news/meteorological-versus-astronomical-seasons) from NOAA.

## Supported functionality

### Sensors

- **Season**
  - **Description**: The current season.
  - **Device class**: Enum.
  - **Possible states**: `spring`, `summer`, `autumn`, `winter`.

The sensor automatically determines your hemisphere from the latitude configured under {% my general title="**Settings** > **System** > **General**" %}:

- **Northern Hemisphere** (latitude above 0): spring, summer, autumn, winter follow the standard Northern Hemisphere dates.
- **Southern Hemisphere** (latitude below 0): seasons are swapped. For example, when it is summer in the Northern Hemisphere, the sensor reports winter.
- **Equator** (latitude exactly 0): the sensor does not report a season because the equator does not experience traditional seasons.

## Examples

### Running an automation only in a specific season

You can use the season sensor as a condition to limit an automation to a specific season. For example, to only run a heating automation during winter:

```yaml
conditions:
  - condition: state
    entity_id: sensor.season
    state: winter
```

### Triggering an automation when the season changes

You can trigger an automation when the season changes, for example, to adjust your thermostat schedule or toggle seasonal automations on and off:

```yaml
triggers:
  - trigger: state
    entity_id: sensor.season
```

### Adjusting behavior based on the current season

You can use `choose` to vary what an automation does depending on the season. For example, to set different default temperatures:

```yaml
actions:
  - choose:
      - conditions:
          - condition: state
            entity_id: sensor.season
            state: winter
        sequence:
          - action: climate.set_temperature
            target:
              entity_id: climate.living_room
            data:
              temperature: 21
      - conditions:
          - condition: state
            entity_id: sensor.season
            state: summer
        sequence:
          - action: climate.set_temperature
            target:
              entity_id: climate.living_room
            data:
              temperature: 25
```

## Data updates

The sensor updates its value on a regular polling interval. Because seasons change infrequently, updates are only meaningful around the transition dates.

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
