---
layout: page
title: "Bayesian Binary Sensor"
description: "Instructions how to integrate threshold Bayesian sensors into Home Assistant."
date: 2017-08-27 20:05
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Binary Sensor
ha_iot_class: "Local Polling"
ha_release: 0.53
---


The `bayesian` binary sensor platform observes the state from multiple sensors
and uses Bayes' rule to estimate the probability that an event has occurred
given the state of the observed sensors. If the estimated posterior probability
is above the `probabiliy_threshold`, the value of the sensor is `on`.
Otherwise, the sensor is `off`.

This allows for the detection of complex events that may not be readily
observable, i.e. cooking, showering, in bed, start of morning routine, etc.  It
can also be used to gain greater confidence about events that _are_ directly
observable, but for which the sensors can be unreliable, i.e. presence.

To enable the Bayesian sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
binary_sensor:
  name: 'currently_cooking'
  platform: 'bayesian'
  prior: 0.1
  probability_threshold: 0.7
  observations:
    - entity_id: 'switch.kitchen_lights'
      prob_given_true: 0.6
      prob_given_false: 0.2
      platform: 'state'
      to_state: 'on'
    - entity_id: 'sensor.stove_temperature'
      prob_given_true: 0.9
      platform: 'numeric_state'
      above: 100
    - entity_id: 'sensor.kitchen_motion'
      prob_given_true: 0.5
      prob_given_false: 0.2
      platform: 'state'
      to_state: 'on'

binary_sensor:
  name: 'in_bed'
  platform: 'bayesian'
  prior: 0.25
  probability_threshold: 0.95
  observations:
    - entity_id: 'sensor.living_room_motion'
      prob_given_true: 0.4
      prob_given_false: 0.2
      platform: 'state'
      to_state: 'off'
    - entity_id: 'sensor.basement_motion'
      prob_given_true: 0.5
      prob_given_false: 0.4
      platform: 'state'
      to_state: 'off'
    - entity_id: 'sensor.bedroom_motion'
      prob_given_true: 0.5
      platform: 'state'
      to_state: 'on'
    - entity_id: 'sensor.sun'
      prob_given_true: 0.7
      platform: 'state'
      to_state: 'below_horizon'
```

Configuration variables:
- **prior** (*Required*): The prior probability of the event.  At any point in
time (ignoring all external influences) how likely is this event to occur?
- **observations** (*Required*): The observations which should influence the
likelihood that the given event has occurred. The only supported observation
platforms are `state` and `numeric_state`, which are modeled after their
corresponding triggers for automations.  In addition to the automation syntax,
the observations also require `prob_given_true` (the probability of the
observation occurring, given the event is true).  The optional
`prob_given_false` (the probability of the observation occurring, given the
event is false) can be set as well.  If `prob_given_false` is not set, it will
default to `1 - prob_given_true`.
- **probability_threshold** (*Optional*): The probability at which the sensor
should trigger to `on`.
- **name** (*Optional*): Name of the sensor to use in the frontend. Defaults to
`Bayesian Binary`.

