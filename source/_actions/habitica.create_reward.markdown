---
title: "Create reward"
action: habitica.create_reward
domain: habitica
description: "Creates a custom reward for your Habitica character."
---

Use this action to create a custom reward for the selected Habitica character.

{% include actions/ui_header.md %}

To create a reward from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Habitica: Create reward**.
6. Select the **Config entry** of the character, then enter a **Task name** and a **Cost**. Optionally, set notes, tags, and an alias.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Select character:
  description: The Habitica character to create the reward for.
  required: true
Task name:
  description: The title for the reward.
  required: true
Cost:
  description: The cost of the reward in gold.
  required: true
Notes:
  description: The notes for the reward.
  required: false
Tags:
  description: Add tags to the reward. If a tag does not exist yet, it is created.
  required: false
Task alias:
  description: "An alias to use instead of the name or task ID. Only dashes, underscores, and alphanumeric characters are supported. The alias must be unique among all your tasks."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `habitica.create_reward`:

{% example %}
action: |
  action: habitica.create_reward
  data:
    config_entry: 6b4be47a1fa7c3764f14cf756dc9899d
    name: "Watch a movie"
    cost: 50
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry:
  description: The Habitica character to create the reward for.
  required: true
  type: string
name:
  description: The title for the reward.
  required: true
  type: string
notes:
  description: The notes for the reward.
  required: false
  type: string
cost:
  description: The cost of the reward in gold.
  required: true
  type: float
tag:
  description: >
    Add tags to the reward. If a tag does not exist yet, it is created.
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
