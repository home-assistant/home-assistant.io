---
title: "Repeat for each"
building_block: repeat_for_each
category: repeating
description: "Run a group of actions once for each item in a list."
related_building_blocks:
  - repeat_count
  - repeat_while
  - repeat_until
---

The **Repeat for each** building block runs a group of actions once for each item in a list. Use it when you want to do the same thing for several items, for example, to turn off a list of lights one by one.

## Using this building block from the user interface

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and select an automation. To edit a script, go to the **Scripts** tab and select the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Repeat for each**.
4. In **For each item in list**, enter the list of items in YAML, for example:

   ```yaml
   - "living_room"
   - "kitchen"
   ```

5. Under **Actions**, select **Add action**, and add the actions to run for each item. To use the current item in a template, use `repeat.item`.
6. Select **Save**.

### Options in the UI

{% options_ui %}
For each item in list:
  description: The list of items. The actions run once for each item.
  required: true
Actions:
  description: The actions to run for each item.
  required: true
{% endoptions_ui %}

## Using this building block in YAML

In YAML, use `repeat` with `for_each` and `sequence`. This example turns off three lights:

{% example %}
action: |
  repeat:
    for_each:
      - "living_room"
      - "kitchen"
      - "office"
    sequence:
      - action: light.turn_off
        target:
          entity_id: "light.{{ repeat.item }}"
{% endexample %}

The items can also be templates, or mappings of keys and values:

{% example %}
action: |
  repeat:
    for_each:
      - language: English
        message: Hello World
      - language: Dutch
        message: Hallo Wereld
    sequence:
      - action: notify.phone
        data:
          title: "Message in {{ repeat.item.language }}"
          message: "{{ repeat.item.message }}!"
{% endexample %}

### Options in YAML

{% options_yaml %}
repeat:
  description: The repeat settings.
  required: true
  type: map
  keys:
    for_each:
      description: The list of items, or a template that returns a list.
      required: true
      type: [list, template]
    sequence:
      description: The actions to run for each item.
      required: true
      type: list
{% endoptions_yaml %}

### Repeat variable

While the actions repeat, the `repeat` variable shows which item is used:

- `repeat.item`: The current item of the list.
- `repeat.index`: The number of the round: `1`, `2`, `3`, and so on.
- `repeat.first`: `true` during the first round.
- `repeat.last`: `true` during the last round.

## Good to know

- The list can be a fixed list, or a list created by a template. If the template doesn't return a list, the automation or script stops with an error.

## Examples

### Automation: Send a notification for each sensor with low battery

Every evening, this automation goes through all entities with the {% term label %} "Battery check", and sends a separate notification for each one that is below 20%. The notification includes the name of the sensor. Create the label yourself, and add it to your battery sensors, in {% my labels title="**Settings** > **Areas, labels & zones** > **Labels**" %}.

The list comes from a template, so it changes when you add the label to more sensors. Inside the repeat, `repeat.item` is the entity ID of the current sensor.

- **Trigger**: Time
  - **At time**: `20:00`
- **Action**: Repeat for each
  - **For each item in list**: `{{ label_entities('Battery check') }}`
  - **Actions**:
    - **Action**: If-then
      - **If**:
        - **Condition**: Template
          - **Value template**: `{{ states(repeat.item) | float(100) < 20 }}`
      - **Then**:
        - **Action**: Send a notification message
          - **Target**: My Device (`notify.my_device`)
          - **Message**: `{{ state_attr(repeat.item, 'friendly_name') }} has {{ states(repeat.item) }}% battery left.`

{% details "YAML example" %}

{% example %}
automation: |
  alias: "Notify about low batteries"
  triggers:
    - trigger: time
      at: "20:00:00"
  actions:
    - repeat:
        for_each: "{{ label_entities('Battery check') }}"
        sequence:
          - if:
              - "{{ states(repeat.item) | float(100) < 20 }}"
            then:
              - action: notify.send_message
                target:
                  entity_id: notify.my_device
                data:
                  message: >
                    {{ state_attr(repeat.item, 'friendly_name') }} has
                    {{ states(repeat.item) }}% battery left.
{% endexample %}

{% enddetails %}
