---
title: "Set GPIO mode"
action: opentherm_gw.set_gpio_mode
domain: opentherm_gw
description: "Changes the function of the GPIO pins of the gateway."
related_actions:
  - opentherm_gw.set_led_mode
  - opentherm_gw.set_setback_temperature
---

The **Set GPIO mode** action changes the function of the GPIO pins on your OpenTherm Gateway. For an explanation of the available modes, see [GPIO modes](/integrations/opentherm_gw/#gpio-modes).

{% include actions/ui_header.md %}

To set a GPIO mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **OpenTherm Gateway: Set GPIO mode**.
6. Enter the **Gateway ID**, choose the GPIO **ID**, and set the **Mode**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Gateway ID:
  description: The ID of the OpenTherm Gateway, as specified during configuration.
  required: true
ID:
  description: "The ID of the GPIO pin. One of `A` or `B`."
  required: true
Mode:
  description: "The mode to set on the GPIO pin. Values 0 through 6 are accepted for both pins, and 7 is only accepted for GPIO `B`. See [GPIO modes](/integrations/opentherm_gw/#gpio-modes) for an explanation of the values."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `opentherm_gw.set_gpio_mode`. A basic example looks like this:

{% example %}
action: |
  action: opentherm_gw.set_gpio_mode
  data:
    gateway_id: opentherm_gateway
    id: A
    mode: 5
{% endexample %}

This sets GPIO pin `A` to the home function on the selected gateway.

### Options in YAML

{% options_yaml %}
gateway_id:
  description: >
    The ID of the OpenTherm Gateway, as specified during configuration.
  required: true
  type: string
id:
  description: >
    The ID of the GPIO pin. One of `A` or `B`.
  required: true
  type: string
mode:
  description: >
    The mode to set on the GPIO pin. Values 0 through 6 are accepted
    for both pins, and 7 is only accepted for GPIO `B`. See
    [GPIO modes](/integrations/opentherm_gw/#gpio-modes) for an
    explanation of the values.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
