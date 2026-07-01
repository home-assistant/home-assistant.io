---
title: "Remove precondition schedule"
action: teslemetry.remove_precondition_schedule
domain: teslemetry
description: "Removes a preconditioning schedule from the vehicle."
related_actions:
  - teslemetry.add_precondition_schedule
  - teslemetry.remove_charge_schedule
---

The **Remove precondition schedule** action deletes a location-based preconditioning schedule from your Tesla vehicle. You identify the schedule to remove by its schedule ID.

Use it to clean up preconditioning schedules you no longer need, for example removing a schedule after a change in your routine.

{% include actions/ui_header.md %}

To remove a precondition schedule from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Teslemetry: Remove precondition schedule**.
6. Select the **Vehicle**.
7. Enter the **Schedule ID** to remove.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Vehicle:
  description: The vehicle to remove the schedule from.
Schedule ID:
  description: The ID of the schedule to remove.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `teslemetry.remove_precondition_schedule`. A basic example looks like this:

{% example %}
action: |
  action: teslemetry.remove_precondition_schedule
  data:
    device_id: 0d462c0c4c0b064b1a91cdbd1ffcbd31
    id: 1
{% endexample %}

This removes the preconditioning schedule with ID `1`.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the vehicle to remove the schedule from.
  required: true
  type: string
id:
  description: >
    The ID of the schedule to remove.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
