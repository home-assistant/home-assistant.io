---
title: Bayesian
description: Instructions on how to integrate threshold Bayesian sensors into Home Assistant.
ha_category:
  - Utility
  - Binary Sensor
ha_iot_class: Local Polling
ha_release: 0.53
ha_quality_scale: internal
ha_domain: bayesian
ha_platforms:
  - binary_sensor
---

The `bayesian` binary sensor platform observes the state from multiple sensors and uses [Bayes' rule](https://en.wikipedia.org/wiki/Bayes%27_theorem) to estimate the probability that an event has occurred given the state of the observed sensors. If the estimated posterior probability is above the `probability_threshold`, the sensor is `on` otherwise it is `off`.

This allows for the detection of complex events that may not be readily observable, e.g., cooking, showering, in bed, the start of a morning routine, etc. It can also be used to gain greater confidence about events that _are_ directly observable, but for which the sensors can be unreliable, e.g., presence.

## Configuration

To enable the Bayesian sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: bayesian
    prior: 0.1
    observations:
      - entity_id: "switch.kitchen_lights"
        prob_given_true: 0.6
        prob_given_false: 0.2
        platform: "state"
        to_state: "on"
```

{% configuration %}
prior:
  description: >
    The prior probability of the event. At any point in time
    (ignoring all external influences) how likely is this event to occur?
  required: true
  type: float
probability_threshold:
  description: The probability at which the sensor should trigger to `on`.
  required: false
  type: float
  default: 0.5
name:
  description: Name of the sensor to use in the frontend.
  required: false
  type: string
  default: Bayesian Binary Sensor
observations:
  description: The observations which should influence the likelihood that the given event has occurred.
  required: true
  type: list
  keys:
    platform:
      description: >
        The supported platforms are `state`, `numeric_state`, and `template`.
        They are modeled after their corresponding triggers for automations,
        requiring `to_state` (for `state`), `below` and/or `above` (for `numeric_state`) and `value_template` (for `template`).
      required: true
      type: string
    entity_id:
      description: Name of the entity to monitor. Required for `state` and `numeric_state`.
      required: false
      type: string
    value_template:
      description: Defines the template to be used. Required for `template`.
      required: false
      type: template
    prob_given_true:
      description: The probability of the observation occurring, given the event is `true`.
      required: true
      type: float
    prob_given_false:
      description: The probability of the observation occurring, given the event is `false` can be set as well.
      required: false
      type: float
      default: "`1 - prob_given_true` if `prob_given_false` is not set"
    to_state:
      description: The target state. Required (for `state`).
      required: false
      type: string
{% endconfiguration %}

## Full examples

The following is an example for the `state` observation platform.

```yaml
# Example configuration.yaml entry
binary_sensor:
  name: "in_bed"
  platform: "bayesian"
  prior: 0.25
  probability_threshold: 0.95
  observations:
    - platform: "state"
      entity_id: "sensor.living_room_motion"
      prob_given_true: 0.4
      prob_given_false: 0.2
      to_state: "off"
    - platform: "state"
      entity_id: "sensor.basement_motion"
      prob_given_true: 0.5
      prob_given_false: 0.4
      to_state: "off"
    - platform: "state"
      entity_id: "sensor.bedroom_motion"
      prob_given_true: 0.5
      to_state: "on"
    - platform: "state"
      entity_id: "sun.sun"
      prob_given_true: 0.7
      to_state: "below_horizon"
```

Next up an example which targets the `numeric_state` observation platform,
as seen in the configuration it requires `below` and/or `above` instead of `to_state`.

```yaml
# Example configuration.yaml entry
binary_sensor:
  name: "Heat On"
  platform: "bayesian"
  prior: 0.2
  probability_threshold: 0.9
  observations:
    - platform: "numeric_state"
      entity_id: "sensor.outside_air_temperature_fahrenheit"
      prob_given_true: 0.95
      below: 50
```

Finally, here's an example for `template` observation platform, as seen in the configuration it requires `value_template`.

{% raw %}

```yaml
# Example configuration.yaml entry
binary_sensor:
  name: "Paulus Home"
  platform: "bayesian"
  prior: 0.5
  probability_threshold: 0.9
  observations:
    - platform: template
      value_template: >
        {{is_state('device_tracker.paulus','not_home') and ((as_timestamp(now()) - as_timestamp(states.device_tracker.paulus.last_changed)) > 300)}}
      prob_given_true: 0.95
```

{% endraw %}
