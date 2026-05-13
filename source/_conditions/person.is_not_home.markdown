---
title: "Person is not home"
condition: person.is_not_home
domain: person
description: "Tests if one or more persons are not home."
related_conditions:
  - person.is_home
---

The **Person is not home** condition passes when the targeted person or people are currently in the `not_home` state. Use it when an automation should run only after somebody has gone out and is no longer marked as home.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets-of-the-condition)), pick the person you want to check. You can also target an area, floor, device, specific entity, or label if your person entities are organized that way.
5. From the conditions shown for that target, select **Person is not home**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple people are targeted, controls how results combine. Pick **Any** to pass if at least one targeted person is in the `not_home` state, or **All** to pass only when every targeted person is in the `not_home` state.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `person.is_not_home`. A basic example looks like this:

{% example %}
condition: |
  condition: person.is_not_home
  target:
    entity_id: person.ada
{% endexample %}

This passes when `person.ada` is currently in the `not_home` state.

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

- This condition checks for the exact `not_home` state.
- If a person is in another named zone, like `work`, this condition does not pass.
- If a person's state is `unavailable` or `unknown`, it is not treated as a confirmed `not_home` state.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: lower the thermostat when everyone is marked not home

This automation lowers the thermostat at 8:30 AM only when both Ada and Stacey are in the `not_home` state.

- **Trigger**: A scheduled time
- **Condition**: Person is not home
  - **Target**: Ada and Stacey
- **Condition passes if**: All
- **Action**: Set preset mode

{% details "YAML example for lowering the thermostat when everyone is marked not home" %}

{% example %}
automation: |
  alias: "Lower the thermostat when everyone is marked not home"
  triggers:
    - trigger: time
      at: "08:30:00"
  conditions:
    - condition: person.is_not_home
      target:
        entity_id:
          - person.ada
          - person.stacey
      options:
        behavior: all
  actions:
    - action: climate.set_preset_mode
      target:
        entity_id: climate.downstairs
      data:
        preset_mode: away
{% endexample %}

{% enddetails %}

### Automation: lock the side door when you are already marked not home

This automation locks the side door at night only if Ada is already in the `not_home` state.

- **Trigger**: A scheduled time
- **Condition**: Person is not home
  - **Target**: Ada
- **Condition passes if**: Any
- **Action**: Lock lock

{% details "YAML example for locking the side door when you are not home" %}

{% example %}
automation: |
  alias: "Lock the side door when Ada is not home"
  triggers:
    - trigger: time
      at: "22:00:00"
  conditions:
    - condition: person.is_not_home
      target:
        entity_id: person.ada
      options:
        behavior: any
  actions:
    - action: lock.lock
      target:
        entity_id: lock.side_door
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
