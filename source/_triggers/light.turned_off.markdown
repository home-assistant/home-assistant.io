---
title: "Light turned off"
trigger: light.turned_off
domain: light
description: "Triggers when one or more lights turn off."
related_triggers:
  - light.turned_on
  - light.brightness_changed
---

The **Light turned off** trigger fires after a light {% term entity %} turns off. Use it to start an automation the moment a light goes dark, whether someone flipped a physical switch, pressed a button in the UI, or called an action.

When you target more than one light, the trigger's **behavior** option controls when it fires. You can have it fire the first time any targeted light turns off, the last time the final targeted light turns off, or every single time any of them turn off.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Light turned off**.
5. Under **Targets**, choose what to watch:
    - To watch a specific light, select the entity.
    - To watch every light in a room, select an area.
    - To watch every light on a floor, select a floor.
    - To watch lights sharing a tag, select a label.
6. Under **Trigger when**, pick **Each**, **First**, or **All**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple lights are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted light turns off, **First** to fire only when the first of a group of on lights turns off, or **All** to fire only after every targeted light is off.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `light.turned_off`. A basic example looks like this:

{% example %}
trigger: |
  trigger: light.turned_off
  target:
    entity_id: light.kitchen
{% endexample %}

This fires every time `light.kitchen` transitions from on to off.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple lights are targeted, controls when the trigger fires. Accepts `each`, `first`, or `all`.
  required: false
  type: string
  default: each
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- The trigger only fires when a light transitions from a known, valid state. Transitions from being unavailable (`unavailable`) or having an unknown state (`unknown`) to off do not count.
- To react to the opposite transition, use [Light turned on](/triggers/light.turned_on/).
- Pair this trigger with the `all` behavior to run something once every light in an area is off, like turning off the TV when every light in the living room has been switched off.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: arm the alarm when the last light goes off at night

When the last light in the house turns off late at night, arm the alarm automatically. A great way to forget a manual step without forgetting your security.

- **Trigger**: Light turned off
- **Target**: All lights (by label)
- **Trigger when**: All
- **Condition**: Time is after 22:30
- **Action**: Alarm control panel: Arm away

{% details "YAML example for an arm-on-last-light automation" %}

{% example %}
automation: |
  alias: "Arm alarm when last light off"
  triggers:
    - trigger: light.turned_off
      target:
        label_id: all_lights
      options:
        behavior: all
  conditions:
    - condition: time
      after: "22:30:00"
  actions:
    - action: alarm_control_panel.alarm_arm_away
      target:
        entity_id: alarm_control_panel.home
{% endexample %}

{% enddetails %}

### Automation: turn off the media player when the living room goes dark

When every light in the living room is off, stop whatever is playing on the living room speaker. Saves energy and silence at the same time.

- **Trigger**: Light turned off
- **Target**: Living room area
- **Trigger when**: All
- **Action**: Turn off media player
  - **Target**: Living room speaker

{% details "YAML example for auto-pausing media when the room goes dark" %}

{% example %}
automation: |
  alias: "Stop media when living room dark"
  triggers:
    - trigger: light.turned_off
      target:
        area_id: living_room
      options:
        behavior: all
  actions:
    - action: media_player.turn_off
      target:
        entity_id: media_player.living_room
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
