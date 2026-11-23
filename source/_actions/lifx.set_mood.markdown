---
title: "Set mood"
action: lifx.set_mood
domain: lifx
description: "Sets the mood on one or more LIFX lights by applying a Mood the way the LIFX app does."
related_actions:
  - lifx.paint_theme
  - lifx.effect_morph
  - lifx.effect_move
  - lifx.effect_stop
---

Use this action to apply one of the LIFX app's Moods to one or more LIFX lights. A Mood is a named set of colors, and this action lays it out on each kind of light the same way the LIFX app does. The lights keep their current brightness, so a Mood changes the colors of a room without making it brighter or darker.

When you target several lights in one call, they are treated as one group, as they are in the LIFX app. Bulbs with a single color share the Mood's colors out between them, instead of each one picking a color at random. The lights are turned on only if every target is off.

If you want Home Assistant's own arrangement of a theme instead, with a transition and a choice of whether to turn the lights on, use the [Paint theme](/actions/lifx.paint_theme/) action.

{% include actions/ui_header.md %}

To apply a Mood from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Set mood**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the area your LIFX lights are in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
7. Pick a value in **Mood**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Mood:
  description: The Mood to apply. The list shows each one as its category and name, such as **Moods > Dream**.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lifx.set_mood`. A basic example looks like this:

{% example %}
action: |
  action: lifx.set_mood
  target:
    entity_id: light.living_room
  data:
    mood: dream
{% endexample %}

This applies the `dream` Mood across the living room lights.

### Options in YAML

{% options_yaml %}
mood:
  description: The Mood to apply. Any of the [available themes](/integrations/lifx/#themes) is accepted, including a renamed one, which applies the Mood it became.
  required: true
  type: string
{% endoptions_yaml %}

## Available Moods

Every theme the integration knows can be applied as a Mood. The [Themes](/integrations/lifx/#themes) section of the LIFX integration page lists them by category. The **Moods** category holds the ones the LIFX app shows under Moods.

{% include actions/targets.md domain="light" %}

## Good to know

- This action works with every LIFX color light. White-only lights are skipped. When you target lights by entity and none of them is a LIFX light, the action fails with the message "The targets of action lifx.set_mood include no LIFX light". When you target an area, floor, device, or label that holds no LIFX light, nothing happens and no error is returned.
- A Mood always covers the whole light. The separate uplight, downlight, front, and back entities of a LIFX Ceiling or Mirror can't be targeted: target the light itself instead.
- On multizone and matrix lights, the **Mood** select shows the Mood afterwards, for as long as the light still shows it. Any change to the light, including a brightness change, clears it.
- Applying a Mood paints a still set of colors, so there is usually nothing to stop afterwards. The exception is a light already running an effect that animates Moods, as the LIFX app does:
  - On a multizone light running the [Move effect](/actions/lifx.effect_move/), the Mood is painted and Move carries on with it, moving forward at the LIFX app's speed. The **Mood** select shows unknown while Move runs.
  - On a matrix light running the [Morph effect](/actions/lifx.effect_morph/), the Mood is animated the way the LIFX app animates it, and the **Mood** select shows the Mood.
  - To stop the animation, use the [Stop effect](/actions/lifx.effect_stop/) action.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: apply a Mood in the living room at sunset

When the sun sets, apply the `warming` Mood to the living room lights, so the room shifts to an evening look at the brightness it already has.

- **Trigger**: Sunset
- **Action**: Set mood
  - **Target**: Living room (`light.living_room`)
  - **Mood**: Moods > Warming

{% example %}
automation: |
  alias: "Apply a warm Mood in the living room at sunset"
  triggers:
    - trigger: sun.sunset
  actions:
    - action: lifx.set_mood
      target:
        entity_id: light.living_room
      data:
        mood: warming
{% endexample %}

### Automation: wind the bedroom down at bedtime

At 21:30, apply the `sleepy` Mood to every LIFX light in the bedroom. The bedside bulbs and the strip are treated as one group, so the bulbs share the Mood's colors out between them instead of each showing the same one.

- **Trigger**: Time
  - **At**: 21:30
- **Action**: Set mood
  - **Target**: Bedroom area
  - **Mood**: Moods > Sleepy

{% example %}
automation: |
  alias: "Apply a sleepy Mood in the bedroom at bedtime"
  triggers:
    - trigger: time
      at: "21:30:00"
  actions:
    - action: lifx.set_mood
      target:
        area_id: bedroom
      data:
        mood: sleepy
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
