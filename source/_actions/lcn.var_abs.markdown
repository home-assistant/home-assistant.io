---
title: "Set absolute variable"
action: lcn.var_abs
domain: lcn
description: "Sets absolute value of a variable or setpoint."
related_actions:
  - lcn.var_rel
  - lcn.var_reset
  - lcn.lock_regulator
---

This action sets a variable or setpoint on an LCN module to a fixed value. Use it to write a known value, for example a target temperature, to a regulator setpoint.

{% important %}
Ensure that the LCN module is configured properly to provide access to the defined variable. Otherwise the module might show unexpected behavior or return error messages.
{% endimportant %}

{% include actions/ui_header.md %}

To set the absolute value of a variable from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **LCN: Set absolute variable**.
6. Select the LCN module or group in the **Device** field, and then choose the **Variable**.
7. _Optional_: In **Value**, enter the variable or setpoint value.
8. Select **Save**.

This action does not support targets. Instead, you select the LCN module or group through the **Device** field.

### Options in the UI

{% options_ui %}
Device:
  description: The LCN module or group to send the command to.
  required: true
Variable:
  description: The variable or setpoint name.
  required: true
Value:
  description: The value to set.
  required: false
Unit of measurement:
  description: The unit of the value. Defaults to `native`.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lcn.var_abs`. A basic example looks like this:

{% example %}
action: |
  action: lcn.var_abs
  data:
    device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
    variable: var1
    value: 75
    unit_of_measurement: "%"
{% endexample %}

This sets variable 1 of the selected module to 75%.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The device ID of the LCN module or group.
  required: true
  type: string
variable:
  description: >
    The variable or setpoint name. See
    [Variables and units](/integrations/lcn/#variables-and-units).
  required: true
  type: string
value:
  description: >
    The value to set. If not provided, it is assumed to be 0.
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
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
