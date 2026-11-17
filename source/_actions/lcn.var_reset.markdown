---
title: "Reset variable"
action: lcn.var_reset
domain: lcn
description: "Resets the value of a variable or setpoint."
related_actions:
  - lcn.var_abs
  - lcn.var_rel
  - lcn.lock_regulator
---

This action resets a variable or setpoint on an LCN module back to its default value.

{% important %}
Ensure that the LCN module is configured properly to provide access to the defined variable. Otherwise the module might show unexpected behavior or return error messages.
{% endimportant %}

{% include actions/ui_header.md %}

To reset a variable from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **LCN: Reset variable**.
6. Select the LCN module or group in the **Device** field and choose the **Variable**.
7. Select **Save**.

This action does not support targets. Instead, you select the LCN module or group through the **Device** field.

### Options in the UI

{% options_ui %}
Device:
  description: The LCN module or group to send the command to.
  required: true
Variable:
  description: The variable or setpoint name.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lcn.var_reset`. A basic example looks like this:

{% example %}
action: |
  action: lcn.var_reset
  data:
    device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
    variable: var1
{% endexample %}

This resets variable 1 of the selected module.

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
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
