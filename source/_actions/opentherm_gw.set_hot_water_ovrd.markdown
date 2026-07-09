---
title: "Set hot water override"
action: opentherm_gw.set_hot_water_ovrd
domain: opentherm_gw
description: "Sets the domestic hot water enable option on the gateway."
related_actions:
  - opentherm_gw.set_hot_water_setpoint
---

The **Set hot water override** action sets the domestic hot water enable option on your OpenTherm Gateway. If the boiler is configured to let the room unit control when to keep a small amount of water preheated, this action can influence that behavior.

{% include actions/ui_header.md %}

To set the hot water override from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **OpenTherm Gateway: Set hot water override**.
6. Enter the **Gateway ID** and the **Domestic hot water override**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Gateway ID:
  description: The ID of the OpenTherm Gateway, as specified during configuration.
  required: true
Domestic hot water override:
  description: "The override state. Use `0` or `1` to enable the override in off or on state, or `A` to disable the override."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `opentherm_gw.set_hot_water_ovrd`. A basic example looks like this:

{% example %}
action: |
  action: opentherm_gw.set_hot_water_ovrd
  data:
    gateway_id: opentherm_gateway
    dhw_override: "1"
{% endexample %}

This enables the domestic hot water override in the on state.

### Options in YAML

{% options_yaml %}
gateway_id:
  description: >
    The ID of the OpenTherm Gateway, as specified during configuration.
  required: true
  type: string
dhw_override:
  description: >
    The override state. Use `0` or `1` to enable the override in off or
    on state, or `A` to disable the override.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
