---
title: "Light turned on"
trigger: light.turned_on
domain: light
description: "Triggers after one or more lights turn on."
related_triggers:
  - light.turned_off
  - light.brightness_changed
---

The **Light turned on** trigger fires after a light {% term entity %} turns on. Use it to start an automation the moment the light lights up, whether someone flipped a physical switch, pressed a button in the UI, or called an action in another automation.

When you target more than one light, the trigger's **behavior** option controls when it fires. You can have it fire the first time any targeted light turns on, the last time the final targeted light turns on, or every single time any of them turn on.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Light: Light turned on**.
5. Under **Targets**, choose what to watch:
    - To watch a specific light, select the entity.
    - To watch every light in a room, select an area.
    - To watch every light on a floor, select a floor.
    - To watch lights sharing a tag, select a label.
6. Under **Trigger when**, pick **Any**, **First**, or **Last** to control how the trigger behaves when multiple lights are targeted.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple lights are targeted, controls when the trigger fires. Pick **Any** to fire every time any targeted light turns on, **First** to fire only when the first of a group of off lights turns on, or **Last** to fire only after every targeted light is on.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `light.turned_on`. A basic example looks like this:

{% example %}
trigger: |
  trigger: light.turned_on
  target:
    entity_id: light.kitchen
{% endexample %}

This fires every time `light.kitchen` transitions from off to on.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple lights are targeted, controls when the trigger fires. Accepts `any`, `first`, or `last`.
  required: true
  type: string
  default: any
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- The trigger only fires when a light transitions from a known, valid state. If a light comes back from being unavailable (`unavailable`) or having an unknown state (`unknown`), the trigger does not fire for that recovery.
- Pair this trigger with [Light is off](/conditions/light.is_off/) to make sure the automation only runs when a specific target is expected to have been off first.
- To react to the opposite transition, use [Light turned off](/triggers/light.turned_off/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: notify when the hallway light comes on at night

When the hallway light turns on after sunset, send a phone notification so you know someone's moving around the house.

- **Trigger**: Light turned on
- **Target**: Hallway light
- **Trigger when**: Any
- **Condition**: Sun is below horizon
- **Action**: Send a mobile notification

{% details "YAML example for a nighttime hallway notification" %}

{% example %}
automation: |
  alias: "Notify on hallway light at night"
  triggers:
    - trigger: light.turned_on
      target:
        entity_id: light.hallway
      options:
        behavior: any
  conditions:
    - condition: sun
      after: sunset
  actions:
    - action: notify.mobile_app_phone
      data:
        message: "Hallway light just turned on."
{% endexample %}

{% enddetails %}

### Automation: play welcome music when any downstairs light comes on in the morning

When the first downstairs light turns on in the morning, start a gentle playlist so you walk into a lively room.

- **Trigger**: Light turned on
- **Target**: Downstairs area
- **Trigger when**: First
- **Condition**: Time is between 06:00 and 10:00
- **Action**: Media player: Play media

{% details "YAML example for a morning welcome playlist" %}

{% example %}
automation: |
  alias: "Welcome music on first downstairs light"
  triggers:
    - trigger: light.turned_on
      target:
        area_id: downstairs
      options:
        behavior: first
  conditions:
    - condition: time
      after: "06:00:00"
      before: "10:00:00"
  actions:
    - action: media_player.play_media
      target:
        entity_id: media_player.kitchen
      data:
        media_content_id: "spotify:playlist:37i9dQZF1DXdwmD5Q7Gxah"
        media_content_type: music
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
