---
title: "Set hot water setpoint"
action: opentherm_gw.set_hot_water_setpoint
domain: opentherm_gw
description: "Sets the domestic hot water setpoint on the gateway."
related_actions:
  - opentherm_gw.set_hot_water_ovrd
---

The **Set hot water setpoint** action sets the domestic hot water setpoint on your OpenTherm Gateway. Not all boilers support this feature.

{% include actions/ui_header.md %}

To set the hot water setpoint from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **OpenTherm Gateway: Set hot water setpoint**.
6. Enter the **Gateway ID** and the **Temperature**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Gateway ID:
  description: The ID of the OpenTherm Gateway, as specified during configuration.
  required: true
Temperature:
  description: "The domestic hot water setpoint to set on the gateway (0 to 90). Not all boilers support this full range. Check the `slave_dhw_min_setp` and `slave_dhw_max_setp` sensors to see the supported range on your boiler."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `opentherm_gw.set_hot_water_setpoint`. A basic example looks like this:

{% example %}
action: |
  action: opentherm_gw.set_hot_water_setpoint
  data:
    gateway_id: opentherm_gateway
    temperature: 55
{% endexample %}

This sets the domestic hot water setpoint to 55 degrees on the selected gateway.

### Options in YAML

{% options_yaml %}
gateway_id:
  description: >
    The ID of the OpenTherm Gateway, as specified during configuration.
  required: true
  type: string
temperature:
  description: >
    The domestic hot water setpoint to set on the gateway (0 to 90).
    Not all boilers support this full range. Check the
    `slave_dhw_min_setp` and `slave_dhw_max_setp` sensors to see the
    supported range on your boiler.
  required: true
  type: float
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
