---
title: "Set cover position and tilt"
action: overkiz.set_cover_position_and_tilt
domain: overkiz
description: "Move a cover to a target position and tilt at the same time, keeping the motor running smoothly through the move."
since: "2026.6"
---

The **Set cover position and tilt** action moves a cover to a target position and tilt in a single command. Because both values are sent together, the motor keeps running smoothly through the move instead of stopping between the two adjustments.

This is useful for tilting blinds and shades, such as Somfy venetian blinds, where setting the position and the tilt separately would make the motor pause and start again.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're creating an automation, add a trigger in the **When** section.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the cover you want to control. You can also select an area, a floor, a device, or a label.
6. From the actions shown for that target, select **Set cover position and tilt**.
7. Under **Position** and **Tilt position**, set the values you want.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Position:
  description: Target vertical position, from 0 to 100 percent. 0 means closed, 100 means fully open.
  required: true
Tilt position:
  description: Target tilt position, from 0 to 100 percent. 0 means closed, 100 means fully open.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `overkiz.set_cover_position_and_tilt`. A basic example looks like this:

{% example %}
action: |
  action: overkiz.set_cover_position_and_tilt
  target:
    entity_id: cover.living_room_blind
  data:
    position: 50
    tilt_position: 20
{% endexample %}

This moves `cover.living_room_blind` to 50% open with the slats tilted to 20% in one continuous movement.

### Options in YAML

{% options_yaml %}
position:
  description: Target vertical position, from 0 to 100 percent. 0 means closed, 100 means fully open.
  required: true
  type: integer
tilt_position:
  description: Target tilt position, from 0 to 100 percent. 0 means closed, 100 means fully open.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="cover" %}

## Good to know

- This action is available only for covers that support setting both position and tilt, and that accept the combined command. If your cover does not support it, the action returns an error.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: tilt the blinds against the afternoon sun

When the afternoon sun starts shining in, you can lower the blinds part way and tilt the slats to block the glare while keeping some light, all in one smooth move.

- **Trigger**: Sun: above the horizon at a low elevation
- **Action**: Set cover position and tilt
- **Target**: Living room blind
- **Position**: 60
- **Tilt position**: 30

{% details "YAML example for tilting the blinds against the sun" %}

{% example %}
automation: |
  alias: "Tilt the living room blinds in the afternoon"
  triggers:
    - trigger: numeric_state
      entity_id: sun.sun
      attribute: elevation
      below: 25
  actions:
    - action: overkiz.set_cover_position_and_tilt
      target:
        entity_id: cover.living_room_blind
      data:
        position: 60
        tilt_position: 30
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
