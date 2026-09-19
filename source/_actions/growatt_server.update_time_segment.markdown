---
title: "Update time segment"
action: growatt_server.update_time_segment
domain: growatt_server
description: "Configures a battery time segment for supported MIN inverters."
related_actions:
  - growatt_server.read_time_segments
---

The **Update time segment** action configures one of the nine time segments on a supported MIN inverter. Each segment combines a battery operation mode, a time range, and an enabled state, so you can automate when your battery charges, discharges, or prioritizes your home loads.

{% important %}
This action changes your inverter's time-of-use scheduling. Incorrect settings can affect how your battery charges and discharges and what your energy costs are. Make sure you understand your electricity tariff before you make changes.
{% endimportant %}

{% include actions/ui_header.md %}

To update a time segment from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Growatt: Update time segment**.
6. Choose the **Device**, then set the segment values you want.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Device:
  description: The Growatt MIN inverter to update.
  required: true
Segment ID:
  description: The time segment to configure (1 to 9).
  required: true
Battery mode:
  description: "The energy priority mode for this segment. One of `load_first` (power your home from solar or battery first), `battery_first` (charge the battery from solar or grid first), or `grid_first` (export to the grid first, discharging the battery if needed)."
  required: true
Start time:
  description: The start time for the segment, in `HH:MM` format.
  required: true
End time:
  description: The end time for the segment, in `HH:MM` format.
  required: true
Enabled:
  description: Whether this time segment is active.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `growatt_server.update_time_segment`. A basic example looks like this:

{% example %}
action: |
  action: growatt_server.update_time_segment
  data:
    device_id: a1b2c3d4e5f6
    segment_id: 1
    batt_mode: battery_first
    start_time: "00:00"
    end_time: "06:00"
    enabled: true
{% endexample %}

This charges the battery between midnight and 6 AM using the first time segment.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The Growatt MIN inverter to update.
  required: true
  type: string
segment_id:
  description: >
    The time segment to configure (1 to 9).
  required: true
  type: integer
batt_mode:
  description: >
    The energy priority mode for this segment. One of `load_first`
    (power your home from solar or battery first), `battery_first`
    (charge the battery from solar or grid first), or `grid_first`
    (export to the grid first, discharging the battery if needed).
  required: true
  type: string
start_time:
  description: >
    The start time for the segment, in `HH:MM` format.
  required: true
  type: time
end_time:
  description: >
    The end time for the segment, in `HH:MM` format.
  required: true
  type: time
enabled:
  description: >
    Whether this time segment is active.
  required: true
  type: boolean
{% endoptions_yaml %}

## Good to know

The battery mode controls when and why discharging happens. The actual discharge rate is controlled by the **Discharge power** number entity (0 to 100%).

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
