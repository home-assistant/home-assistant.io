---
title: "Set state"
action: lifx.set_state
domain: lifx
description: "Change the color, brightness, and power of a LIFX light in a single step."
related_actions:
  - lifx.paint_theme
  - lifx.set_hev_cycle_state
  - lifx.effect_stop
---

The **Set state** action sets a color and brightness on a LIFX light, and can optionally turn the light on or off at the same time. Unlike [`light.turn_on`](/actions/light.turn_on/), which always powers the light on, this action leaves the power state alone unless you ask it to change. That makes it useful for preparing how a light looks while it is still off, so it comes on the way you want when a motion sensor, a button, or another automation switches it on.

This action accepts every color and brightness option that `light.turn_on` accepts, such as **Color name**, **Brightness**, or **Color temperature**, and adds a few LIFX-only options on top. It works with any light provided by the LIFX {% term integration %}.

{% include actions/ui_header.md %}

To set the state of a LIFX light from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Set state**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the area your LIFX lights are in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
7. Choose the color and brightness you want. _Optional_: to also switch the lights on or off, enable **Power** and set it. If you leave **Power** out, the lights keep the power state they already have.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Power:
  description: Turn the lights on or off. Leave this out to keep the power state as it is.
  required: false
Transition:
  description: How long, in seconds, it takes to reach the final state, from 0 to 3600.
  required: false
Zones:
  description: The zone numbers to change on multizone lights, such as the LIFX Z, Lightstrip, and Beam. Zones start counting at 0. Any zone you leave out keeps its current color.
  required: false
Infrared:
  description: The automatic infrared level, from 0 to 255, used when the light brightness is low on a LIFX Nightvision bulb. This option is deprecated.
  required: false
{% endoptions_ui %}

You can also set any color and brightness option that the [**Turn on**](/actions/light.turn_on/) action offers, such as **Color name**, **Brightness**, **Color temperature**, or **Effect**.

{% important %}

The **Infrared** option is deprecated. Use the **Infrared brightness** entity that Home Assistant creates for every LIFX Nightvision bulb instead. In an automation or a script, target that entity with the [**Set value**](/actions/number.set_value/) action. If you still use **Infrared**, Home Assistant logs a warning that points you at the right entity.

{% endimportant %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lifx.set_state`. A basic example looks like this:

{% example %}
action: |
  action: lifx.set_state
  target:
    entity_id: light.living_room
  data:
    color_name: "blue"
    brightness: 120
    transition: 2
{% endexample %}

This fades the living room light to blue at a brightness of 120 over two seconds, without changing whether the light is on or off.

### Options in YAML

{% options_yaml %}
power:
  description: Set to true to turn the lights on, or false to turn them off. Leave this out to keep the power state as it is.
  required: false
  type: boolean
  default: true
transition:
  description: How long, in seconds, it takes to reach the final state, from 0 to 3600.
  required: false
  type: float
zones:
  description: A list of zone numbers to change on multizone lights, such as the LIFX Z, Lightstrip, and Beam. Zones start counting at 0. Any zone you leave out keeps its current color.
  required: false
  type: list
infrared:
  description: The automatic infrared level, from 0 to 255, used when the light brightness is low on a LIFX Nightvision bulb. This option is deprecated. Use the Infrared brightness entity with the number.set_value action instead.
  required: false
  type: integer
{% endoptions_yaml %}

You can also use any color and brightness option that the [`light.turn_on`](/actions/light.turn_on/) action accepts, such as `color_name`, `brightness`, `brightness_pct`, `hs_color`, `rgb_color`, `xy_color`, `color_temp_kelvin`, or `effect`.

{% include actions/targets.md domain="light" %}

## Good to know

- If you don't specify a `power` option, the light will stay in its current power state. There is no default, so the action won't switch a light on or off unless you tell it to.
- The `infrared` option is deprecated. Home Assistant logs a warning telling you to use the **Infrared brightness** entity with the [`number.set_value`](/actions/number.set_value/) action instead, and returns an error if the target is not a LIFX Nightvision bulb.
- The `zones` option only applies to multizone lights. On any other LIFX light, it is ignored and the whole light changes color.
  - LIFX Z and Lightstrip have 8 zones per segment, up to 10 segments, for a maximum of 80 zones (numbered 0 to 79).
  - LIFX Beam has 10 zones per segment plus 1 per corner piece, up to 8 segments and 2 corners, for a maximum of 82 zones (numbered 0 to 81).
  - LIFX String has 3 zones per bulb and 12 bulbs per segment, for a maximum of 108 zones if you connect three segments together (numbered 0 to 107).
  - LIFX Neon Flex comes in two lengths: 6.5ft/2M which has 24 zones and 16ft/5M which has 60 zones for a maximum of 120 zones if you connect two 16ft/5M segments together (numbered 0 to 119).
- To paint several colors across a light in one step, use [Paint theme](/actions/lifx.paint_theme/) instead of listing zones one at a time.
- This action stops a running software effect such as Pulse or Color loop for you. If a firmware effect such as Move, Flame, Morph, or Sky is running, start with [Stop effect](/actions/lifx.effect_stop/) so your new color isn't overwritten.
- This action only works on lights provided by the LIFX integration. If none of the targets is a LIFX light, Home Assistant returns an error.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: preset the hallway lights before they come on

At sunset, set the hallway lights to a dim, warm color without switching them on. When a motion sensor turns them on later that evening, they come on at that setting instead of at their bright daytime one.

- **Trigger**: Sun: sunset
- **Action**: Set state
  - **Target**: Hallway lights (`light.hallway`)

{% example %}
automation: |
  alias: "Preset the hallway lights for the evening"
  triggers:
    - trigger: sun
      event: sunset
  actions:
    - action: lifx.set_state
      target:
        entity_id: light.hallway
      data:
        color_name: "orange"
        brightness_pct: 15
{% endexample %}

### Automation: highlight part of a light strip when the front door opens

Turn the first five zones of a light strip red and switch the strip on when the front door opens. The rest of the strip keeps its current colors.

- **Trigger**: State: front door opens
- **Action**: Set state
  - **Target**: Light strip (`light.light_strip`)

{% example %}
automation: |
  alias: "Highlight the light strip when the front door opens"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door
      to: "on"
  actions:
    - action: lifx.set_state
      target:
        entity_id: light.light_strip
      data:
        zones:
          - 0
          - 1
          - 2
          - 3
          - 4
        color_name: "red"
        power: true
        transition: 1
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
