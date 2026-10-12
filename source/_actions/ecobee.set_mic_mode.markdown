---
title: "Set mic mode"
action: ecobee.set_mic_mode
domain: ecobee
description: "Enables or disables the Alexa microphone on an ecobee 4 thermostat."
related_actions:
  - ecobee.set_dst_mode
  - ecobee.set_occupancy_modes
---

The **Set mic mode** action enables or disables the Alexa microphone. This only applies to the ecobee 4 thermostat.

{% include actions/ui_header.md %}

To set the mic mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the ecobee thermostat you want to change.
6. From the actions shown for that target, select **ecobee: Set mic mode**.
7. Turn **Mic enabled** on or off.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Mic enabled:
  description: Turn on to enable the Alexa microphone.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ecobee.set_mic_mode`. A basic example looks like this:

{% example %}
action: |
  action: ecobee.set_mic_mode
  target:
    entity_id: climate.living_room
  data:
    mic_enabled: true
{% endexample %}

This enables the Alexa microphone on `climate.living_room`.

### Options in YAML

{% options_yaml %}
mic_enabled:
  description: Set to `true` to enable the Alexa microphone, or `false` to disable it.
  required: true
  type: boolean
  default: true
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
