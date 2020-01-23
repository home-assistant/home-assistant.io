---
title: "Budapest Public Transport"
description: "Instructions on how to integrate data from the BKK Futar API into Home Assistant."
logo: bkk.png
ha_category:
  - Transport
ha_release: 0.105
---

The `BKK Futar` sensor displays the next departure times for a given Budapet public transportation stop.

## Configuration

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
  description: ID of the monitored stop. For getting a stop id, see description below.
  required: true
  type: string
grouped:
  description: Show routes grouped on UI.
  required: false
  type: boolean
  default: false
only_departures:
  description: Show only departures.
  required: false
  type: boolean
  default: true
minutes_after:
  description: Minutes from current time to query departures for.
  required: false
  type: integer
  default: 120
{% endconfiguration %}

### How to find a stop id?

- Go to <https://futar.bkk.hu>.
- Navigate on the map to the stop you want to monitor.
- Click stop node for details.
- Decond row should start with an id similar to this: #F04683. 
- Use this id without the leading '#' in the configuration file.
