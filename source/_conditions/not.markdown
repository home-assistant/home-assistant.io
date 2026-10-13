---
title: "Not"
condition: not
domain: homeassistant
description: "Tests if none of its conditions pass."
related_conditions:
  - and
  - or
---

The **Not** condition groups one or more conditions and passes only if none of them pass. Use it when an automation should not continue in a certain situation. For example, the automation sends a notification when a door opens, but only if nobody is home.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select **Blocks**, then select **Not**.
   - To add **Not** inside an **And** or an **Or** condition, select **Add condition** inside that condition, and then select **Blocks** > **Not**.
5. Inside the **Not** condition, select **Add condition**, and add the conditions that must not pass.
   - You can add any condition, including other **And**, **Or**, and **Not** conditions.
6. Select **Save**.

### Options in the UI

The **Not** condition has no options of its own. It checks the conditions that you add inside it.

{% include conditions/yaml_header.md %}

In YAML, use `condition: not`, with the conditions under `conditions`. A basic example looks like this:

{% example %}
condition: |
  condition: not
  conditions:
    - condition: state
      entity_id: person.alex
      state: "home"
    - condition: state
      entity_id: alarm_control_panel.home_alarm
      state: "disarmed"
{% endexample %}

This passes if Alex isn't home, and the alarm isn't disarmed.

There is also a shorter form, with the conditions under `not`:

{% example %}
condition: |
  not:
    - condition: state
      entity_id: person.alex
      state: "home"
    - condition: state
      entity_id: alarm_control_panel.home_alarm
      state: "disarmed"
{% endexample %}

### Options in YAML

{% options_yaml %}
condition:
  description: The condition type. For this condition, use `not`. In the shorter form, leave out `condition`, and use `not` instead of `conditions`.
  required: true
  type: string
conditions:
  description: The conditions that must not pass. If one of them passes, the **Not** condition doesn't pass.
  required: true
  type: list
{% endoptions_yaml %}

## Good to know

- With several conditions, **Not** only passes if none of them pass. To pass if at least one of them doesn't pass, put them in an [**And**](/conditions/and/) condition inside the **Not** condition. For an example, refer to [Automation: send a reminder at night when not all doors are locked](/conditions/and/#automation-send-a-reminder-at-night-when-not-all-doors-are-locked).
- The conditions are checked in order. As soon as one of them passes, the rest aren't checked.
- If an entity usually only has two states, like a light, you often don't need **Not**. For example, to check that a light is off, use a [**State**](/conditions/state/) condition with the state **Off**. The difference: **Not** with the state **On** also passes when the light is unavailable (`unavailable`) or unknown (`unknown`).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: send a notification when a door opens and nobody is home

When the front door opens, this automation sends a notification, but only if neither Alex nor Sam is home.

- **Trigger**: State changed
  - **Entity**: Front door (`binary_sensor.front_door`)
  - **To**: Open
- **Condition**: Not
  - **Condition**: State
    - **Entity**: Alex (`person.alex`)
    - **State**: Home
  - **Condition**: State
    - **Entity**: Sam (`person.sam`)
    - **State**: Home
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: The front door opened while nobody is home.

{% details "YAML example for the door notification" %}

{% example %}
automation: |
  alias: "Notify when the door opens and nobody is home"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door
      to: "on"
  conditions:
    - condition: not
      conditions:
        - condition: state
          entity_id: person.alex
          state: "home"
        - condition: state
          entity_id: person.sam
          state: "home"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The front door opened while nobody is home."
{% endexample %}

{% enddetails %}

### Automation: turn off the living room lights at night, unless the TV is playing

At 23:00, this automation turns off the living room lights, but not while the TV is playing.

- **Trigger**: Time
  - **At time**: `23:00`
- **Condition**: Not
  - **Condition**: State
    - **Entity**: Living room TV (`media_player.living_room_tv`)
    - **State**: Playing
- **Action**: Turn off light
  - **Target**: Living room lights (`light.living_room`)

{% details "YAML example for turning off the living room lights" %}

{% example %}
automation: |
  alias: "Turn off living room lights unless the TV is playing"
  triggers:
    - trigger: time
      at: "23:00:00"
  conditions:
    - condition: not
      conditions:
        - condition: state
          entity_id: media_player.living_room_tv
          state: "playing"
  actions:
    - action: light.turn_off
      target:
        entity_id: light.living_room
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
