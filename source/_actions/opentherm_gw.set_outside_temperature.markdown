---
title: "Set outside temperature"
action: opentherm_gw.set_outside_temperature
domain: opentherm_gw
description: "Provides an outside temperature to the thermostat."
related_actions:
  - opentherm_gw.set_setback_temperature
---

The **Set outside temperature** action provides an outside temperature to your thermostat. If your thermostat cannot display an outside temperature and does not support outside temperature correction (OTC), this has no effect. Not all thermostats can display the full supported range.

{% include actions/ui_header.md %}

To set the outside temperature from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **OpenTherm Gateway: Set outside temperature**.
6. Enter the **Gateway ID** and the **Temperature**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Gateway ID:
  description: The ID of the OpenTherm Gateway, as specified during configuration.
  required: true
Temperature:
  description: "The temperature to provide to the thermostat. Values between -40.0 and 64.0 are accepted, but not all thermostats can display the full range. Any value above 64.0 clears a previously configured value (suggestion: 99)."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `opentherm_gw.set_outside_temperature`. A basic example looks like this:

{% example %}
action: |
  action: opentherm_gw.set_outside_temperature
  data:
    gateway_id: opentherm_gateway
    temperature: 12.5
{% endexample %}

This provides an outside temperature of 12.5 degrees to the thermostat.

### Options in YAML

{% options_yaml %}
gateway_id:
  description: >
    The ID of the OpenTherm Gateway, as specified during configuration.
  required: true
  type: string
temperature:
  description: >
    The temperature to provide to the thermostat. Values between -40.0
    and 64.0 are accepted, but not all thermostats can display the full
    range. Any value above 64.0 clears a previously configured value
    (suggestion: 99).
  required: true
  type: float
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
