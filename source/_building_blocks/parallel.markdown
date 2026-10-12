---
title: "Run in parallel"
building_block: parallel
category: running_together
description: "Start several actions at the same time."
related_building_blocks:
  - sequence
---

The **Run in parallel** building block starts several actions at the same time, instead of one after the other. Use it when the actions don't depend on each other and the order doesn't matter, for example, to send several notifications at once.

## Adding Run in parallel in the editor

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open an automation. To edit a script, open the **Scripts** tab and open the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Run in parallel**.
4. Inside the building block, select **Add action**, and add the actions to start at the same time.
   - To run some of them in order, add a [**Run in sequence**](/building-blocks/sequence/) building block, and add those actions to it.
5. Select **Save**.

### Options in the UI

This building block has no options. You add the actions inside it.

## Run in parallel in YAML

In YAML, use `parallel` with a list of actions. This example sends two messages at the same time:

{% example %}
automation: |
  triggers:
    - trigger: state
      entity_id: binary_sensor.motion
      to: "on"
  actions:
    - parallel:
        - action: notify.person1
          data:
            message: "These messages are sent at the same time!"
        - action: notify.person2
          data:
            message: "These messages are sent at the same time!"
{% endexample %}

### Options in YAML

{% options_yaml %}
parallel:
  description: The actions to start at the same time. To run some of them in order, put them in a `sequence`.
  required: true
  type: list
{% endoptions_yaml %}

## Good to know

- Most automations and scripts work well with actions that run one after the other. Use **Run in parallel** only when the actions don't depend on each other.
- The actions start at the same time, but they don't always finish in the same order.
- If one action fails, the other actions keep running until they are finished or fail too.
- Variables that one action creates or changes can conflict with variables of another action. Give them different names.

## Examples

### Script: wait for motion in one group, and send a message right away in another

This script runs two things at the same time. The first is a group that waits for motion and then sends a message. The second sends a message right away, without waiting for the first group.

{% details "YAML example" %}

{% example %}
script: |
  example_script:
    sequence:
      - parallel:
          - sequence:
              - wait_for_trigger:
                  - trigger: state
                    entity_id: binary_sensor.motion
                    to: "on"
              - action: notify.person1
                data:
                  message: "This message awaited the motion trigger"
          - action: notify.person2
            data:
              message: "I am sent immediately and do not await the above action!"
{% endexample %}

{% enddetails %}
