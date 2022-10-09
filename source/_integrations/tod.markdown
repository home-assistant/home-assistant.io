---
title: Times of the Day
description: Instructions on how to integrate Times of the Day binary sensors within Home Assistant.
ha_category:
  - Binary Sensor
  - Helper
ha_release: 0.89
ha_iot_class: Local Push
ha_quality_scale: internal
ha_config_flow: true
ha_domain: tod
ha_platforms:
  - binary_sensor
ha_integration_type: helper
---

The Times of the Day integration provides a binary sensor that gets its values by checking if the current time is within defined time ranges.

{% include integrations/config_flow.md %}
{% configuration_basic %}
Name:
  description: The name the binary sensor should have. This can be changed later.
On time:
  description: The time when the sensor should turn on.
Off time:
  description: The time when the sensor should turn off.
{% endconfiguration_basic %}

## YAML Configuration

Alternatlively, this integration can be configured and set up manually via YAML instead. This has some additional functionality over the UI version.

The time ranges can be provided as absolute local time or using the `sunrise` or `sunset` keyword calculated based on the sun position for location. The location must be provided in the configuration.

In addition for sun position based ranges, the negative or positive offset can be configured.

To enable the Times of Day binary sensor in your installation, add the
following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: tod
    name: Early Morning
    after: sunrise
    after_offset: "-02:00"
    before: "07:00"

  - platform: tod
    name: Late Morning
    after: "10:00"
    before: "12:00"
```

{% configuration %}
name:
  description: Name of the sensor.
  required: true
  type: string
before:
  description: The absolute local time value or sun event for ending of the time range.
  required: true
  type: [string, time]
before_offset:
  description: The time offset of the ending time range.
  required: false
  type: time
after:
  description: The absolute local time value or sun event for beginning of the time range.
  required: true
  type: [string, time]
after_offset:
  description: The time offset of the beginning time range.
  type: time
  required: false
{% endconfiguration %}

## Considerations

The primary purpose of this sensor is to use a simple time range definition instead of creating a complex template with references to `sun.sun` integration attributes.

The sensor state is ON when this condition `after` + `after_offset` <= `current time` < `before` + `before_offset`.

If `after` time is later than `before` then the next day is considered, i.e.:

```yaml
binary_sensor:
  - platform: tod
    name: Night
    after: sunset
    before: sunrise
```

In the above example, the next day `sunrise` is calculated as a time range end.
