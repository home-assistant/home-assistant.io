---
title: "Activate scene"
action: scene.turn_on
domain: scene
description: "Activates a scene."
related_actions:
  - scene.apply
  - scene.create
  - scene.reload
---

Use this action to activate a scene. A scene stores a set of states, such as which lights are on, how bright they are, and what color they have. Activating the scene puts all of those {% term entities %} back into the stored states in one step.

There is no action to turn a scene off. A scene describes a moment you want to return to, not something that stays switched on. To go back, activate another scene or turn the entities off yourself.

{% include actions/ui_header.md %}

To activate a scene from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the scene you want to activate.
6. From the actions shown for that target, select **Activate scene**.
7. _Optional_: set a **Transition** so the change happens gradually instead of instantly.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Transition:
  description: How long, in seconds, the devices take to transition into the states defined in the scene.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `scene.turn_on`. A basic example looks like this:

{% example %}
action: |
  action: scene.turn_on
  target:
    entity_id: scene.romantic
{% endexample %}

This activates the `scene.romantic` scene.

To ease into the scene instead of switching instantly, add a transition:

{% example %}
action: |
  action: scene.turn_on
  target:
    entity_id: scene.romantic
  data:
    transition: 2.5
{% endexample %}

### Options in YAML

{% options_yaml %}
transition:
  description: How long, in seconds, the devices take to transition into the states defined in the scene.
  required: false
  type: float
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- Transitions are only supported by lights, and the lights themselves must support them too. The scene doesn't have to consist only of lights to use a transition.
- The scene state shows the time it was last activated. That makes it easy to check in the UI whether a scene ran.
- To apply a set of states without creating a scene first, use [Apply scene](/actions/scene.apply/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: activate a scene when someone comes home

Set the living room to a welcoming look as soon as someone arrives.

- **Trigger**: Zone entered
  - **Target**: Paulus
  - **Zone**: Home
- **Action**: Activate scene
  - **Target**: Romantic
  - **Transition**: 2.5

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Activate the romantic scene on arrival"
    triggers:
      - trigger: zone.entered
        target:
          entity_id: person.paulus
        options:
          zone: zone.home
    actions:
      - action: scene.turn_on
        target:
          entity_id: scene.romantic
        data:
          transition: 2.5
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
