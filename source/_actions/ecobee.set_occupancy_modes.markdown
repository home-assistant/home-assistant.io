---
title: "Set occupancy modes"
action: ecobee.set_occupancy_modes
domain: ecobee
description: "Enables or disables Smart Home/Away and Follow Me modes on an ecobee thermostat."
related_actions:
  - ecobee.set_dst_mode
  - ecobee.set_mic_mode
---

The **Set occupancy modes** action enables or disables Smart Home/Away and Follow Me modes on an ecobee thermostat.

{% include actions/ui_header.md %}

To set the occupancy modes from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the ecobee thermostat you want to change.
6. From the actions shown for that target, select **ecobee: Set occupancy modes**.
7. Turn **Auto away** and **Follow me** on or off.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Auto away:
  description: Turn on to enable Smart Home/Away mode.
  required: false
Follow me:
  description: Turn on to enable Follow Me mode.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ecobee.set_occupancy_modes`. A basic example looks like this:

{% example %}
action: |
  action: ecobee.set_occupancy_modes
  target:
    entity_id: climate.living_room
  data:
    auto_away: true
    follow_me: false
{% endexample %}

This enables Smart Home/Away mode and disables Follow Me mode on `climate.living_room`.

### Options in YAML

{% options_yaml %}
auto_away:
  description: Set to `true` to enable Smart Home/Away mode, or `false` to disable it.
  required: false
  type: boolean
  default: false
follow_me:
  description: Set to `true` to enable Follow Me mode, or `false` to disable it.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
