---
title: "Person is home"
condition: person.is_home
domain: person
description: "Tests if one or more persons are home."
related_conditions:
  - person.is_not_home
---

The **Person is home** condition passes when the targeted person or people are currently in the home zone. Use it when an automation should run only while someone is there, like turning on lights, opening covers, or skipping empty-house routines.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets-of-the-condition)), pick the person you want to check. You can also target an area, floor, device, specific entity, or label if your person entities are organized that way.
5. From the conditions shown for that target, select **Person is home**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple people are targeted, controls how results combine. Pick **Any** to pass if at least one targeted person is home, or **All** to pass only when every targeted person is home.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `person.is_home`. A basic example looks like this:

{% example %}
condition: |
  condition: person.is_home
  target:
    entity_id: person.ada
{% endexample %}

This passes when `person.ada` is currently in the `home` state.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple people are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition checks for the exact `home` state.
- If a person's state is `unavailable` or `unknown`, it is not treated as a confirmed `home` state.
- To check for the opposite state, use [Person is not home](/conditions/person.is_not_home/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: turn on the living room lights at sunset when someone is home

This automation turns on the living room lights at sunset, but only if Ada or Stacey is already home.

- **Trigger**: Time: Sunset
- **Condition**: Person is home
- **Target**: Ada and Stacey
- **Condition passes if**: Any
- **Action**: Light: Turn on

{% details "YAML example for turning on lights when someone is home" %}

{% example %}
automation: |
  alias: "Turn on the living room lights when someone is home"
  triggers:
    - trigger: sun
      event: sunset
  conditions:
    - condition: person.is_home
      target:
        entity_id:
          - person.ada
          - person.stacey
      options:
        behavior: any
  actions:
    - action: light.turn_on
      target:
        entity_id: light.living_room
{% endexample %}

{% enddetails %}

### Automation: open the blinds in the morning when someone is home

This automation opens the living room blinds in the morning only if someone is already home.

- **Trigger**: A scheduled time
- **Condition**: Person is home
- **Target**: Ada and Stacey
- **Condition passes if**: Any
- **Action**: Cover: Open cover

{% details "YAML example for opening blinds when someone is home" %}

{% example %}
automation: |
  alias: "Open the blinds when someone is home"
  triggers:
    - trigger: time
      at: "07:30:00"
  conditions:
    - condition: person.is_home
      target:
        entity_id:
          - person.ada
          - person.stacey
      options:
        behavior: any
  actions:
    - action: cover.open_cover
      target:
        entity_id: cover.living_room
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
