---
title: "Remove from queue"
action: heos.remove_from_queue
domain: heos
description: "Removes one or more items from a HEOS media player's play queue."
related_actions:
  - heos.get_queue
  - heos.move_queue_item
---

Use this action to remove one or more items from a HEOS media player's play queue. You identify the items by their queue IDs, which you can look up with the [Get queue](/actions/heos.get_queue/) action.

{% include actions/ui_header.md %}

To remove items from the queue from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the HEOS media player you want to control.
6. From the actions shown for that target, select **Remove from queue**.
7. Enter the **Queue IDs** of the items you want to remove.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Queue IDs:
  description: The IDs (positions) of the items in the queue to remove. You can find these with the Get queue action.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `heos.remove_from_queue`. A basic example looks like this:

{% example %}
action: |
  action: heos.remove_from_queue
  target:
    entity_id: media_player.family_room
  data:
    queue_ids:
      - 1
      - 3
{% endexample %}

This removes the first and third items from the queue of `media_player.family_room`.

### Options in YAML

{% options_yaml %}
queue_ids:
  description: The IDs (positions) of the items in the queue to remove. You can find these with the Get queue action.
  required: true
  type: list
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- Queue IDs start at 1. Use [Get queue](/actions/heos.get_queue/) first to look up the current positions, since they shift as items are added or removed.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
