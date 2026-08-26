---
title: "Toggle a light"
action: light.toggle
domain: light
description: "Flip a light between on and off. If it's off, it turns on. If it's on, it turns off."
since: "0.7"
related_actions:
  - light.turn_on
  - light.turn_off
---

The **Toggle light** action flips a light to the opposite state. If the light is off, it turns on. If it's on, it turns off. This is handy for a single button or a motion sensor that should cycle a light without you having to know what state it's in.

When **Toggle light** turns a light on, you can also set the brightness, color, color temperature, or a transition at the same time, just like you would with **Turn on light**. Those options are ignored when **Toggle light** turns the light off.

{% include actions/ui_header.md %}

To toggle a light from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Toggle light**.
6. Under **Targets**, choose what you want to toggle:
    - To toggle a specific light, select the entity.
    - To toggle every light in a room, select an area.
    - To toggle every light on a floor, select a floor.
    - To toggle lights sharing a tag, select a label.
7. _Optional_: under **Additional options**, set the brightness, color, color temperature, or transition that should apply when the light turns on.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Transition:
  description: How long, in seconds, the light takes to reach the new state. Use this for a smooth fade instead of switching instantly.
  required: false
Brightness:
  description: How bright the light should be when the toggle turns it on, on a scale from 0 (off) to 255 (brightest).
  required: false
Brightness percentage:
  description: How bright the light should be when the toggle turns it on, from 0% (off) to 100% (brightest).
  required: false
Color:
  description: A color for the light when the toggle turns it on. You can pick a named color, a color from the color wheel, or a specific value in RGB, hue/sat, or XY format.
  required: false
Color temperature:
  description: Warm or cool white, measured in Kelvin, for when the toggle turns the light on. Lower is warmer (more yellow), higher is cooler (more blue).
  required: false
Effect:
  description: A light effect to play when the toggle turns the light on, for example a color loop or a candle flicker. Available effects depend on the light.
  required: false
Flash:
  description: Ask the light to flash briefly, either short or long. Useful as a visual notification.
  required: false
Profile:
  description: The name of a light profile to apply when the toggle turns the light on.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `light.toggle`. A basic example looks like this:

{% example %}
action: |
  action: light.toggle
  target:
    entity_id: light.hallway
{% endexample %}

This flips `light.hallway` to the opposite state.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
transition:
  description: >
    Duration, in seconds, it takes to reach the next state. Use this to fade smoothly instead of switching instantly.
  required: false
  type: integer
brightness:
  description: >
    Number indicating brightness when the light turns on, where 0 is off, 1 is the minimum, and 255 is the maximum.
  required: false
  type: integer
brightness_pct:
  description: >
    Percentage of full brightness when the light turns on, where 0 is off, 1 is the minimum, and 100 is the maximum.
  required: false
  type: integer
color_name:
  description: >
    A human-readable color name to apply when the light turns on, for example `warm_white`, `tomato`, or `cornflowerblue`.
  required: false
  type: string
color_temp_kelvin:
  description: >
    Color temperature in Kelvin to apply when the light turns on. Lower values are warmer (more yellow), higher values are cooler (more blue).
  required: false
  type: integer
rgb_color:
  description: >
    The color in RGB format to apply when the light turns on. A list of three integers between 0 and 255 representing red, green, and blue.
  required: false
  type: list
hs_color:
  description: >
    Color in hue/sat format to apply when the light turns on. A list of two integers, where hue is 0 to 360 and saturation is 0 to 100.
  required: false
  type: list
xy_color:
  description: >
    Color in XY format to apply when the light turns on. A list of two decimal numbers between 0 and 1.
  required: false
  type: list
effect:
  description: >
    Light effect to apply when the light turns on. Available effects depend on the specific light.
  required: false
  type: string
flash:
  description: >
    Tell the light to flash briefly. Accepts either `short` or `long`.
  required: false
  type: string
profile:
  description: >
    Name of a light profile to apply when the light turns on.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The **Toggle light** action works on any light {% term entity %}, such as bulbs, groups, fixtures, or strips.
- When **Toggle light** turns a light on, any brightness, color, or transition options you set are applied. When it turns a light off, those options are ignored.
- If you use **Toggle light** on a group of lights, each light in the group flips its own state. Some lights may turn on while others turn off. To treat a group as one unit, create a dedicated [light group](/integrations/group/) first.
- If you already know the state you want, use [Turn on a light](/actions/light.turn_on/) or [Turn off a light](/actions/light.turn_off/) instead. They make the intent clearer in the automation's name.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Action: flip the hallway light with a single button press

Wire a physical button or a dashboard tile to a single toggle action so it acts like a light switch.

- **Action**: Toggle light
- **Target**: Hallway light

{% details "YAML example for a one-button hallway toggle" %}

{% example %}
action: |
  action: light.toggle
  target:
    entity_id: light.hallway
{% endexample %}

{% enddetails %}

### Action: toggle the kitchen light to a warm white tone

When the toggle turns the kitchen light on, have it come up dim and warm instead of at full blast.

- **Action**: Toggle light
- **Target**: Kitchen light
- **Brightness percentage**: 40
- **Color**: warm_white

{% details "YAML example for a warm toggle" %}

{% example %}
action: |
  action: light.toggle
  target:
    entity_id: light.kitchen
  data:
    brightness_pct: 40
    color_name: warm_white
{% endexample %}

{% enddetails %}

### Automation: toggle the hallway light with a physical button

Keep a smart button on the wall and flip the hallway light whenever you press it. A great way to add a light switch where there isn't one.

- **Trigger**: Device: Button pressed
- **Action**: Toggle light
- **Target**: Hallway light

{% details "YAML example for a button-driven hallway toggle" %}

{% example %}
automation: |
  alias: "Hallway button toggle"
  triggers:
    - trigger: state
      entity_id: event.hallway_button
    - trigger: event
      event_type: zha_event
      event_data:
        device_ieee: "00:11:22:33:44:55:66:77"
        command: "single"
  actions:
    - action: light.toggle
      target:
        entity_id: light.hallway
{% endexample %}

{% enddetails %}

### Automation: toggle the bathroom light on motion

When the bathroom motion sensor fires, flip the light. The next motion event flips it back, so you can also use the same automation to cut the light when you leave.

- **Trigger**: Motion sensor detects motion
- **Action**: Toggle light
- **Target**: Bathroom light

{% details "YAML example for toggling the bathroom light on motion" %}

{% example %}
automation: |
  alias: "Toggle bathroom light on motion"
  triggers:
    - trigger: state
      entity_id: binary_sensor.bathroom_motion
      to: "on"
  actions:
    - action: light.toggle
      target:
        entity_id: light.bathroom
{% endexample %}

{% enddetails %}

### Automation: toggle the pantry light when the door opens

When the pantry door opens, flip the light. Close the door and the same trigger flips it back off the next time around.

- **Trigger**: Door sensor opens
- **Action**: Toggle light
- **Target**: Pantry light

{% details "YAML example for a pantry door toggle" %}

{% example %}
automation: |
  alias: "Toggle pantry light on door"
  triggers:
    - trigger: state
      entity_id: binary_sensor.pantry_door
      to: "on"
  actions:
    - action: light.toggle
      target:
        entity_id: light.pantry
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
