---
title: "Update the charge schedules of a Renault vehicle"
action: renault.charge_set_schedules
domain: renault
description: "Updates the charge schedules of a Renault vehicle."
related_actions:
  - renault.charge_set_immediate
  - renault.charge_start
---

Use this action to update the charge schedules of a Renault vehicle, so it charges at the times you choose, for example during off-peak energy hours. You can update one or more schedules in a single call.

Charge control may require an active subscription, such as the *Pack EV Remote Control*, and is not available on all vehicles.

{% include actions/ui_header.md %}

To update the charge schedules from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for the action **Renault: Update charge schedule** and select it.
6. Select the vehicle in the **Vehicle** field and enter the **Schedules**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Vehicle:
  description: The Renault vehicle to send the command to.
Schedules:
  description: One or more schedules to set. See [Good to know](#good-to-know) for the structure.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `renault.charge_set_schedules`. A basic example looks like this:

{% example %}
action: |
  action: renault.charge_set_schedules
  data:
    vehicle: abcde1234567890abcde1234567890ab
    schedules:
      - id: 1
        activated: true
        monday:
          startTime: "T12:00Z"
          duration: 15
{% endexample %}

### Options in YAML

{% options_yaml %}
vehicle:
  description: The ID of the Renault vehicle to send the command to.
  required: true
  type: string
schedules:
  description: One or more schedules to set. See [Good to know](#good-to-know) for the structure.
  required: true
  type: list
{% endoptions_yaml %}

This action does not support targets. Select the vehicle through the **Vehicle** field.

## Good to know

The `schedules` option takes one or more schedules, which are all set in the same call. Each schedule is a mapping with the following keys:

- `id`: Required. The schedule number, from 1 to 5, depending on the vehicle.
- `activated`: Optional. Whether the schedule is active. If you leave it out, the current setting is kept.
- `monday` to `sunday`: Optional. The schedule for each day. If you leave a day out, its current setting is kept. If you set a day to an empty value, its setting is cleared. When you set a day, it must contain a `startTime` key in UTC, in the `THH:MMZ` format, and a `duration` key in minutes.

```yaml
- id: 1
  activated: true
  monday:
    startTime: "T12:00Z"
    duration: 15
- id: 2
  activated: false
  monday:
    startTime: "T12:00Z"
    duration: 15
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
