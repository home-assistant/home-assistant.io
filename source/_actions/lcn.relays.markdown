---
title: "Relays"
action: lcn.relays
domain: lcn
description: "Sets the relay states."
related_actions:
  - lcn.led
  - lcn.lock_keys
  - lcn.pck
---

The **Relays** action sets the state of the eight relays on an LCN module in one call. You provide the states as a string of eight characters, where each character controls one relay.

Each character represents the state change of a relay:

- `1`: on
- `0`: off
- `T`: toggle
- `-`: no change

For example, `T---001-` toggles relay 1, leaves relays 2 to 4 unchanged, turns relays 5 and 6 off, turns relay 7 on, and leaves relay 8 unchanged.

{% include actions/ui_header.md %}

To set the relay states from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **LCN: Relays**.
6. Select the LCN module or group in the **Device** field and enter the relay **State** string.
7. Select **Save**.

This action does not support targets. Instead, you select the LCN module or group through the **Device** field.

### Options in the UI

{% options_ui %}
Device:
  description: The LCN module or group to send the command to.
  required: true
State:
  description: "The relay states as an eight-character string, using `1` (on), `0` (off), `T` (toggle), and `-` (no change)."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lcn.relays`. A basic example looks like this:

{% example %}
action: |
  action: lcn.relays
  data:
    device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
    state: "T---001-"
{% endexample %}

This applies the relay state changes described by the string to the selected module.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The device ID of the LCN module or group.
  required: true
  type: string
state:
  description: >
    The relay states as an eight-character string, using `1` (on),
    `0` (off), `T` (toggle), and `-` (no change).
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
