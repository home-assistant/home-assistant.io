---
layout: page
title: "Counter"
description: "Instructions how to integrate counters into Home Assistant."
date: 2017-08-26 06:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Automation
ha_release: 0.53
---

The `counter` component allows one to count occurrences fired by automations.

To add a counter to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
counter:
  counter:
    initial: 30
    step: 1
```

Configuration variables:

- **[alias]** (*Required*): Alias for the counter. Multiple entries are allowed.
  - **name** (*Optional*): Friendly name of the counter.
  - **initial** (*Optional*): Initial value when Home Assistant starts. Defaults to 0.
  - **step** (*Optional*): Incremental/step value for the counter. Defaults to 1 (increments by 1).
  - **icon** (*Optional*): Icon for entry.

Pick an icon that you can find on [materialdesignicons.com](https://materialdesignicons.com/) to use for your input and prefix the name with `mdi:`. For example `mdi:car`, `mdi:ambulance` or `mdi:motorbike`.

## {% linkable_title Services %}

Available services: `increment`, `decrement`, and `reset`.

#### {% linkable_title Service `counter.increment` %}

Increments the counter with 1 or the given value for the steps.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `counter.count0`. |

#### {% linkable_title Service `counter.decrement` %}

Decrements the counter with 1 or the given value for the steps.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `counter.count0`. |

#### {% linkable_title Service `counter.reset` %}

With this service the counter is reset to its initial value.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `counter.count0`. |


### {% linkable_title Use the service %}

Select <img src='/images/screenshots/developer-tool-services-icon.png' alt='service developer tool icon' class="no-shadow" height="38" /> **Services** from the **Developer Tools**. Choose **counter** from the list of **Domains**, select the **Service**, enter something like the sample below into the **Service Data** field, and hit **CALL SERVICE**.

```json
{
  "entity_id": "counter.count0"
}
```

