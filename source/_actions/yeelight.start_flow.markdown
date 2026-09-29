---
title: "Start flow"
action: yeelight.start_flow
domain: yeelight
description: "Starts a color flow on a Yeelight light using a list of transitions."
related_actions:
  - yeelight.set_color_flow_scene
  - yeelight.set_mode
  - yeelight.set_music_mode
---

The **Start flow** action starts a color flow on a Yeelight light, using a list of transitions that you define.

This is useful for creating dynamic lighting effects, such as a slow fade through colors or a flickering candle effect.

{% include actions/ui_header.md %}

To start a flow from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Yeelight light you want to control.
6. From the actions shown for that target, select **Start flow**.
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

In YAML, refer to this action as `yeelight.start_flow`. A basic example looks like this:

{% example %}
action: |
  action: yeelight.start_flow
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

- The **Set color flow scene** ([`yeelight.set_color_flow_scene`](/actions/yeelight.set_color_flow_scene/)) action accepts the same transitions but uses a different Yeelight API call. If the light is off, it turns on. There may be firmware differences in how complex flows are handled.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
