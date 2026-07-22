---
title: Input text
description: Instructions on how to integrate the Input text integration into Home Assistant.
ha_category:
  - Automation
  - Helper
ha_release: 0.53
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: input_text
ha_integration_type: helper
---

The **Input text** {% term integration %} lets you create a text {% term helper %}: an entity that stores a text value you can set yourself. Because the value is not tied to a physical device, you can use it as an adjustable text setting for your automations, scripts, and dashboards. For example, you can create a text helper to store a status message, a name, or a code. It can also be set to password mode, which obscures the text as you type.

On a dashboard, a text helper appears as a text box you can type into. Each time the value changes, Home Assistant records a new {% term state %}, which you can use as a trigger or a condition in your automations. Your automations and scripts can also change the value, which makes a text helper a convenient way to share a setting between the UI and your automations.

## Creating a text helper

The preferred way to create a text helper is through the user interface.

1. Go to {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %}, and select **Create helper**.
2. Select **{% my config_flow_start domain="input_text" title="Text" %}**.

It can also be configured via {% term "`configuration.yaml`" %}:

```yaml
# Example configuration.yaml entries
input_text:
  text1:
    name: Text 1
    initial: Some Text
  text2:
    name: Text 2
    min: 8
    max: 40
  text3:
    name: Text 3
    pattern: "[a-fA-F0-9]*"
  text4:
    name: Text 4
    mode: password
```

{% configuration %}
  input_text:
    description: Alias for the input. Multiple entries are allowed.
    required: true
    type: map
    keys:
      name:
        description: Friendly name of the text input.
        required: false
        type: string
      min:
        description: Minimum length for the text value.
        required: false
        type: integer
        default: 0
      max:
        description: Maximum length for the text value. 255 is the maximum number of characters allowed in an entity state.
        required: false
        type: integer
        default: 100
      initial:
        description: Initial value when Home Assistant starts.
        required: false
        type: string
      icon:
        description: Icon to display in front of the input element in the frontend.
        required: false
        type: icon
      pattern:
        description: Regex pattern for client-side validation.
        required: false
        type: string
        default: empty
      mode:
        description: Can specify `text` or `password`. Elements of type "password" provide a way for the user to securely enter a value.
        required: false
        type: string
        default: text
{% endconfiguration %}

## Restore state

If you set a valid value for `initial` this integration will start with state set to that value. Otherwise, it will restore the state it had before Home Assistant stopping.

## Scenes

To set the state of the input_text in a [Scene](/integrations/scene/):

```yaml
# Example configuration.yaml entry
scene:
  - name: Example1
    entities:
      input_text.example: Hello!
```

{% include integrations/triggers.md domain="text" %}

{% include integrations/conditions.md domain="text" %}

{% include integrations/actions.md %}

## Automation examples

Here's an example using `input_text` in an action in an automation.

```yaml
# Example configuration.yaml entry using 'input_text' in an action in an automation
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
input_text:
  bedroom:
    name: Brightness
    
automation:
  - alias: "Bedroom Light - Custom"
    triggers:
      - trigger: state
        entity_id: input_select.scene_bedroom
    actions:
      - action: input_text.set_value
        target:
          entity_id: input_text.bedroom
        data:
          value: "{{ states('input_select.scene_bedroom') }}"
```

## Troubleshooting

### The Text helper option is missing from the user interface

#### Symptom

When you go to **{% my helpers title="Settings > Devices & services > Helpers" %}** to add a helper, the **Text** option is not listed.

#### Description

Text helpers are provided through [`default_config:`](/integrations/default_config/), which is part of your {% term "`configuration.yaml`" %} by default. If you removed `default_config:`, the option is no longer available.

#### Resolution

1. Add `input_text:` to your {% term "`configuration.yaml`" %}.
2. Restart Home Assistant.
3. After the restart, create your text helpers from the user interface.
