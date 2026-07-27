---
title: "Set fan minimum on time"
action: ecobee.set_fan_min_on_time
domain: ecobee
description: "Sets the minimum amount of time the fan runs per hour."
related_actions:
  - ecobee.set_dst_mode
  - ecobee.set_occupancy_modes
---

The **Set fan minimum on time** action sets the minimum amount of time, in minutes, that the fan runs each hour.

This is handy when you want to keep air circulating for a set number of minutes per hour, for example to even out the temperature between rooms.

{% include actions/ui_header.md %}

To set the fan minimum on time from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **ecobee: Set fan minimum on time**.
6. Set the **Fan minimum on time**. Optionally, select the **Entity** to apply it to.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Entity:
  description: The ecobee thermostat, or thermostats, to apply this to. Omit to apply to all ecobee thermostats.
  required: false
Fan minimum on time:
  description: The minimum number of minutes to run the fan each hour, from 0 to 60.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ecobee.set_fan_min_on_time`. A basic example looks like this:

{% example %}
action: |
  action: ecobee.set_fan_min_on_time
  data:
    entity_id: climate.living_room
    fan_min_on_time: 15
{% endexample %}

This runs the fan for at least 15 minutes each hour on `climate.living_room`.

### Options in YAML

{% options_yaml %}
entity_id:
  description: >
    The ecobee thermostat, or list of thermostats, to apply this to. Omit to
    apply to all ecobee thermostats.
  required: false
  type: string
fan_min_on_time:
  description: The minimum number of minutes to run the fan each hour, from 0 to 60.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
