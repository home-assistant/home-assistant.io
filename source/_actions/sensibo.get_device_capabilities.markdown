---
title: "Get the mode capabilities of a Sensibo device"
action: sensibo.get_device_capabilities
domain: sensibo
description: "Returns the supported settings of a Sensibo climate device for a chosen HVAC mode."
related_actions:
  - sensibo.full_state
  - sensibo.enable_climate_react
---

Use this action to find out which settings a Sensibo climate device supports for a specific HVAC mode. The [Set full state](/integrations/sensibo/#action-sensibofull_state) and [Enable Climate React](/integrations/sensibo/#action-sensiboenable_climate_react) actions both expect their values to match what the Sensibo API allows exactly, and those values are case-sensitive. Run this action first to get the list of valid options, then copy the ones you need into the other actions, your automations, or your scripts.

This action returns its result as [response data](/docs/scripts/perform-actions#use-templates-to-handle-response-data) and does not change anything on the device.

{% include actions/ui_header.md %}

To get the device capabilities from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Sensibo climate device.
6. From the actions shown for that target, select **Sensibo: Get device mode capabilities**.
7. Select the **HVAC mode** you want the capabilities for.
8. Select **Save**.

### Options in the UI

{% options_ui %}
HVAC mode:
  description: The HVAC mode to get the capabilities for. Choose from cool, heat, dry, fan, or auto.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sensibo.get_device_capabilities`. A basic example looks like this:

{% example %}
action: |
  action: sensibo.get_device_capabilities
  target:
    entity_id: climate.living_room
  data:
    hvac_mode: cool
  response_variable: capabilities
{% endexample %}

This stores the supported settings for cool mode in a variable named `capabilities`.

### Options in YAML

{% options_yaml %}
hvac_mode:
  description: The HVAC mode to get the capabilities for. Choose from cool, heat, dry, fan, or auto.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" %}

## Response data

The action returns a mapping of the settings the device supports in the chosen HVAC mode, with the allowed values for each. Depending on the device, this can include settings such as fan levels, swing modes, horizontal swing modes, target temperatures, and light options. The values are case-sensitive, so copy them exactly as returned.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
