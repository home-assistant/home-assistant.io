---
title: "Get Shelly KVS value"
action: shelly.get_kvs_value
domain: shelly
description: "Reads a value from a Shelly device's Key-Value Storage."
related_actions:
  - shelly.set_kvs_value
---

Use this action to read a value from a Shelly device's Key-Value Storage (KVS). KVS is a small store on the device where Shelly scripts keep values. A common use is to pull a value that a device script calculated, such as a measurement, into Home Assistant. The value can be text, a number, a boolean, an empty value, a mapping, or a list.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get a KVS value from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Get Shelly KVS value**.
6. Set **Device** to the Shelly device, and **Key** to the name of the value you want to read.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The Shelly device to read the value from.
Key:
  description: The name of the key to read.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `shelly.get_kvs_value`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: shelly.get_kvs_value
  data:
    device_id: e4c0e031f68a8fbe08c50eda5e189a70
    key: "my_temperature_value"
  response_variable: kvs
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: The Shelly device to read the value from.
  required: true
  type: string
key:
  description: The name of the key to read.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The action returns the stored value in a `value` field. The value can be text, a number, a boolean, an empty value, a mapping, or a list, depending on what the device script stored.

## Example: create a sensor from a KVS value

This example creates a template sensor that reads a temperature value from the KVS key `my_temperature_value` every 10 minutes.

```yaml
# Example configuration.yaml entry
template:
  - triggers:
      - trigger: time_pattern
        minutes: "/10"
    actions:
      - action: shelly.get_kvs_value
        data:
          device_id: e4c0e031f68a8fbe08c50eda5e189a70
          key: "my_temperature_value"
        response_variable: temperature_variable
    sensor:
      - name: "My temperature"
        state: "{{ temperature_variable.value }}"
        unit_of_measurement: "°C"
        device_class: temperature
```

## Good to know

- KVS actions work only on non-sleeping Shelly generation 2 and later devices.

{% include actions/stuck.md %}

{% include actions/related.md %}
