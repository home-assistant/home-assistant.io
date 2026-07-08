---
title: "Set LED mode"
action: opentherm_gw.set_led_mode
domain: opentherm_gw
description: "Changes the function of the LEDs of the gateway."
related_actions:
  - opentherm_gw.set_gpio_mode
---

The **Set LED mode** action changes the function of the LEDs on your OpenTherm Gateway. For a list of the available modes with an explanation, see [LED modes](/integrations/opentherm_gw/#led-modes).

{% include actions/ui_header.md %}

To set an LED mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **OpenTherm Gateway: Set LED mode**.
6. Enter the **Gateway ID**, choose the LED **ID**, and set the **Mode**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Gateway ID:
  description: The ID of the OpenTherm Gateway, as specified during configuration.
  required: true
ID:
  description: "The ID of the LED. One of `A` through `F`."
  required: true
Mode:
  description: "The function to assign to the LED. See [LED modes](/integrations/opentherm_gw/#led-modes) for an explanation of the values."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `opentherm_gw.set_led_mode`. A basic example looks like this:

{% example %}
action: |
  action: opentherm_gw.set_led_mode
  data:
    gateway_id: opentherm_gateway
    id: A
    mode: F
{% endexample %}

This assigns the flame on function to LED `A` on the selected gateway.

### Options in YAML

{% options_yaml %}
gateway_id:
  description: >
    The ID of the OpenTherm Gateway, as specified during configuration.
  required: true
  type: string
id:
  description: >
    The ID of the LED. One of `A` through `F`.
  required: true
  type: string
mode:
  description: >
    The function to assign to the LED. See
    [LED modes](/integrations/opentherm_gw/#led-modes) for an
    explanation of the values.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
