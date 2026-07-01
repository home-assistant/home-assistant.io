---
title: "Lock keys"
action: lcn.lock_keys
domain: lcn
description: "Sets the key lock states."
related_actions:
  - lcn.send_keys
  - lcn.relays
  - lcn.pck
---

This action locks or unlocks the keys of a table on an LCN module. You provide the lock states as a string of eight characters, where each character controls one key lock.

Each character represents the state change of a key lock:

- `1`: on
- `0`: off
- `T`: toggle
- `-`: no change

You can lock keys indefinitely, or for a set time period. For a time period, set a **Time** and **Time unit**. A time period only works with table `a`.

{% include actions/ui_header.md %}

To lock keys from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **LCN: Lock keys**.
6. Select the LCN module or group in the **Device** field and enter the key lock **State** string.
7. Select **Save**.

This action does not support targets. Instead, you select the LCN module or group through the **Device** field.

### Options in the UI

{% options_ui %}
Device:
  description: The LCN module or group to send the command to.
  required: true
Table:
  description: "The table with the keys to lock. Defaults to `a`. A time period only works with table `a`."
  required: false
State:
  description: "The key lock states as an eight-character string, using `1` (on), `0` (off), `T` (toggle), and `-` (no change)."
  required: true
Time:
  description: The time period to lock the keys. When set, the keys are locked for that period.
  required: false
Time unit:
  description: The time unit of the lock period. Defaults to seconds.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lcn.lock_keys`. A basic example looks like this:

{% example %}
action: |
  action: lcn.lock_keys
  data:
    device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
    state: "1---T0--"
{% endexample %}

This applies the key lock state changes to table `a` of the selected module.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The device ID of the LCN module or group.
  required: true
  type: string
table:
  description: >
    The table with the keys to lock. If not provided, it is assumed to be
    table `a`. A time period only works with table `a`.
  required: false
  default: a
  type: string
state:
  description: >
    The key lock states as an eight-character string, using `1` (on),
    `0` (off), `T` (toggle), and `-` (no change).
  required: true
  type: string
time:
  description: >
    The time period to lock the keys. When set, the keys are locked for that
    period. If not provided, it is assumed to be 0.
  required: false
  default: 0
  type: integer
time_unit:
  description: >
    The time unit of the lock period. See
    [Variables and units](/integrations/lcn/#variables-and-units). If not
    provided, it is assumed to be seconds.
  required: false
  default: s
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Lock keys for a time period

This example locks the keys of table `a` for ten seconds.

{% example %}
action: |
  action: lcn.lock_keys
  data:
    device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
    state: "1---T0--"
    time: 10
    time_unit: s
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
