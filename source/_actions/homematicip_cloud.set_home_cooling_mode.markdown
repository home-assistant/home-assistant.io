---
title: "Set home cooling mode"
action: homematicip_cloud.set_home_cooling_mode
domain: homematicip_cloud
description: "Sets the heating or cooling mode for the entire home."
related_actions:
  - homematicip_cloud.set_active_climate_profile
  - homematicip_cloud.activate_eco_mode_with_duration
  - homematicip_cloud.activate_vacation
---

The **Set home cooling mode** action switches your entire Homematic IP home between heating and cooling. Enable cooling to switch to cooling mode, or disable it to revert to heating.

This action is only available to Home Assistant administrators.

{% include actions/ui_header.md %}

To set the home cooling mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **HomematicIP Cloud: Set home cooling mode**.
6. Turn **Cooling** on for cooling mode, or off for heating mode.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Cooling:
  description: Turn on for cooling mode, turn off for heating mode.
  required: false
Access point ID:
  description: The ID (SGTIN) of the Homematic IP access point. If you have only one access point, you can leave this out.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homematicip_cloud.set_home_cooling_mode`. A basic example looks like this:

{% example %}
action: |
  action: homematicip_cloud.set_home_cooling_mode
  data:
    cooling: true
{% endexample %}

This switches the entire home to cooling mode.

### Options in YAML

{% options_yaml %}
cooling:
  description: >
    Turn on for cooling mode, turn off for heating mode.
  required: false
  default: true
  type: boolean
accesspoint_id:
  description: >
    The ID (SGTIN) of the Homematic IP access point. If you have only one
    access point, you can leave this out.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
