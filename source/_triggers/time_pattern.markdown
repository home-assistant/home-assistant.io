---
title: "Time pattern"
trigger: time_pattern
domain: homeassistant
description: "Triggers periodically at a defined interval."
related_triggers:
  - time
  - homeassistant
---

The **Time pattern** trigger is useful when you want an automation to run on a repeating schedule. Use it when a fixed time is not enough, like every 5 minutes, at the top of every hour, or every day at 15 minutes past the hour.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select the type of trigger to add.
5. Select **Time pattern**.
6. Enter values for **Hours**, **Minutes**, or **Seconds**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Hours:
  description: Optional hour pattern.
Minutes:
  description: Optional minute pattern.
Seconds:
  description: Optional second pattern.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, use `trigger: time_pattern`. A basic example looks like this:

{% example %}
trigger: |
  trigger: time_pattern
  minutes: "/5"
{% endexample %}

This runs every 5 minutes.

### Options in YAML

{% options_yaml %}
trigger:
  description: The trigger type. For this trigger, use `time_pattern`.
  required: true
  type: string
hours:
  description: Optional hour pattern.
  required: false
  type: string
minutes:
  description: Optional minute pattern.
  required: false
  type: string
seconds:
  description: Optional second pattern.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- Use `*` to match any value.
- Use `/n` to match values divisible by `n`, like `/5` for every 5 minutes.
- If you set `hours` without `minutes`, Home Assistant uses minute `0`. If you set `minutes` without `seconds`, Home Assistant uses second `0`.
- Do not add leading zeroes to these values. For example, use `1`, not `01`.

{% include triggers/try_it.md %}

For this trigger, there is no target entity to change. To test it, set `minutes: "/1"` so the automation runs every minute.

{% include triggers/more_examples.md %}

### Automation: refresh an entity every 15 minutes

If you want a regular refresh, this automation updates an entity every 15 minutes.

- **Trigger**: Time pattern
  - **Minutes**: `/15`
- **Action**: Update entity

{% details "YAML example for a 15-minute entity refresh" %}

{% example %}
automation: |
  alias: "Refresh the weather entity every 15 minutes"
  triggers:
    - trigger: time_pattern
      minutes: "/15"
  actions:
    - action: homeassistant.update_entity
      target:
        entity_id: weather.home
{% endexample %}

{% enddetails %}

### Automation: send a reminder at 15 minutes past every hour

If you want a repeating reminder during the day, this automation sends a message at 15 minutes past every hour.

- **Trigger**: Time pattern
  - **Minutes**: `15`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for an hourly reminder" %}

{% example %}
automation: |
  alias: "Send an hourly reminder at 15 minutes past"
  triggers:
    - trigger: time_pattern
      minutes: 15
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "This is your hourly reminder."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
