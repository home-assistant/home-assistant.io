---
title: "Set vane vertical"
action: melcloud.set_vane_vertical
domain: melcloud
description: "Sets the vertical vane position of a MELCloud air conditioner."
related_actions:
  - melcloud.set_vane_horizontal
  - climate.set_swing_mode
---

Use this action to set the vertical vane position of a [MELCloud](/integrations/melcloud/) air-to-air unit. The vanes control where the air goes up and down. For example, you can let the vanes swing to spread the air through the room, or fix them in one position.

{% include actions/ui_header.md %}

To set the vertical vane position from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Set vane vertical**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), select the air conditioner. You can also select an area, a device, or a label.
7. In **Position**, enter the position, such as `auto` or `swing`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Position:
  description: The vertical vane position. The positions your unit supports are listed in the `vane_vertical_positions` attribute of the climate entity, for example `auto`, `split`, or `swing`.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `melcloud.set_vane_vertical`. A basic example looks like this:

{% example %}
action: |
  action: melcloud.set_vane_vertical
  target:
    entity_id: climate.living_room
  data:
    position: swing
{% endexample %}

This lets the vertical vanes of the living room air conditioner swing.

### Options in YAML

{% options_yaml %}
position:
  description: The vertical vane position. The positions your unit supports are listed in the `vane_vertical_positions` attribute of the climate entity.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" %}

## Good to know

- If you choose a position your unit doesn't support, the action fails with an error that lists the positions you can use.
- Setting the swing mode of the climate entity does the same, see [Set thermostat swing mode](/actions/climate.set_swing_mode/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: swing the air up and down while heating

Warm air rises. When the air conditioner starts heating, let the vanes swing up and down, so the warm air mixes better with the air in the room.

- **Trigger**: State: Living room air conditioner started heating
- **Action**: Set vane vertical
  - **Target**: Living room air conditioner (`climate.living_room`)
  - **Position**: `swing`

{% details "YAML example for swinging the air while heating" %}

{% example %}
automation: |
  alias: "Swing the air up and down while heating"
  triggers:
    - trigger: state
      entity_id: climate.living_room
      attribute: hvac_action
      to: "heating"
  actions:
    - action: melcloud.set_vane_vertical
      target:
        entity_id: climate.living_room
      data:
        position: swing
{% endexample %}

{% enddetails %}

### Automation: set the vertical vanes back to automatic at night

At night, set the vertical vanes back to automatic at 22:00, so the air conditioner picks the position itself.

- **Trigger**: Time
  - **At time**: 22:00
- **Action**: MELCloud: Set vane vertical
  - **Target**: Living room air conditioner (`climate.living_room`)
  - **Position**: `auto`

{% details "YAML example for automatic vertical vanes at night" %}

{% example %}
automation: |
  alias: "Set the vertical vanes to automatic at night"
  triggers:
    - trigger: time
      at: "22:00:00"
  actions:
    - action: melcloud.set_vane_vertical
      target:
        entity_id: climate.living_room
      data:
        position: auto
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
