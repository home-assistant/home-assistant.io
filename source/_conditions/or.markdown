---
title: "Or"
condition: or
domain: homeassistant
description: "Tests if at least one of its conditions passes."
related_conditions:
  - and
  - not
---

The **Or** condition groups several conditions and passes if at least one of them passes. Use it when an automation should continue in more than one situation. For example, the automation turns on the hallway light when the sun is down, or when the hallway is dark during the day.

The conditions in the **And if** section of an automation must all pass. You can add an **Or** condition next to them. The automation then continues if all the other conditions pass, and at least one condition inside the **Or** condition passes.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select **Blocks**, then select **Or**.
   - To add **Or** inside an **And** or a **Not** condition, select **Add condition** inside that condition, and then select **Blocks** > **Or**.
5. Inside the **Or** condition, select **Add condition**, and add the conditions to check.
   - You can add any condition, including other **And**, **Or**, and **Not** conditions.
6. Select **Save**.

### Options in the UI

The **Or** condition has no options of its own. It checks the conditions that you add inside it.

{% include conditions/yaml_header.md %}

In YAML, use `condition: or`, with the conditions under `conditions`. A basic example looks like this:

{% example %}
condition: |
  condition: or
  conditions:
    - condition: state
      entity_id: person.alex
      state: "home"
    - condition: state
      entity_id: person.sam
      state: "home"
{% endexample %}

This passes if Alex or Sam is home, or both.

There is also a shorter form, with the conditions under `or`:

{% example %}
condition: |
  or:
    - condition: state
      entity_id: person.alex
      state: "home"
    - condition: state
      entity_id: person.sam
      state: "home"
{% endexample %}

### Options in YAML

{% options_yaml %}
condition:
  description: The condition type. For this condition, use `or`. In the shorter form, leave out `condition`, and use `or` instead of `conditions`.
  required: true
  type: string
conditions:
  description: The conditions to check. At least one of them must pass.
  required: true
  type: list
{% endoptions_yaml %}

## Good to know

- The conditions are checked in order. As soon as one of them passes, the rest aren't checked.
- To check several conditions together as one option, put them in an [**And**](/conditions/and/) condition inside the **Or** condition. For an example, refer to [Automation: turn on the fan when it's hot, or warm and humid](/conditions/and/#automation-turn-on-the-fan-when-its-hot-or-warm-and-humid).
- To pass only if none of the conditions pass, use [**Not**](/conditions/not/).
- For a single entity, you don't always need **Or**. For example, the [**State**](/conditions/state/) condition passes if the entity has one of several states that you select.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: remind you to take a jacket when it's cold or rainy

At 07:30, this automation sends a reminder to take a jacket, but only if Alex is home, and it's raining or the outdoor temperature is below 10 °C. The **State** condition and the **Or** condition are both in the **And if** section, so both must pass. Inside the **Or** condition, one of the two conditions is enough.

- **Trigger**: Time
  - **At time**: `07:30`
- **Condition**: State
  - **Entity**: Alex (`person.alex`)
  - **State**: Home
- **Condition**: Or
  - **Condition**: State
    - **Entity**: Home (`weather.home`)
    - **State**: Rainy
  - **Condition**: Numeric state
    - **Entity**: Outdoor temperature (`sensor.outdoor_temperature`)
    - **Below**: `10`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: Take a jacket today.

{% details "YAML example for the jacket reminder" %}

{% example %}
automation: |
  alias: "Remind me to take a jacket"
  triggers:
    - trigger: time
      at: "07:30:00"
  conditions:
    - condition: state
      entity_id: person.alex
      state: "home"
    - condition: or
      conditions:
        - condition: state
          entity_id: weather.home
          state: "rainy"
        - condition: numeric_state
          entity_id: sensor.outdoor_temperature
          below: 10
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Take a jacket today."
{% endexample %}

{% enddetails %}

### Automation: turn on the hallway light when it's dark

When motion is detected in the hallway, this automation turns on the hallway light if the sun is down, or if the hallway illuminance is below 20 lx during the day.

- **Trigger**: State changed
  - **Entity**: Hallway motion (`binary_sensor.hallway_motion`)
  - **To**: Detected
- **Condition**: Or
  - **Condition**: State
    - **Entity**: Sun (`sun.sun`)
    - **State**: Below horizon
  - **Condition**: Numeric state
    - **Entity**: Hallway illuminance (`sensor.hallway_illuminance`)
    - **Below**: `20`
- **Action**: Turn on light
  - **Target**: Hallway light (`light.hallway`)

{% details "YAML example for the hallway light" %}

{% example %}
automation: |
  alias: "Turn on hallway light when it's dark"
  triggers:
    - trigger: state
      entity_id: binary_sensor.hallway_motion
      to: "on"
  conditions:
    - condition: or
      conditions:
        - condition: state
          entity_id: sun.sun
          state: "below_horizon"
        - condition: numeric_state
          entity_id: sensor.hallway_illuminance
          below: 20
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hallway
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
