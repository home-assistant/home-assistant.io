---
title: Moon
description: Instructions on how to use the Moon integration in Home Assistant.
ha_category:
    - Environment
ha_iot_class: Calculated
ha_release: 0.38
ha_quality_scale: internal
ha_codeowners:
    - "@fabaff"
    - "@frenck"
ha_domain: moon
ha_platforms:
    - binary_sensor
    - sensor
ha_config_flow: true
ha_integration_type: service
---

The **Moon** {% term integration %} tracks the moon based on your configured home location.

{% include integrations/config_flow.md %}

<p class='img'>
<img src='/images/screenshots/more-info-dialog-moon.png' />
</p>

## Sensors

The Moon integration provides the following sensors:

- **Phase**
- **Illumination**
- **Next rising**
- **Next setting**
- **Next transit**
- **Next new moon**
- **Next first quarter**
- **Next full moon**
- **Next last quarter**

The **Phase** sensor returns one of the following values:

- `new_moon`
- `waxing_crescent`
- `first_quarter`
- `waxing_gibbous`
- `full_moon`
- `waning_gibbous`
- `last_quarter`
- `waning_crescent`

The **Illumination** sensor shows the illuminated percentage of the moon that is visible from Earth.

The timestamp sensors provide the date and time for the moon's next rise, set, transit, and next major phases.

The following diagnostic sensors are also available, but they are disabled by default. You can enable them if you want more detailed location-based lunar data:

- **Elevation**
- **Azimuth**

## Binary sensors

The Moon integration provides one binary sensor:

- **Above horizon**: `on` when the moon is above the horizon, `off` when it is below the horizon.
