---
title: Configure
action: deconz.configure
domain: deconz
description: "Set an attribute of a device endpoint in deCONZ or of the deCONZ service itself."
related_actions:
  - deconz.device_refresh
  - deconz.remove_orphaned_entries
---

Use this action to change a setting in deCONZ directly through its [REST API](https://dresden-elektronik.github.io/deconz-rest-doc/about_rest/). You can target a specific device endpoint, like a light or a sensor, or change the configuration of the deCONZ service itself. This is handy when deCONZ exposes a setting that Home Assistant does not surface on its own.

{% important %}
Only users with administrator privileges can run this action.
{% endimportant %}

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **deCONZ: Configure**.
6. Fill in the options you want to use.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Entity:
  description: The Home Assistant entity that represents the device endpoint in deCONZ you want to configure. Provide either an entity or a path.
Path:
  description: "The full path to a deCONZ endpoint, such as `/lights/1/state`. When you also provide an entity, this is treated as a subpath of that entity's device path, such as `/state`."
Configuration payload:
  description: "The data you want to change, as a JSON object. For example, `{\"on\": true}`."
Bridge identifier:
  description: A unique string for each piece of deCONZ hardware. You can find it as part of the integration name. This is useful if you run multiple deCONZ integrations.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `deconz.configure`. A basic example looks like this:

{% example %}
action: |
  action: deconz.configure
  data:
    entity: light.living_room
    data:
      on: true
{% endexample %}

This turns on the light that the `light.living_room` entity represents.

### Options in YAML

{% options_yaml %}
entity:
  description: The Home Assistant entity that represents the device endpoint in deCONZ you want to configure. Provide either an entity or a field.
  required: false
  type: string
field:
  description: "The full path to a deCONZ endpoint, such as `/lights/1/state`. When you also provide an entity, this is treated as a subpath of that entity's device path, such as `/state`."
  required: false
  type: string
data:
  description: "The data you want to change, as a JSON object. For example, `{\"on\": true}`."
  required: true
  type: map
bridgeid:
  description: A unique string for each piece of deCONZ hardware. You can find it as part of the integration name. This is useful if you run multiple deCONZ integrations.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- You must provide either an entity or a field. If you provide both, the field is treated as a subpath under the device path of the entity.
- If you do not provide a bridge identifier and you run more than one deCONZ integration, the action uses your main deCONZ gateway.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
