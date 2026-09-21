---
title: "Set central heating override"
action: opentherm_gw.set_central_heating_ovrd
domain: opentherm_gw
description: "Sets the central heating override option on the gateway."
related_actions:
  - opentherm_gw.set_control_setpoint
  - opentherm_gw.set_max_modulation
---

The **Set central heating override** action sets the central heating override option on your OpenTherm Gateway. When you override the control setpoint (using the **Set control setpoint** action with a value other than 0), the gateway automatically enables the central heating override to start heating. You can then use this action to control the central heating override status. To return control of the central heating to the thermostat, use the **Set control setpoint** action with a temperature value of 0.

You only need this if you are writing your own software thermostat.

{% warning %}
Read [this information](http://otgw.tclcode.com/standalone.html) from the designer of the OpenTherm Gateway before you consider writing your own software thermostat.
{% endwarning %}

{% include actions/ui_header.md %}

To set the central heating override from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **OpenTherm Gateway: Set central heating override**.
6. Enter the **Gateway ID** and set the **Central heating override**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Gateway ID:
  description: The ID of the OpenTherm Gateway, as specified during configuration.
  required: true
Central heating override:
  description: Whether to enable or disable the central heating override.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `opentherm_gw.set_central_heating_ovrd`. A basic example looks like this:

{% example %}
action: |
  action: opentherm_gw.set_central_heating_ovrd
  data:
    gateway_id: opentherm_gateway
    ch_override: true
{% endexample %}

This enables the central heating override on the selected gateway.

### Options in YAML

{% options_yaml %}
gateway_id:
  description: >
    The ID of the OpenTherm Gateway, as specified during configuration.
  required: true
  type: string
ch_override:
  description: >
    Whether to enable or disable the central heating override.
  required: true
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
