---
title: "Move queue item"
action: heos.move_queue_item
domain: heos
description: "Reorders one or more items within a HEOS media player's play queue."
related_actions:
  - heos.get_queue
  - heos.remove_from_queue
---

Use this action to reorder a HEOS media player's play queue. You provide the queue IDs of the items to move and the position to move them to. Look up the queue IDs with the [Get queue](/actions/heos.get_queue/) action.

{% include actions/ui_header.md %}

To move items within the queue from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the HEOS media player you want to control.
6. From the actions shown for that target, select **Move queue item**.
7. Enter the **Queue IDs** to move and the **Destination position**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Queue IDs:
  description: The IDs (positions) of the items in the queue to move. You can find these with the Get queue action.
Destination position:
  description: The position in the queue to move the items to, starting at 1.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `heos.move_queue_item`. A basic example looks like this:

{% example %}
action: |
  action: heos.move_queue_item
  target:
    entity_id: media_player.family_room
  data:
    queue_ids:
      - 2
    destination_position: 1
{% endexample %}

This moves the second item in the queue to the top for `media_player.family_room`.

### Options in YAML

{% options_yaml %}
queue_ids:
  description: The IDs (positions) of the items in the queue to move. You can find these with the Get queue action.
  required: true
  type: list
destination_position:
  description: The position in the queue to move the items to, starting at 1.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- Queue IDs start at 1. Use [Get queue](/actions/heos.get_queue/) first to look up the current positions, since they shift as items are moved.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
