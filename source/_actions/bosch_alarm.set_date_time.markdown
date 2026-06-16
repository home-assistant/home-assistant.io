---
title: "Set date & time"
action: bosch_alarm.set_date_time
domain: bosch_alarm
description: "Sets the date and time on a Bosch alarm panel."
---

Use this action to set the date and time on your Bosch alarm panel. When you do not provide a date and time, the current date and time of your Home Assistant instance are used.

This is handy to keep the clock on your panel in sync, for example with an automation that updates it after a power outage or on a regular schedule.

{% include actions/ui_header.md %}

To set the panel date and time from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Bosch Alarm: Set date & time**.
6. Select the **Config entry** of the panel to update. Optionally, set the **Date & time** you want.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config entry:
  description: The Bosch alarm panel to update.
  required: true
Date & time:
  description: The date and time to set. When not provided, the current date and time are used.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `bosch_alarm.set_date_time`. A basic example looks like this:

{% example %}
action: |
  action: bosch_alarm.set_date_time
  data:
    config_entry_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
    datetime: "2025-05-01T12:00:00"
{% endexample %}

This sets the date and time on the selected panel to the given value.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The Bosch alarm panel to update.
  required: true
  type: string
datetime:
  description: >
    The date and time to set. The time zone of your Home Assistant instance
    is assumed. When not provided, the current date and time is used.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- When you do not provide a date and time, the current date and time of your Home Assistant instance are used.
- The time zone of your Home Assistant instance is assumed for the value you provide.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
