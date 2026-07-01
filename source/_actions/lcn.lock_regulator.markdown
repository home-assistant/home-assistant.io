---
title: "Lock regulator"
action: lcn.lock_regulator
domain: lcn
description: "Locks a regulator setpoint."
related_actions:
  - lcn.var_abs
  - lcn.var_rel
  - lcn.var_reset
---

This action locks or unlocks a regulator setpoint on an LCN module. While a setpoint is locked, its value cannot be changed by the regulator.

{% include actions/ui_header.md %}

To lock or unlock a regulator setpoint from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **LCN: Lock regulator**.
6. Select the LCN module or group in the **Device** field, choose the **Setpoint**.
7. _Optional_: in **State**, select the state of the lock.
8. Select **Save**.

This action does not support targets. Instead, you select the LCN module or group through the **Device** field.

### Options in the UI

{% options_ui %}
Device:
  description: The LCN module or group to send the command to.
  required: true
Setpoint:
  description: The setpoint name.
  required: true
State:
  description: Whether the setpoint should be locked. Defaults to off (unlocked).
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lcn.lock_regulator`. A basic example looks like this:

{% example %}
action: |
  action: lcn.lock_regulator
  data:
    device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
    setpoint: r1varsetpoint
    state: true
{% endexample %}

This locks the first regulator setpoint of the selected module.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The device ID of the LCN module or group.
  required: true
  type: string
setpoint:
  description: >
    The setpoint name. See
    [Variables and units](/integrations/lcn/#variables-and-units).
  required: true
  type: string
state:
  description: >
    Whether the setpoint should be locked. If not provided, it is assumed to
    be `false`.
  required: false
  default: false
  type: boolean
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
