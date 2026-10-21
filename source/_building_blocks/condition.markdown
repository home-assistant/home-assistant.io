---
title: "Condition"
building_block: condition
category: decisions
description: "Continue the automation or script only if a condition is met."
related_building_blocks:
  - if
  - choose
  - stop
---

The **Condition** building block checks a condition in the middle of a sequence. If the condition is met, the next steps run. If it is not met, the sequence stops. Use it when the next steps should only run in certain situations, for example, only when someone is home.

## Using this building block from the user interface

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and select an automation. To edit a script, go to the **Scripts** tab and select the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Condition**.
4. In **Condition type**, select the condition to check, for example, **State**, and fill in its options.
5. Select **Save**.

### Options in the UI

{% options_ui %}
Condition type:
  description: The condition to check. Each condition type has its own options. For the available conditions, refer to the [list of available conditions](/conditions/).
  required: true
{% endoptions_ui %}

## Using this building block in YAML

In YAML, use `condition` with the condition type and its options. For the available conditions, refer to the [Conditions page](/conditions/). This example only continues if Paulus is home:

{% example %}
action: |
  alias: "Check if Paulus is home"
  condition: state
  entity_id: device_tracker.paulus
  state: "home"
{% endexample %}

`condition` can also be a list of conditions. The sequence then only continues if all conditions are met:

{% example %}
action: |
  alias: "Check if Paulus is home and the temperature is below 20"
  condition:
    - condition: state
      entity_id: device_tracker.paulus
      state: "home"
    - condition: numeric_state
      entity_id: sensor.temperature
      below: 20
{% endexample %}

### Options in YAML

{% options_yaml %}
condition:
  description: The condition type, for example, `state`, followed by the options of that condition. Or a list of conditions, which must all be met, or a template.
  required: true
  type: [string, list, template]
{% endoptions_yaml %}

## Good to know

- **Condition** only stops the sequence it is in. Inside another building block, it only stops the actions of that building block. For example, inside a [**Repeat**](/building-blocks/repeat_count/) building block, it only stops the current round of the repeat. Inside [**Choose**](/building-blocks/choose/), it only stops the actions of that option. Inside [**Run in parallel**](/building-blocks/parallel/), it only stops its own branch.
- To run different actions depending on whether the condition is met, use [**If-then**](/building-blocks/if/) or [**Choose**](/building-blocks/choose/) instead.
- The condition checks the state at the moment the step runs. It isn't checked again later, so the sequence doesn't continue when the condition is met later. For more, refer to [Conditions check the current state](/docs/automation/how-automations-react-to-changes/#conditions-check-the-current-state).
