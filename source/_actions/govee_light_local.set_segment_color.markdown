---
title: "Set segment color"
action: govee_light_local.set_segment_color
domain: govee_light_local
description: "Sets the color of some segments of a Govee light, so each part of it can show its own color."
---

Many Govee lights, such as light strips, string lights, and pathway lights, are made of segments that can each show their own color, the way the Govee app colors them one by one.
The **Govee lights local: Set segment color** action sets one color on the segments you list, and leaves every other segment as it is.
To give several segments different colors, run the action once for each color.

{% include actions/ui_header.md %}

To set segment colors from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the area, floor, device, label, or entity you want to control.
6. From the actions shown for that target, under **Govee lights local**, select **Set segment color**.
7. Enter the segment numbers and pick a color.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Segments:
  description: The numbers of the segments to color. Segments start counting at 1, in the order the Govee app shows them.
  required: true
RGB color:
  description: The color to set the segments to.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `govee_light_local.set_segment_color`. A basic example looks like this:

{% example %}
action: |
  action: govee_light_local.set_segment_color
  target:
    entity_id: light.deck_string_lights
  data:
    segments: [1, 3, 5]
    rgb_color: [255, 0, 0]
{% endexample %}

This turns segments 1, 3, and 5 of `light.deck_string_lights` red.

### Options in YAML

{% options_yaml %}
segments:
  description: A list of the segment numbers to color, starting at 1.
  required: true
  type: list
rgb_color:
  description: The color, as a list of red, green, and blue values from 0 to 255.
  required: true
  type: list
{% endoptions_yaml %}

{% include actions/targets.md domain="light" %}

## Good to know

- Only lights whose model supports segment control can take this action. The [supported devices list of the underlying library](https://github.com/Galorhallen/govee-local-api/blob/master/SUPPORTED_DEVICES.md) shows how many segments each model has. A light without segments, or a segment number the light does not have, returns an error and no segment is changed.
- Setting a segment color ends the scene the light is showing.
- This action sends no on or off command, and it does not change the brightness.
- Govee lights do not report their segment colors, so Home Assistant does not show them.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: mark the front door on a pathway light

When the front door opens after sunset, color the first two segments of the pathway lights red, leaving the rest of the light as it is.

- **Trigger**: State changed
  - **Entity**: Front door
  - **To**: Open
- **Condition**: Sun is below the horizon
- **Action**: Govee lights local: Set segment color
  - **Segments**: 1, 2
  - **Color**: Red

{% details "YAML example for marking the front door on a pathway light" %}

{% example %}
automation: |
  alias: "Front door opened: pathway segments red"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door
      to: "on"
  conditions:
    - condition: state
      entity_id: sun.sun
      state: "below_horizon"
  actions:
    - action: govee_light_local.set_segment_color
      target:
        entity_id: light.pathway_lights
      data:
        segments: [1, 2]
        rgb_color: [255, 0, 0]
{% endexample %}

{% enddetails %}

### Automation: team colors on a light strip

At the start of a game, color the left half of a light strip in one team color and the right half in the other, one action for each color.

- **Trigger**: Calendar event starts
  - **Entity**: Game day calendar
- **Actions**:
  - Govee lights local: Set segment color, **Segments**: 1 to 6, **Color**: Blue
  - Govee lights local: Set segment color, **Segments**: 7 to 12, **Color**: Gold

{% details "YAML example for team colors on a light strip" %}

{% example %}
automation: |
  alias: "Game day: team colors on the TV strip"
  triggers:
    - trigger: calendar
      event: start
      entity_id: calendar.game_day
  actions:
    - action: govee_light_local.set_segment_color
      target:
        entity_id: light.tv_light_strip
      data:
        segments: [1, 2, 3, 4, 5, 6]
        rgb_color: [0, 51, 160]
    - action: govee_light_local.set_segment_color
      target:
        entity_id: light.tv_light_strip
      data:
        segments: [7, 8, 9, 10, 11, 12]
        rgb_color: [255, 184, 28]
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
