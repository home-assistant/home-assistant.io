---
layout: page
title: "Input Slider"
description: "Instructions how to integrate the Input Slider component into Home Assistant."
date: 2016-03-15 06:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Automation
ha_release: 0.16
---

The `input_slider` component allows the user to define values that can be controlled via the frontend and can be used within conditions of automation. Changes to the slider generate state events. These state events can be utilized as `automation` triggers as well. 

```yaml
# Example configuration.yaml entry
input_slider:
  slider1:
    name: Slider 1
    initial: 30
    min: -20
    max: 35
    step: 1
```

Configuration variables:

- **[alias]** (*Required*): Alias for the slider input.
- **name** (*Optional*): Friendly name of the slider input.
- **initial** (*Optional*): Initial value when Home Assistant starts.
- **min** (*Optional*): Minimum value for the slider.
- **max** (*Optional*): Maximum value for the slider.
- **step** (*Optional*): Step value for the slider.

# Automation Examples

Here's an example of `input_slider` being used as a trigger in an automation.
```
# Example configuration.yaml entry using 'input_slider' as a trigger in an automation

# Define input_slider
input_slider:
  bedroom_brightness:
    name: Brightness
    initial: 254
    min: 0
    max: 254
    step: 1

# Automation.     
automation:    
  - alias: Bedroom Light - Adjust Brightness
    trigger:
      platform: state
      entity_id: input_slider.bedroom_brightness
    action:
      - service: light.turn_on
# Note the use of 'data_template:' below rather than the normal 'data:' if you weren't using an input variable
        data_template:
          entity_id: light.bedroom
          brightness: '{{ trigger.to_state.state | int }}'
```
Another code example using `input_slider`, this time being used in an action in an automation.
```
# Example configuration.yaml entry using 'input_slider' in an action in an automation

# Define 'input_select'
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
    
# Define input_slider
input_slider:
  bedroom_brightness:
    name: Brightness
    initial: 254
    min: 0
    max: 254
    step: 1

# Automation.     
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
          brightness: '{{ states.input_slider.bedroom_brightness.state | int }}'
```
