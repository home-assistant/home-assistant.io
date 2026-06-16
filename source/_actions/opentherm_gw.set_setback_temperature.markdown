---
title: "Set setback temperature"
action: opentherm_gw.set_setback_temperature
domain: opentherm_gw
description: "Configures the setback temperature used with the GPIO home and away modes."
related_actions:
  - opentherm_gw.set_gpio_mode
  - opentherm_gw.set_outside_temperature
---

The **Set setback temperature** action configures the setback temperature on your OpenTherm Gateway. This value is used with the GPIO `home` (5) and `away` (6) modes.

{% include actions/ui_header.md %}

To set the setback temperature from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **OpenTherm Gateway: Set setback temperature**.
6. Enter the **Gateway ID** and the **Temperature**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Gateway ID:
  description: The ID of the OpenTherm Gateway, as specified during configuration.
  required: true
Temperature:
  description: The setback temperature to configure on the gateway (0 to 30).
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `opentherm_gw.set_setback_temperature`. A basic example looks like this:

{% example %}
action: |
  action: opentherm_gw.set_setback_temperature
  data:
    gateway_id: opentherm_gateway
    temperature: 16
{% endexample %}

This sets the setback temperature to 16 degrees on the selected gateway.

### Options in YAML

{% options_yaml %}
gateway_id:
  description: >
    The ID of the OpenTherm Gateway, as specified during configuration.
  required: true
  type: string
temperature:
  description: >
    The setback temperature to configure on the gateway (0 to 30).
  required: true
  type: float
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
