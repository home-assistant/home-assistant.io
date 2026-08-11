---
title: "Set date/time value"
action: datetime.set_value
domain: datetime
description: "Sets the value of a date/time entity."
---

Use this action to set a date/time entity to a specific date and time, for example a next-departure moment, a reminder, or any other timestamp you keep track of in Home Assistant.

{% include actions/ui_header.md %}

To set a date and time from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the date/time entity you want to set.
6. From the actions shown for that target, select **Set date/time**.
7. Set the **Date & Time** you want to apply.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Date & Time:
  description: The date and time to set on the entity.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `datetime.set_value`. A basic example looks like this:

{% example %}
action: |
  action: datetime.set_value
  target:
    entity_id: datetime.next_departure
  data:
    datetime: "2024-11-01T07:15:00"
{% endexample %}

This sets `datetime.next_departure` to November 1, 2024 at 07:15.

### Options in YAML

{% options_yaml %}
datetime:
  description: The date and time to set on the entity. If no time zone is included, the Home Assistant instance's time zone is used.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works with date/time entities.
- If you leave out the time zone, Home Assistant uses its own configured time zone.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: set a departure time when you leave for work

Update a date/time entity to a fixed moment, for example to record the next planned departure.

- **Trigger**: State: Work mode turns on
- **Action**: Set date/time
  - **Target**: Next departure
  - **Date & time**: A moment of your choosing

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Set the next departure time"
    triggers:
      - trigger: state
        entity_id: input_boolean.work_mode
        to: "on"
    actions:
      - action: datetime.set_value
        target:
          entity_id: datetime.next_departure
        data:
          datetime: "2024-11-01T07:15:00"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
