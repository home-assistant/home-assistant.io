---
title: Counter
description: Instructions on how to integrate counters into Home Assistant.
ha_category:
  - Automation
  - Helper
ha_release: 0.53
ha_quality_scale: internal
ha_codeowners:
  - '@fabaff'
ha_domain: counter
ha_integration_type: helper
---

The `counter` integration allows one to count occurrences fired by automations.

## Configuration

The preferred way to configure counter helpers is via the user interface. To add one, go to
**{% my helpers title="Settings -> Devices & Services -> Helpers" %}** and click the add button;
next choose the "**Counter**" option.

To be able to add **Helpers** via the user interface you should have
`default_config:` in your `configuration.yaml`, it should already be there by
default unless you removed it. If you removed `default_config:` from your
configuration, you must add `counter:` to your `configuration.yaml` first,
then you can use the UI.

Counters can also be configured via `configuration.yaml`:

```yaml
# Example configuration.yaml entry
counter:
  my_custom_counter:
    initial: 30
    step: 1
```

{% configuration %}
"[alias]":
  description: Alias for the counter. Multiple entries are allowed. `alias` should be replaced by the user for their actual value.
  required: true
  type: map
  keys:
    name:
      description: Friendly name of the counter.
      required: false
      type: string
    initial:
      description: Initial value (0 or positive integer) when Home Assistant starts or the counter is reset.
      required: false
      type: integer
      default: 0
    restore:
      description: Try to restore the last known value when Home Assistant starts.
      required: false
      type: boolean
      default: true
    step:
      description: Incremental/step value for the counter.
      required: false
      type: integer
      default: 1
    minimum:
      description: Minimum value the counter will have
      required: false
      type: integer
    maximum:
      description: Maximum value the counter will have
      required: false
      type: integer
    icon:
      description: Icon to display for the counter.
      required: false
      type: icon
{% endconfiguration %}

Pick an icon that you can find on [materialdesignicons.com](https://materialdesignicons.com/) to use for your input and prefix the name with `mdi:`. For example `mdi:car`, `mdi:ambulance` or `mdi:motorbike`.

### Restore State

This integration will automatically restore the state it had prior to Home Assistant stopping as long as your entity has `restore` set to `true`, which is the default. To disable this feature, set `restore` to `false`.

If `restore` is set to `true`, the `initial` value will only be used when no previous state is found or when the counter is reset.

## Services

Available services: `increment`, `decrement`, `reset` and `configure`.

### Service `counter.increment`

Increments the counter with 1 or the given value for the steps.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `counter.my_custom_counter`. |

### Service `counter.decrement`

Decrements the counter with 1 or the given value for the steps.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `counter.my_custom_counter`. |

### Service `counter.reset`

With this service the counter is reset to its initial value.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `counter.my_custom_counter`. |

### Service `counter.configure`

With this service the properties of the counter can be changed while running.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `counter.my_custom_counter`. |
| `minimum`              |     yes  | Set new value for minimum. None disables minimum. |
| `maximum`              |     yes  | Set new value for maximum. None disables maximum. |
| `step`                 |     yes  | Set new value for step. |
| `initial`              |     yes  | Set new value for initial. |
| `value`                |     yes  | Set the counters state to the given value. |

### Use the service

Select the **Services** tab from within **Developer Tools**. Choose **counter** from the list of **Domains**, select the **Service**, enter something like the sample below into the **Service Data** field, and hit **CALL SERVICE**.

```json
{
  "entity_id": "counter.my_custom_counter"
}
```

## Examples

### Counting Home Assistant errors

To use a counter to count errors as caught by Home Assistant, you need to add `fire_event: true` to your `configuration.yaml`, like so:

```yaml
# Example configuration.yaml entry
system_log:
  fire_event: true
```

### Error counting - example configuration

```yaml
# Example configuration.yaml entry
automation:
- id: 'errorcounterautomation'
  alias: "Error Counting Automation"
  trigger:
    platform: event
    event_type: system_log_event
    event_data:
      level: ERROR
  action:
    service: counter.increment
    target:
      entity_id: counter.error_counter
    
counter:
  error_counter:
    name: Errors
    icon: mdi:alert  
```
