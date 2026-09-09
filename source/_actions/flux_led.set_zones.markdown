---
title: "Set zones"
action: flux_led.set_zones
domain: flux_led
description: "Sets strip zones for Addressable v3 controllers."
related_actions:
  - flux_led.set_custom_effect
  - flux_led.set_music_mode
---

The **Set zones** action assigns a color to each zone of an Addressable v3 (0xA3) light strip. The length of each zone is the number of pixels per segment divided by the number of colors you provide.

This is handy for splitting a single strip into sections, for example lighting one part of a shelf red and another part blue.

{% include actions/ui_header.md %}

To set strip zones from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Magic Home: Set zones**.
6. Under **Targets**, choose the lights to apply the zones to.
7. Enter the **Colors**, and optionally a **Speed** and **Effect**.
8. Select **Save**.

{% include actions/targets.md domain="light" %}

### Options in the UI

{% options_ui %}
Colors:
  description: A list of up to 2048 RGB colors, one for each zone.
  required: true
Speed:
  description: The speed of the effect, from 1 to 100 percent.
  required: false
Effect:
  description: "The effect to apply: static, running_water, strobe, jump, or breathing."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `flux_led.set_zones`. A basic example looks like this:

{% example %}
action: |
  action: flux_led.set_zones
  target:
    entity_id: light.addressable_v3_8e2f7f
  data:
    colors:
      - [255, 0, 0]
      - [0, 255, 0]
      - [0, 0, 255]
      - [255, 255, 255]
    speed_pct: 80
{% endexample %}

### Options in YAML

{% options_yaml %}
colors:
  description: >
    A list of up to 2048 RGB colors, one for each zone.
  required: true
  type: list
speed_pct:
  description: >
    The speed of the effect, from 1 to 100 percent.
  required: false
  type: integer
effect:
  description: >
    The effect to apply: `static`, `running_water`, `strobe`, `jump`, or `breathing`.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- If the light is off, setting zones does not turn it on. Turn the light on separately to see the effects of this action.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: highlight only the active desk zone to avoid lighting the whole strip

When someone sits down at the desk, set only the zone above the desk to a neutral white and leave the rest of the strip off. This avoids powering the full strip when only a small area needs illumination.

- **Trigger**: Binary sensor turns on (desk occupancy sensor)
- **Action**: Magic Home: Set zones

{% details "YAML example for highlighting active zone desk" %}

{% example %}
automation: |
  alias: ""Light only the desk zone when occupied"
  triggers:
  - trigger: state
    entity_id: binary_sensor.desk_occupancy
    to: "on"
  actions:
  - action: flux_led.set_zones
    target:
      entity_id: light.addressable_v3_desk
    data:
      colors:
        - [0, 0, 0]
        - [200, 200, 180]
        - [0, 0, 0]
      speed_pct: 0
      effect: static
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
