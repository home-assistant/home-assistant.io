---
title: Input weekday
description: Instructions on how to use the input weekday helper with Home Assistant.
ha_category:
  - Automation
  - Helper
ha_release: 2025.11
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: input_weekday
ha_integration_type: helper
---

The **Input weekday** helper integration allows you to define a selection of weekdays that can be controlled via the user interface and used within conditions and triggers of an {% term automation %}. This makes it easy to dynamically manage weekday-based automations without having to manually specify weekdays in your automation configuration.

## Configuration

The preferred way to configure input weekday helpers is via the user interface,
in which they are known as Weekday Helpers. To add one, go to
**{% my helpers title="Settings > Devices & services > Helpers" %}** and click the add button;
next choose the **{% my config_flow_start domain="input_weekday" title="Weekday" %}** option.

To be able to add **Helpers** via the user interface you should have
`default_config:` in your {% term "`configuration.yaml`" %}, it should already be there by
default unless you removed it. If you removed `default_config:` from your
configuration, you must add `input_weekday:` to your {% term "`configuration.yaml`" %} first,
then you can use the UI.

Input weekdays can also be configured via {% term "`configuration.yaml`" %} file:

{% configuration %}
  input_weekday:
    description: Alias for the input. Multiple entries are allowed.
    required: true
    type: map
    keys:
      name:
        description: Friendly name of the input.
        required: false
        type: string
      weekdays:
        description: List of initially selected weekdays.
        required: false
        type: list
        default: a previous value is restored if available
      icon:
        description: Icon to display in front of the input element in the frontend.
        required: false
        type: icon
{% endconfiguration %}

```yaml
# Example configuration.yaml entry
input_weekday:
  work_days:
    name: Work days
    weekdays:
      - mon
      - tue
      - wed
      - thu
      - fri
    icon: mdi:briefcase
```

Valid weekday values are: `mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `sun`.

## Actions

This integration provides the following {% term actions %} to modify the state of the
`input_weekday` and an action to reload the configuration without restarting
Home Assistant itself.

| Action            | Data                | Description                                                         |
| ----------------- | ------------------- | ------------------------------------------------------------------- |
| `set_weekdays`    | `weekdays`          | Set the selected weekdays (replaces all current selections)         |
| `add_weekday`     | `weekday`           | Add a single weekday to the selection                               |
| `remove_weekday`  | `weekday`           | Remove a single weekday from the selection                          |
| `toggle_weekday`  | `weekday`           | Toggle a single weekday (add if not selected, remove if selected)   |
| `clear`           |                     | Clear all selected weekdays                                         |
| `reload`          |                     | Reload `input_weekday` configuration                                |

## Automation examples

Here's an example of an automation using the above `input_weekday` in a time trigger. This automation will only trigger on the selected weekdays.

```yaml
automation:
  alias: "Weekday alarm"
  triggers:
    - trigger: time
      at: "07:00:00"
      weekday: input_weekday.work_days
  actions:
    - action: light.turn_on
      target:
        entity_id: light.bedroom
```

You can also use an `input_weekday` in a time condition:

```yaml
automation:
  alias: "Weekday notifications"
  triggers:
    - trigger: state
      entity_id: binary_sensor.motion_detected
      to: "on"
  conditions:
    - condition: time
      weekday: input_weekday.work_days
  actions:
    - action: notify.mobile_app
      data:
        message: "Motion detected on a work day"
```
