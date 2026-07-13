---
title: Input select
description: Instructions on how to integrate the input select integration into Home Assistant.
ha_category:
  - Automation
  - Helper
ha_release: 0.13
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: input_select
ha_integration_type: helper
---

The **Input select** {% term integration %} lets you create a dropdown {% term helper %}: an entity that stores one value chosen from a list of options you define. Because the value is not tied to a physical device, you can use it as a selectable setting for your automations, scripts, and dashboards. For example, you can create a dropdown helper to pick who cooks today, choose a thermostat mode, or select a house scene.

On a dashboard, a dropdown helper appears as a list you can pick from. Each time you select a new option, Home Assistant records a new {% term state %}, which you can use as a trigger or a condition in your automations. Your automations and scripts can also change the selected option, which makes a dropdown helper a convenient way to share a setting between the UI and your automations.

## Creating a dropdown helper

The preferred way to create a dropdown helper is through the user interface.

1. Go to {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %}, and select **Create helper**.
2. Select **{% my config_flow_start domain="input_select" title="Dropdown" %}**.

Input selects can also be configured via {% term "`configuration.yaml`" %}:

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
      options:
        description: List of options to choose from.
        required: true
        type: list
      name:
        description: Friendly name of the input.
        required: false
        type: string
      initial:
        description: Initial value when Home Assistant starts.
        required: false
        type: map
        default: First element of options
      icon:
        description: Icon to display in front of the input element in the frontend.
        required: false
        type: icon
{% endconfiguration %}

{% note %}
Because YAML defines [booleans](https://yaml.org/type/bool.html) as equivalent, any variations of 'On', 'Yes', 'Y', 'Off', 'No', or 'N'  (regardless of case) used as option names will be replaced by True and False unless they are defined in quotation marks.
{% endnote %}

## Restore state

If you set a valid value for `initial` this integration will start with the state set to that value. Otherwise, it will restore the state it had before Home Assistant stopping.

## Scenes

Specifying a target option in a [Scene](/integrations/scene/) is simple:

```yaml
# Example configuration.yaml entry
scene:
  - name: Example1
    entities:
      input_select.who_cooks: Paulus
```

The list of options can also be set in a [Scene](/integrations/scene). In that case, you also need to specify what the new state will be.

```yaml
# Example configuration.yaml entry
scene:
  - name: Example2
    entities:
      input_select.who_cooks:
        options:
          - Alice
          - Bob
          - Paulus
        state: Bob
```

{% include integrations/triggers.md domain="select" %}

{% include integrations/conditions.md domain="select" %}

{% include integrations/actions.md %}

## Automation examples

The following example shows the usage of the `input_select.select_option` action in an automation:

```yaml
# Example configuration.yaml entry
automation:
  - alias: "example automation"
    triggers:
      - trigger: event
        event_type: MY_CUSTOM_EVENT
    actions:
      - action: input_select.select_option
        target:
          entity_id: input_select.who_cooks
        data:
          option: "Paulus"
```

To dynamically set the `input_select` options you can call `input_select.set_options` in an automation:

```yaml
# Example configuration.yaml entry
automation:
  - alias: "example automation"
    triggers:
      - trigger: event
        event_type: MY_CUSTOM_EVENT
    actions:
      - action: input_select.set_options
        target:
          entity_id: input_select.who_cooks
        data:
          options: ["Item A", "Item B", "Item C"]
```

Example of `input_select` being used in a bidirectional manner, both being set by and controlled by an MQTT action in an automation.

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
- alias: "Set Thermostat Mode Selector"
  triggers:
    - trigger: mqtt
      topic: "thermostatMode"
   # entity_id: input_select.thermostat_mode
  actions:
    - action: input_select.select_option
      target:
        entity_id: input_select.thermostat_mode
      data:
        option: "{{ trigger.payload }}"

 # This automation script runs when the thermostat mode selector is changed.
 # It publishes its value to the same MQTT topic it is also subscribed to.
- alias: "Set Thermostat Mode"
  triggers:
    - trigger: state
      entity_id: input_select.thermostat_mode
  actions:
    - action: mqtt.publish
      data:
        topic: "thermostatMode"
        retain: true
        payload: "{{ states('input_select.thermostat_mode') }}"
```

## Troubleshooting

### The Dropdown helper option is missing from the user interface

#### Symptom

When you go to **{% my helpers title="Settings > Devices & services > Helpers" %}** to add a helper, the **Dropdown** option is not listed.

#### Description

Dropdown helpers are provided through [`default_config:`](/integrations/default_config/), which is part of your {% term "`configuration.yaml`" %} by default. If you removed `default_config:`, the option is no longer available.

#### Resolution

1. Add `input_select:` to your {% term "`configuration.yaml`" %}.
2. Restart Home Assistant.
3. After the restart, create your dropdown helpers from the user interface.
