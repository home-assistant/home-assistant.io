---
layout: page
title: "Sun"
description: "Instructions on how to track the sun within Home Assistant."
date: 2015-01-24 14:39
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Weather
---

The sun component will use your current location to track if the sun is above or
below the horizon. The sun can be used within automation as
[a trigger with an optional offset to simulate dawn/dusk](/getting-started/automation-trigger/#sun-trigger).

```yaml
# Example configuration.yaml entry
sun:
```

{% configuration %}
elevation:
  description: >
    "The (physical) elevation of your location, in meters above sea level.
    Defaults to the `elevation` in `configuration.yaml`,
    which is retrieved from Google Maps if not set."
  required: false
  type: int
{% endconfiguration %}

<p class='img'>
<img src='/images/screenshots/more-info-dialog-sun.png' />
</p>

### {% linkable_title Implementation Details %}

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

#### {% linkable_title Maintains entity `sun.sun` %}

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
