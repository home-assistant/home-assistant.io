---
title: "Turn off a light"
action: light.turn_off
domain: light
description: "Turn a light off. Optionally fade it out with a transition, or have it flash briefly before it goes dark."
related_actions:
  - light.turn_on
  - light.toggle
---

The **Turn off light** action turns a light off. You can switch it off instantly, add a transition so it fades out smoothly, or ask it to flash briefly before going dark.

This action works with any light {% term entity %} in Home Assistant, whether it's a single bulb, a group of lights, or a smart fixture. If the light is already off, calling the action does nothing.

{% include actions/ui_header.md %}

To turn a light off from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Turn off light**.
6. Under **Targets**, choose what you want to turn off:
    - To turn off a specific light, select the entity.
    - To turn off every light in a room, select an area.
    - To turn off every light on a floor, select a floor.
    - To turn off lights sharing a tag, select a label.
7. _Optional_: under **Additional options**, set a transition or a flash effect.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Transition:
  description: How long, in seconds, it takes to fade the light out. Use this for a smooth fade instead of switching off instantly.
  required: false
Flash:
  description: Ask the light to flash briefly before it turns off, either short or long. Useful as a visual notification.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `light.turn_off`. A basic example looks like this:

{% example %}
action: |
  action: light.turn_off
  target:
    entity_id: light.kitchen
{% endexample %}

This turns off `light.kitchen`.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
transition:
  description: >
    Duration, in seconds, it takes to fade the light out. Use this to dim down smoothly instead of switching off instantly.
  type: integer
flash:
  description: >
    Tell the light to flash briefly before turning off. Accepts either `short` or `long`.
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The **Turn off light** action works on any light {% term entity %}, such as bulbs, groups, fixtures, or strips.
- If the light is already off, calling this action does nothing.
- Not every light supports a transition or a flash. Home Assistant quietly skips options the device can't handle.
- To reverse this action, use [Turn on a light](/actions/light.turn_on/). To flip a light between on and off with a single call, use [Toggle a light](/actions/light.toggle/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Action: fade out gently at the end of movie night

Fade the bedroom light out over five seconds, which is a much nicer way to end a movie than an instant off.

- **Action**: Turn off light
- **Target**: Bedroom light
- **Transition**: 5 seconds

{% details "YAML example for a gentle fade-out" %}

{% example %}
action: |
  action: light.turn_off
  target:
    entity_id: light.bedroom
  data:
    transition: 5
{% endexample %}

{% enddetails %}

### Action: turn off every light on a floor

Target a floor instead of a specific entity and Home Assistant resolves it to every light on that floor.

- **Action**: Turn off light
- **Target**: Ground floor

{% details "YAML example for turning off every light on a floor" %}

{% example %}
action: |
  action: light.turn_off
  target:
    floor_id: ground_floor
{% endexample %}

{% enddetails %}

### Automation: porch light off at sunrise

Turn the porch light off automatically as the sun comes up. No more wasted electricity after you've already gone to bed or left for work.

- **Trigger**: Sun: Above horizon
- **Action**: Turn off light
- **Target**: Porch light

{% details "YAML example for a sunrise porch light off" %}

{% example %}
automation: |
  alias: "Porch light off at sunrise"
  triggers:
    - trigger: sun
      event: sunrise
  actions:
    - action: light.turn_off
      target:
        entity_id: light.porch
{% endexample %}

{% enddetails %}

### Automation: turn every light off when the house is empty

When the last person leaves home, turn off every light in the house. A simple way to save energy without having to think about it.

- **Trigger**: Zone occupancy cleared
  - **Zone**: Home (`zone.home`)
- **Action**: Turn off light
- **Target**: All lights (by label)

{% details "YAML example for turning off all lights when nobody is home" %}

{% example %}
automation: |
  alias: "Lights off when everyone leaves"
  triggers:
    - trigger: zone.occupancy_cleared
      options:
        zone: zone.home
  actions:
    - action: light.turn_off
      target:
        label_id: all_lights
{% endexample %}

{% enddetails %}

### Automation: bedtime fade-out

At 11 in the evening, fade every light in the living room out over ten seconds. A calmer way to end the day than flipping a switch.

- **Trigger**: Time: 23:00
- **Action**: Turn off light
- **Target**: Living room
- **Transition**: 10 seconds

{% details "YAML example for a bedtime fade-out" %}

{% example %}
automation: |
  alias: "Bedtime fade-out"
  triggers:
    - trigger: time
      at: "23:00:00"
  actions:
    - action: light.turn_off
      target:
        area_id: living_room
      data:
        transition: 10
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
