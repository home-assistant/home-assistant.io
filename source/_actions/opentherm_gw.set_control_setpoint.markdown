---
title: "Set control setpoint"
action: opentherm_gw.set_control_setpoint
domain: opentherm_gw
description: "Sets the central heating control setpoint override on the gateway."
related_actions:
  - opentherm_gw.set_central_heating_ovrd
  - opentherm_gw.set_max_modulation
---

The **Set control setpoint** action sets the central heating control setpoint override on your OpenTherm Gateway. Normally, the thermostat calculates and controls the central heating setpoint on the boiler. Setting this to any value other than 0 enables the override and lets the OpenTherm Gateway control this setting. While the override is active, the gateway also requests your boiler to activate the central heating circuit. For your boiler's supported setpoint range, see the `slave_ch_max_setp` and `slave_ch_min_setp` sensors. Because of the potential consequences of leaving this setting enabled for a long time, the override is disabled when Home Assistant shuts down or restarts.

You only need this if you are writing your own software thermostat.

{% caution %}
Improper use of this action may continuously keep your central heating system active, resulting in an overheated house and a significant increase in gas or electricity consumption.
{% endcaution %}

{% warning %}
Read [this information](http://otgw.tclcode.com/standalone.html) from the designer of the OpenTherm Gateway before you consider writing your own software thermostat.
{% endwarning %}

{% include actions/ui_header.md %}

To set the control setpoint from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **OpenTherm Gateway: Set control setpoint**.
6. Enter the **Gateway ID** and the **Temperature**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Gateway ID:
  description: The ID of the OpenTherm Gateway, as specified during configuration.
  required: true
Temperature:
  description: The central heating setpoint to set on the gateway (0 to 90). Not all boilers support this full range. A value of 0 disables the override.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `opentherm_gw.set_control_setpoint`. A basic example looks like this:

{% example %}
action: |
  action: opentherm_gw.set_control_setpoint
  data:
    gateway_id: opentherm_gateway
    temperature: 60
{% endexample %}

This sets the central heating control setpoint to 60 degrees on the selected gateway.

### Options in YAML

{% options_yaml %}
gateway_id:
  description: >
    The ID of the OpenTherm Gateway, as specified during configuration.
  required: true
  type: string
temperature:
  description: >
    The central heating setpoint to set on the gateway (0 to 90). Not
    all boilers support this full range. A value of 0 disables the
    override.
  required: true
  type: float
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
