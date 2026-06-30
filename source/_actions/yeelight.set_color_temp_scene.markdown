---
title: "Set color temperature scene"
action: yeelight.set_color_temp_scene
domain: yeelight
description: "Sets a Yeelight light to a specific color temperature and brightness."
related_actions:
  - yeelight.set_color_scene
  - yeelight.set_hsv_scene
  - yeelight.set_auto_delay_off_scene
---

The **Set color temperature scene** action sets a Yeelight light to a specific color temperature and brightness. If the light is off, it turns on.

This is useful for recalling a favorite white tone, such as a warm light in the evening or a cool light for focused work.

{% include actions/ui_header.md %}

To set a color temperature scene from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Yeelight light you want to control.
6. From the actions shown for that target, select **Set color temperature scene**.
7. Enter the **Kelvin** value and the **Brightness**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Kelvin:
  description: The color temperature to set, in Kelvin, between 1700 and 6500.
  required: true
Brightness:
  description: The brightness to set, from 1 to 100.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `yeelight.set_color_temp_scene`. A basic example looks like this:

{% example %}
action: |
  action: yeelight.set_color_temp_scene
  target:
    entity_id: light.living_room
  data:
    kelvin: 2700
    brightness: 80
{% endexample %}

### Options in YAML

{% options_yaml %}
kelvin:
  description: The color temperature to set, in Kelvin, between 1700 and 6500.
  required: true
  type: integer
brightness:
  description: The brightness to set, from 1 to 100.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="light" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
