---
title: "Track a habit"
action: habitica.score_habit
domain: habitica
description: "Increases the positive or negative streak of a Habitica habit to track its progress."
---

Use this action to score a habit, increasing its positive or negative streak depending on the direction you choose.

{% include actions/ui_header.md %}

To score a habit from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Habitica: Score habit**.
6. Select the **Config entry** of the character, the **Task** to score, and the **Direction**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Select character:
  description: The Habitica character that tracks the habit.
  required: true
Habit name:
  description: The habit to score by name, task ID, or alias.
  required: true
Reward or loss:
  description: Is it positive (➕) or negative (➖) progress you want to track for your habit.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `habitica.score_habit`:

{% example %}
action: |
  action: habitica.score_habit
  data:
    config_entry: 6b4be47a1fa7c3764f14cf756dc9899d
    task: "Drink water"
    direction: up
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry:
  description: The Habitica character that tracks the habit.
  required: true
  type: string
task:
  description: >
    The habit to score by name, task ID, or alias.
  required: true
  type: string
direction:
  description: >
    The direction to score. Use up for positive progress or down for negative
    progress.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
