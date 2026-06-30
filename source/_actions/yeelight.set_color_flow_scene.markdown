---
title: "Set color flow scene"
action: yeelight.set_color_flow_scene
domain: yeelight
description: "Starts a color flow on a Yeelight light using the scene API call."
related_actions:
  - yeelight.start_flow
  - yeelight.set_color_scene
  - yeelight.set_auto_delay_off_scene
---

The **Set color flow scene** action starts a color flow on a Yeelight light, using a list of transitions that you define. If the light is off, it turns on.

This is useful for creating dynamic lighting effects that should persist as a scene, such as a slow color cycle or a flickering fire effect.

{% include actions/ui_header.md %}

To set a color flow scene from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Yeelight light you want to control.
6. From the actions shown for that target, select **Set color flow scene**.
7. Enter the **Transitions**, and optionally a **Count** and an **Action**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Count:
  description: The number of times to run the flow. Use 0 to run it forever.
  required: false
Action:
  description: >
    What the light does after the flow stops. One of: recover, stay, or off.
  required: false
Transitions:
  description: >
    The list of transitions that make up the flow. See the transition formats
    described in [Custom effects](/integrations/yeelight/#custom-effects).
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `yeelight.set_color_flow_scene`. A basic example looks like this:

{% example %}
action: |
  action: yeelight.set_color_flow_scene
  target:
    entity_id: light.living_room
  data:
    transitions:
      - TemperatureTransition: [1900, 1000, 80]
      - TemperatureTransition: [1900, 2000, 60]
      - SleepTransition: [1000]
{% endexample %}

### Options in YAML

{% options_yaml %}
count:
  description: The number of times to run the flow. Use 0 to run it forever.
  required: false
  type: integer
  default: 0
action:
  description: >
    What the light does after the flow stops. One of: recover, stay, or off.
  required: false
  type: string
  default: recover
transitions:
  description: >
    The list of transitions that make up the flow. See the transition formats
    described in [Custom effects](/integrations/yeelight/#custom-effects).
  required: true
  type: list
{% endoptions_yaml %}

{% include actions/targets.md domain="light" %}

## Good to know

- The **Start flow** ([`yeelight.start_flow`](/actions/yeelight.start_flow/)) action accepts the same transitions but uses a different Yeelight API call.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
