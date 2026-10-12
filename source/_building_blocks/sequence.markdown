---
title: "Run in sequence"
building_block: sequence
category: running_together
description: "Group actions that run one after the other."
related_building_blocks:
  - parallel
---

The **Run in sequence** building block groups actions that run one after the other. Each action starts after the previous one has finished. Use it to keep related actions together, so you can collapse them in the editor, or to run a group of actions in order inside [**Run in parallel**](/building-blocks/parallel/).

## Adding Run in sequence in the editor

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open an automation. To edit a script, open the **Scripts** tab and open the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Run in sequence**.
4. Inside the building block, select **Add action**, and add the actions of the group.
5. Optional: To give the group a name, select **Menu** {% icon "mdi:dots-vertical" %} > **Rename**.
6. Select **Save**.

### Options in the UI

This building block has no options. You add the actions inside it.

## Run in sequence in YAML

In YAML, use `sequence` with a list of actions. To give the group a name, add an `alias`:

{% example %}
action: |
  alias: "Turn on devices"
  sequence:
    - action: light.turn_on
      target:
        entity_id: light.ceiling
    - action: siren.turn_on
      target:
        entity_id: siren.noise_maker
{% endexample %}

### Options in YAML

{% options_yaml %}
sequence:
  description: The actions of the group. They run one after the other.
  required: true
  type: list
{% endoptions_yaml %}

## Good to know

- The actions of an automation or script already run one after the other. **Run in sequence** doesn't change that. It helps you organize them.

## Examples

### Automation: turn on devices, then send notifications

When motion is detected, this automation runs two groups of actions: one that turns on devices, and one that sends notifications. The groups and their actions run one after the other, four actions in total.

- **Trigger**: State changed
  - **Entity**: `binary_sensor.motion`
  - **To**: On
- **Action**: Run in sequence, named **Turn on devices**
  - Turn on the ceiling light and the siren
- **Action**: Run in sequence, named **Send notifications**
  - Send a notification to two people

{% details "YAML example" %}

{% example %}
automation: |
  triggers:
    - trigger: state
      entity_id: binary_sensor.motion
      to: "on"
  actions:
    - alias: "Turn on devices"
      sequence:
        - action: light.turn_on
          target:
            entity_id: light.ceiling
        - action: siren.turn_on
          target:
            entity_id: siren.noise_maker
    - alias: "Send notifications"
      sequence:
        - action: notify.person1
          data:
            message: "The motion sensor was triggered!"
        - action: notify.person2
          data:
            message: "Oh oh, someone triggered the motion sensor..."
{% endexample %}

{% enddetails %}
