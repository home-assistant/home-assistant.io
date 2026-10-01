---
title: "Set vane horizontal"
action: melcloud.set_vane_horizontal
domain: melcloud
description: "Sets the horizontal vane position of a MELCloud air conditioner."
related_actions:
  - melcloud.set_vane_vertical
  - climate.set_swing_horizontal_mode
---

Use this action to set the horizontal vane position of a [MELCloud](/integrations/melcloud/) air-to-air unit. The vanes control where the air goes from side to side. For example, you can let the vanes swing to spread the air through the room, or fix them in one position.

{% include actions/ui_header.md %}

To set the horizontal vane position from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Set vane horizontal**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), select the air conditioner. You can also select an area, a device, or a label.
7. In **Position**, enter the position, such as `auto` or `swing`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Position:
  description: The horizontal vane position. The positions your unit supports are listed in the `vane_horizontal_positions` attribute of the climate entity, for example `auto`, `split`, or `swing`.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `melcloud.set_vane_horizontal`. A basic example looks like this:

{% example %}
action: |
  action: melcloud.set_vane_horizontal
  target:
    entity_id: climate.living_room
  data:
    position: swing
{% endexample %}

This lets the horizontal vanes of the living room air conditioner swing.

### Options in YAML

{% options_yaml %}
position:
  description: The horizontal vane position. The positions your unit supports are listed in the `vane_horizontal_positions` attribute of the climate entity.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" %}

## Good to know

- If you choose a position your unit doesn't support, the action fails with an error that lists the positions you can use.
- Setting the horizontal swing mode of the climate entity does the same, see [Set thermostat horizontal swing mode](/actions/climate.set_swing_horizontal_mode/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: swing the air from side to side while cooling

When the air conditioner starts cooling, let the vanes swing from side to side, so the cool air spreads through the whole room.

- **Trigger**: State: Living room air conditioner started cooling
- **Action**: Set vane horizontal
  - **Target**: Living room air conditioner (`climate.living_room`)
  - **Position**: `swing`

{% details "YAML example for swinging the air while cooling" %}

{% example %}
automation: |
  alias: "Swing the air from side to side while cooling"
  triggers:
    - trigger: state
      entity_id: climate.living_room
      attribute: hvac_action
      to: "cooling"
  actions:
    - action: melcloud.set_vane_horizontal
      target:
        entity_id: climate.living_room
      data:
        position: swing
{% endexample %}

{% enddetails %}

### Automation: set the horizontal vanes back to automatic at night

At night, you don't want the air to keep sweeping across the room. This automation sets the horizontal vanes back to automatic at 22:00.

- **Trigger**: Time
  - **At time**: 22:00
- **Action**: MELCloud: Set vane horizontal
  - **Target**: Living room air conditioner (`climate.living_room`)
  - **Position**: `auto`

{% details "YAML example for automatic horizontal vanes at night" %}

{% example %}
automation: |
  alias: "Set the horizontal vanes to automatic at night"
  triggers:
    - trigger: time
      at: "22:00:00"
  actions:
    - action: melcloud.set_vane_horizontal
      target:
        entity_id: climate.living_room
      data:
        position: auto
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
