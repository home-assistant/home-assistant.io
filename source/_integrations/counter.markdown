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

The Counter integration allows one to count occurrences fired by automations.

## Configuration

The preferred way to configure counter helpers is via the user interface. To add one, go to
**{% my helpers title="Settings > Devices & Services > Helpers" %}** and click the add button;
next choose the **{% my config_flow_start domain=page.ha_domain title=page.title %}** option.

To be able to add **Helpers** via the user interface you should have
`default_config:` in your {% term "`configuration.yaml`" %}, it should already be there by
default unless you removed it. If you removed `default_config:` from your
configuration, you must add `counter:` to your {% term "`configuration.yaml`" %} first,
then you can use the UI.

Counters can also be configured via {% term "`configuration.yaml`" %}:

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

Pick an icon that from [Material Design Icons](https://pictogrammers.com/library/mdi/) to use for your input and prefix the name with `mdi:`. For example `mdi:car`, `mdi:ambulance` or `mdi:motorbike`.

### Restore state

This integration will automatically restore the state it had prior to Home Assistant stopping as long as your entity has `restore` set to `true`, which is the default. To disable this feature, set `restore` to `false`.

If `restore` is set to `true`, the `initial` value will only be used when no previous state is found or when the counter is reset.

## Actions

Available actions: `increment`, `decrement`, `reset`, and `set_value`.

### Action `counter.increment`

Increments the counter with 1 or the given value for the steps.

| Data attribute | Optional | Description                                                           |
| ---------------------- | -------- | --------------------------------------------------------------------- |
| `entity_id`            | no       | Name of the entity to take action, e.g., `counter.my_custom_counter`. |

### Action `counter.decrement`

Decrements the counter with 1 or the given value for the steps.

| Data attribute | Optional | Description                                                           |
| ---------------------- | -------- | --------------------------------------------------------------------- |
| `entity_id`            | no       | Name of the entity to take action, e.g., `counter.my_custom_counter`. |

### Action `counter.reset`

With this action the counter is reset to its initial value.

| Data attribute | Optional | Description                                                           |
| ---------------------- | -------- | --------------------------------------------------------------------- |
| `entity_id`            | no       | Name of the entity to take action, e.g., `counter.my_custom_counter`. |

### Action `counter.set_value`

This action allows setting the counter to a specific value.

| Data attribute | Optional | Description                                                           |
| ---------------------- | -------- | --------------------------------------------------------------------- |
| `entity_id`            | no       | Name of the entity to take action, e.g., `counter.my_custom_counter`. |
| `value`                | yes      | Set the counter to the given value.                                   |

### Use the action

Select the **Actions** tab from within **Developer Tools**. Choose **counter** from the list of **Domains**, select the **Actions**, enter something like the sample below into the **data** field, and select **Perform action**.

```json
{
  "entity_id": "counter.my_custom_counter"
}
```

## Examples

### Counting Home Assistant errors

To use a counter to count errors as caught by Home Assistant, you need to add `fire_event: true` to your {% term "`configuration.yaml`" %}, like so:

```yaml
# Example configuration.yaml entry
system_log:
  fire_event: true
```

### Error counting - example configuration

```yaml
# Example configuration.yaml entry
automation:
- alias: "Error Counting Automation"
  triggers:
    - trigger: event
      event_type: system_log_event
      event_data:
        level: ERROR
  actions:
    - action: counter.increment
      target:
        entity_id: counter.error_counter
    
counter:
  error_counter:
    name: Errors
    icon: mdi:alert  
```
