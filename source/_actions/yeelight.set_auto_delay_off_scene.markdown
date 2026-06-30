---
title: "Set auto delay off scene"
action: yeelight.set_auto_delay_off_scene
domain: yeelight
description: "Turns a Yeelight light on at a set brightness and schedules it to turn off after a delay."
related_actions:
  - yeelight.set_color_temp_scene
  - yeelight.set_color_scene
  - yeelight.set_color_flow_scene
---

The **Set auto delay off scene** action turns a Yeelight light on at a set brightness and schedules it to turn off again after a given number of minutes. If the light is off, it turns on.

This is useful for a built-in sleep timer, for example turning the light on at a low brightness and having it switch off on its own after you fall asleep.

{% include actions/ui_header.md %}

To set an auto delay off scene from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Yeelight light you want to control.
6. From the actions shown for that target, select **Set auto delay off scene**.
7. Enter the **Minutes** and the **Brightness**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Minutes:
  description: The time to wait before automatically turning the light off, from 1 to 60.
  required: true
Brightness:
  description: The brightness to set, from 1 to 100.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `yeelight.set_auto_delay_off_scene`. A basic example looks like this:

{% example %}
action: |
  action: yeelight.set_auto_delay_off_scene
  target:
    entity_id: light.bedroom
  data:
    minutes: 30
    brightness: 20
{% endexample %}

### Options in YAML

{% options_yaml %}
minutes:
  description: The time to wait before automatically turning the light off, from 1 to 60.
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
