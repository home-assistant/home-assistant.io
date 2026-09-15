---
title: "Set date value"
action: date.set_value
domain: date
description: "Sets the value of a date entity."
---

Use this action to set a date entity to a specific date, for example a next-service date, a holiday start, or any other date you keep track of in Home Assistant.

{% include actions/ui_header.md %}

To set a date from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the date entity you want to set.
6. From the actions shown for that target, select **Set date**.
7. Set the **Date** you want to apply.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Date:
  description: The date to set on the entity, in `YYYY-MM-DD` format.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `date.set_value`. A basic example looks like this:

{% example %}
action: |
  action: date.set_value
  target:
    entity_id: date.next_service
  data:
    date: "2024-11-01"
{% endexample %}

This sets `date.next_service` to November 1, 2024.

### Options in YAML

{% options_yaml %}
date:
  description: The date to set on the entity, in `YYYY-MM-DD` format.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works with date entities.
- Provide the date in `YYYY-MM-DD` format, for example `2024-11-01`.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: set a reminder date when a task completes

Move a date entity forward whenever a maintenance task is marked done.

- **Trigger**: State: Filter replaced changes to _on_
- **Action**: Set date
  - **Target**: Next filter change
  - **Date**: A date of your choosing

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Set the next filter change date"
    triggers:
      - trigger: state
        entity_id: input_boolean.filter_replaced
        to: "on"
    actions:
      - action: date.set_value
        target:
          entity_id: date.next_filter_change
        data:
          date: "2024-11-01"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
