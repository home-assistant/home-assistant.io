---
title: "Set timer"
action: neopool.set_timer
domain: neopool
description: "Set or update one of the controller's built-in timers (filtration timers and per-relay timers for Light and AUX1-AUX4)."
since: "2026.7"
related_actions:
  - neopool.read_register
  - neopool.write_register
---

The **Set timer** action configures one of the NeoPool controller's built-in timers. Use it to program filtration windows (`filtration1`, `filtration2`, `filtration3`) or per-relay timers for the auxiliary relays (`aux1`-`aux4`) and the lighting relay (`light`).

The controller stores the timer configuration in non-volatile memory; the new schedule survives reboots and continues to fire even if Home Assistant is offline.

{% include actions/ui_header.md %}

To configure a timer from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **NeoPool: Set timer**.
6. Fill in the **Timer name** (for example, `filtration1`) and the timer parameters you want to update.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Entry ID:
  description: Config entry ID of the NeoPool integration. Optional when only one NeoPool entry is configured.
  required: false
Timer name:
  description: Identifier of the timer to configure. Filtration timers are `filtration1`, `filtration2`, `filtration3`. Relay timers are `light`, `aux1`, `aux2`, `aux3`, `aux4`.
Start time:
  description: Start time in `HH:MM` format (for example, `08:00`).
  required: false
Stop time:
  description: Stop time in `HH:MM` format (for example, `16:00`).
  required: false
Repeat interval:
  description: Repeat interval in seconds for AUX and Light timers (for example, `86400` for once per day). Not used for filtration timers.
  required: false
Enable mode:
  description: Relay mode for AUX and Light timers (`0` = disabled, `1` = auto, `2` = auto linked, `3` = always on, `4` = always off). Not used for filtration timers.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `neopool.set_timer`. A basic example looks like this:

{% example %}
action: |
  action: neopool.set_timer
  data:
    timer: filtration1
    start: "08:00"
    stop: "11:00"
{% endexample %}

This sets the first filtration window to run from 08:00 to 11:00 every day.

### Options in YAML

{% options_yaml %}
entry_id:
  description: >
    Config entry ID of the NeoPool integration. Optional when only one NeoPool entry is configured.
  required: false
  type: string
timer:
  description: >
    Identifier of the timer to configure. Filtration timers are `filtration1`, `filtration2`, `filtration3`. Relay timers are `light`, `aux1`, `aux2`, `aux3`, `aux4`.
  required: true
  type: string
start:
  description: >
    Start time in `HH:MM` format.
  required: false
  type: string
stop:
  description: >
    Stop time in `HH:MM` format.
  required: false
  type: string
period:
  description: >
    Repeat interval in seconds for AUX and Light timers (for example, `86400` for once per day). Not used for filtration timers.
  required: false
  type: integer
enable:
  description: >
    Relay mode for AUX and Light timers (`0` = disabled, `1` = auto, `2` = auto linked, `3` = always on, `4` = always off). Not used for filtration timers.
  required: false
  type: integer
{% endoptions_yaml %}

## Good to know

- Filtration timers (`filtration1`, `filtration2`, `filtration3`) only honor `start` and `stop`. The `period` and `enable` fields are ignored.
- Relay timers (`light`, `aux1`-`aux4`) honor all fields. Set `enable` to `1` (auto) to let the timer fire on schedule, `3` (always on) to override on, or `4` (always off) to override off.
- Time values in `start` and `stop` are interpreted in the controller's local time, not Home Assistant's.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Action: schedule a midday filtration window

Configure the second filtration window to run from 13:00 to 15:00.

{% details "YAML example for a midday filtration window" %}

{% example %}
action: |
  action: neopool.set_timer
  data:
    timer: filtration2
    start: "13:00"
    stop: "15:00"
{% endexample %}

{% enddetails %}

### Action: configure an AUX1 timer to fire once per day

Set AUX1 to turn on at 20:00 every day for two hours.

{% details "YAML example for a daily AUX1 timer" %}

{% example %}
action: |
  action: neopool.set_timer
  data:
    timer: aux1
    start: "20:00"
    stop: "22:00"
    period: 86400
    enable: 1
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
