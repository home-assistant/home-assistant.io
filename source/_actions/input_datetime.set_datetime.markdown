---
title: "Set input datetime value"
action: input_datetime.set_datetime
domain: input_datetime
description: "Sets the date and/or time of an input datetime."
related_actions:
  - input_datetime.reload
---

Use this action to set the date, the time, or both for one or more input datetimes. An input datetime is a helper you can use in automations and scripts to store a date, a time, or a combination of the two.

{% include actions/ui_header.md %}

To set an input datetime from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the input datetime you want to set.
6. From the actions shown for that target, select **Set input datetime value**.
7. Enter a **Date**, a **Time**, or both, depending on what the helper stores.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Date:
  description: The target date, in the format `YYYY-MM-DD`.
Time:
  description: The target time, in the format `HH:MM:SS`.
Date & time:
  description: The target date and time, in the format `YYYY-MM-DD HH:MM:SS`.
Timestamp:
  description: The target date and time, expressed as a UNIX timestamp.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `input_datetime.set_datetime`. A basic example looks like this:

{% example %}
action: |
  action: input_datetime.set_datetime
  target:
    entity_id: input_datetime.alarm_clock
  data:
    time: "05:30:00"
{% endexample %}

This sets the time of the `input_datetime.alarm_clock` helper to `05:30:00`.

### Options in YAML

You must provide at least one of `date`, `time`, `datetime`, or `timestamp`.

{% options_yaml %}
date:
  description: The target date, in the format `YYYY-MM-DD`.
  required: false
  type: string
time:
  description: The target time, in the format `HH:MM:SS`.
  required: false
  type: string
datetime:
  description: The target date and time, in the format `YYYY-MM-DD HH:MM:SS`.
  required: false
  type: string
timestamp:
  description: The target date and time, expressed as a UNIX timestamp.
  required: false
  type: float
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- Use `date` and `time` together, or use `datetime` or `timestamp` on their own, to set both the date and the time in a single call.
- The value you set must match what the helper stores. A date-only helper accepts a date, a time-only helper accepts a time, and a helper that stores both accepts either both fields or a single `datetime` or `timestamp` value.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
