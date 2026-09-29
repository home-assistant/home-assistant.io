---
title: "Abort an active quest"
action: habitica.abort_quest
domain: habitica
description: "Terminates your Habitica party's ongoing quest and resets all progress."
---

Use this action to terminate your party's ongoing quest. All progress is lost, and the quest scroll is returned to the owner's inventory.

{% important %}

Only the quest leader or group leader can abort a quest.

{% endimportant %}

{% include actions/ui_header.md %}

To abort a quest from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Habitica: Abort an active quest**.
6. Select the **Config entry** of the character that aborts the quest.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Select character:
  description: The Habitica character that aborts the quest.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `habitica.abort_quest`:

{% example %}
action: |
  action: habitica.abort_quest
  data:
    config_entry: 6b4be47a1fa7c3764f14cf756dc9899d
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry:
  description: The Habitica character that aborts the quest.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
