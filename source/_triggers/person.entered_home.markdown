---
title: "Entered home"
trigger: person.entered_home
domain: person
description: "Triggers when one or more persons enter home."
related_triggers:
  - person.left_home
---

The **Entered home** trigger fires when a person enters the home zone. Use it for arrival automations, like turning on lights, pausing cleaning, or unlocking routines that should happen only when someone gets back.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets-of-the-trigger)), pick the person you want to monitor. You can also target an area, floor, device, specific entity, or label if your person entities are organized that way.
5. From the triggers shown for that target, select **Entered home**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Any**, **First**, or **Last**.
7. Under **For at least**, set how long the person must stay home before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple people are targeted, controls when the trigger fires. Pick **Any** to fire every time any targeted person enters home, **First** to fire only when the first targeted person enters home, or **Last** to fire only after every targeted person has entered home.
For at least:
  description: How long the person must stay in the `home` state before the trigger fires. Leave it at zero to fire immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `person.entered_home`. A basic example looks like this:

{% example %}
trigger: |
  trigger: person.entered_home
  target:
    entity_id: person.ada
{% endexample %}

This fires when `person.ada` changes to the `home` state.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple people are targeted, controls when the trigger fires. Accepts `any`, `first`, or `last`.
  required: false
  type: string
  default: any
for:
  description: >
    Duration the person must stay in the `home` state before the trigger fires. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger fires when a person enters the home zone and their state changes to `home`.
- If a person changes from `unavailable` or `unknown` to `home`, that recovery does not count as entering home.
- To react when someone leaves home instead, use [Left home](/triggers/person.left_home/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on the porch light when someone gets home after dark

This automation turns on the porch light when Ada gets home after sunset.

- **Trigger**: Entered home
  - **Target**: Ada
- **Trigger when**: Any
- **Action**: Light: Turn on

{% details "YAML example for turning on the porch light" %}

{% example %}
automation: |
  alias: "Turn on the porch light when Ada gets home"
  triggers:
    - trigger: person.entered_home
      target:
        entity_id: person.ada
  conditions:
    - condition: sun
      after: sunset
  actions:
    - action: light.turn_on
      target:
        entity_id: light.porch
{% endexample %}

{% enddetails %}

### Automation: pause the robot vacuum when the first person gets home

If your vacuum runs while the house is empty, this automation sends it back to the dock as soon as the first person gets home.

- **Trigger**: Entered home
  - **Target**: Ada and Stacey
- **Trigger when**: First
- **Action**: Vacuum: Return to base

{% details "YAML example for pausing the robot vacuum on arrival" %}

{% example %}
automation: |
  alias: "Pause the robot vacuum when someone gets home"
  triggers:
    - trigger: person.entered_home
      target:
        entity_id:
          - person.ada
          - person.stacey
      options:
        behavior: first
  actions:
    - action: vacuum.return_to_base
      target:
        entity_id: vacuum.downstairs
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
