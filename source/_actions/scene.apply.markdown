---
title: "Apply scene"
action: scene.apply
domain: scene
description: "Activates a set of entity states without defining a scene first."
related_actions:
  - scene.turn_on
  - scene.create
---

Use this action to put a group of {% term entities %} into the states you choose, without creating a scene first. You pass the entities and their target states directly to the action.

This is useful for one-off situations where you don't need a reusable scene, for example a lighting setup that only ever appears in a single automation.

{% include actions/ui_header.md %}

To apply a set of states from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Scene: Apply scene**.
6. In **Entities state**, list the entities and the state you want each of them to have.
7. _Optional_: set a **Transition** so the change happens gradually instead of instantly.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. You list the entities in the **Entities state** option instead.

### Options in the UI

{% options_ui %}
Entities state:
  description: The entities and the state you want each of them to have. For each entity, set a state such as `on` or `off`, or set a state together with attributes such as brightness or color.
  required: true
Transition:
  description: How long, in seconds, the devices take to transition into the states you defined.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `scene.apply`. The `entities` option uses the same format as the `entities` option of a scene in your configuration:

{% example %}
action: |
  action: scene.apply
  data:
    entities:
      light.tv_back_light:
        state: "on"
        brightness: 100
      light.ceiling: "off"
      media_player.sony_bravia_tv:
        state: "on"
        source: "HDMI 1"
{% endexample %}

This dims the TV back light, turns the ceiling light off, and switches the TV to the first HDMI input.

### Options in YAML

{% options_yaml %}
entities:
  description: A mapping of entity IDs to the state you want each of them to have. Use a plain value such as `"on"` for the state only, or a mapping with a `state` key and attributes such as `brightness` or `source`.
  required: true
  type: map
transition:
  description: How long, in seconds, the devices take to transition into the states you defined.
  required: false
  type: float
{% endoptions_yaml %}

## Good to know

- To see which attributes an entity accepts, look it up in {% my developer_states title="**Settings** > **Tools** > **States**" %}.
- Transitions are only supported by lights, and the lights themselves must support them too.
- If you want a reusable scene that appears in the UI and can be activated from a dashboard, create a scene instead and use [Activate scene](/actions/scene.turn_on/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: set a movie lighting look when the TV turns on

Dim the back light, switch the ceiling light off, and select the right TV input in a single step.

- **Trigger**: State: TV changes to on
- **Action**: Apply scene
  - **Entities state**: TV back light, ceiling light, and TV

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Set the movie lighting when the TV turns on"
    triggers:
      - trigger: state
        entity_id: media_player.sony_bravia_tv
        to: "on"
    actions:
      - action: scene.apply
        data:
          entities:
            light.tv_back_light:
              state: "on"
              brightness: 100
            light.ceiling: "off"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
