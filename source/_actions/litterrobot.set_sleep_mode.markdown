---
title: "Set sleep mode"
action: litterrobot.set_sleep_mode
domain: litterrobot
description: "Sets the sleep mode and start time on a Litter-Robot."
---

The **Set sleep mode** action turns sleep mode on or off for a Litter-Robot. When sleep mode is enabled, the Litter-Robot does not run an automatic clean cycle for 8 hours starting from the time you choose.

This is handy for keeping the unit quiet overnight or while you are nearby, without changing settings in the Whisker app.

{% include actions/ui_header.md %}

To set sleep mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Litter-Robot: Set sleep mode**.
6. Under **Targets**, choose the Litter-Robot entities to control.
7. Turn **Enabled** on or off, and optionally set a **Start time**.
8. Select **Save**.

{% include actions/targets.md domain="vacuum" %}

### Options in the UI

{% options_ui %}
Enabled:
  description: Whether sleep mode should be enabled.
  required: true
Start time:
  description: The time at which the Litter-Robot enters sleep mode and prevents an automatic clean cycle for 8 hours.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `litterrobot.set_sleep_mode`. A basic example looks like this:

{% example %}
action: |
  action: litterrobot.set_sleep_mode
  target:
    entity_id: vacuum.litter_robot_litter_box
  data:
    enabled: true
    start_time: "22:30:00"
{% endexample %}

This enables sleep mode starting at 10:30 PM.

### Options in YAML

{% options_yaml %}
enabled:
  description: >
    Whether sleep mode should be enabled.
  required: true
  type: boolean
start_time:
  description: >
    The time at which the Litter-Robot enters sleep mode and prevents an
    automatic clean cycle for 8 hours. Use the 24-hour format
    %H:%M:%S, with seconds being optional, based on your Home Assistant
    time zone. For example, 22:30:00 is 10:30 PM.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- Sleep mode scheduling through this action is currently limited to the Litter-Robot 3. To change the sleep schedule on a Litter-Robot 4, use the Whisker app.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
