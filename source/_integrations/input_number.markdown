---
title: Input number
description: Instructions on how to integrate the input number integration into Home Assistant.
ha_category:
  - Automation
  - Helper
ha_release: 0.55
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: input_number
ha_integration_type: helper
---

The **Input number** {% term integration %} allows the user to define values that can be controlled via the frontend and can be used within conditions of automation. The frontend can display a slider, or a numeric input box. Changes to the slider or numeric input box generate state events. These state events can be utilized as `automation` triggers as well.

The preferred way to configure an input number is via the user interface at **{% my helpers title="Settings > Devices & services > Helpers" %}**. Click the add button and then choose the **{% my config_flow_start domain="input_number" title="Number" %}** option.

To be able to add **Helpers** via the user interface you should have `default_config:` in your {% term "`configuration.yaml`" %}, it should already be there by default unless you removed it.
If you removed `default_config:` from you configuration, you must add `input_number:` to your `configuration.yaml` first, then you can use the UI.

Input numbers can also be configured via {% term "`configuration.yaml`" %}:

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
        description: Maximum value.
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
        default: The value at shutdown
      step:
        description: Step value. Smallest value `0.001`.
        required: false
        type: float
        default: 1
      mode:
        description: Can specify `box` or `slider`.
        required: false
        type: string
        default: slider
      unit_of_measurement:
        description: Unit of measurement in which the value of the slider is expressed in.
        required: false
        type: string
      icon:
        description: Icon to display in front of the input element in the frontend.
        required: false
        type: icon
{% endconfiguration %}

### Actions

This integration provides the following actions to modify the state of the `input_number` and an action to reload the
configuration without restarting Home Assistant itself.

| Service     | Data                                      | Description                                                       |
| ----------- | ----------------------------------------- | ----------------------------------------------------------------- |
| `decrement` | `entity_id(s)`<br>`area_id(s)`            | Decrement the value of specific `input_number` entities by `step` |
| `increment` | `entity_id(s)`<br>`area_id(s)`            | Increment the value of specific `input_number` entities by `step` |
| `reload`    |                                           | Reload `input_number` configuration                               |
| `set_value` | `value`<br>`entity_id(s)`<br>`area_id(s)` | Set the value of specific `input_number` entities                 |

### Restore state

If you set a valid value for `initial` this integration will start with the state set to that value. Otherwise, it will restore the state it had prior to Home Assistant stopping. Please note that `initial` is only available in a YAML configuration and not via the Home Assistant user interface.

### Scenes

To set the value of an input_number in a [Scene](/integrations/scene/):

```yaml
# Example configuration.yaml entry
scene:
  - name: Example Scene
    entities:
      input_number.example_number: 13
```

## Automation examples

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
  - alias: "Bedroom Light - Adjust Brightness"
    triggers:
      - trigger: state
        entity_id: input_number.bedroom_brightness
    actions:
      - action: light.turn_on
        target:
          entity_id: light.bedroom
        data:
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
    initial: "Select"

input_number:
  bedroom_brightness:
    name: Brightness
    initial: 254
    min: 0
    max: 254
    step: 1

automation:
  - alias: "Bedroom Light - Custom"
    triggers:
      - trigger: state
        entity_id: input_select.scene_bedroom
        to: "CUSTOM"
    actions:
      - action: light.turn_on
        target:
          entity_id: light.bedroom
        data:
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
  - alias: "Set temp slider"
    triggers:
      - trigger: mqtt
        topic: "setTemperature"
    actions:
      - action: input_number.set_value
        target:
          entity_id: input_number.target_temp
        data:
          value: "{{ trigger.payload }}"

# This second automation script runs when the target temperature slider is moved.
# It publishes its value to the same MQTT topic it is also subscribed to.
  - alias: "Temp slider moved"
    triggers:
      - trigger: state
        entity_id: input_number.target_temp
    actions:
      - action: mqtt.publish
        data:
          topic: "setTemperature"
          retain: true
          payload: "{{ states('input_number.target_temp') | int }}"
```

{% endraw %}

Here's an example of `input_number` being used as a delay in an automation.

{% raw %}

```yaml
# Example configuration.yaml entry using 'input_number' as a delay in an automation
input_number:
  minutes:
    name: minutes
    icon: mdi:clock-start
    initial: 3
    min: 0
    max: 6
    step: 1
    
  seconds:
    name: seconds
    icon: mdi:clock-start
    initial: 30
    min: 0
    max: 59
    step: 10
    
automation:
  - alias: "turn something off after x time after turning it on"
    triggers:
      - trigger: state
        entity_id: switch.something
        to: "on"
    actions:
      - delay: "00:{{ states('input_number.minutes') | int }}:{{ states('input_number.seconds') | int }}"
      - action: switch.turn_off
        target:
          entity_id: switch.something
```

{% endraw %}
