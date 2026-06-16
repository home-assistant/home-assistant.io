---
title: "Expose to KNX bus"
action: knx.exposure_register
domain: knx
description: "Adds or removes exposures to the KNX bus."
related_actions:
  - knx.send
  - knx.read
  - knx.event_register
---

The **Expose to KNX bus** action adds or removes an exposure that sends a Home Assistant entity state or attribute to a KNX group address. Once registered, state and attribute updates are written to the bus, and GroupValueRead requests for that address are answered.

This is useful when you want other KNX devices to react to or read Home Assistant values, and to manage those exposures dynamically instead of defining them all up front.

Exposures defined through your {% term "configuration.yaml" %} cannot be removed with this action. Per address, only one exposure can be registered. For more details, and for additional exposure options like `value_template`, `cooldown`, `periodic_send`, and `respond_to_read`, see the [Exposing entity states, entity attributes or time to KNX bus](/integrations/knx/#exposing-entity-states-entity-attributes-or-time-to-knx-bus) section.

{% include actions/ui_header.md %}

To register an exposure from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **KNX: Expose to KNX bus**.
6. Enter the **Group address**, the **Value type**, and the **Entity** to expose. Optionally, set an **Entity attribute** and a **Default value**, or turn on **Remove exposure** to remove the exposure.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Only users with administrator rights can run this action.

### Options in the UI

{% options_ui %}
Group address:
  description: The group address that state or attribute updates are sent to, and that answers GroupValueRead requests.
  required: true
Value type:
  description: The DPT that telegrams are encoded as. `binary` and all KNX sensor types are valid values. See the list of types in the [KNX sensor](/integrations/knx/#sensor) section.
  required: true
Entity:
  description: The entity whose state or attribute is exposed.
  required: true
Entity attribute:
  description: The attribute of the entity to send to the KNX bus. If not set, the state is sent. For example, for a light the state is either on or off, while the `brightness` attribute exposes its brightness.
  required: false
Default value:
  description: The value to send to the bus when the state or attribute value is not available. For example, a light with state off has no brightness attribute, so a default value of `0` could be used. If not set, no value is sent and a GroupValueRead request returns the last known value.
  required: false
Remove exposure:
  description: If turned on, the exposure is removed. Only the group address is required for removal.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `knx.exposure_register`. A basic example looks like this:

{% example %}
action: |
  action: knx.exposure_register
  data:
    address: "1/1/0"
    type: percentU8
    entity_id: light.living_room
    attribute: brightness
    default: 0
{% endexample %}

This exposes the brightness of `light.living_room` to group address `1/1/0`.

### Options in YAML

{% options_yaml %}
address:
  description: >
    The group address that state or attribute updates are sent to, and that
    answers GroupValueRead requests.
  required: true
  type: string
type:
  description: >
    The DPT that telegrams are encoded as. `binary` and all KNX sensor types
    are valid values. See the list of types in the
    [KNX sensor](/integrations/knx/#sensor) section.
  required: true
  type: string
entity_id:
  description: >
    The entity whose state or attribute is exposed.
  required: true
  type: string
attribute:
  description: >
    The attribute of the entity to send to the KNX bus. If not set, the state
    is sent.
  required: false
  type: string
default:
  description: >
    The value to send to the bus when the state or attribute value is not
    available. If not set, no value is sent and a GroupValueRead request returns the last
    known value.
  required: false
  type: [string, integer, float]
remove:
  description: >
    If set to `true`, the exposure is removed. Only `address` is required for
    removal.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
