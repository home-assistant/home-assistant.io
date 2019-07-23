---
title: "Moon Sensor"
description: "Instructions on how to integrate the moon sensor into Home Assistant."
logo: home-assistant.png
ha_category:
  - Environment
ha_iot_class: Local Polling
ha_release: 0.38
ha_qa_scale: internal
redirect_from:
 - /components/sensor.moon/
---

The `moon` sensor platform is tracking the moon phases.

## Configuration

To enable the moon sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: moon
```

This sensor will return one of the following values:
`new_moon`, `waxing_crescent`, `first_quarter`, `waxing_gibbous`, `full_moon`, `waning_gibbous`, `last_quarter` or `waning_crescent` .
