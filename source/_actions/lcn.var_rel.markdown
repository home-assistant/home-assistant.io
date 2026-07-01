---
title: "Shift variable"
action: lcn.var_rel
domain: lcn
description: "Shifts the value of a variable, setpoint, or threshold."
related_actions:
  - lcn.var_abs
  - lcn.var_reset
  - lcn.lock_regulator
---

This action changes a variable, setpoint, or threshold on an LCN module by a relative amount. Use a positive value to increase and a negative value to decrease the current value.

{% include actions/ui_header.md %}

To shift the value of a variable from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **LCN: Shift variable**.
6. Select the LCN module or group in the **Device** field, choose the **Variable**, and set the shift **Value**.
7. Select **Save**.

This action does not support targets. Instead, you select the LCN module or group through the **Device** field.

### Options in the UI

{% options_ui %}
Device:
  description: The LCN module or group to send the command to.
  required: true
Variable:
  description: The variable, setpoint, or threshold name.
  required: true
Value:
  description: The shift value.
  required: false
Unit of measurement:
  description: The unit of the value. Defaults to `native`.
  required: false
Reference value:
  description: "The reference value for setpoints and thresholds. One of: `current`, `prog`."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lcn.var_rel`. A basic example looks like this:

{% example %}
action: |
  action: lcn.var_rel
  data:
    device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
    variable: var1
    value: 10
    unit_of_measurement: "%"
{% endexample %}

This increases variable 1 of the selected module by 10%.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The device ID of the LCN module or group.
  required: true
  type: string
variable:
  description: >
    The variable, setpoint, or threshold name. See
    [Variables and units](/integrations/lcn/#variables-and-units).
  required: true
  type: string
value:
  description: >
    The shift value. If not provided, it is assumed to be 0.
  required: false
  default: 0
  type: integer
unit_of_measurement:
  description: >
    The unit of the value. See
    [Variables and units](/integrations/lcn/#variables-and-units). If not
    provided, it is assumed to be `native`.
  required: false
  type: string
value_reference:
  description: >
    The reference value for setpoints and thresholds. One of `current` or
    `prog`.
  required: false
  default: current
  type: string
{% endoptions_yaml %}

{% important %}
Ensure that the LCN module is configured properly to provide access to the defined variable. Otherwise the module might show unexpected behavior or return error messages.
{% endimportant %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
