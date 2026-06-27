---
title: Vacuum is docked
condition: vacuum.is_docked
domain: vacuum
description: "Passes when the vacuum cleaner is docked."
---

The **Vacuum cleaner is docked** condition passes when one or more targeted vacuums are on their dock or charging base.

Use this when you want to continue only if the robot is safely parked, like before turning off a light near the charger, starting maintenance, or sending a reminder that the cleaning cycle is complete.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Vacuum: Vacuum cleaner is docked**.
5. Under **Targets**, select the vacuum entity, an area, a floor, or a label.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, enter how long the vacuum must stay docked before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple vacuums are targeted, controls how results combine. Pick **Any** to pass if at least one targeted vacuum is docked, or **All** to pass only when every targeted vacuum is docked.
  required: true
For at least:
  description: The time the vacuum must stay docked before the condition passes.
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `vacuum.is_docked`. A basic example looks like this:

{% example %}
condition: |
  condition: vacuum.is_docked
  target:
    entity_id: vacuum.laundry_room
  options:
    behavior: any
{% endexample %}

This passes when `vacuum.laundry_room` is docked.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple vacuums are targeted, controls how results combine. Accepts `all` or `any`.
  required: true
  type: string
  default: any
for:
  description: >
    The time the vacuum must stay docked before the condition passes.
    Accepts a duration like `00:00:10` for 10 seconds.
  required: false
  type: string
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Entities with state `unavailable` or `unknown` are ignored when Home Assistant evaluates the condition.
- With **Any** (default), the condition passes if at least one targeted vacuum is docked.
- With **All**, the condition passes only if every targeted vacuum that Home Assistant can evaluate is docked.
- If every targeted vacuum is `unavailable` or `unknown`, **Any** fails and **All** passes.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: turn off the laundry room light after docking

At bedtime, this automation checks whether the vacuum is already docked. If it is, the light near the charging station turns off.

- **Trigger**: Time: 23:00
- **Condition**: Vacuum is docked
- **Target**: Laundry room vacuum
- **Action**: Turn off light

{% details "YAML example for turning off a light once the vacuum is docked" %}

{% example %}
automation: |
  alias: "Docked vacuum light off"
  triggers:
    - trigger: time
      at: "23:00:00"
  conditions:
    - condition: vacuum.is_docked
      target:
        entity_id: vacuum.laundry_room
      options:
        behavior: any
  actions:
    - action: light.turn_off
      target:
        entity_id: light.laundry_room
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
