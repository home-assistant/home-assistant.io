---
title: "Remove charge schedule"
action: tesla_fleet.remove_charge_schedule
domain: tesla_fleet
description: "Removes a charging schedule from a vehicle."
related_actions:
  - tesla_fleet.add_charge_schedule
---

Use this action to remove a charging schedule from a Tesla vehicle by its schedule ID.

You can get the schedule ID from the response of [Add charge schedule](/actions/tesla_fleet.add_charge_schedule/), or from the **Schedules** attribute of the vehicle's charge schedules {% term sensor %}.

{% include actions/ui_header.md %}

To remove a charge schedule from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Tesla Fleet: Remove charge schedule**.
6. Select the **Vehicle** to remove the schedule from, and set **Schedule ID**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Vehicle:
  description: The vehicle to remove the schedule from.
  required: true
Schedule ID:
  description: The ID of the schedule to remove.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tesla_fleet.remove_charge_schedule`. A basic example looks like this:

{% example %}
action: |
  action: tesla_fleet.remove_charge_schedule
  data:
    device_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
    id: 1704067200
{% endexample %}

This removes the schedule with ID `1704067200` from the selected vehicle.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The vehicle to remove the schedule from.
  required: true
  type: string
id:
  description: >
    The ID of the schedule to remove.
  required: true
  type: integer
{% endoptions_yaml %}

## Good to know

- Your Tesla Developer Application must have the vehicle charging commands scope selected, and the vehicle may need to wake up to receive the request, which can take a few seconds.
- Removing a schedule that no longer exists on the vehicle fails with an error.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: remove an off-peak charging schedule in summer

When summer begins, remove the off-peak winter charging schedule you no longer need.

- **Trigger**: Time: 00:00:00, in June
- **Action**: Tesla Fleet: Remove charge schedule
  - **Target**: My Tesla
  - **Schedule ID**: 1704067200

{% details "YAML example for removing a seasonal charging schedule" %}

{% example %}
automation: |
  alias: "Remove winter charging schedule"
  triggers:
    - trigger: time
      at: "00:00:00"
  conditions:
    - condition: template
      value_template: "{{ now().month == 6 }}"
  actions:
    - action: tesla_fleet.remove_charge_schedule
      data:
        device_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
        id: 1704067200
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
