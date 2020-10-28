---
title: Anomaly
description: Instructions on how to integrate Anomaly binary sensors into Home Assistant.
ha_category:
  - Utility
  - Binary Sensor
ha_release: 0.118
ha_iot_class: Local Push
ha_quality_scale: 
ha_domain: anomaly
---

The highly configurable `anomaly` platform allows you to create sensors which show anomalies in
numeric `state` or`state_attributes` from other entities. This sensor measures the average of
the most recent samples vs the longer trailing sample average. The sensor requires samples
in excess of the max samples or sample duration to establish a difference.
Thus it can take some time to show an accurate state. It can be useful
as part of automations, where you want to base an action on a difference from normal.
By default triggers on both positive and negative changes from normal, but that is configurable.

## Configuration

To enable Anomaly binary sensors in your installation,
add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: anomaly
    sensors:
      bathroom_humidity_changed:
        entity_id: sensor.bathroom_humidity
        min_change_amount: 10
```

{% configuration %}
sensors:
  description: List of your sensors.
  required: true
  type: map
  keys:
    entity_id:
      description: The entity that this sensor tracks.
      required: true
      type: string
    attribute:
      description: >
        The attribute of the entity that this sensor tracks.
        If no attribute is specified then the sensor will track the state.
      required: false
      type: string
    device_class:
      description: Sets the [class of the device](/integrations/binary_sensor/), changing the device state and icon that is displayed on the frontend.
      required: false
      type: string
    friendly_name:
      description: Name to use in the Frontend.
      required: false
      type: string
    invert:
      description: Invert the result. A `true` value would mean recent samples are within range of normal.
      required: false
      type: boolean
      default: false
    require_both:
      description: Require sample average to cross both the min_change_amount and min_change_percent
      required: false
      type: boolean
      default: false
    positive_only:
      description: Only trigger on changes that are higher than normal
      required: false
      type: boolean
      default: false
    negative_only:
      description: Only trigger on changes that are lower than normal
      required: false
      type: boolean
      default: false
    sample_duration:
      description: Specify the **number of seconds** to keep samples used for calulating the recent average for anomaly detection. If you specify a this, you likely want to increase max_samples.
      required: false
      type: integer
      default: 0
    max_samples:
      description: Limit the maximum number of samples used for calulating the recent average for anomaly detection. If you specify a sample_duration, you likely want to increase this.
      required: false
      type: integer
      default: 1
    trailing_sample_duration:
      description: Specify the **number of seconds** to keep samples used for the long term trailing average. If you specify a this, you likely want to increase max_trailing_samples.
      required: false
      type: integer
      default: 0
    max_trailing_samples:
      description:  Limit the maximum number of samples used for the long term trailing average. If you specify a trailing_sample_duration, you likely want to increase this.
      required: false
      type: integer
      default: 2
    min_change_amount:
      description:  The numerical change that must be present for the sensor to activate
      required: false
      type: float
      default: 0.0
    min_change_percent:
      description: The percentage change that must be present for the sensor to activate
      required: false
      type: float
      default: 0.0
{% endconfiguration %}

## Using Multiple Samples

If the optional `sample_duration`, `max_samples`, `trailing_sample_duration`, and `max_trailing_samples` parameters are specified
then more samples can be stored and used to detect longer-term trends.

Each time the state changes, a new sample is stored along with the sample time. Samples older than `sample_duration` and `trailing_sample_duration` seconds will be discarded. The `max_samples` and `trailing_sample_duration` parameter must be large enough to store sensor updates over the requested duration. If you want to get detect changes over the last 10 minutes over the last two hours average and your sensor updates every 120s then `max_samples` must be at least 5 and `max_trailing_samples` must be at least 60, i.e., 600/120 = 5 and 7200/120 = 60 respectively.

Calculation:
1. The average of the trailing window and the sample window are calculated.
2. Then the change amount is calculated as the sample average minus the trailing average.
3. The change percent is then calculated as the (change amount divided by the trailing average) * 100

The following attributes are available in the States page:
* require_both
* positive_only
* negative_only
* min_change_amount
* min_change_percent
* sample_duration
* max_samples
* trailing_sample_duration
* sample_count
* sample_average
* trailing_sample_average
* change_amount
* change_percent

## Examples

This example creates a sensor to indicate whether someone is taking a shower
based on an increase in humidity of at least 5 degrees in the last 10 minutes,
with the average humidity being calculated over the last 4 hours:

```yaml
binary_sensor:
  - platform: anomaly
    sensors:
      taking_shower:
        entity_id: sensor.bathroom_humidity
        positive_only: True
        sample_duration: 600
        max_samples: 10
        trailing_sample_duration: 1440
        max_trailing_samples: 100
        min_change_amount: 5
        device_class: moisture

```
