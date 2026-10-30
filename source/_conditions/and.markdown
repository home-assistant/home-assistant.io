---
title: "And"
condition: and
domain: homeassistant
description: "Tests if all of its conditions pass."
related_conditions:
  - or
  - not
---

The **And** condition groups several conditions and passes only if all of them pass. Use it inside an [**Or**](/conditions/or/) or a [**Not**](/conditions/not/) condition. For example, the automation continues if it's very hot, or if it's warm and humid at the same time.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select **Blocks**, then select **And**.
   - To add **And** inside an **Or** or a **Not** condition, select **Add condition** inside that condition, and then select **Blocks** > **And**.
5. Inside the **And** condition, select **Add condition**, and add the conditions that must all pass.
   - You can add any condition, including other **And**, **Or**, and **Not** conditions.
6. Select **Save**.

### Options in the UI

The **And** condition has no options of its own. It checks the conditions that you add inside it.

{% include conditions/yaml_header.md %}

In YAML, use `condition: and`, with the conditions under `conditions`. A basic example looks like this:

{% example %}
condition: |
  condition: and
  conditions:
    - condition: state
      entity_id: person.alex
      state: "home"
    - condition: numeric_state
      entity_id: sensor.living_room_temperature
      below: 20
{% endexample %}

This passes if Alex is home and the living room temperature is below 20 °C.

There is also a shorter form, with the conditions under `and`:

{% example %}
condition: |
  and:
    - condition: state
      entity_id: person.alex
      state: "home"
    - condition: numeric_state
      entity_id: sensor.living_room_temperature
      below: 20
{% endexample %}

### Options in YAML

{% options_yaml %}
condition:
  description: The condition type. For this condition, use `and`. In the shorter form, leave out `condition`, and use `and` instead of `conditions`.
  required: true
  type: string
conditions:
  description: The conditions that must all pass.
  required: true
  type: list
{% endoptions_yaml %}

## Good to know

- The conditions are checked in order. As soon as one of them doesn't pass, the rest aren't checked.
- The conditions in the **And if** section of an automation, and in building blocks like [**If-then**](/building-blocks/if/), already must all pass. You don't need an **And** condition there.
- To pass if at least one condition passes, use [**Or**](/conditions/or/). To pass if none of them pass, use [**Not**](/conditions/not/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: turn on the fan when it's hot, or warm and humid

When the living room temperature or humidity changes, this automation turns on the fan if the temperature is above 26 °C. It also turns on the fan if the temperature is above 24 °C and the humidity is above 70% at the same time.

- **Trigger**: State changed
  - **Entity**: Living room temperature (`sensor.living_room_temperature`), Living room humidity (`sensor.living_room_humidity`)
- **Condition**: Or
  - **Condition**: Numeric state
    - **Entity**: Living room temperature (`sensor.living_room_temperature`)
    - **Above**: 26
  - **Condition**: And
    - **Condition**: Numeric state
      - **Entity**: Living room temperature (`sensor.living_room_temperature`)
      - **Above**: 24
    - **Condition**: Numeric state
      - **Entity**: Living room humidity (`sensor.living_room_humidity`)
      - **Above**: 70
- **Action**: Turn on fan
  - **Target**: Living room fan (`fan.living_room`)

{% details "YAML example for turning on the fan" %}

{% example %}
automation: |
  alias: "Turn on fan when hot, or warm and humid"
  triggers:
    - trigger: state
      entity_id:
        - sensor.living_room_temperature
        - sensor.living_room_humidity
  conditions:
    - condition: or
      conditions:
        - condition: numeric_state
          entity_id: sensor.living_room_temperature
          above: 26
        - condition: and
          conditions:
            - condition: numeric_state
              entity_id: sensor.living_room_temperature
              above: 24
            - condition: numeric_state
              entity_id: sensor.living_room_humidity
              above: 70
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.living_room
{% endexample %}

{% enddetails %}

### Automation: send a reminder at night when not all doors are locked

At 22:00, this automation sends a reminder if the front door or the back door isn't locked. A [**Not**](/conditions/not/) condition with the two doors directly in it would only pass if neither door is locked. With an **And** condition inside the **Not** condition, it passes as soon as one door isn't locked.

- **Trigger**: Time: 22:00
- **Condition**: Not
  - **Condition**: And
    - **Condition**: State
      - **Entity**: Front door (`lock.front_door`)
      - **State**: Locked
    - **Condition**: State
      - **Entity**: Back door (`lock.back_door`)
      - **State**: Locked
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: Not all doors are locked.

{% details "YAML example for the door reminder" %}

{% example %}
automation: |
  alias: "Remind me when not all doors are locked"
  triggers:
    - trigger: time
      at: "22:00:00"
  conditions:
    - condition: not
      conditions:
        - condition: and
          conditions:
            - condition: state
              entity_id: lock.front_door
              state: "locked"
            - condition: state
              entity_id: lock.back_door
              state: "locked"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Not all doors are locked."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
