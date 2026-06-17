---
title: "Create habit"
action: habitica.create_habit
domain: habitica
description: "Creates a habit for your Habitica character."
---

Use this action to create a habit for the selected Habitica character.

{% include actions/ui_header.md %}

To create a habit from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Habitica: Create habit**.
6. Select the **Config entry** of the character and enter a **Task name**. Optionally, set the other values.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Select character:
  description: The Habitica character to create the habit for.
  required: true
Task name:
  description: The title for the habit.
  required: true
Notes:
  description: The notes for the habit.
  required: false
Up/down:
Rewards or losses:
  description: "Whether the habit is good and rewarding (positive), bad and penalizing (negative), or both."
  required: false
Difficulty:
  description: "The difficulty of the habit. One of trivial, easy, medium, or hard."
  required: false
Counter reset:
  description: "Defines when the habit's counter resets. One of daily, weekly, or monthly."
  required: false
Tags:
  description: Add tags to the habit. If a tag does not exist yet, it is created.
  required: false
Task alias:
  description: "An alias to use instead of the name or task ID. Only dashes, underscores, and alphanumeric characters are supported. The alias must be unique among all your tasks."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `habitica.create_habit`:

{% example %}
action: |
  action: habitica.create_habit
  data:
    config_entry: 6b4be47a1fa7c3764f14cf756dc9899d
    name: "Drink water"
    up_down:
      - up
    priority: easy
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry:
  description: The Habitica character to create the habit for.
  required: true
  type: string
name:
  description: The title for the habit.
  required: true
  type: string
notes:
  description: The notes for the habit.
  required: false
  type: string
up_down:
  description: >
    Defines if the habit is positive, negative, or both. One or more of up
    and down.
  required: false
  type: [string, list]
priority:
  description: >
    The difficulty of the habit. One of trivial, easy, medium, or hard.
  required: false
  type: string
frequency:
  description: >
    Defines when the habit's counter resets. One of daily, weekly, or monthly.
  required: false
  type: string
tag:
  description: >
    Add tags to the habit. If a tag does not exist yet, it is created.
  required: false
  type: [string, list]
alias:
  description: >
    An alias to use instead of the name or task ID. Only dashes, underscores,
    and alphanumeric characters are supported. The alias must be unique among
    all your tasks.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
