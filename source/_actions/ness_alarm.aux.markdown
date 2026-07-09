---
title: "Aux"
action: ness_alarm.aux
domain: ness_alarm
description: "Changes the state of an aux output on the Ness alarm panel."
related_actions:
  - ness_alarm.panic
---

The **Aux** action changes the state of an auxiliary output on your Ness alarm panel. This requires PCB version 7.8 or higher.

This is handy when you want to drive an extra output from Home Assistant, for example to switch a gate relay or a siren that is wired to one of the panel's aux outputs.

{% include actions/ui_header.md %}

To change an aux output from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Ness Alarm: Aux**.
6. Enter the **Output ID** you want to change, and set the **State** on or off.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Output ID:
  description: The aux output you want to change. A number from 1 to 8.
  required: true
State:
  description: The on or off state of the output. When P14xE 8E is enabled, turning on pulses the output for the time set in P14(x+4)E.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ness_alarm.aux`. A basic example looks like this:

{% example %}
action: |
  action: ness_alarm.aux
  data:
    output_id: 1
{% endexample %}

This turns on aux output 1.

### Options in YAML

{% options_yaml %}
output_id:
  description: >
    The aux output you want to change. A number from 1 to 8.
  required: true
  type: integer
state:
  description: >
    The on (`true`) or off (`false`) state of the output. When P14xE 8E is enabled, turning on
    pulses the output for the time set in P14(x+4)E.
  required: false
  default: true
  type: boolean
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: switch an aux output with a helper

When a switch helper turns on, turn on aux output 1 on the panel.

- **Trigger**: A switch helper turns on
- **Action**: Ness Alarm: Aux

{% details "YAML example for switching an aux output" %}

{% example %}
automation: |
  alias: "Drive Ness aux output"
  triggers:
    - trigger: state
      entity_id: input_boolean.gate_relay
      to: "on"
  actions:
    - action: ness_alarm.aux
      data:
        output_id: 1
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
