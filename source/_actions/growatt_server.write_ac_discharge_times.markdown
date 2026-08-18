---
title: "Write AC discharge times"
action: growatt_server.write_ac_discharge_times
domain: growatt_server
description: "Writes AC discharge settings and periods to a supported SPH inverter."
related_actions:
  - growatt_server.read_ac_discharge_times
  - growatt_server.write_ac_charge_times
---

The **Write AC discharge times** action writes the AC discharge settings and up to three discharge periods to a supported SPH inverter. You only need to provide the fields you want to change. Anything you leave out keeps its current value.

{% important %}
This action changes your inverter's discharging behavior. Incorrect settings can affect battery lifespan and energy costs. Make changes only if you understand your battery and tariff setup.
{% endimportant %}

{% include actions/ui_header.md %}

To write the AC discharge times from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Growatt: Write AC discharge times**.
6. Choose the **Device**, then set the values you want to change.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Device:
  description: The Growatt SPH inverter to write to.
  required: true
Discharge power:
  description: The discharge power limit, as a percentage (0 to 100).
  required: false
Discharge stop SOC:
  description: The state of charge, as a percentage, at which to stop discharging (0 to 100).
  required: false
Period 1 start:
  description: The start time for period 1, in `HH:MM` or `HH:MM:SS` format.
  required: false
Period 1 end:
  description: The end time for period 1, in `HH:MM` or `HH:MM:SS` format.
  required: false
Period 1 enabled:
  description: Whether period 1 is active.
  required: false
Period 2 start:
  description: The start time for period 2, in `HH:MM` or `HH:MM:SS` format.
  required: false
Period 2 end:
  description: The end time for period 2, in `HH:MM` or `HH:MM:SS` format.
  required: false
Period 2 enabled:
  description: Whether period 2 is active.
  required: false
Period 3 start:
  description: The start time for period 3, in `HH:MM` or `HH:MM:SS` format.
  required: false
Period 3 end:
  description: The end time for period 3, in `HH:MM` or `HH:MM:SS` format.
  required: false
Period 3 enabled:
  description: Whether period 3 is active.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `growatt_server.write_ac_discharge_times`. A basic example looks like this:

{% example %}
action: |
  action: growatt_server.write_ac_discharge_times
  data:
    device_id: a1b2c3d4e5f6
    discharge_power: 100
    discharge_stop_soc: 20
    period_1_start: "16:00"
    period_1_end: "20:00"
    period_1_enabled: true
{% endexample %}

This discharges the battery between 4 PM and 8 PM, down to 20% state of charge.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The Growatt SPH inverter to write to.
  required: true
  type: string
discharge_power:
  description: >
    The discharge power limit, as a percentage (0 to 100).
  required: false
  type: integer
discharge_stop_soc:
  description: >
    The state of charge, as a percentage, at which to stop discharging
    (0 to 100).
  required: false
  type: integer
period_1_start:
  description: >
    The start time for period 1, in `HH:MM` or `HH:MM:SS` format.
  required: false
  type: time
period_1_end:
  description: >
    The end time for period 1, in `HH:MM` or `HH:MM:SS` format.
  required: false
  type: time
period_1_enabled:
  description: >
    Whether period 1 is active.
  required: false
  type: boolean
  default: false
period_2_start:
  description: >
    The start time for period 2, in `HH:MM` or `HH:MM:SS` format.
  required: false
  type: time
period_2_end:
  description: >
    The end time for period 2, in `HH:MM` or `HH:MM:SS` format.
  required: false
  type: time
period_2_enabled:
  description: >
    Whether period 2 is active.
  required: false
  type: boolean
  default: false
period_3_start:
  description: >
    The start time for period 3, in `HH:MM` or `HH:MM:SS` format.
  required: false
  type: time
period_3_end:
  description: >
    The end time for period 3, in `HH:MM` or `HH:MM:SS` format.
  required: false
  type: time
period_3_enabled:
  description: >
    Whether period 3 is active.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
