---
layout: page
title: "Counter"
description: "Instructions on how to integrate counters into Home Assistant."
date: 2017-08-26 06:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Automation
ha_release: 0.53
ha_qa_scale: internal
---

The `counter` component allows one to count occurrences fired by automations.

To add a counter to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
counter:
  my_custom_counter:
    initial: 30
    step: 1
```

{% configuration %}
# 'alias' should be replaced by the user for their actual value.
"[alias]":
  description: Alias for the counter. Multiple entries are allowed.
  required: true
  type: map
  keys:
    name:
      description: Friendly name of the counter.
      required: false
      type: string
    initial:
      description: Initial value when Home Assistant starts or the counter is reset.
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
    icon:
      description: Icon to display for the counter.
      required: false
      type: icon
{% endconfiguration %}

Pick an icon that you can find on [materialdesignicons.com](https://materialdesignicons.com/) to use for your input and prefix the name with `mdi:`. For example `mdi:car`, `mdi:ambulance` or `mdi:motorbike`.

### {% linkable_title Restore State %}

This component will automatically restore the state it had prior to Home Assistant stopping as long as you your entity has `restore` set to `true` which is the default. To disable this feature, set `restore` to `false`.

If `restore` is set to `false`, the `initial` value will only be used when no previous state is found or when the counter is reset.

## {% linkable_title Services %}

Available services: `increment`, `decrement`, and `reset`.

#### {% linkable_title Service `counter.increment` %}

Increments the counter with 1 or the given value for the steps.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `counter.my_custom_counter`. |

#### {% linkable_title Service `counter.decrement` %}

Decrements the counter with 1 or the given value for the steps.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `counter.my_custom_counter`. |

#### {% linkable_title Service `counter.reset` %}

With this service the counter is reset to its initial value.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `counter.my_custom_counter`. |


### {% linkable_title Use the service %}

Select <img src='/images/screenshots/developer-tool-services-icon.png' alt='service developer tool icon' class="no-shadow" height="38" /> **Services** from the **Developer Tools**. Choose **counter** from the list of **Domains**, select the **Service**, enter something like the sample below into the **Service Data** field, and hit **CALL SERVICE**.

```json
{
  "entity_id": "counter.my_custom_counter"
}
```

