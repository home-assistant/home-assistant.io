---
title: "Reset gateway"
action: opentherm_gw.reset_gateway
domain: opentherm_gw
description: "Resets the OpenTherm Gateway."
---

The **Reset gateway** action resets your OpenTherm Gateway. This restarts the gateway and clears any active overrides.

{% include actions/ui_header.md %}

To reset the gateway from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **OpenTherm Gateway: Reset gateway**.
6. Enter the **Gateway ID**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Gateway ID:
  description: The ID of the OpenTherm Gateway, as specified during configuration.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `opentherm_gw.reset_gateway`. A basic example looks like this:

{% example %}
action: |
  action: opentherm_gw.reset_gateway
  data:
    gateway_id: opentherm_gateway
{% endexample %}

This resets the OpenTherm Gateway with the ID `opentherm_gateway`.

### Options in YAML

{% options_yaml %}
gateway_id:
  description: >
    The ID of the OpenTherm Gateway, as specified during configuration.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
