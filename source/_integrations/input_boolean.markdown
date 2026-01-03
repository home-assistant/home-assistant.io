---
title: Input boolean
description: Instructions on how to use the input boolean helper with Home Assistant.
ha_category:
  - Automation
  - Helper
ha_release: 0.11
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: input_boolean
ha_integration_type: helper
---

The **Input boolean** helper integration allows you to define boolean values that
can be controlled via the user interface and can be used within conditions of
an {% term automation %}. This can for example be used to disable or enable certain
automations by using them in their {% term conditions %}.

## Configuration

The preferred way to configure input boolean helpers is via the user interface,
in which they are known as Toggle Helpers. To add one, go to
**{% my helpers title="Settings > Devices & services > Helpers" %}** and click the add button;
next choose the **{% my config_flow_start domain="input_boolean" title="Toggle" %}** option.

To be able to add **Helpers** via the user interface you should have
`default_config:` in your {% term "`configuration.yaml`" %}, it should already be there by
default unless you removed it. If you removed `default_config:` from your
configuration, you must add `input_boolean:` to your {% term "`configuration.yaml`" %} first,
then you can use the UI.

Input booleans can also be configured via {% term "`configuration.yaml`" %} file:

{% configuration %}
  input_boolean:
    description: Alias for the input. Multiple entries are allowed.
    required: true
    type: map
    keys:
      name:
        description: Friendly name of the input.
        required: false
        type: string
      initial:
        description: Initial value when Home Assistant starts.
        required: false
        type: boolean
        default: a previous value is restored if available
      icon:
        description: Icon to display in front of the input element in the frontend.
        required: false
        type: icon
{% endconfiguration %}

```yaml
# Example configuration.yaml entry
input_boolean:
  notify_home:
    name: Notify when someone arrives home
    icon: mdi:car
```

## Actions

This integration provides the following {% term actions %} to modify the state of the
`input_boolean` and an action to reload the configuration without restarting
Home Assistant itself.

| Action     | Data                           | Description                                                 |
| ---------- | ------------------------------ | ----------------------------------------------------------- |
| `turn_on`  | `entity_id(s)`<br>`area_id(s)` | Set the value of specific `input_boolean` entities to `on`  |
| `turn_off` | `entity_id(s)`<br>`area_id(s)` | Set the value of specific `input_boolean` entities to `off` |
| `toggle`   | `entity_id(s)`<br>`area_id(s)` | Toggle the value of specific `input_boolean` entities       |
| `reload`   |                                | Reload `input_boolean` configuration                        |

### Restore state

If you set a valid value for `initial` this integration will start with the state
set to that value. Otherwise, it will restore the state it had prior to
Home Assistant stopping; if there is no state to restore - an `off` value is set. 

## Automation examples

Here's an example of an automation using the above `input_boolean`. This action
will only occur if the `input_boolean` is on.

```yaml
automation:
  alias: "Arriving home"
  triggers:
    - trigger: state
      entity_id: binary_sensor.motion_garage
      to: "on"
  conditions:
    - condition: state
      entity_id: input_boolean.notify_home
      state: "on"
  actions:
    - action: notify.pushbullet
      data:
        title: ""
        message: "Honey, I'm home!"
```

You can also set or change the status of an `input_boolean` by using
`input_boolean.turn_on`, `input_boolean.turn_off` or `input_boolean.toggle` in
your automation action.

```yaml
action: input_boolean.turn_on
target:
  entity_id: input_boolean.notify_home
```
