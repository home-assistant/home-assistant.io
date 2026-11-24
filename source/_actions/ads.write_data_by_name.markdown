---
title: "Write data by name"
action: ads.write_data_by_name
domain: ads
description: "Writes a value to a variable on a connected ADS device."
---

Use this action to write a value to a variable on your connected ADS device, identified by the variable name.

{% include actions/ui_header.md %}

To write a value from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **ADS: Write data by name**.
6. Enter the **ADS variable** name, choose the **ADS type**, and set the **Value** to write.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
ADS variable:
  description: The name of the variable to write to. To access global variables on TwinCAT2, prepend a dot, for example `.myvariable`. For TwinCAT3, use a name such as `GVL.myvariable`.
  required: true
ADS type:
  description: The data type of the variable to write to. The value is converted to this type before it is written.
  required: true
Value:
  description: "The value to write to the variable. Enter a whole number for the integer types, a number with decimals such as `21.5` for `real` and `lreal`, text for `string`, and `true` or `false` for `bool`."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ads.write_data_by_name`. A basic example looks like this:

{% example %}
action: |
  action: ads.write_data_by_name
  data:
    adsvar: ".myvariable"
    adstype: int
    value: 123
{% endexample %}

This writes the value `123` as an integer to the variable `.myvariable`.

### Options in YAML

{% options_yaml %}
adsvar:
  description: >
    The name of the variable to write to. To access global variables on
    TwinCAT2, prepend a dot, for example `.myvariable`. For TwinCAT3, use a
    name such as `GVL.myvariable`.
  required: true
  type: string
adstype:
  description: >
    The data type of the variable to write to. One of `bool`, `byte`,
    `date`, `dint`, `dt`, `dword`, `int`, `lreal`, `real`, `sint`,
    `string`, `time`, `tod`, `udint`, `uint`, `usint`, or `word`. The value
    is converted to this type before it is written.
  required: true
  type: string
value:
  description: >
    The value to write to the variable. A whole number for the integer
    types (`time`, `date`, `dt`, and `tod` included), a number with
    decimals for `real` and `lreal`, text for `string`, and `true` or
    `false` for `bool`.
  required: true
  type: [integer, float, string, boolean]
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: write a setpoint when a helper changes

Write a new value to a PLC variable whenever an input number helper changes, for example to push a temperature setpoint from Home Assistant to your ADS device.

- **Trigger**: State changed: Setpoint helper changes
- **Action**: ADS: Write data by name
  - **ADS variable**: `.setpoint`
  - **ADS type**: `real`
  - **Value**: `21.5`

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Push the setpoint to the PLC"
    triggers:
      - trigger: state
        entity_id: input_number.heating_setpoint
    actions:
      - action: ads.write_data_by_name
        data:
          adsvar: ".setpoint"
          adstype: real
          value: "{{ states('input_number.heating_setpoint') }}"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
