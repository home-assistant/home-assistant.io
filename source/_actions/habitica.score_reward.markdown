---
title: "Buy a reward"
action: habitica.score_reward
domain: habitica
description: "Buys a custom Habitica reward with gold."
---

Use this action to buy a custom reward for the selected Habitica character, spending the character's gold.

{% include actions/ui_header.md %}

To buy a reward from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Habitica: Buy a reward**.
6. Select the **Config entry** of the character and the **Reward name** of the reward to buy.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

## Options in the UI

{% options_ui %}
Select character:
  description: The Habitica character that buys the reward.
  required: true
Reward name:
  description: The custom reward to buy by name, task ID, or alias.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `habitica.score_reward`:

{% example %}
action: |
  action: habitica.score_reward
  data:
    config_entry: 6b4be47a1fa7c3764f14cf756dc9899d
    task: "Watch a movie"
{% endexample %}

## Options in YAML

{% options_yaml %}
config_entry:
  description: The Habitica character that buys the reward.
  required: true
  type: string
task:
  description: >
    The custom reward to buy by name, task ID, or alias.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
