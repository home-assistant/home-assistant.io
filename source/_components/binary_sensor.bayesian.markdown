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


The `bayesian` binary sensor platform observes the state from multiple sensors and uses [Bayes' rule](https://en.wikipedia.org/wiki/Bayes%27_theorem) to estimate the probability that an event has occurred given the state of the observed sensors. If the estimated posterior probability is above the `probability_threshold`, the sensor is `on` otherwise it is `off`.

This allows for the detection of complex events that may not be readily observable, e.g., cooking, showering, in bed, the start of a morning routine, etc. It can also be used to gain greater confidence about events that _are_ directly observable, but for which the sensors can be unreliable, e.g., presence.

To enable the Bayesian sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: bayesian
    prior: 0.1
    observations:
      - entity_id: 'switch.kitchen_lights'
        prob_given_true: 0.6
        prob_given_false: 0.2
        platform: 'state'
        to_state: 'on'
```

Configuration variables:

- **prior** (*Required*): The prior probability of the event. At any point in time (ignoring all external influences) how likely is this event to occur?
- **probability_threshold** (*Optional*): The probability at which the sensor should trigger to `on`.
- **name** (*Optional*): Name of the sensor to use in the frontend. Defaults to `Bayesian Binary sensor`.
- **observations** array (*Required*): The observations which should influence the likelihood that the given event has occurred.
  - **entity_id** (*Required*): Name of the entity to monitor.
  - **prob_given_true** (*Required*): The probability of the observation occurring, given the event is `true`.
  - **prob_given_false** (*Optional*): The probability of the observation occurring, given the event is `false` can be set as well.  If `prob_given_false` is not set, it will default to `1 - prob_given_true`.
  - **platform** (*Required*): The only supported observation platforms are `state` and `numeric_state`, which are modeled after their corresponding triggers for automations, requiring `below` and/or `above` instead of `to_state`.
  - **to_state** (*Required*): The target state.

## {% linkable_title Full examples %}

```yaml
# Example configuration.yaml entry
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
    - entity_id: 'sun.sun'
      prob_given_true: 0.7
      platform: 'state'
      to_state: 'below_horizon'
```


```yaml
# Example configuration.yaml entry
binary_sensor:
  name: 'Heat On'
  platform: 'bayesian'
  prior: 0.2
  probability_threshold: 0.9
  observations:
    - entity_id: 'sensor.outside_air_temperature_fahrenheit'
      prob_given_true: 0.95
      platform: 'numeric_state'
      below: 50
```
