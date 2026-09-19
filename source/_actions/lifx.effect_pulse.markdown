---
title: "Pulse effect"
action: lifx.effect_pulse
domain: lifx
description: "Run a flash effect on LIFX lights by changing to a color and back."
related_actions:
  - lifx.effect_colorloop
  - lifx.effect_stop
  - lifx.set_state
---

The **Pulse effect** action runs a flash effect on LIFX lights by changing to a color and back. It's a good way to get someone's attention, for example to flash the hallway light when the doorbell rings or when a door is left open.

This is a software effect, which means Home Assistant drives each color change over your network. It works on every LIFX light, including white-only models. When the effect finishes, each light returns to the color and power state it had before the effect started.

{% include actions/ui_header.md %}

To run the pulse effect from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Pulse effect**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the area your LIFX lights are in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
7. Select **Mode** to choose how the color changes, then pick the flash color with either **Color name** or **RGB color**.
8. _Optional_: set **Cycles** to flash more than once, and **Period** to make each flash faster or slower.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Mode:
  description: "Decides how colors are changed. One of: `blink` (switch straight to the new color), `breathe` (fade to the new color and back), `ping` (a short pulse of the new color), `strobe` (the light turns off between color changes), or `solid` (the light stays at the new color between cycles)."
  required: false
Brightness value:
  description: How bright the temporary color is, where 1 is the minimum brightness and 255 is the maximum brightness the light supports. Leave it out to keep the current brightness.
  required: false
Brightness:
  description: An alternative to the brightness value, as a percentage from 1 to 100. Use either this or the brightness value, not both.
  required: false
Color name:
  description: A human-readable color name for the temporary color, such as `red` or `green`.
  required: false
RGB color:
  description: The temporary color in RGB format, as a list of three numbers from 0 to 255. Use either this or the color name, not both.
  required: false
Period:
  description: How long a single flash takes, in seconds. Accepts 0.05 to 60 seconds.
  required: false
Cycles:
  description: How many times the effect runs, from 1 to 10000.
  required: false
Power on:
  description: Turn this off to skip lights that are currently off. When it's on, those lights are temporarily turned on for the effect.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lifx.effect_pulse`. A basic example looks like this:

{% example %}
action: |
  action: lifx.effect_pulse
  target:
    entity_id: light.office
  data:
    color_name: "red"
    mode: breathe
    cycles: 3
{% endexample %}

This makes the office light breathe red three times, then return to its previous color.

### Options in YAML

{% options_yaml %}
mode:
  description: >
    Decides how colors are changed. One of: `blink` (switch straight to the new color), `breathe` (fade to the new color and back), `ping` (a short pulse of the new color), `strobe` (the light turns off between color changes), or `solid` (the light stays at the new color between cycles).
  required: false
  type: string
  default: blink
brightness:
  description: >
    How bright the temporary color is, where 1 is the minimum brightness and 255 is the maximum brightness the light supports. Leave it out to keep the current brightness. Cannot be combined with `brightness_pct`.
  required: false
  type: integer
brightness_pct:
  description: >
    An alternative to `brightness`, as a percentage from 1 to 100. Cannot be combined with `brightness`.
  required: false
  type: float
color_name:
  description: >
    A human-readable color name for the temporary color, such as `red` or `green`. Cannot be combined with `rgb_color`.
  required: false
  type: string
rgb_color:
  description: >
    The temporary color in RGB format, as a list of three numbers from 0 to 255. Cannot be combined with `color_name`.
  required: false
  type: list
period:
  description: >
    How long a single flash takes, in seconds. Accepts 0.05 to 60 seconds, in steps of 0.05. If you leave it out, the `strobe` mode uses 0.1 seconds and every other mode uses 1 second.
  required: false
  type: float
cycles:
  description: >
    How many times the effect runs, from 1 to 10000. If you leave it out, the `strobe` mode runs 10 cycles and every other mode runs 1 cycle.
  required: false
  type: float
power_on:
  description: >
    Set to false to skip lights that are currently off. When true, those lights are temporarily turned on for the effect.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

{% include actions/targets.md domain="light" %}

## Good to know

- This action only works on lights that belong to the LIFX {% term integration %}. If your target contains no LIFX light, Home Assistant reports an error: "The targets of action lifx.effect_pulse include no LIFX light".
- The pulse effect works on every LIFX light, including white-only models such as the LIFX White and Mini White.
- If you don't set a color, each light flashes using its own current color, so the flash is only visible when you change the brightness or the mode.
- Because this is a software effect, Home Assistant sends each color change over your network. Very short periods across many lights can look less even than a firmware effect such as [Move effect](/actions/lifx.effect_move/).
- Starting a pulse effect replaces a software effect that's already running on the same light, such as [Color loop effect](/actions/lifx.effect_colorloop/). It doesn't clear a firmware effect such as Move, Flame, Morph, or Sky, so run [Stop effect](/actions/lifx.effect_stop/) first if one of those is running.
- To end the effect before it finishes all its cycles, use [Stop effect](/actions/lifx.effect_stop/).
- You can also start this effect with its default options from the regular [`light.turn_on`](/actions/light.turn_on/) action by setting its effect to `effect_pulse`. Use this dedicated action when you want to control the color, mode, period, or number of cycles.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: flash the hallway light when the front door opens

When the front door opens, flash the hallway light blue twice so you notice it from another room.

- **Trigger**: Front door opened (`binary_sensor.front_door`)
- **Action**: Pulse effect
  - **Target**: Hallway light (`light.hallway`)

{% example %}
automation: |
  alias: "Flash the hallway light when the front door opens"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door
      from: "off"
      to: "on"
  actions:
    - action: lifx.effect_pulse
      target:
        entity_id: light.hallway
      data:
        color_name: "blue"
        mode: breathe
        cycles: 2
{% endexample %}

### Automation: flash the office light when the washing machine finishes

When the washing machine power drops below 5 W, flash the office light green and send a notification to your phone.

- **Trigger**: Washing machine power below 5 W (`sensor.washing_machine_power`)
- **Action**: Pulse effect
  - **Target**: Office light (`light.office`)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% example %}
automation: |
  alias: "Flash the office light when the washing machine finishes"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.washing_machine_power
      below: 5
      for: "00:02:00"
  actions:
    - action: lifx.effect_pulse
      target:
        entity_id: light.office
      data:
        color_name: "green"
        mode: breathe
        cycles: 5
        period: 2
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          The washing machine has finished.
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
