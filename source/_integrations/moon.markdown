---
title: Moon
description: Instructions on how to integrate the moon sensor into Home Assistant.
ha_category:
  - Environment
ha_iot_class: Calculated
ha_release: 0.38
ha_quality_scale: internal
ha_codeowners:
  - '@fabaff'
  - '@frenck'
ha_domain: moon
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: service
---

The **Moon** {% term integration %} adds a sensor to Home Assistant that tells you the current phase of the moon, from new moon to full moon and back again.

It works out the phase on your own system from the current date, so it needs no account, no API key, and no internet connection. Show the moon phase on a dashboard, or use it as a condition in your automations, for example to only run a garden light scene on the night of a full moon.

## Configuration

{% include integrations/config_flow.md %}

There is nothing to set up. The Moon integration has no options, and you can add it only once.

## Supported functionality

### Sensor

The integration provides a single **Phase** sensor. It reports the current moon phase as one of eight values:

- **New moon**: The moon sits between the Earth and the Sun and is not visible.
- **Waxing crescent**: A thin sliver of light that grows each night.
- **First quarter**: Half of the moon is lit, and the lit part is growing.
- **Waxing gibbous**: More than half is lit and still growing toward full.
- **Full moon**: The whole face of the moon is lit.
- **Waning gibbous**: More than half is lit, but the lit part is shrinking.
- **Last quarter**: Half of the moon is lit, and the lit part is shrinking.
- **Waning crescent**: A thin sliver of light that shrinks toward the next new moon.

The sensor shows a matching moon icon for each phase, so you can recognize the current phase at a glance.

<p class='img'>
<img src='/images/screenshots/more-info-dialog-moon.png' alt="The more info dialog showing the current moon phase.">
The more info dialog showing the current moon phase.
</p>

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}

## Data updates

The phase is calculated on your own system from the current date, so no data is fetched from the internet. Home Assistant recalculates it as the date advances, so the sensor changes at most once per day.

## Known limitations

- The phase is based on the date only. The sensor does not report the exact percentage of illumination, moonrise and moonset times, or how the moon looks from your specific location or hemisphere.
- The triggers and conditions are also based only on the phase. They do not react to moonrise, moonset, the moon's elevation, or the exact percentage of illumination.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
