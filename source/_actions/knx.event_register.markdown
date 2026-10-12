---
title: "Register knx_event"
action: knx.event_register
domain: knx
description: "Adds or removes group addresses in the knx_event filter."
related_actions:
  - knx.send
  - knx.read
  - knx.exposure_register
---

The **Register knx_event** action adds or removes group addresses in the `knx_event` filter. When a group address is registered, telegrams sent to that address fire a `knx_event` on the Home Assistant event bus, which you can use as an automation trigger.

This is useful when you want to react to KNX addresses that are not modeled as entities, and to do so only at certain times by registering and unregistering them on the fly.

Group addresses configured through the `event` key in your {% term "configuration.yaml" %} are always active and cannot be removed with this action. For more details, see the [Events](/integrations/knx/#events) section.

{% tip %}

This action is mainly intended for blueprint creators and for registering group addresses on the fly. To react to telegrams in an automation, use the [KNX telegram](/integrations/knx/#telegram-trigger) trigger instead.

{% endtip %}

{% include actions/ui_header.md %}

To register a group address from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **KNX: Register knx_event**.
6. Enter the **Group address** to register. Optionally, set a **Value type** to decode the payload, or turn on **Remove event registration** to remove the address.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Only users with administrator rights can run this action.

### Options in the UI

{% options_ui %}
Group address:
  description: The group address(es) to add or remove. Provide a list to register multiple group addresses.
  required: true
Value type:
  description: If set, the payload is decoded as the given DPT and written to the event data `value` key. The KNX sensor types are valid values. See the list of types in the [KNX sensor](/integrations/knx/#sensor) section.
  required: false
Remove event registration:
  description: If turned on, the group address(es) are removed from the filter.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `knx.event_register`. A basic example looks like this:

{% example %}
action: |
  action: knx.event_register
  data:
    address: "0/4/20"
{% endexample %}

This registers group address `0/4/20` so that telegrams sent to it fire a `knx_event`.

### Options in YAML

{% options_yaml %}
address:
  description: >
    The group address(es) to add or remove. A list registers multiple group
    addresses.
  required: true
  type: [string, list]
type:
  description: >
    If set, the payload is decoded as the given DPT and written to the event
    data `value` key. The KNX sensor types are valid values. See the list of
    types in the [KNX sensor](/integrations/knx/#sensor) section.
  required: false
  type: [string, integer]
remove:
  description: >
    If set to `true`, the group address(es) are removed from the filter.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: register a group address on startup

This automation registers a cover-move group address when Home Assistant starts, so that its telegrams fire a `knx_event` you can act on.

{% details "YAML example for registering a group address on startup" %}

{% example %}
automation: |
  alias: "Register KNX event on startup"
  triggers:
    - trigger: homeassistant
      event: start
  actions:
    - action: knx.event_register
      data:
        # Cover move trigger
        address: "0/4/20"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
