---
title: "Set Shelly KVS value"
action: shelly.set_kvs_value
domain: shelly
description: "Stores a value in a Shelly device's Key-Value Storage."
related_actions:
  - shelly.get_kvs_value
---

Use this action to store a value in a Shelly device's Key-Value Storage (KVS). KVS is a small store on the device where Shelly scripts keep values. A common use is to pass a value from Home Assistant to a device script, such as a setpoint the script reads on its next run. The value can be text, a number, a boolean, an empty value, a mapping, or a list.

{% include actions/ui_header.md %}

To set a KVS value from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Set Shelly KVS value**.
6. Set **Device** to the Shelly device, **Key** to the name to store the value under, and **Value** to the value you want to store.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The Shelly device to store the value on.
Key:
  description: The name of the key to store the value under.
Value:
  description: The value to store. It can be text, a number, a boolean, an empty value, a mapping, or a list.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `shelly.set_kvs_value`. A basic example looks like this:

{% example %}
action: |
  action: shelly.set_kvs_value
  data:
    device_id: e4c0e031f68a8fbe08c50eda5e189a70
    key: "target_temperature"
    value: 21
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: The Shelly device to store the value on.
  required: true
  type: string
key:
  description: The name of the key to store the value under.
  required: true
  type: string
value:
  description: The value to store. It can be text, a number, a boolean, an empty value, a mapping, or a list.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- KVS actions work only on non-sleeping Shelly generation 2 and later devices.
- Setting a key that already exists overwrites its current value.

{% include actions/stuck.md %}

{% include actions/related.md %}
