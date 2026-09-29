---
title: "Check date"
action: workday.check_date
domain: workday
description: "Checks whether a given date is a workday."
---

Use this action to check whether a specific date is a workday, based on the workdays and holidays you configured for your Workday sensor.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To check a date from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select your Workday sensor.
6. From the actions shown for that target, select **Check date**.
7. Set the **Date** you want to check.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Date:
  description: The date to check, such as 2023-12-25.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `workday.check_date`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: workday.check_date
  target:
    entity_id: binary_sensor.workday
  data:
    check_date: "2023-12-25"
  response_variable: check_date
{% endexample %}

This checks whether 2023-12-25 is a workday for `binary_sensor.workday`.

### Options in YAML

{% options_yaml %}
check_date:
  description: The date to check, such as 2023-12-25.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="binary_sensor" %}

## Response data

The action returns a `workday` field that is `true` when the date is a workday and `false` when it is not.

A shortened example of the response looks like this:

```yaml
binary_sensor.workday:
  workday: true
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
