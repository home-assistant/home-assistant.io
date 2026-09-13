---
title: "Set timer"
action: neopool.set_timer
domain: neopool
description: "Sets or updates one of the controller's timers, such as a filtration or auxiliary-relay schedule."
related_actions:
  - neopool.get_device_time
  - neopool.set_device_time
  - neopool.read_register
  - neopool.write_register
---

Use this action to set or update one of the controller's timers, such as a filtration or auxiliary-relay schedule.

This action requires a Home Assistant administrator account.

{% include actions/ui_header.md %}

To set a timer from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **NeoPool: Set timer**.
6. Fill in the **Timer name** and the fields you want to change.
7. Optionally select the **Device**. With a single controller, you can leave it empty.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The NeoPool controller to target. Optional when only one controller is configured.
  required: false
Timer name:
  description: "The timer identifier, such as `filtration1` or `filtration2`."
  required: true
Start time:
  description: "Start time in `HH:MM` format, such as `08:00`."
  required: false
Stop time:
  description: "Stop time in `HH:MM` format, such as `16:00`."
  required: false
Repeat interval:
  description: "Repeat interval in seconds for auxiliary and light timers, such as `86400` for once a day. Not used for filtration timers."
  required: false
Enable:
  description: "Timer mode, from 0 to 4 (0 disabled, 1 auto, 2 auto linked, 3 on, 4 off)."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `neopool.set_timer`. A basic example looks like this:

{% example %}
action: |
  action: neopool.set_timer
  data:
    device_id: abc123device456
    timer: filtration1
    start: "08:00"
    stop: "16:00"
    enable: 1
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The NeoPool controller to target. Optional when only one controller is configured.
  required: false
  type: string
timer:
  description: "The timer identifier, such as `filtration1` or `filtration2`."
  required: true
  type: string
start:
  description: "Start time in `HH:MM` format, such as `08:00`."
  required: false
  type: string
stop:
  description: "Stop time in `HH:MM` format, such as `16:00`."
  required: false
  type: string
period:
  description: "Repeat interval in seconds for auxiliary and light timers, such as `86400` for once a day. Not used for filtration timers."
  required: false
  type: integer
enable:
  description: "Timer mode, from 0 to 4 (0 disabled, 1 auto, 2 auto linked, 3 on, 4 off)."
  required: false
  type: integer
{% endoptions_yaml %}

## Good to know

- The action updates only the fields you provide and leaves the rest unchanged, so you must provide at least one of **Start time**, **Stop time**, **Repeat interval**, or **Enable**.
- A **Stop time** always needs a **Start time**, so provide both when you set the schedule.
- Each change is saved to the controller's memory, which has a limited number of write cycles. Avoid running this action on a fixed schedule or in a loop.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
