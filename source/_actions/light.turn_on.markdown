---
title: "Turn on a light"
action: light.turn_on
domain: light
description: "Turn a light on. Optionally set brightness, color, color temperature, an effect, or a transition."
since: "0.7"
related_actions:
  - light.turn_off
  - light.toggle
---

The **Turn on light** action turns a light on. You can simply switch it on, or go further and set the brightness, color, color temperature, or an effect at the same time.

This action works with any light {% term entity %} in Home Assistant, whether it's a single bulb, a group of lights, or a smart fixture. If the light is already on, calling the action updates its attributes (such as brightness or color) without flashing off first.

{% include actions/ui_header.md %}

To turn a light on from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Turn on light**.
6. Under **Targets**, choose what you want to turn on:
    - To turn on a specific light, select the entity.
    - To turn on every light in a room, select an area.
    - To turn on every light on a floor, select a floor.
    - To turn on lights sharing a tag, select a label.
7. _Optional_: under **Additional options**, set the brightness, color, color temperature, or transition.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Transition:
  description: How long, in seconds, it takes to get to the next state. Use this for a smooth fade instead of switching instantly.
  required: false
Brightness:
  description: How bright the light should be, on a scale from 0 (off) to 255 (brightest).
  required: false
Brightness percentage:
  description: How bright the light should be, from 0% (off) to 100% (brightest).
  required: false
Color:
  description: A color for the light. You can pick a named color, a color from the color wheel, or a specific value in RGB, hue/sat, or XY format.
  required: false
Color temperature:
  description: Warm or cool white, measured in Kelvin. Lower is warmer (more yellow), higher is cooler (more blue).
  required: false
Effect:
  description: A light effect to play, for example a color loop or a candle flicker. Available effects depend on the light.
  required: false
Flash:
  description: Ask the light to flash briefly, either short or long. Useful as a visual notification.
  required: false
Profile:
  description: The name of a light profile to apply. Profiles bundle a brightness and color together under a single name.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `light.turn_on`. A basic example looks like this:

{% example %}
action: |
  action: light.turn_on
  target:
    entity_id: light.kitchen
{% endexample %}

This turns on `light.kitchen` at its previous brightness and color.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
transition:
  description: >
    Duration, in seconds, it takes to get to the next state. Use this to fade smoothly instead of switching instantly.
  required: false
  type: integer
brightness:
  description: >
    Number indicating brightness, where 0 turns the light off, 1 is the minimum brightness, and 255 is the maximum brightness.
  required: false
  type: integer
brightness_pct:
  description: >
    Number indicating the percentage of full brightness, where 0 turns the light off, 1 is the minimum brightness, and 100 is the maximum brightness.
  required: false
  type: integer
color_name:
  description: >
    A human-readable color name, for example `warm_white`, `tomato`, or `cornflowerblue`.
  required: false
  type: string
color_temp_kelvin:
  description: >
    Color temperature in Kelvin. Lower values are warmer (more yellow), higher values are cooler (more blue).
  required: false
  type: integer
rgb_color:
  description: >
    The color in RGB format. A list of three integers between 0 and 255 representing the values of red, green, and blue.
  required: false
  type: list
hs_color:
  description: >
    Color in hue/sat format. A list of two integers, where hue is 0 to 360 and saturation is 0 to 100.
  required: false
  type: list
xy_color:
  description: >
    Color in XY format. A list of two decimal numbers between 0 and 1.
  required: false
  type: list
effect:
  description: >
    Light effect to apply. Available effects depend on the specific light.
  required: false
  type: string
flash:
  description: >
    Tell the light to flash briefly. Accepts either `short` or `long`.
  required: false
  type: string
profile:
  description: >
    Name of a light profile to apply.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The **Turn on light** action works on any light {% term entity %}, such as bulbs, groups, fixtures, or strips.
- If the light is already on, the call updates its attributes (brightness, color) without flashing off first.
- Not every light supports every field. A bulb that only dims ignores color fields, and a color-only light ignores color temperature. Home Assistant quietly skips fields the device can't handle.
- To reverse this action, use [Turn off a light](/actions/light.turn_off/). To flip a light between on and off with a single call, use [Toggle a light](/actions/light.toggle/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Action: set a cozy warm white tone

When you start winding down in the evening, dim the kitchen light to a warm white tone.

- **Action**: Turn on light
- **Target**: Kitchen light
- **Brightness percentage**: 80
- **Color**: warm_white

{% details "YAML example for a cozy warm white scene" %}

{% example %}
action: |
  action: light.turn_on
  target:
    entity_id: light.kitchen
  data:
    brightness_pct: 80
    color_name: warm_white
{% endexample %}

{% enddetails %}

### Action: fade the bedroom light up over ten seconds

A long transition is a gentle way to wake up. Instead of snapping the light on, fade it up slowly.

- **Action**: Turn on light
- **Target**: Bedroom light
- **Brightness percentage**: 100
- **Transition**: 10 seconds

{% details "YAML example for a sunrise-style fade-in" %}

{% example %}
action: |
  action: light.turn_on
  target:
    entity_id: light.bedroom
  data:
    brightness_pct: 100
    transition: 10
{% endexample %}

{% enddetails %}

### Action: turn on every light in a room

Target an area instead of a specific entity and Home Assistant resolves it to every light inside the room.

- **Action**: Turn on light
- **Target**: Living room
- **Brightness percentage**: 60

{% details "YAML example for turning on every light in a room" %}

{% example %}
action: |
  action: light.turn_on
  target:
    area_id: living_room
  data:
    brightness_pct: 60
{% endexample %}

{% enddetails %}

### Automation: porch light at sunset

Greet the evening by turning the porch light on at a warm white tone as the sun drops below the horizon. Nice and welcoming without running the light at full power.

- **Trigger**: Sun: Below horizon
- **Action**: Turn on light
- **Target**: Porch light
- **Brightness percentage**: 60
- **Color**: warm_white

{% details "YAML example for a sunset porch light automation" %}

{% example %}
automation: |
  alias: "Porch light at sunset"
  triggers:
    - trigger: sun
      event: sunset
  actions:
    - action: light.turn_on
      target:
        entity_id: light.porch
      data:
        brightness_pct: 60
        color_name: warm_white
{% endexample %}

{% enddetails %}

### Automation: gentle weekday wake-up

Fade the bedroom light up over ten seconds at 7 in the morning on weekdays. A kinder way to start the day than a sudden flick.

- **Trigger**: Time: 07:00
- **Condition**: Day of the week is Monday to Friday
- **Action**: Turn on light
- **Target**: Bedroom light
- **Brightness percentage**: 100
- **Transition**: 10 seconds

{% details "YAML example for a weekday sunrise alarm" %}

{% example %}
automation: |
  alias: "Gentle weekday wake-up"
  triggers:
    - trigger: time
      at: "07:00:00"
  conditions:
    - condition: time
      weekday:
        - mon
        - tue
        - wed
        - thu
        - fri
  actions:
    - action: light.turn_on
      target:
        entity_id: light.bedroom
      data:
        brightness_pct: 100
        transition: 10
{% endexample %}

{% enddetails %}

### Automation: welcome home lighting

When you arrive home after dark, turn on every light in the living room at a comfortable level so the house greets you instead of leaving you fumbling for switches.

- **Trigger**: Person: Paulus changes to home
- **Condition**: Sun is below horizon
- **Action**: Turn on light
- **Target**: Living room
- **Brightness percentage**: 60

{% details "YAML example for welcome home lighting" %}

{% example %}
automation: |
  alias: "Welcome home lighting"
  triggers:
    - trigger: state
      entity_id: person.paulus
      to: home
  conditions:
    - condition: sun
      after: sunset
  actions:
    - action: light.turn_on
      target:
        area_id: living_room
      data:
        brightness_pct: 60
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
