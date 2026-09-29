---
title: "Light set scene"
action: xiaomi_miio.light_set_scene
domain: xiaomi_miio
description: "Sets a fixed scene on a Xiaomi Philips light."
related_actions:
  - xiaomi_miio.light_set_delayed_turn_off
---

The **Light set scene** action activates one of the fixed scenes built into a Xiaomi Philips light.

{% include actions/ui_header.md %}

To set a scene from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Xiaomi Home: Light set scene**.
6. Enter the **Scene** number.
7. Select **Save**.

This action does not support targets. In the UI, use the **Entity ID** field to choose which Xiaomi Philips light to act on. If you leave it empty, the action applies to all of them.

### Options in the UI

{% options_ui %}
Entity ID:
  description: The Xiaomi Philips light to act on. If you leave this empty, all of them are affected.
Scene:
  description: The number of the fixed scene to activate, from 1 to 6.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `xiaomi_miio.light_set_scene`. A basic example looks like this:

{% example %}
action: |
  action: xiaomi_miio.light_set_scene
  data:
    entity_id: light.philips_light
    scene: 1
{% endexample %}

This activates the first fixed scene on `light.philips_light`.

### Options in YAML

{% options_yaml %}
entity_id:
  description: The Xiaomi Philips light to act on. If you leave this out, all of them are affected.
  required: false
  type: [string, list]
scene:
  description: The number of the fixed scene to activate, from 1 to 6.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
