---
title: "Budapest Public Transport"
description: "Instructions on how to integrate data from the BKK Futar API into Home Assistant."
logo: bkk.png
ha_category:
  - Transport
ha_release: 0.105
---

The `BKK Futar` sensor displays the next departure times for a given Budapet public transportation stop.

To enable it, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry (using radius)
sensor:
  - platform: bkk
    stop: F04683
    grouped: true
```

{% configuration %}
stop:
  description: id of the monitored stop. For getting a stop id, see description below.
  required: true
  type: string
grouped:
  description: show routes grouped on UI
  required: false
  type: boolean
  default: false
only_departures:
  description: show only departures
  required: false
  type: boolean
  default: true
minutes_after:
  description: minutes from current time to query departures for
  required: false
  type: integer
  default: 120
{% endconfiguration %}

*How to find a stop id?*

- Go to https://futar.bkk.hu
- navigate on the map to the stop you want to monitor
- click stop node for details
- second row should start with an id similar to this: #F04683. 
- use this id without the leading '#' in the configuration file.
