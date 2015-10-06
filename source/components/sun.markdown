---
layout: page
title: "Tracking the Sun"
description: "Instructions how to track the sun within Home Assistant."
date: 2015-01-24 14:39
sidebar: false
comments: false
sharing: true
footer: true
---

The `sun` component will use your current location to track if the sun is above or below the horizon.
The sun can be used within automation as [a trigger with an optional offset to simulate dawn/dusk][automation-trigger].

[automation-trigger]: /components/automation.html#sun-trigger

```yaml
# Example configuration.yaml entry
homeassistant:
  latitude: 32.87336
  longitude: -117.22743

sun:
  # Optional. If ommitted will be retrieved from Google Maps
  elevation: 123
```

<p class='img'>
<img src='/images/screenshots/more-info-dialog-sun.png' />
</p>

### Implementation Details

#### Maintains entity `sun.sun`.

| Possible state | Description |
| --------- | ----------- |
| `above_horizon` | When the sun is above the horizon.
| `below_horizon` | When the sun is below the horizon.



| State Attributes | Description |
| --------- | ----------- |
| `next_rising` | Date and time of the next sun rising
| `next_setting` | Date and time of the next sun setting
