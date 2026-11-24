---
title: "Set battery cut-offs"
action: sofar.set_battery_cutoffs
domain: sofar
description: "Sets the levels at which the battery stops discharging and charging, as in the SofarCloud app."
related_actions:
  - sofar.set_passive_mode_power
  - sofar.set_feed_in_limit
  - sofar.set_active_power_limit
---

Use this action to set the charge levels at which your Sofar inverter stops discharging the battery, with the grid up and during a grid outage, and the level at which it stops charging. These are the same cut-offs, with the same ranges, as on the battery parameters page of the SofarCloud app. Only available on three-phase hybrid inverters with battery storage, and not for lead-acid batteries.

The inverter stores each change, so use this action for settings you change now and then, such as keeping a larger reserve ahead of a storm, rather than in automations that run often.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To set the battery cut-offs from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Sofar: Set battery cut-offs**.
6. Select the **Inverter**, and enter the **On-grid discharge cut-off state of charge**, the **Off-grid discharge cut-off state of charge**, and the **Off-grid discharge recovery state of charge**. Optionally, enter the **Charge cut-off state of charge**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Inverter:
  description: The Sofar inverter to send this to.
  required: true
On-grid discharge cut-off state of charge:
  description: The charge level at which the battery stops discharging while the grid is up, from 10 to 100%. It can't be below the off-grid discharge cut-off.
  required: true
Off-grid discharge cut-off state of charge:
  description: The charge level at which the battery stops discharging during a grid outage, from 10 to 30%.
  required: true
Off-grid discharge recovery state of charge:
  description: The charge level the battery recharges to before it discharges off-grid again, up to 100%. It must be at least 5% above the off-grid discharge cut-off.
  required: true
Charge cut-off state of charge:
  description: The charge level at which the battery stops charging, from 60 to 100%. Left unchanged when you leave it out. Not every inverter supports it.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sofar.set_battery_cutoffs`. A basic example looks like this:

{% example %}
action: |
  action: sofar.set_battery_cutoffs
  data:
    config_entry_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
    on_grid_discharge_cutoff_soc: 20
    off_grid_discharge_cutoff_soc: 10
    off_grid_recovery_soc: 20
{% endexample %}

This lets the battery discharge down to 20% while the grid is up, and down to 10% during a grid outage. After an off-grid cut-off, the battery recharges to 20% before it discharges off-grid again.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The Sofar inverter to send this to.
  required: true
  type: string
on_grid_discharge_cutoff_soc:
  description: >
    The charge level at which the battery stops discharging while the grid
    is up, from 10 to 100%. It can't be below the off-grid discharge cut-off.
  required: true
  type: integer
off_grid_discharge_cutoff_soc:
  description: >
    The charge level at which the battery stops discharging during a grid
    outage, from 10 to 30%.
  required: true
  type: integer
off_grid_recovery_soc:
  description: >
    The charge level the battery recharges to before it discharges off-grid
    again, up to 100%. It must be at least 5% above the off-grid discharge
    cut-off.
  required: true
  type: integer
charge_cutoff_soc:
  description: >
    The charge level at which the battery stops charging, from 60 to 100%.
    Left unchanged when you leave it out. Not every inverter supports it.
  required: false
  type: integer
{% endoptions_yaml %}

## Good to know

- This action is only available on three-phase hybrid inverters with battery storage. It doesn't support lead-acid batteries, including AGM, gel, and flooded batteries. On other inverters or batteries, the action fails with an error instead of doing nothing silently.
- If you set a **Charge cut-off state of charge** on an inverter that doesn't support it, the action fails with an error, and nothing is changed.
- If all the cut-offs you set already have those values, nothing is written to the inverter.
- To see the cut-offs currently stored on the inverter, enable the battery configuration sensors, such as **On-grid discharge cut-off state of charge**. They're disabled by default.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: keep a larger reserve ahead of a storm

A storm can take the grid down for hours, and a battery that's already run down by the evening's loads won't carry the house through. This automation reacts to an `input_boolean` helper you create and turn on when a storm is forecast, and raises the on-grid cut-off to 50%, so half of the battery is kept for an outage. A second automation, or the same one with another trigger, can set it back when the helper turns off.

- **Trigger**: State changed
  - **Entity**: Storm warning helper
  - **To**: On
- **Action**: Set battery cut-offs
  - **Inverter**: Your Sofar inverter
  - **On-grid discharge cut-off state of charge**: `50`
  - **Off-grid discharge cut-off state of charge**: `10`
  - **Off-grid discharge recovery state of charge**: `20`

{% details "YAML example for keeping a storm reserve" %}

{% example %}
automation: |
  alias: "Keep a Sofar battery reserve ahead of a storm"
  triggers:
    - trigger: state
      entity_id: input_boolean.storm_warning
      to: "on"
  actions:
    - action: sofar.set_battery_cutoffs
      data:
        config_entry_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
        on_grid_discharge_cutoff_soc: 50
        off_grid_discharge_cutoff_soc: 10
        off_grid_recovery_soc: 20
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
