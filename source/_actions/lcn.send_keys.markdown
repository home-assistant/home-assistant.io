---
title: "Send keys"
action: lcn.send_keys
domain: lcn
description: "Sends keys, which execute bound commands."
related_actions:
  - lcn.lock_keys
  - lcn.pck
---

This action sends one or more keys to an LCN module, which runs the commands bound to those keys. You provide the keys as a string of key identifiers, for example `a1a5d8`.

You can send the keys immediately or defer them. For deferred sending, set a **Time** and **Time unit**, and use the `hit` key state.

{% include actions/ui_header.md %}

To send keys from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **LCN: Send keys**.
6. Select the LCN module or group in the **Device** field and enter the **Keys** to send.
7. Select **Save**.

This action does not support targets. Instead, you select the LCN module or group through the **Device** field.

### Options in the UI

{% options_ui %}
Device:
  description: The LCN module or group to send the command to.
  required: true
Keys:
  description: "The keys to send, as a string of key identifiers, for example `a1a5d8`."
  required: true
State:
  description: "The key state upon sending. One of: `hit`, `make`, `break`, `dontsend`. Defaults to `hit`. For deferred sending, only `hit` is allowed."
  required: false
Time:
  description: The send delay. When set, the keys are sent deferred.
  required: false
Time unit:
  description: The time unit of the send delay. Defaults to seconds.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lcn.send_keys`. A basic example looks like this:

{% example %}
action: |
  action: lcn.send_keys
  data:
    device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
    keys: a1a5d8
    state: hit
{% endexample %}

This sends keys `a1`, `a5`, and `d8` to the selected module immediately.

To send the same keys five seconds later:

{% example %}
action: |
  action: lcn.send_keys
  data:
    device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
    keys: a1a5d8
    time: 5
    time_unit: s
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The device ID of the LCN module or group.
  required: true
  type: string
keys:
  description: >
    The keys to send, as a string of key identifiers, for example `a1a5d8`.
    See [Keys](/integrations/lcn/#keys).
  required: true
  type: string
state:
  description: >
    The key state upon sending. See [States](/integrations/lcn/#states). If
    not provided, it is assumed to be `hit`. For deferred sending, only `hit`
    is allowed.
  required: false
  default: hit
  type: string
time:
  description: >
    The send delay. When set, the keys are sent deferred. If not provided, it
    is assumed to be 0.
  required: false
  default: 0
  type: integer
time_unit:
  description: >
    The time unit of the send delay. See
    [Variables and units](/integrations/lcn/#variables-and-units). If not
    provided, it is assumed to be seconds.
  required: false
  default: s
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
