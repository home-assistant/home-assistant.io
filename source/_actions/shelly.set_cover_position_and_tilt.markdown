---
title: "Set cover position and tilt"
action: shelly.set_cover_position_and_tilt
domain: shelly
description: "Move a Shelly cover to a target position and tilt with a single command."
since: "2026.11"
---

The **Set cover position and tilt** action moves a Shelly cover to a target position and tilt in a single command. Because both values are sent together, the cover moves to the final position and tilt in one go, instead of handling the two adjustments one after the other.

This is useful for venetian blinds and other covers with slats, where you usually want to set how far the cover is open and the angle of the slats at the same time.

This action is available only for Shelly generation 2 and later covers that support both position and tilt, such as the Shelly 2PM Gen3 with **Slat control** turned on. To set up tilt on your device, see [Cover entities](/integrations/shelly/#cover-entities). If your cover does not support tilt, the action returns an error.

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
  description: Target position of the cover, from 0 to 100 percent. 0 means closed, 100 means fully open.
  required: true
Tilt position:
  description: Target tilt position of the cover, from 0 to 100 percent. 0 means closed, 100 means fully open.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `shelly.set_cover_position_and_tilt`. A basic example looks like this:

{% example %}
action: |
  action: shelly.set_cover_position_and_tilt
  target:
    entity_id: cover.living_room_blind
  data:
    position: 50
    tilt_position: 20
{% endexample %}

This moves `cover.living_room_blind` to 50% open with the slats tilted to 20% in a single command.

### Options in YAML

{% options_yaml %}
position:
  description: Target position of the cover, from 0 to 100 percent. 0 means closed, 100 means fully open.
  required: true
  type: integer
tilt_position:
  description: Target tilt position of the cover, from 0 to 100 percent. 0 means closed, 100 means fully open.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="cover" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: tilt the blinds against the afternoon sun

When the afternoon sun starts shining in, you can lower the blinds part way and tilt the slats to block the glare while keeping some light, all in one move.

- **Trigger**: Numeric state crossed threshold
  - **Entity**: Sun
  - **Attribute**: Elevation
  - **Below**: 25
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
    - action: shelly.set_cover_position_and_tilt
      target:
        entity_id: cover.living_room_blind
      data:
        position: 60
        tilt_position: 30
{% endexample %}

{% enddetails %}

## Good to know

- This action works only on Shelly generation 2 and later devices. Generation 1 covers are not supported.
- Both **Position** and **Tilt position** are required. To change only one of them, use the standard [**Set cover position**](/actions/cover.set_cover_position/) or [**Set cover tilt position**](/actions/cover.set_cover_tilt_position/) actions instead.

{% include actions/stuck.md %}

{% include actions/related.md %}
