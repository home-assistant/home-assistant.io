---
title: "Send to KNX bus"
action: knx.send
domain: knx
description: "Sends arbitrary data directly to the KNX bus."
related_actions:
  - knx.read
  - knx.event_register
  - knx.exposure_register
---

The **Send to KNX bus** action writes data directly to one or more KNX group addresses. You can send a raw payload or have Home Assistant encode a value using a KNX datapoint type (DPT).

This is useful when you want to control a KNX device or update a value on the bus from an automation or script, without modeling that device as a separate {% term entity %} in Home Assistant.

{% include actions/ui_header.md %}

To send data to the KNX bus from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **KNX: Send to KNX bus**.
6. Enter the **Group address** and the **Payload** to send. Optionally, set a **Value type** to encode the payload as a DPT.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Group address:
  description: The group address(es) to write to. Provide a list to send to multiple group addresses one after another.
  required: true
Payload:
  description: The payload to send to the bus. When no value type is set, the payload is sent as raw bytes. Integers are then treated as DPT 1, 2, or 3 payloads. For DPTs larger than 6 bits, send a list where each value represents one octet (0-255), and pad the list with `0` to match the DPT byte length.
  required: true
Value type:
  description: If set, the payload is encoded as the given DPT instead of being sent as raw bytes. The KNX sensor types are valid values. See the list of types in the [KNX sensor](/integrations/knx/#sensor) section.
  required: false
Send as response:
  description: If turned on, the telegram is sent as a `GroupValueResponse` instead of a `GroupValueWrite`.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `knx.send`. A basic example looks like this:

{% example %}
action: |
  action: knx.send
  data:
    address: "1/1/1"
    type: percent
    payload: 50
{% endexample %}

This sends the value `50` to group address `1/1/1`, encoded as a percentage.

### Options in YAML

{% options_yaml %}
address:
  description: >
    The group address(es) to write to. A list sends to multiple group
    addresses one after another.
  required: true
  type: [string, list]
payload:
  description: >
    The payload to send to the bus. When `type` is not set, raw bytes are
    sent. Integers are then treated as DPT 1, 2, or 3 payloads. For DPTs
    larger than 6 bits, send a list where each value represents one octet
    (0-255), and pad the list with `0` to match the DPT byte length.
  required: true
  type: [integer, list]
type:
  description: >
    If set, the payload is encoded as the given DPT instead of being sent as
    raw bytes. The KNX sensor types are valid values. See the list of types
    in the [KNX sensor](/integrations/knx/#sensor) section.
  required: false
  type: [string, integer, float]
response:
  description: >
    If set to `true`, the telegram is sent as a `GroupValueResponse` instead
    of a `GroupValueWrite`.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Script: send a fixed value and an entity state

This script sends a value to the bus in three different ways: encoded as a DPT, as a raw byte value, and from a Home Assistant entity state.

{% details "YAML example for sending values to the KNX bus" %}

{% example %}
script: |
  alias: "Send values to KNX"
  sequence:
    - action: knx.send
      data:
        address: "1/1/1"
        type: percent
        payload: 50
    - action: knx.send
      data:
        # 50% as a 1-byte raw value
        address: "1/1/1"
        payload: [128]
    - action: knx.send
      data:
        address: "3/3/3"
        type: temperature
        payload: "{{ states('sensor.dew_point') }}"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
