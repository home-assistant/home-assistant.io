---
title: "Cancel quest"
action: habitica.cancel_quest
domain: habitica
description: "Cancels a Habitica quest that has not started yet and resets invitations."
---

Use this action to cancel a quest that has not started yet. All accepted and pending invitations are canceled, and the quest scroll is returned to the owner's inventory.

{% important %}

Only the quest leader or group leader can cancel a quest.

{% endimportant %}

{% include actions/ui_header.md %}

To cancel a quest from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Habitica: Cancel quest**.
6. Select the **Config entry** of the character that cancels the quest.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config entry:
  description: The Habitica character that cancels the quest.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `habitica.cancel_quest`:

{% example %}
action: |
  action: habitica.cancel_quest
  data:
    config_entry: 6b4be47a1fa7c3764f14cf756dc9899d
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry:
  description: The Habitica character that cancels the quest.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
