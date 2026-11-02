---
title: "Set variable value"
action: homematic.set_variable_value
domain: homematic
description: "Sets the value of a Homematic system variable."
related_actions:
  - homematic.set_device_value
  - homematic.virtualkey
  - homematic.put_paramset
  - homematic.reconnect
  - homematic.set_install_mode
---

Use this action to set the value of a system variable on your CCU or Homegear.

{% include actions/ui_header.md %}

To set a variable value from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Homematic: Set variable value**.
6. Enter the variable **Name** and the new **Value** and, optionally, choose an **Entity**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. To set the variable on a specific Homematic hub, use the **Entity** field instead. When you leave it empty, the variable is set on all hubs.

### Options in the UI

{% options_ui %}
Name:
  description: "The name of the variable to set."
  required: true
Value:
  description: "The new value for the variable."
  required: true
Entity:
  description: "One or more Homematic hub entities to set the variable on. Defaults to all hubs."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homematic.set_variable_value`:

{% example %}
action: |
  action: homematic.set_variable_value
  data:
    name: "Variablename"
    value: true
    entity_id: homematic.ccu2
{% endexample %}

### Options in YAML

{% options_yaml %}
name:
  description: "The name of the variable to set."
  required: true
  type: string
value:
  description: "The new value for the variable."
  required: true
  type: any
entity_id:
  description: "One or more Homematic hub entities to set the variable on. Defaults to all hubs."
  required: false
  type: [string, list]
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
