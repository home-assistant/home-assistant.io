---
title: "Set active climate profile"
action: homematicip_cloud.set_active_climate_profile
domain: homematicip_cloud
description: "Sets the active climate profile index."
related_actions:
  - homematicip_cloud.activate_eco_mode_with_duration
  - homematicip_cloud.activate_vacation
  - homematicip_cloud.set_home_cooling_mode
---

The **Set active climate profile** action switches the active climate profile of a Homematic IP climate entity. The index is 1-based and matches the order of the profiles shown in the Homematic IP app.

{% include actions/ui_header.md %}

To set the active climate profile from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **HomematicIP Cloud: Set active climate profile**.
6. Enter the **Entity** and the **Climate profile index**.
7. Select **Save**.

This action does not support targets. Instead, you identify the climate entity through the **Entity** field.

### Options in the UI

{% options_ui %}
Entity:
  description: "The climate entity to change. Use the `all` keyword to switch the profile for all climate entities."
  required: true
Climate profile index:
  description: The 1-based index of the climate profile, matching the order shown in the Homematic IP app.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homematicip_cloud.set_active_climate_profile`. A basic example looks like this:

{% example %}
action: |
  action: homematicip_cloud.set_active_climate_profile
  data:
    entity_id: climate.livingroom
    climate_profile_index: 1
{% endexample %}

This activates the first climate profile for the living room climate entity.

### Options in YAML

{% options_yaml %}
entity_id:
  description: >
    The climate entity to change. Use the `all` keyword to switch the profile
    for all climate entities.
  required: true
  type: string
climate_profile_index:
  description: >
    The 1-based index of the climate profile, matching the order shown in the
    Homematic IP app.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
