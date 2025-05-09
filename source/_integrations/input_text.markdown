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

The **Input text** {% term integration %} allows the user to define values that can be controlled via the frontend and can be used within conditions of automation. Changes to the value stored in the text box generate state events. These state events can be utilized as `automation` triggers as well. It can also be configured in password mode (obscured text).

The preferred way to configure an input text is via the user interface at **{% my helpers title="Settings > Devices & services > Helpers" %}**. Click the add button and then choose the **{% my config_flow_start domain="input_text" title="Text" %}** option.

To be able to add **Helpers** via the user interface you should have `default_config:` in your {% term "`configuration.yaml`" %}, it should already be there by default unless you removed it.
If you removed `default_config:` from your configuration, you must add `input_text:` to your `configuration.yaml` first, then you can use the UI.

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

### Actions

This integration provides an action to modify the state of the `input_text` and an action to reload the `input_text` configuration without restarting Home Assistant itself.

| Action      | Data                      | Description                                       |
| ----------- | ------------------------- | ------------------------------------------------- |
| `set_value` | `value`<br>`entity_id(s)` | Set the value for specific `input_text` entities. |
| `reload`    |                           | Reload `input_text` configuration                 |

### Restore state

If you set a valid value for `initial` this integration will start with state set to that value. Otherwise, it will restore the state it had prior to Home Assistant stopping.

### Scenes

To set the state of the input_text in a [Scene](/integrations/scene/):

```yaml
# Example configuration.yaml entry
scene:
  - name: Example1
    entities:
      input_text.example: Hello!
```

## Automation examples

Here's an example using `input_text` in an action in an automation.

{% raw %}

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

{% endraw %}
