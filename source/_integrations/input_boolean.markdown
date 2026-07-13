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

The **Input boolean** {% term integration %} lets you create a toggle {% term helper %}: an entity that stores an on or off {% term state %} you can set yourself. Because the value is not tied to a physical device, you can use it as an adjustable switch for your automations, scripts, and dashboards. For example, you can create a toggle helper to enable or disable a set of automations, mark guest mode as active, or track whether you are on vacation.

On a dashboard, a toggle helper appears as a switch you can turn on or off. Each time the value changes, Home Assistant records a new state, which you can use as a trigger or a {% term condition %} in your automations. Your automations and scripts can also change the value, which makes a toggle helper a convenient way to share a setting between the UI and your automations.

## Configuration

The preferred way to create a toggle helper is through the user interface.

1. Go to {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %}, and select **Create helper**.
2. Select **{% my config_flow_start domain="input_boolean" title="Toggle" %}**.

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

{% include integrations/actions.md %}

## Restore state

If you set a valid value for `initial` this integration will start with the state
set to that value. Otherwise, it will restore the state it had before
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

## Troubleshooting

### The Toggle helper option is missing from the user interface

#### Symptom

When you go to **{% my helpers title="Settings > Devices & services > Helpers" %}** to add a helper, the **Toggle** option is not listed.

#### Description

Toggle helpers are provided through [`default_config:`](/integrations/default_config/), which is part of your {% term "`configuration.yaml`" %} by default. If you removed `default_config:`, the option is no longer available.

#### Resolution

1. Add `input_boolean:` to your {% term "`configuration.yaml`" %}.
2. Restart Home Assistant.
3. After the restart, create your toggle helpers from the user interface.
