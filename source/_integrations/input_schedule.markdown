---
title: Input Schedule
description: Instructions on how to integrate the Input Schedule integration into Home Assistant.
ha_category:
  - Automation
ha_release: 0.116
ha_iot_class: ~
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: input_schedule
---

The `input_schedule` integration allows the user to define time periods throughout the day when the `input_schedule` entity is set to on or off. An automation rule can be used to tie this schedule to other entities. Changes to the time periods will then impact the other entities, without the need to change the automation rule (see more in the example below).

Input schedules can be configured via `configuration.yaml`:

```yaml
# Example configuration.yaml entry
input_schedule:
  lights:
    name: Lights
  windows:
    name: Windows
```

{% configuration %}
  input_schedule:
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

This integration provides the following services to modify the state of the `input_schedule` and a service to reload the
configuration without restarting Home Assistant itself.

| Service | Data | Description |
| ------- | ---- | ----------- |
| `set_on` | `start`<br>`end`<br>`entity_id(s)`<br>`area_id(s)` | Add an on time period to the specific `input_schedule` entities 
| `set_off` | `start`<br>`end`<br>`entity_id(s)`<br>`area_id(s)` | Add an off time period to the specific `input_schedule` entities
| `reset` | `entity_id(s)`<br>`area_id(s)` | Set the specific `input_schedule` entities to be always off
| `reload` | Reload `input_schedule` configuration |

### Initial State
When initially created, the schedule is configured to be always off. Periods added to it will be preserved, even when Home Assistant is restarted.

## Automation Examples

Here's an example of `input_schedule` being used in an automation.

{% raw %}
```yaml
# Example configuration.yaml entry using 'input_schedule'
input_schedule:
  lights:
automation:
  - alias: Lights
    trigger:
      platform: state
      entity_id: input_schedule.lights
    action:
      - service: "switch.{{ 'turn_on' if is_state('input_schedule.lights', 'on') else 'turn_off' }}"
        data:
          entity_id: all
```
{% endraw %}
