---
title: Bayesian
description: Instructions on how to integrate threshold Bayesian sensors into Home Assistant.
ha_category:
  - Binary sensor
  - Utility
ha_iot_class: Calculated
ha_release: 0.53
ha_quality_scale: internal
ha_domain: bayesian
ha_platforms:
  - binary_sensor
ha_integration_type: service
ha_codeowners:
  - '@HarvsG'
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_config_flow: true
---

A `Bayesian` helper is a virtual binary sensor that determines its state based on the combination of multiple other sensors using probabilistic methods.

This approach enables the detection of complex events that are not directly or easily measurable, such as cooking, showering, being in bed, or starting a morning routine. Additionally, it can improve confidence and reliability in measurable events where sensors may be unreliable, such as some presence detectors.

Bayesian works by applying [Bayes' rule](https://en.wikipedia.org/wiki/Bayes%27_theorem). It estimates the likelihood that a specific event is occurring based on the combination of the states of 'observed' sensors and a baseline, (`prior`) probability. When the calculated probability - known as a 'posterior' - exceeds the defined `probability_threshold`, the `bayesian` sensor will turn `on`; otherwise, it will be `off`.

Both UI and YAML setups are supported, importantly YAML uses probabilities of `0` to `1` whereas the UI uses percentages, `0` to `100`.

## Theory

A fundamental concept in Bayes' Rule is the distinction between the probability of an *event given an observation* and the probability of an *observation given an event*. These two probabilities are not interchangeable and must be considered separately. While they may be similar in some cases — for example, when motion sensors are accurate, the probability that someone is in the room *given* that motion is detected is often close to the probability that motion is detected *given* someone is in the room.

Now consider the above, but in a home that has cats. The probability that the room is human-occupied *given* that motion detected may be quite low (e.g. 20%, p=0.2) if the room is popular with the cats. However, the probability that motion is detected *given* that it is occupied by a human is high (e.g 95%, p = 0.95) if our motion sensor is accurate. Said succinctly, not all motion is human, but all humans move.

When configuring these conditional probabilities, define the probability of the sensor observation (e.g motion detected) *given* the thing you are trying to estimate (e.g human-occupancy of the room).

{% include integrations/config_flow.md %}

Once you have created a Bayesian helper, you can add and edit 'observations' here:
{% my integration badge domain="bayesian" %}

To configure a YAML Bayesian sensor, add an entry using the following structure to your {% term "`configuration.yaml`" %} file.
 {% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: bayesian
    name: "Kitchen Occupied by Humans"
    prior: 0.3 # The kitchen is occupied by humans about 30% of the time
    probability_threshold: 0.5 # I care about false positives and false negatives equally
    observations:
      - entity_id: "binary_sensor.kitchen_motion"
        prob_given_true: 0.95 # When humans are in the kitchen, the motion sensor detects them 95% of the time
        prob_given_false: 0.33 # When no humans are in the kitchen, the cats trigger the motion sensor 33% of the time
        platform: "state"
        to_state: "on"
```

{% configuration %}
prior:
  description: >
     The baseline probability of the event (0 to 1). At any given time
     (if you knew nothing of the 'observations') how likely is this event to be occurring?
  required: true
  type: float
probability_threshold:
  description: >
    The posterior probability at which the sensor should trigger to `on`.
    use higher values to reduce false positives (and increase false negatives)
    Note: If the threshold is higher than the `prior`, then the default state will be `off`
  required: false
  type: float
  default: 0.5
name:
  description: Name of the sensor to use in the frontend.
  required: false
  type: string
  default: Bayesian Binary Sensor
unique_id:
  description: An ID that uniquely identifies this Bayesian entity. If two entities have the same unique ID, Home Assistant will raise an exception.
  required: false
  type: string
device_class:
  description: Sets the [class of the device](/integrations/binary_sensor/), changing the device state and icon that is displayed on the frontend.
  required: false
  type: string
observations:
  description: The observations which should influence the probability that the given event is occurring.
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
    to_state:
      description: The entity state that defines the observation. Required (for `state`).
      required: false
      type: string
    value_template:
      description: Defines the template to be used, should evaluate to `True` or `False`. Required for `template`.
      required: false
      type: template
    prob_given_true:
      description: >
        Assuming the Bayesian binary_sensor is `on`, the probability that the entity state is occurring.
      required: true
      type: float
    prob_given_false:
      description: Assuming the Bayesian binary_sensor is `off`, the probability that the entity state is occurring.
      required: true
      type: float
{% endconfiguration %}

## Estimating probabilities

1. Avoid `0` and `1`; these will mess with the odds and are rarely true—sensors fail.
2. When using `0.99` and `0.001`, the number of `9`s and `0`s matters.
3. Most probabilities will be time-based - the fraction of time something is true is also the probability it will be true.
4. Use your Home Assistant history to help estimate the probabilities.
   - **Probability when Bayesian sensor `on`** (`prob_given_true:`) - Select the sensor in question over a time range when you think the `bayesian` sensor should have been `on`. `prob_given_true:` is the fraction of the time the sensor was in `to_state:`.
   - **Probability when Bayesian sensor `off`** (`prob_given_false:`) - Select the sensor in question over a time range when you think the `bayesian` sensor should have been `off`. `prob_given_false:` is the fraction of the time the sensor was in `to_state:`.
5. Don't work backwards by tweaking `prob_given_true:` and `prob_given_false:` to force desired outcomes; use guideline #4 to estimate probabilities as accurately as possible. If the behavior still isn’t as expected, consider adding more sensors or see #6.
6. If your Bayesian sensor ends up triggering `on` too easily, re-check that the probabilities make sense, then consider increasing `probability_threshold:` and vice versa.

## Full examples

These are a number of worked examples which you may find helpful for each of the state types.

### State

The following is an example for the `state` observation platform.

```yaml
# Example configuration.yaml entry
binary_sensor:
  platform: "bayesian"
  name: "in_bed"
  unique_id: "172b6ef1-e37e-4f04-8d64-891e84c02b43" # generated on https://www.uuidgenerator.net/
  prior: 0.25 # I spend 6 hours a day in bed 6hr/24hr is 0.25 
  probability_threshold: 0.8 # I am going to be using this sensor to turn out the lights so I only want to to activate when I am sure
  observations:
    - platform: "state"
      entity_id: "sensor.living_room_motion"
      prob_given_true: 0.05 # If I am in bed then I shouldn't be in the living room, very occasionally I have guests, however
      prob_given_false: 0.2 # My sensor history shows If I am not in bed I spend about a fifth of my time in the living room
      to_state: "on"
    - platform: "state"
      entity_id: "sensor.basement_motion"
      prob_given_true: 0.5 # My sensor history shows, when I am in bed, my basement motion sensor is active about half the time because of my cat
      prob_given_false: 0.3 # As above but my cat tends to spend more time upstairs or outside when I am awake and I rarely use the basement
      to_state: "on"
    - platform: "state"
      entity_id: "sensor.bedroom_motion"
      prob_given_true: 0.5 # My sensor history shows when I am in bed the sensor picks me up about half the time
      prob_given_false: 0.1 # My sensor history shows I spend about 10% of my waking hours in my bedroom
      to_state: "on"
    - platform: "state"
      entity_id: "sun.sun"
      prob_given_true: 0.7 # If I am in bed then there is a good chance the sun will be down, but in the summer mornings I may still be in bed
      prob_given_false: 0.45 # If I am am awake then there is a reasonable chance the sun will be below the horizon - especially in winter
      to_state: "below_horizon"
    - platform: "state"
      entity_id: "sensor.android_charger_type"
      prob_given_true: 0.95 # When I am in bed, I nearly always plug my phone in to charge
      prob_given_false: 0.1 # When I am awake, I occasionally AC charge my phone
      to_state: "ac"
```

### Numeric State

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
      prob_given_false: 0.05
      below: 50
```

### Template

Here's an example for `template` observation platform, as seen in the configuration it requires `value_template`. This template will evaluate to true if the device tracker `device_tracker.paulus` shows `not_home` and it last changed its status more than 5 minutes ago.

{% raw %}

```yaml
# Example configuration.yaml entry
binary_sensor:
  name: "Paulus Home"
  platform: "bayesian"
  device_class: "presence"
  prior: 0.5
  probability_threshold: 0.9
  observations:
    - platform: template
      value_template: >
        {{is_state('device_tracker.paulus','not_home') and ((as_timestamp(now()) - as_timestamp(states.device_tracker.paulus.last_changed)) > 300)}}
      prob_given_true: 0.05
      prob_given_false: 0.99
```

{% endraw %}

### Multiple state and numeric entries per entity

Lastly, an example illustrates how to configure Bayesian when there are more than two states of interest and several possible numeric ranges. When an entity can hold more than 2 values of interest (numeric ranges or states), then you may wish to specify probabilities for each possible value. Once you have specified more than one, Bayesian cannot infer anything about states or numeric values that are unspecified, like it usually does, so it is recommended that all possible values are included. As above, the `prob_given_true`s of all the possible states should sum to 1, as should the `prob_given_false`s. If a value that has not been specified is observed, then the observation will be ignored as it would be if the entity were `UNKNOWN` or `UNAVAILABLE`.

When multiple ranges are defined for the same entity, `below` is inclusive (≤) for any range that specifies it. For a single range, `above` and `below` remain exclusive.

This is an example sensor that can detect if the bins have been left on the side of the road and need to be brought closer to the house. It combines a theoretical presence sensor that gives a numeric signal strength and an API sensor from local government that can have 3 possible states: `due` when collection is due in the next 24 hours, `collected` when collection has happened in the last 24 hours, and `not_due` at other times.

```yaml
# Example configuration.yaml entry
binary_sensor:
  name: "Bins need bringing in"
  platform: "bayesian"
  prior: 0.14 # bins are left out for usually about one day a week
  probability_threshold: 0.5
  observations:
    - platform: "numeric_state"
      entity_id: "sensor.signal_strength"
      prob_given_true: 0.01 # if the bins are out and need bringing in there is only a 1% chance we will get a strong signal of above 10
      prob_given_false: 0.3 # if the bins are not out, we still tend not to get a signal this strong
      above: 10
    - platform: "numeric_state"
      entity_id: "sensor.signal_strength"
      prob_given_true: 0.02
      prob_given_false: 0.5 #if the bins are not out, we often get a signal this strong
      above: 5
      below: 10
    - platform: "numeric_state"
      entity_id: "sensor.signal_strength"
      prob_given_true: 0.07
      prob_given_false: 0.1
      above: 0
      below: 5
    - platform: "numeric_state"
      entity_id: "sensor.signal_strength"
      prob_given_true: 0.3
      prob_given_false: 0.07
      above: -10
      below: 0
    - platform: "numeric_state"
      entity_id: "sensor.signal_strength"
      prob_given_true: 0.6 #if the bins are out, we often get a signal this weak or even weaker
      prob_given_false: 0.03
      below: -10
    # then lets say we want to combine this with an imaginary sensor.bin_collection which reads a local government API that can have one of three values (collected, due, not due)
    - platform: "state"
      entity_id: "sensor.bin_collection"
      prob_given_true: 0.8 # If the bins need bringing in, usually it's because they've just been collected
      prob_given_false: 0.05 # 
      to_state: "collected"
    - platform: "state"
      entity_id: "sensor.bin_collection"
      prob_given_true: 0.05 # If the bins need bringing in, then the sensor.bin_collection shouldn't be 'due'
      prob_given_false: 0.11 # The sensor will be 'due' for about 1 day a week (the 24 hours before collection)
      to_state: "due"
    - platform: "state"
      entity_id: "sensor.bin_collection"
      prob_given_true: 0.15 #All the prob_given_true should add to 1
      prob_given_false: 0.84 # All the prob_given_false should add to 1
      to_state: "not due"
```
