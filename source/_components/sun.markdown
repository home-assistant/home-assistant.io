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

The sun component will use your current location to track if the sun is above or below the horizon. The sun can be used within automation as [a trigger with an optional offset to simulate dawn/dusk][automation-trigger].

[automation-trigger]: /getting-started/automation-trigger/#sun-trigger

```yaml
# Example configuration.yaml entry
sun:
```

```yaml
# Another example configuration.yaml entry
# Only maintain a few attributes (along with basic state), and
# update elevation every ten minutes instead of every minute.
sun:
  monitored_conditions:
    - elevation
    - sunrise
    - sunset
  scan_interval:
    minutes: 10
```

Configuration variables:

- **elevation** (*Optional*): The (physical) elevation of your location, in meters above sea level. Defaults to the `elevation` in `configuration.yaml`, which is retrieved from Google Maps if not set.

- **monitored_conditions** (*Optional*): A list of attributes to include. Options are: `azimuth`, `elevation`, `next_dawn`, `next_dusk`, `next_midnight`, `next_noon`, `daylight`, `next_daylight`, `prev_daylight`, `sunrise` and `sunset`. The default is to include `azimuth`, `elevation`, `next_dawn`, `next_dusk`, `next_midnight` and `next_noon`. __Note:__ `next_rising` and `next_setting` will always be included as well.
- **scan_interval** (*Optional*): If `azimuth` or `elevation` are included, then this controls how often they are updated. The default is to update them once a minute on the half minute.

<p class='img'>
<img src='/images/screenshots/more-info-dialog-sun.png' />
</p>

### {% linkable_title Implementation Details %}

The sun's event listener will call the service when the sun rises or sets with an offset.

The sun event need to have the type 'sun', which service to call, which event (sunset or sunrise) and the offset.

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
| `daylight` | The amount of time from today's sunrise to today's sunset (in seconds).
| `next_daylight` | Same as daylight, except for tomorrow.
| `prev_daylight` | Same as daylight, except for yesterday.
| `sunrise` | Date and time of today's sun rising (in UTC).
| `sunset` | Date and time of today's sun setting (in UTC).

#### {% linkable_title Caveats %}

The frontend component uses `elevation`. (See picture above.) If you choose to exclude it from `monitored_conditions` the corresponding field will be blank.
