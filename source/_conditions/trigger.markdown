---
title: "Triggered by"
condition: trigger
domain: homeassistant
description: "Tests if a specific trigger started the automation."
related_conditions:
  - template
---

The **Triggered by** condition checks which {% term trigger %} started the automation. Use it when an automation has several triggers, and it should do something different depending on the trigger. For example, one automation can close the blinds at sunset and open them at sunrise.

You often use this condition in a **Choose** or **If-then** block between the actions, so that one part of the actions only runs for one trigger. You can also use it in the **And if** section.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. Make sure that the automation has the triggers you want to check.
4. In the **And if** section, select **Add condition**.
   - To use the condition between the actions, add it to the conditions of a **Choose** or **If-then** block instead.
5. From the search box, search for and select **Triggered by**.
6. Under **Trigger**, select one or more triggers of the automation.
   - The triggers are listed with their number and a description.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger:
  description: The triggers to check. The condition passes if one of the selected triggers started the automation. Home Assistant gives the selected triggers an ID, if they don't have one yet.
  required: true
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, use `condition: trigger`, and refer to the trigger by its [trigger ID](/docs/automation/trigger/#trigger-id). A basic example looks like this:

{% example %}
condition: |
  condition: trigger
  id: sunset
{% endexample %}

This passes when the trigger with the ID `sunset` started the automation.

### Options in YAML

The options in YAML are the same as in the UI.

{% options_yaml %}
condition:
  description: The condition type. For this condition, use `trigger`.
  required: true
  type: string
id:
  description: >
    The ID of the trigger, or a list of IDs. The condition passes if one of these triggers started the automation. A trigger without an ID uses its position in the list of triggers as its ID, starting with `0`.
  required: true
  type: [string, integer, list]
{% endoptions_yaml %}

The following example passes if one of two triggers started the automation:

{% example %}
condition: |
  condition: trigger
  id:
    - front_door_opened
    - back_door_opened
{% endexample %}

## Good to know

- When you select triggers in the editor, Home Assistant creates and manages their trigger IDs for you. It removes the IDs that it created when no **Triggered by** condition uses them anymore. If you use `trigger.id` in a template or in action data, set the ID yourself in YAML instead.
- If the editor shows **Missing trigger**, the condition refers to an ID that no trigger has anymore. This can happen if you delete a trigger, or change its ID in YAML. To clear the reference, clear the checkbox of the missing trigger.
- If the editor warns that triggers share the same ID, select **Fix**. Home Assistant gives each of these triggers its own ID and updates the **Triggered by** conditions. Templates and action data that use `trigger.id` aren't updated, so check them yourself.
- A trigger without an ID uses its position as its ID. In YAML, you can write that ID as a number or as text. For example, `0` and `"0"` both refer to the first trigger.
  - Positions start at `0`, but the editor numbers the triggers from 1. For example, trigger 1 in the editor has the ID `0` in YAML.
- When you select **Run actions**, or start the automation with the **Trigger automation** action, no trigger starts it. Both skip the conditions in **And if** by default, so the actions run.
  - A **Triggered by** condition in a **Choose** or **If-then** block is still checked. It doesn't pass, so that part of the actions doesn't run.
  - If you turn off **Skip conditions** in the **Trigger automation** action, a **Triggered by** condition in **And if** doesn't pass either. The automation stops.
  - To test the automation with a trigger, refer to [Using a simulated trigger to test an automation](/docs/automation/testing/#using-a-simulated-trigger-to-test-an-automation).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: close the blinds at sunset and open them at sunrise

This automation has two triggers. A **Choose** block uses **Triggered by** to close the blinds at sunset, and to open them at sunrise.

- **Triggers**:
  - Sun
    - **Event**: Sunset
  - Sun
    - **Event**: Sunrise
- **Action**: Choose
  - **Option 1**:
    - **Condition**: Triggered by
      - **Trigger**: The sunset trigger
    - **Action**: Close cover
      - **Target**: Living room blinds (`cover.living_room_blinds`)
  - **Option 2**:
    - **Condition**: Triggered by
      - **Trigger**: The sunrise trigger
    - **Action**: Open cover
      - **Target**: Living room blinds (`cover.living_room_blinds`)

{% details "YAML example for blinds that follow the sun" %}

{% example %}
automation: |
  alias: "Blinds follow the sun"
  triggers:
    - trigger: sun
      event: sunset
      id: sunset
    - trigger: sun
      event: sunrise
      id: sunrise
  actions:
    - choose:
        - conditions:
            - condition: trigger
              id: sunset
          sequence:
            - action: cover.close_cover
              target:
                entity_id: cover.living_room_blinds
        - conditions:
            - condition: trigger
              id: sunrise
          sequence:
            - action: cover.open_cover
              target:
                entity_id: cover.living_room_blinds
{% endexample %}

{% enddetails %}

### Automation: get a notification only for the back door

When the front door or the back door opens, this automation turns on the hallway light. Only if the back door opened, it also sends a notification.

- **Triggers**:
  - State changed
    - **Entity**: Front door (`binary_sensor.front_door`)
    - **To**: Open
  - State changed
    - **Entity**: Back door (`binary_sensor.back_door`)
    - **To**: Open
- **Action**: Turn on light
  - **Target**: Hallway light (`light.hallway`)
- **Action**: If-then
  - **If**: Triggered by
    - **Trigger**: The back door trigger
  - **Then**: Send a notification message
    - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a notification only for the back door" %}

{% example %}
automation: |
  alias: "Hallway light and back door notification"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door
      to: "on"
      id: front_door_opened
    - trigger: state
      entity_id: binary_sensor.back_door
      to: "on"
      id: back_door_opened
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hallway
    - if:
        - condition: trigger
          id: back_door_opened
      then:
        - action: notify.send_message
          target:
            entity_id: notify.my_device
          data:
            message: "The back door was opened."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
