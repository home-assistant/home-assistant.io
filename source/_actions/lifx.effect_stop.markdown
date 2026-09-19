---
title: "Stop effect"
action: lifx.effect_stop
domain: lifx
description: "Stop a running effect on LIFX lights."
related_actions:
  - lifx.effect_pulse
  - lifx.effect_colorloop
  - lifx.effect_move
  - lifx.effect_flame
  - lifx.effect_morph
  - lifx.effect_sky
  - lifx.set_state
---

The **Stop effect** action stops a running effect on LIFX lights. Use it to end an effect that runs until you stop it, such as [Color loop effect](/actions/lifx.effect_colorloop/) or [Move effect](/actions/lifx.effect_move/), or to cut a longer effect short.

One call covers both kinds of effect. Home Assistant stops the effects it runs itself, such as Pulse and Color loop, and it also turns off the effects that run on the light's own firmware, such as Move, Flame, Morph, and Sky. Lights that aren't running an effect are left alone, so it's safe to point this action at a whole area or floor.

{% include actions/ui_header.md %}

To stop a running effect from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Stop effect**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the area your LIFX lights are in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
7. Select **Save**.

### Options in the UI

This action has no options. All you choose is what to target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lifx.effect_stop`. A basic example looks like this:

{% example %}
action: |
  action: lifx.effect_stop
  target:
    entity_id: light.living_room
{% endexample %}

This stops any effect running on the living room lights.

### Options in YAML

This action has no options. All you provide is the target.

{% include actions/targets.md domain="light" %}

## Good to know

- This action only works on lights that belong to the LIFX {% term integration %}. If your target contains no LIFX light, Home Assistant reports an error: "The targets of action lifx.effect_stop include no LIFX light".
- Whichever effect you stop, each light goes back to the color and power state it had before the effect started. Home Assistant restores that state for the software effects, Pulse and Color loop, and the light restores it itself for the firmware effects, Move, Flame, Morph, and Sky.
- This can turn a light off. A light that was off when the effect started with **Power on** enabled is turned back off when you stop the effect.
- Starting Pulse or Color loop on a light ends the other software effect that's already running there, but it doesn't clear a firmware effect such as Move, Flame, Morph, or Sky. Use this action first when you want to swap a firmware effect for a software one, or whenever you want a light to stop animating without starting something new.
- You can also stop an effect from the regular [`light.turn_on`](/actions/light.turn_on/) action by setting its effect to `effect_stop`.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: stop all light effects at bedtime

At 11 pm, stop any effect still running on your LIFX lights and turn them off, so nothing keeps animating overnight.

- **Trigger**: Time is 11:00 pm
- **Action**: Stop effect
  - **Target**: Living room lights (`light.living_room`)
- **Action**: Turn off light
  - **Target**: Living room lights (`light.living_room`)

{% example %}
automation: |
  alias: "Stop light effects at bedtime"
  triggers:
    - trigger: time
      at: "23:00:00"
  actions:
    - action: lifx.effect_stop
      target:
        entity_id: light.living_room
    - action: light.turn_off
      target:
        entity_id: light.living_room
{% endexample %}

### Automation: stop effects when everyone leaves

When the last person leaves home, stop any running effect and send a confirmation to your phone.

- **Trigger**: Everyone leaves the home zone (`zone.home`)
- **Action**: Stop effect
  - **Target**: All LIFX lights (`light.living_room`, `light.hallway`)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% example %}
automation: |
  alias: "Stop light effects when everyone leaves"
  triggers:
    - trigger: numeric_state
      entity_id: zone.home
      below: 1
  actions:
    - action: lifx.effect_stop
      target:
        entity_id:
          - light.living_room
          - light.hallway
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          The light effects have been stopped.
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
