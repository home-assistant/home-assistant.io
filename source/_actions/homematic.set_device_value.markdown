---
title: "Set device value"
action: homematic.set_device_value
domain: homematic
description: "Controls a Homematic device manually using its setValue method."
related_actions:
  - homematic.put_paramset
  - homematic.virtualkey
  - homematic.set_variable_value
  - homematic.reconnect
  - homematic.set_install_mode
---

Use this action to control a device manually, even devices without built-in support in Home Assistant. It gives you direct access to the setValue method of the device, which can serve as a workaround when a device is not yet supported or only partially implemented.

If you have multiple hosts, you can choose the one hosting a specific device by setting the **Interface** to the name you gave it in your configuration.

{% include actions/ui_header.md %}

To set a device value from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Homematic: Set device value**.
6. Enter the **Address**, **Channel**, **Param**, and **Value** and, optionally, a **Value type** and **Interface**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Address:
  description: "The address of the Homematic device, or BidCoS-RF for the virtual remote."
  required: true
Channel:
  description: "The channel to send the value to."
  required: true
Param:
  description: "The parameter to set, such as STATE or SET_TEMPERATURE."
  required: true
Value:
  description: "The new value to set."
  required: true
Value type:
  description: "The type to convert the value to: boolean, dateTime.iso8601, double, int, or string."
Interface:
  description: "The name of the interface from your configuration. Only needed when you have more than one."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homematic.set_device_value`:

{% example %}
action: |
  action: homematic.set_device_value
  data:
    address: "LEQ1234567"
    channel: 4
    param: SET_TEMPERATURE
    value: 23.0
{% endexample %}

To set the active profile on a thermostat, pass the value as an integer:

{% example %}
action: |
  action: homematic.set_device_value
  data:
    address: "LEQ1234567"
    channel: 1
    param: ACTIVE_PROFILE
    value: 1
    value_type: int
{% endexample %}

### Options in YAML

{% options_yaml %}
address:
  description: "The address of the Homematic device, or BidCoS-RF for the virtual remote."
  required: true
  type: string
channel:
  description: "The channel to send the value to."
  required: true
  type: integer
param:
  description: "The parameter to set, such as STATE or SET_TEMPERATURE."
  required: true
  type: string
value:
  description: "The new value to set."
  required: true
  type: any
value_type:
  description: "The type to convert the value to: boolean, dateTime.iso8601, double, int, or string."
  required: false
  type: string
interface:
  description: "The name of the interface from your configuration. Only needed when you have more than one."
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
