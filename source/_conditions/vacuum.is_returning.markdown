---
title: Vacuum is returning
condition: vacuum.is_returning
domain: vacuum
description: "Passes when the vacuum cleaner is returning to the dock."
---

The **Vacuum cleaner is returning** condition passes when one or more targeted vacuums are returning to their dock or base.

Use this when you only want an automation to run while the robot is on its way home, like turning on a light near the dock, delaying another routine, or waiting to start cleanup until the path is clear again.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Vacuum cleaner is returning**.
5. Under **Targets**, select the vacuum entity, an area, a floor, or a label.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, enter how long the vacuum must keep returning before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple vacuums are targeted, controls how results combine. Pick **Any** to pass if at least one targeted vacuum is returning, or **All** to pass only when every targeted vacuum is returning.
  required: true
For at least:
  description: The time the vacuum must keep returning before the condition passes.
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `vacuum.is_returning`. A basic example looks like this:

{% example %}
condition: |
  condition: vacuum.is_returning
  target:
    entity_id: vacuum.downstairs
  options:
    behavior: any
{% endexample %}

This passes when `vacuum.downstairs` is returning to its dock.

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
    The time the vacuum must keep returning before the condition passes.
    Accepts a duration like `00:00:10` for 10 seconds.
  required: false
  type: string
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Entities with state `unavailable` or `unknown` are ignored when Home Assistant evaluates the condition.
- With **Any** (default), the condition passes if at least one targeted vacuum is returning.
- With **All**, the condition passes only if every targeted vacuum that Home Assistant can evaluate is returning.
- If every targeted vacuum is `unavailable` or `unknown`, **Any** fails and **All** passes.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: turn on the dock light if the vacuum is returning

At night, this automation checks whether the vacuum is currently returning to the dock. If it is, the nearby light turns on to help light the final part of its path.

- **Trigger**: Time: 22:00
- **Condition**: Vacuum cleaner is returning
- **Target**: Downstairs vacuum
- **Action**: Turn on light

{% details "YAML example for lighting the dock area" %}

{% example %}
automation: |
  alias: "Light dock area for returning vacuum"
  triggers:
    - trigger: time
      at: "22:00:00"
  conditions:
    - condition: vacuum.is_returning
      target:
        entity_id: vacuum.downstairs
      options:
        behavior: any
  actions:
    - action: light.turn_on
      target:
        entity_id: light.dock_area
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
