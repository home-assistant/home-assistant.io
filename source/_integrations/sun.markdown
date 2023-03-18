---
title: Sun
description: Instructions on how to track the sun within Home Assistant.
ha_category:
  - Environment
ha_release: pre 0.7
ha_quality_scale: internal
ha_codeowners:
  - '@Swamp-Ig'
ha_iot_class: Calculated
ha_domain: sun
ha_config_flow: true
ha_integration_type: integration
---

The sun integration will use the location as
{% my general title="configured in your Home Assistant configuration" %} to
track if the sun is above or below the horizon. The sun can be used within
automations as
[a trigger with an optional offset to simulate dawn/dusk][sun_trigger] or as
[a condition with an optional offset to test if the sun has already set or risen][sun_condition].

[sun_trigger]: /docs/automation/trigger/#sun-trigger
[sun_condition]: /docs/scripts/conditions/#sun-condition

## Configured by default

This integration is by default configured and installed, and you don't need
to configure it yourself, unless you've disabled or removed the
[`default_config:`](/integrations/default_config/) line from your
YAML configuration.

If that is the case, you can configure it as described in the next paragraphs.

{% include integrations/config_flow.md %}

## YAML Configuration

Alternatlively, this integration can be configured and set up manually via YAML
instead. To enable the sun integration in your installation, add the
following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sun:
```

<p class='img'>
<img src='/images/screenshots/more-info-dialog-sun.png' />
</p>

## Implementation Details

The sun's event listener will call the service when the sun rises or sets with
an offset.

The sun event need to have the type 'sun', which service to call,
which event (sunset or sunrise) and the offset.

```json
{
    "type": "sun",
    "service": "switch.turn_on",
    "event": "sunset",
    "offset": "-01:00:00"
}
```

### Maintains entity `sun.sun`

| Possible state | Description |
| --------- | ----------- |
| `above_horizon` | When the sun is above the horizon.
| `below_horizon` | When the sun is below the horizon.

| State Attributes | Description |
| --------- | ----------- |
| `next_rising` | Date and time of the next sun rising (in UTC).
| `next_setting` | Date and time of the next sun setting (in UTC).
| `next_dawn` | Date and time of the next dawn (in UTC).
| `next_dusk` | Date and time of the next dusk (in UTC).
| `next_noon` | Date and time of the next solar noon (in UTC).
| `next_midnight` | Date and time of the next solar midnight (in UTC).
| `elevation` |  Solar elevation. This is the angle between the sun and the horizon. Negative values mean the sun is below the horizon.
| `azimuth` | Solar azimuth. The angle is shown clockwise from north.
| `rising` | True if the Sun is currently rising, after solar midnight and before solar noon.
