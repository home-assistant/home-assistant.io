---
title: "Update daily restrictions"
action: nintendo_parental_controls.update_daily_restrictions
domain: nintendo_parental_controls
description: "Updates restrictions for a specific day of the week on the selected Nintendo Switch."
---

The **Update daily restrictions** action updates playtime and bedtime restrictions for a specific day of the week on a specified device.

{% note %}
Daily restrictions can only be updated when the device's restriction mode is set to **Different for each day**.
{% endnote %}

{% important %}

Calling this action overwrites the existing daily configuration for the specified day:

- Any omitted restriction setting (`max_play_time`, or `bedtime_start`/`bedtime_end`) will be disabled for that day. For example, to adjust `max_play_time` while retaining an existing bedtime schedule, you must supply both `bedtime_start` and `bedtime_end` in the same call.
- To disable all restrictions for a specific day, provide only the `device_id` and `day_of_week`.
{% endimportant %}

This action does not support targets. In the UI, you are not prompted to choose an area, entity, or label. Instead, you select the Nintendo Switch to update restrictions for through the **Device** option.

{% include actions/ui_header.md %}

To update daily restrictions from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Nintendo Switch parental controls: Update daily restrictions**.
6. Choose the **Device**, select the **Day of the week**, and configure the playtime or bedtime restrictions as needed.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The ID of the device to update daily restrictions for.
Day of the week:
  description: The day of the week to update restrictions for (`monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, or `sunday`).
Max playtime:
  description: The maximum playtime allowed in minutes for this day (between 0 and 360). Omit to disable playtime limits for this day.
Bedtime start:
  description: The time when bedtime restrictions start (must be between 16:00 and 23:00). Both bedtime start and bedtime end must be provided to enable bedtime restrictions.
Bedtime end:
  description: The time from which play is allowed (must be between 05:00 and 09:00). Both bedtime start and bedtime end must be provided to enable bedtime restrictions.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `nintendo_parental_controls.update_daily_restrictions`. A basic example looks like this:

{% example %}
action: |
  action: nintendo_parental_controls.update_daily_restrictions
  data:
    device_id: 1b4a46c6d0f3406c80d275f5b0c6483b
    day_of_week: "friday"
    max_play_time: 120
    bedtime_start: "21:00:00"
    bedtime_end: "07:00:00"
{% endexample %}

This updates the restrictions for Friday on the selected Nintendo Switch.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the device to update daily restrictions for.
  required: true
  type: string
day_of_week:
  description: >
    The day of the week to update restrictions for (`monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, or `sunday`).
  required: true
  type: string
max_play_time:
  description: >
    The maximum playtime allowed in minutes for this day (between 0 and 360). Omit to disable playtime limits for this day.
  required: false
  type: integer
bedtime_start:
  description: >
    The time when bedtime restrictions start (must be between 16:00 and 23:00, or 00:00). Both `bedtime_start` and `bedtime_end` must be provided to enable bedtime restrictions.
  required: false
  type: time
bedtime_end:
  description: >
    The time from which play is allowed (must be between 05:00 and 09:00). Both `bedtime_start` and `bedtime_end` must be provided to enable bedtime restrictions.
  required: false
  type: time
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: Adjust weekend playtime and bedtime

This automation updates daily restrictions on Friday to allow more playtime and a later bedtime at the weekend.

- Trigger: Friday morning at 06:00
- Action: update daily restrictions on the Nintendo Switch
  - Device: the child's Nintendo Switch
  - Day of the week: `saturday`
  - Max playtime: `180`
  - Bedtime start: `22:00:00`
  - Bedtime end: `08:00:00`
- Action: update daily restrictions on the Nintendo Switch
  - Device: the child's Nintendo Switch
  - Day of the week: `sunday`
  - Max playtime: `180`
  - Bedtime start: `22:00:00`
  - Bedtime end: `08:00:00`

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Set weekend playtime on Friday"
  triggers:
    - trigger: time
      at: "06:00:00"
  conditions:
    - condition: time
      weekday:
        - fri
  actions:
    - action: nintendo_parental_controls.update_daily_restrictions
      data:
        device_id: 1b4a46c6d0f3406c80d275f5b0c6483b
        day_of_week: "saturday"
        max_play_time: 180
        bedtime_start: "22:00:00"
        bedtime_end: "08:00:00"
    - action: nintendo_parental_controls.update_daily_restrictions
      data:
        device_id: 1b4a46c6d0f3406c80d275f5b0c6483b
        day_of_week: "sunday"
        max_play_time: 180
        bedtime_start: "22:00:00"
        bedtime_end: "08:00:00"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
