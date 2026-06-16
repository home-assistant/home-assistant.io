---
title: "Cast skill"
action: habitica.cast_skill
domain: habitica
description: "Uses a skill or spell from your Habitica character on a task."
---

Use this action to cast a skill or spell from your Habitica character on a specific task, affecting its progress or status. Only skills available to your character's class can be used.

{% include actions/ui_header.md %}

To cast a skill from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Habitica: Cast skill**.
6. Select the **Config entry** of the character, the **Skill** to cast, and the **Task** to cast it on.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

The available skills depend on your character's class:

- **Rogue**: `pickpocket`, `backstab`
- **Warrior**: `smash`
- **Mage**: `fireball`

### Options in the UI

{% options_ui %}
Config entry:
  description: The Habitica character that casts the skill.
  required: true
Skill:
  description: "The skill or spell to cast. Only skills available to your character's class can be used."
  required: true
Task:
  description: "The task to target by name, task ID, or alias. Supported task types are to-do, habit, and daily."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `habitica.cast_skill`:

{% example %}
action: |
  action: habitica.cast_skill
  data:
    config_entry: 6b4be47a1fa7c3764f14cf756dc9899d
    skill: fireball
    task: "Write a report"
{% endexample %}

To use task aliases, enable **Developer Mode** under **Settings** > **Site Data** in the Habitica web client. Task aliases can only be edited in the Habitica web client.

### Options in YAML

{% options_yaml %}
config_entry:
  description: The Habitica character that casts the skill.
  required: true
  type: string
skill:
  description: >
    The skill or spell to cast. One of pickpocket, backstab, smash, or
    fireball. Only skills available to your character's class can be used.
  required: true
  type: string
task:
  description: >
    The task to target by name, task ID, or alias. Supported task types
    are to-do, habit, and daily.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
