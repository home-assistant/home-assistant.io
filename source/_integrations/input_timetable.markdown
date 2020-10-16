---
title: Input Timetable
description: Instructions on how to integrate the Input Timetable integration into Home Assistant.
ha_category:
  - Automation
ha_release: 0.117
ha_iot_class: ~
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: input_timetable
---

The `input_timetable` integration allows the user to define the times throughout the day when the `input_timetable` entity is set to on or off. An automation rule can be used to tie this timetable to other entities. Changes to the time periods will then impact the other entities, without the need to change the automation rule iteslf.

Input timetables can be configured via `configuration.yaml`:

```yaml
# Example configuration.yaml entry
input_timetable:
  lights:
    name: Lights
  windows:
    name: Windows
```

{% configuration %}
  input_timetable:
    description: Alias for the input. Multiple entries are allowed.
    required: true
    type: map
    keys:
      name:
        description: Friendly name of the input.
        required: false
        type: string
      icon:
        description: Icon to display in front of the input element in the frontend.
        required: false
        type: icon
{% endconfiguration %}

### Services

This integration provides the following services to modify the state of the `input_timetable` and a service to reload the
configuration without restarting Home Assistant itself.

| Service | Data | Description |
| ------- | ---- | ----------- |
| `set` | `time`<br>`state`<br>`entity_id(s)`<br>`area_id(s)` | Add a state change at a given time to the specific `input_timetable` entities 
| `unset` | `time`<br>`entity_id(s)`<br>`area_id(s)` | Remove a state change at a given time from the specific `input_timetable` entities
| `reset` | `entity_id(s)`<br>`area_id(s)` | Remove all state changes from the specific `input_timetable` entities
| `reconfig` | `timetable`<br>`entity_id(s)`<br>`area_id(s)` | Set the entire state change list of the specific `input_timetable` entities
| `reload` | Reload `input_timetable` configuration |

### Initial State
When initially created, the timetable is configured to be always off, and it has no state changes. Any state change added to it will be preserved, even when Home Assistant is restarted.

## Automation Examples

Here's an example of `input_timetable` being used in an automation rule.

{% raw %}
```yaml
# Example configuration.yaml entry using 'input_timetable'
input_timetable:
  lights:

automation:
  - alias: Lights
    trigger:
      platform: state
      entity_id: input_timetable.lights
    action:
      - service: "switch.{{ 'turn_on' if is_state('input_timetable.lights', 'on') else 'turn_off' }}"
        data:
          entity_id: all
```
{% endraw %}
