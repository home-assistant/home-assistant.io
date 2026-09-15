---
title: "Set daylight savings time mode"
action: ecobee.set_dst_mode
domain: ecobee
description: "Enables or disables automatic daylight savings time on an ecobee thermostat."
related_actions:
  - ecobee.set_mic_mode
  - ecobee.set_occupancy_modes
---

The **Set daylight savings time mode** action enables or disables automatic daylight savings time on an ecobee thermostat.

{% include actions/ui_header.md %}

To set the daylight savings time mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the ecobee thermostat you want to change.
6. From the actions shown for that target, select **ecobee: Set daylight savings time mode**.
7. Turn **Daylight savings time enabled** on or off.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Daylight savings time enabled:
  description: Turn on to enable automatic daylight savings time.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ecobee.set_dst_mode`. A basic example looks like this:

{% example %}
action: |
  action: ecobee.set_dst_mode
  target:
    entity_id: climate.living_room
  data:
    dst_enabled: true
{% endexample %}

This enables automatic daylight savings time on `climate.living_room`.

### Options in YAML

{% options_yaml %}
dst_enabled:
  description: Set to `true` to enable automatic daylight savings time, or `false` to disable it.
  required: true
  type: boolean
  default: true
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
