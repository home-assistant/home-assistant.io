---
title: "Set max modulation"
action: opentherm_gw.set_max_modulation
domain: opentherm_gw
description: "Overrides the maximum relative modulation level on the gateway."
related_actions:
  - opentherm_gw.set_control_setpoint
  - opentherm_gw.set_central_heating_ovrd
---

The **Set max modulation** action overrides the maximum relative modulation level on your OpenTherm Gateway. Normally, the thermostat controls the maximum modulation level on the boiler. Setting this to any value other than -1 enables the override and lets the OpenTherm Gateway control this setting. Because of the potential consequences of leaving this setting enabled, the override is disabled when Home Assistant shuts down or restarts.

You only need this if you are writing your own software thermostat.

{% warning %}
Improper use of this action may impair the performance of your central heating system.
{% endwarning %}

{% warning %}
Read [this information](http://otgw.tclcode.com/standalone.html) from the designer of the OpenTherm Gateway before you consider writing your own software thermostat.
{% endwarning %}

{% include actions/ui_header.md %}

To set the maximum modulation from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **OpenTherm Gateway: Set max modulation**.
6. Enter the **Gateway ID** and the **Level**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Gateway ID:
  description: The ID of the OpenTherm Gateway, as specified during configuration.
  required: true
Level:
  description: "The maximum modulation level to set on the gateway (-1 to 100). Use -1 to clear the override and forward the value from the thermostat again."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `opentherm_gw.set_max_modulation`. A basic example looks like this:

{% example %}
action: |
  action: opentherm_gw.set_max_modulation
  data:
    gateway_id: opentherm_gateway
    level: 50
{% endexample %}

This limits the maximum modulation level to 50% on the selected gateway.

### Options in YAML

{% options_yaml %}
gateway_id:
  description: >
    The ID of the OpenTherm Gateway, as specified during configuration.
  required: true
  type: string
level:
  description: >
    The maximum modulation level to set on the gateway (-1 to 100). Use
    -1 to clear the override and forward the value from the thermostat
    again.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
