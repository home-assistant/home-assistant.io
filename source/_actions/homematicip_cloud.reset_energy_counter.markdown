---
title: "Reset energy counter"
action: homematicip_cloud.reset_energy_counter
domain: homematicip_cloud
description: "Resets the energy counter of a measuring entity."
related_actions:
  - homematicip_cloud.set_active_climate_profile
  - homematicip_cloud.set_home_cooling_mode
---

The **Reset energy counter** action sets the energy counter of a Homematic IP measuring entity back to zero.

{% include actions/ui_header.md %}

To reset an energy counter from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **HomematicIP Cloud: Reset energy counter**.
6. Enter the **Entity** to reset.
7. Select **Save**.

This action does not support targets. Instead, you identify the measuring entity through the **Entity** field.

### Options in the UI

{% options_ui %}
Entity:
  description: "The measuring entity to reset. Use the `all` keyword to reset all energy counters."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homematicip_cloud.reset_energy_counter`. A basic example looks like this:

{% example %}
action: |
  action: homematicip_cloud.reset_energy_counter
  data:
    entity_id: switch.livingroom
{% endexample %}

This resets the energy counter for the living room measuring entity.

### Options in YAML

{% options_yaml %}
entity_id:
  description: >
    The measuring entity to reset. Use the `all` keyword to reset all energy
    counters.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- This action is only available to Home Assistant administrators.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
