---
title: "Put paramset"
action: homematic.put_paramset
domain: homematic
description: "Manually changes a Homematic device's paramset using its putParamset method."
related_actions:
  - homematic.set_device_value
  - homematic.virtualkey
  - homematic.set_variable_value
  - homematic.reconnect
  - homematic.set_install_mode
---

Use this action to manually change a device's paramset, even devices without built-in support in Home Assistant. It gives you direct access to the putParamset method of the connection, which is useful for changing settings such as the week program of a wall thermostat.

For BidCos-RF devices, the **RX mode** controls how the configuration data is sent to the device:

- `BURST` is the default. It wakes up every device when sending the configuration data, which uses some battery on all of them, but the data is sent almost immediately.
- `WAKEUP` sends the configuration data only after a device reports updated values, which usually happens every three minutes. It does not wake up every device, so it saves battery.

{% include actions/ui_header.md %}

To change a paramset from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Homematic: Put paramset**.
6. Enter the **Interface**, **Address**, **Paramset key**, and **Paramset** and, optionally, an **RX mode**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Interface:
  description: "The name of the interface from your configuration."
  required: true
Address:
  description: "The address of the Homematic device."
  required: true
Paramset key:
  description: "The paramset key to change, such as MASTER."
  required: true
Paramset:
  description: "A mapping of paramset values to set."
  required: true
RX mode:
  description: "The receive mode used for BidCos-RF devices: BURST or WAKEUP."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homematic.put_paramset`:

{% example %}
action: |
  action: homematic.put_paramset
  data:
    interface: wireless
    address: "LEQ1234567"
    paramset_key: MASTER
    paramset:
      WEEK_PROGRAM_POINTER: 1
{% endexample %}

To set the week program with an explicit receive mode, for BidCos-RF only:

{% example %}
action: |
  action: homematic.put_paramset
  data:
    interface: wireless
    address: "LEQ1234567"
    paramset_key: MASTER
    rx_mode: WAKEUP
    paramset:
      WEEK_PROGRAM_POINTER: 1
{% endexample %}

### Options in YAML

{% options_yaml %}
interface:
  description: "The name of the interface from your configuration."
  required: true
  type: string
address:
  description: "The address of the Homematic device."
  required: true
  type: string
paramset_key:
  description: "The paramset key to change, such as MASTER."
  required: true
  type: string
paramset:
  description: "A mapping of paramset values to set."
  required: true
  type: map
rx_mode:
  description: "The receive mode used for BidCos-RF devices: BURST or WAKEUP."
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
