---
title: Times of the Day
description: Instructions on how to integrate Times of the Day binary sensors within Home Assistant.
ha_category:
  - Binary sensor
  - Helper
ha_release: 0.89
ha_iot_class: Calculated
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

## YAML configuration

Alternatlively, this integration can be configured and set up manually via YAML instead. This has some additional functionality over the UI version.

The time ranges can be provided as absolute local time or using the `sunrise` or `sunset` keyword calculated based on the sun position for location. The location must be provided in the configuration.

In addition for sun position based ranges, the negative or positive offset can be configured.

To enable the Times of Day binary sensor in your installation, add the
following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: tod
    name: Early Morning
    after: sunrise
    after_offset: "-02:00"
    before: "07:00"
    unique_id: early_morning_sensor

  - platform: tod
    name: Late Morning
    after: "10:00"
    before: "12:00"
    unique_id: late_morning_sensor
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
unique_id:
  description: An ID that uniquely identifies this sensor. This allows changing the name, icon, and entity_id from the web interface.
  type: string
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

## Daylight Saving Time Handling

The ToD sensor handles the following cases where the sensor interval:
- does not exist at all
- stops at a non-existent time
- starts at a non-existent time.

To help understand all 3 cases, actual examples are provided below.

### Case 1: Sensor Interval Does Not Exist

Let's make the following assumptions:
- Daylight Saving starts at 2am
- On the DST day, the ToD sensor interval is from non-existent 2:30am to non-existent 2:40am.

In this case, the ToD sensor will not trigger since the 2:30am-2:40am interval does not exist on the day when time jumps from 2am to 3am. However, on the following day, the sensor resumed operating normally.

### Case 2: Sensor End Time Does Not Exist

- Daylight Saving starts at 2am
- On the DST day, the ToD sensor interval is from 1:50am to non-existent 2:10am.

In this case, the ToD sensor will last 10 minutes starting at 1:50am and stop at 3am (the 2am-3am time is jumped over and does not exist).

### Case 3: Sensor Start Time Does Not Exist

- Daylight Saving starts at 2am
- On the DST day, the ToD sensor interval is from non-existent 2:50am to 3:10am.

In this case, the ToD sensor will last 10 minutes, starting at 3:00am and stopping at 3:10am (the 2am-3am time is jumped over and does not exist).
