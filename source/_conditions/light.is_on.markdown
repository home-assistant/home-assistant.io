---
title: "Light is on"
condition: light.is_on
domain: light
description: "Tests if one or more lights are on."
related_conditions:
  - light.is_off
  - light.is_brightness
---

The **Light is on** condition passes when a light {% term entity %} is currently on. Use it to gate an automation so it only runs when a specific light (or every targeted light) is already lit.

When you target more than one light, the condition's **behavior** option controls how the check combines results. You can require any targeted light to be on, or demand that all of them are.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Light: Light is on**.
5. Under **Targets**, select the light entity, an area, a floor, or a label.
6. Under **Condition passes if**, pick **Any** or **All** to control how the check behaves when multiple lights are targeted.
7. Select **Save**.

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `light.is_on`. The simplest condition looks like this:

{% example %}
condition: |
  condition: light.is_on
  target:
    entity_id: light.living_room
{% endexample %}

This passes when the living room light is currently on.

{% include conditions/targets.md %}

## Fields

The following fields control how the condition evaluates. Switch tabs to see the friendly labels you pick in the UI or the technical names and types you use in YAML.

{% fields %}
ui:
  Condition passes if:
    description: When multiple lights are targeted, controls how results combine. Pick **Any** to pass if at least one targeted light is on, or **All** to pass only when every targeted light is on.
    required: true
yaml:
  behavior:
    description: >
      When multiple lights are targeted, controls how results combine. Accepts `all` or `any`.
    required: true
    type: string
    default: any
{% endfields %}

## Good to know

- Lights that are `unavailable` or `unknown` do not count as on. With `any` behavior, they are skipped. With `all` behavior, the condition fails if every targeted light is unavailable.
- To gate an automation on a light being off instead, use [Light is off](/conditions/light.is_off/).
- Pair with [Light is brightness](/conditions/light.is_brightness/) when you also want to check whether the light's brightness meets a threshold.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only announce the doorbell if the living room is lit

When the doorbell rings, only announce it through the living room speaker if the living room light is already on. Keeps the house quiet when the room is empty.

- **Trigger**: State: Doorbell button pressed
- **Condition**: Light is on
- **Target**: Living room light
- **Condition passes if**: Any
- **Action**: Media player: Play media

{% details "YAML example for a doorbell announcement gated on lights" %}

{% example %}
automation: |
  alias: "Doorbell announce when living room lit"
  triggers:
    - trigger: state
      entity_id: binary_sensor.doorbell
      to: "on"
  conditions:
    - condition: light.is_on
      target:
        entity_id: light.living_room
      options:
        behavior: any
  actions:
    - action: media_player.play_media
      target:
        entity_id: media_player.living_room
      data:
        media_content_id: "media-source://tts/cloud?message=Someone+is+at+the+door"
        media_content_type: music
        announce: true
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
