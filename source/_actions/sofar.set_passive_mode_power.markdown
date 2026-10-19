---
title: "Set passive mode power"
action: sofar.set_passive_mode_power
domain: sofar
description: "Commands the passive-mode setpoints."
related_actions:
  - sofar.set_passive_mode_timeout
  - sofar.set_feed_in_limit
  - sofar.set_active_power_limit
---

Use this action to directly command a Sofar inverter's battery and grid power in passive mode: how much power to draw from (or export to) the grid, and the battery power window the inverter is allowed to use to get there. All three values are signed and go out to the inverter as one write. Only available on inverters with battery storage.

Set a [passive-mode timeout](/actions/sofar.set_passive_mode_timeout/) as well, so the inverter falls back to normal behavior if nothing sends a new command in time.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To set the passive-mode setpoints from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Sofar: Set passive mode power**.
6. Select the **Inverter**, the **Grid power**, and the **Minimum battery power** and **Maximum battery power**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Inverter:
  description: The Sofar inverter to send this to.
  required: true
Grid power:
  description: The power to draw from the grid, in watts. A negative value exports instead.
  required: true
Minimum battery power:
  description: The lower end of the battery power window, in watts.
  required: true
Maximum battery power:
  description: The upper end of the battery power window, in watts.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sofar.set_passive_mode_power`. A basic example looks like this:

{% example %}
action: |
  action: sofar.set_passive_mode_power
  data:
    config_entry_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
    grid_power: 1000
    battery_power_min: -2000
    battery_power_max: 2000
{% endexample %}

This asks the inverter to draw 1000 W from the grid, while allowing the battery to swing between exporting 2000 W and drawing 2000 W to get there.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The Sofar inverter to send this to.
  required: true
  type: string
grid_power:
  description: >
    The power to draw from the grid, in watts. A negative value exports
    to the grid instead.
  required: true
  type: integer
battery_power_min:
  description: >
    The lower end of the battery power window, in watts.
  required: true
  type: integer
battery_power_max:
  description: >
    The upper end of the battery power window, in watts.
  required: true
  type: integer
{% endoptions_yaml %}

## Good to know

- This action is only available on inverters with battery storage. If the config entry you select doesn't serve the passive-mode registers, the action fails with an error instead of doing nothing silently.
- Always pair this with [Set passive mode timeout](/actions/sofar.set_passive_mode_timeout/). Without a timeout in place, a command from a script that stops running unexpectedly keeps holding.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: charge the battery from cheap grid power

Draw a fixed amount of power from the grid to charge the battery during a known cheap-rate window, then let the inverter return to its normal behavior once the passive-mode timeout expires.

- **Trigger**: Time, 02:00
- **Action**: Sofar: Set passive mode power

{% details "YAML example for charging during a cheap-rate window" %}

{% example %}
automation: |
  alias: "Charge Sofar battery from cheap grid power"
  triggers:
    - trigger: time
      at: "02:00:00"
  actions:
    - action: sofar.set_passive_mode_timeout
      data:
        config_entry_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
        timeout: 3600
        action: return_to_previous_mode
    - action: sofar.set_passive_mode_power
      data:
        config_entry_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
        grid_power: 2000
        battery_power_min: 0
        battery_power_max: 2000
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
