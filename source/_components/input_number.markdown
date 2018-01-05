---
layout: page
title: "Input Number"
description: "Instructions how to integrate the Input Number component into Home Assistant."
date: 2017-09-19 03:30
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Automation
ha_release: 0.55
redirect_from: /components/input_slider/
---

<p class='note'>
Before version 0.55 this component was known as `input_slider` and did not have the `mode` configuration option.
</p>

The `input_number` component allows the user to define values that can be controlled via the frontend and can be used within conditions of automation. The frontend can display a slider, or a numeric input box. Changes to the slider or numeric input box generate state events. These state events can be utilized as `automation` triggers as well.

To enable this input number in your installation, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
input_number:
  slider1:
    name: Slider
    initial: 30
    min: -20
    max: 35
    step: 1
  box1:
    name: Numeric Input Box
    initial: 30
    min: -20
    max: 35
    step: 1
    mode: box
```


{% configuration %}
  input_number:
    description: Alias for the input. Multiple entries are allowed.
    required: true
    type: map
    keys:
      min:
        description: Minimum value.
        required: true
        type: float
      max:
        description: Maxium value.
        required: true
        type: float
      name:
        description: Friendly name of the input.
        required: false
        type: string
      initial:
        description: Initial value when Home Assistant starts.
        required: false
        type: float
        default: 0
      step:
        description: Step value for the slider. Smallest value `0.001`.
        required: false
        type: float
        default: 1
      mode:
        description: Can specify `box` or `slider`.
        required: false
        type: box | slider
        default: slider
      unit_of_measurement:
        description: Unit of measurement in which the value of the slider is expressed in.
        required: false
        type: string
      icon:
        description: Icon to display in front of the box/slider in the frontend. Refer to the [Customizing devices](/docs/configuration/customizing-devices/#possible-values) page for possible values.
        required: false
        type: icon
{% endconfiguration %}

### {% linkable_title Restore State %}

This component supports the `restore_state` function which restores the state after Home Assistant has started to the value it has been before Home Assistant stopped. To use this feature please make sure that the [`recorder`](/components/recorder/) component is enabled and your entity does not have a value set for `initial`. Additional information can be found in the [Restore state](/components/recorder/#restore-state) section of the [`recorder`](/components/recorder/) component documentation.

## {% linkable_title Automation Examples %}

Here's an example of `input_number` being used as a trigger in an automation.

{% raw %}
```yaml
# Example configuration.yaml entry using 'input_number' as a trigger in an automation
input_number:
  bedroom_brightness:
    name: Brightness
    initial: 254
    min: 0
    max: 254
    step: 1
automation:
  - alias: Bedroom Light - Adjust Brightness
    trigger:
      platform: state
      entity_id: input_number.bedroom_brightness
    action:
      - service: light.turn_on
        # Note the use of 'data_template:' below rather than the normal 'data:' if you weren't using an input variable
        data_template:
          entity_id: light.bedroom
          brightness: "{{ trigger.to_state.state | int }}"
```
{% endraw %}

Another code example using `input_number`, this time being used in an action in an automation.

{% raw %}
```yaml
# Example configuration.yaml entry using 'input_number' in an action in an automation
input_select:
  scene_bedroom:
    name: Scene
    options:
      - Select
      - Concentrate
      - Energize
      - Reading
      - Relax
      - 'OFF'
    initial: 'Select'
input_number:
  bedroom_brightness:
    name: Brightness
    initial: 254
    min: 0
    max: 254
    step: 1
automation:
  - alias: Bedroom Light - Custom
    trigger:
      platform: state
      entity_id: input_select.scene_bedroom
      to: CUSTOM
    action:
      - service: light.turn_on
        # Again, note the use of 'data_template:' rather than the normal 'data:' if you weren't using an input variable.
        data_template:
          entity_id: light.bedroom
          brightness: "{{ states('input_number.bedroom_brightness') | int }}"
```
{% endraw %}

Example of `input_number` being used in a bidirectional manner, both being set by and controlled by an MQTT action in an automation.

{% raw %}
```yaml
# Example configuration.yaml entry using 'input_number' in an action in an automation
input_number:
  target_temp:
    name: Target Heater Temperature Slider
    min: 1
    max: 30
    step: 1
    unit_of_measurement: step  
    icon: mdi:target

# This automation script runs when a value is received via MQTT on retained topic: setTemperature
# It sets the value slider on the GUI. This slides also had its own automation when the value is changed.
automation:
  - alias: Set temp slider
    trigger:
      platform: mqtt
      topic: 'setTemperature'
    action:
      service: input_number.set_value
      data_template:
        entity_id: input_number.target_temp
        value: "{{ trigger.payload }}"

# This automation script runs when the target temperature slider is moved.
# It publishes its value to the same MQTT topic it is also subscribed to.
automation:
  - alias: Temp slider moved
    trigger:
      platform: state
      entity_id: input_number.target_temp
    action:
      service: mqtt.publish
      data_template:
        topic: 'setTemperature'
        retain: true
        payload: "{{ states('input_number.target_temp') | int }}"
```
{% endraw %}
