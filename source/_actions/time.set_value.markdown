---
title: "Set time value"
action: time.set_value
domain: time
description: "Sets the value of a time entity."
---

Use this action to set a time entity to a specific time, for example a wake-up time, a watering schedule, or any other time you keep track of in Home Assistant.

{% include actions/ui_header.md %}

To set a time from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the time entity you want to set.
6. From the actions shown for that target, select **Set time**.
7. Set the **Time** you want to apply.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Time:
  description: The time to set on the entity, in `HH:MM:SS` format.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `time.set_value`. A basic example looks like this:

{% example %}
action: |
  action: time.set_value
  target:
    entity_id: time.wake_up
  data:
    time: "07:15:00"
{% endexample %}

This sets `time.wake_up` to 07:15.

### Options in YAML

{% options_yaml %}
time:
  description: The time to set on the entity, in `HH:MM:SS` format.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works with time entities.
- Provide the time in 24-hour `HH:MM:SS` format, for example `07:15:00`.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: set a watering time at sunset

Update a time entity every evening, for example to schedule the next morning's watering.

- **Trigger**: Sun: Sunset
- **Action**: Set time
  - **Target**: Garden watering time
  - **Time**: A time of your choosing

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Set the next watering time"
    triggers:
      - trigger: sun
        event: sunset
    actions:
      - action: time.set_value
        target:
          entity_id: time.garden_watering
        data:
          time: "07:00:00"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
