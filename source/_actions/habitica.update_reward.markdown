---
title: "Update a reward"
action: habitica.update_reward
domain: habitica
description: "Updates an existing custom reward for your Habitica character."
---

Use this action to update a specific custom reward for the selected Habitica character.

{% include actions/ui_header.md %}

To update a reward from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Habitica: Update a reward**.
6. Select the **Config entry** of the character and the **Task name** of the reward to update. Then set the values you want to change.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

## Options in the UI

{% options_ui %}
Select character:
  description: The Habitica character that owns the reward.
  required: true
Task name:
  description: The reward to update by name, task ID, or alias.
  required: true
Rename:
  description: The new title for the reward.
  required: false
Notes:
  description: The new notes for the reward.
  required: false
Cost:
  description: The cost of the reward in gold.
  required: false
Add tags:
  description: Add tags to the reward. If a tag does not exist yet, it is created.
  required: false
Remove tags:
  description: Remove tags from the reward.
  required: false
Task alias:
  description: "An alias to use instead of the name or task ID. Only dashes, underscores, and alphanumeric characters are supported. The alias must be unique among all your tasks."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `habitica.update_reward`:

{% example %}
action: |
  action: habitica.update_reward
  data:
    config_entry: 6b4be47a1fa7c3764f14cf756dc9899d
    task: "Watch a movie"
    cost: 75
{% endexample %}

## Options in YAML

{% options_yaml %}
config_entry:
  description: The Habitica character that owns the reward.
  required: true
  type: string
task:
  description: >
    The reward to update by name, task ID, or alias.
  required: true
  type: string
rename:
  description: The new title for the reward.
  required: false
  type: string
notes:
  description: The new notes for the reward.
  required: false
  type: string
cost:
  description: The cost of the reward in gold.
  required: false
  type: float
tag:
  description: >
    Add tags to the reward. If a tag does not exist yet, it is created.
  required: false
  type: [string, list]
remove_tag:
  description: Remove tags from the reward.
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
