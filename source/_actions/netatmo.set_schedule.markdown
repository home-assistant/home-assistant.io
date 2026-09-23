---
title: "Set heating schedule"
action: netatmo.set_schedule
domain: netatmo
description: "Activates a heating schedule for a Netatmo climate device."
related_actions:
  - netatmo.set_preset_mode_with_end_datetime
  - netatmo.set_temperature_with_end_datetime
  - netatmo.set_temperature_with_time_period
  - netatmo.clear_temperature_setting
---

Use this action to switch a Netatmo climate device to one of the heating schedules you created in the Netatmo app. The schedule name you provide must match a schedule configured at Netatmo.

{% include actions/ui_header.md %}

To activate a heating schedule from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Netatmo climate device you want to control.
6. From the actions shown for that target, select **Set heating schedule**.
7. Enter the **Schedule name** you want to activate.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Schedule name:
  description: The name of the schedule to activate. It must match a schedule configured at Netatmo.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `netatmo.set_schedule`. A basic example looks like this:

{% example %}
action: |
  action: netatmo.set_schedule
  target:
    entity_id: climate.living_room
  data:
    schedule_name: Standard
{% endexample %}

This activates the schedule named `Standard` for `climate.living_room`.

### Options in YAML

{% options_yaml %}
schedule_name:
  description: The name of the schedule to activate. It must match a schedule configured at Netatmo.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- You create and name heating schedules in the Netatmo app. The name you use here must match one of those schedules exactly.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: switch to your away schedule when everyone leaves

Activate an energy-saving schedule when nobody is home.

- **Trigger**: Everyone leaves home
- **Action**: Set heating schedule
  - **Target**: Living room thermostat
  - **Schedule name**: Away

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Switch to the away schedule when everyone leaves"
    triggers:
      - trigger: state
        entity_id: zone.home
        to: "0"
    actions:
      - action: netatmo.set_schedule
        target:
          entity_id: climate.living_room
        data:
          schedule_name: Away
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
