---
layout: page
title: "Input Select"
description: "Instructions on how to integrate the Input Select component into Home Assistant."
date: 2016-02-02 17:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Automation
ha_release: 0.13
---

The `input_select` component allows the user to define a list of values that can be selected via the frontend and can be used within conditions of automation. When a user selects a new item, a state transition event is generated. This state event can be used in an `automation` trigger.

To enable this platform in your installation, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
input_select:
  who_cooks:
    name: Who cooks today
    options:
     - Paulus
     - Anne Therese
    initial: Anne Therese
    icon: mdi:panda
  living_room_preset:
    options:
      - Visitors
      - Visitors with kids
      - Home Alone
```

{% configuration %}
  input_select:
    description: Alias for the input. Multiple entries are allowed.
    required: true
    type: map
    keys:
      name:
        description: Friendly name of the input.
        required: false
        type: String
      options:
        description: List of options to choose from.
        required: true
        type: Array
      initial:
        description: Initial value when Home Assistant starts.
        required: false
        type: Element of options
        default: First element of options
      icon:
        description: Icon to display for the component. Refer to the [Customizing devices](/docs/configuration/customizing-devices/#possible-values) page for possible values.
        required: false
        type: icon
{% endconfiguration %}

<p class='note'>
Because YAML defines [booleans](http://yaml.org/type/bool.html) as equivalent, any variations of 'On', 'Yes', 'Y', 'Off', 'No', or 'N'  (regardless of case) used as option names will be replaced by True and False unless they are defined in quotation marks.
</p>

### {% linkable_title Restore State %}

This component will automatically restore the state it had prior to Home Assistant stopping as long as you have the `recorder` component enabled and your entity does **not** have a set value for `initial`. To disable this feature, set a valid value for `initial`. Additional information can be found in the [Restore state](/components/recorder/#restore-state) section of the [`recorder`](/components/recorder/) component documentation.

### {% linkable_title Services %}

This components provide three services to modify the state of the `input_select`.

| Service | Data | Description |
| ------- | ---- | ----------- |
| `select_option` | `option` | This can be used to select a specific option.
| `set_options` | `options`<br>`entity_id(s)` | Set the options for specific `input_select` entities.
| `select_previous` | | Select the previous option.
| `select_next` | | Select the next option.

### {% linkable_title Scenes %}

To specify a target option in a [Scene](/components/scene/) you have to specify the target as `option` attribute:

```yaml
# Example configuration.yaml entry
scene:
  - name: Example1
    entities:
      input_select.who_cooks:
        option: Paulus
```

## {% linkable_title Automation Examples %}

The following example shows the usage of the `input_select.select_option` service in an automation:

```yaml
# Example configuration.yaml entry
automation:
  - alias: example automation
    trigger:
      platform: event
      event_type: MY_CUSTOM_EVENT
    action:
      - service: input_select.select_option
        data:
          entity_id: input_select.who_cooks
          option: Paulus
```

To dynamically set the `input_select` options you can call `input_select.set_options`. The following example can be used in an automation rule:

```yaml
# Example configuration.yaml entry
automation:
  - alias: example automation
    trigger:
      platform: event
      event_type: MY_CUSTOM_EVENT
    action:
      - service: input_select.set_options
        data:
          entity_id: input_select.who_cooks
          options: ["Item A", "Item B", "Item C"]
```

Example of `input_select` being used in a bidirectional manner, both being set by and controlled by an MQTT action in an automation.

{% raw %}
```yaml
# Example configuration.yaml entry using 'input_select' in an action in an automation
   
# Define input_select
input_select:
  thermostat_mode:
    name: Thermostat Mode
    options:
      - "auto"
      - "off"
      - "cool"
      - "heat"
    icon: mdi:target

# Automation.     
 # This automation script runs when a value is received via MQTT on retained topic: thermostatMode
 # It sets the value selector on the GUI. This selector also had its own automation when the value is changed.
- alias: Set Thermostat Mode Selector
  trigger:
    platform: mqtt
    topic: "thermostatMode"
   # entity_id: input_select.thermostat_mode
  action:
     service: input_select.select_option
     data_template:
      entity_id: input_select.thermostat_mode
      option: "{{ trigger.payload }}"

 # This automation script runs when the thermostat mode selector is changed.
 # It publishes its value to the same MQTT topic it is also subscribed to.
- alias: Set Thermostat Mode
  trigger:
    platform: state
    entity_id: input_select.thermostat_mode
  action:
    service: mqtt.publish
    data_template:
      topic: "thermostatMode"
      retain: true
      payload: "{{ states('input_select.thermostat_mode') }}"
```
{% endraw %}
