---
title: "Restore"
action: snapcast.restore
domain: snapcast
description: "Restores a previously taken snapshot of one or more Snapcast speakers."
related_actions:
  - snapcast.snapshot
  - snapcast.set_latency
---

The **Restore** action returns one or more Snapcast speakers to the playback state you saved earlier with [Snapshot](/actions/snapcast.snapshot/).

This pair is handy when you want to interrupt playback for a doorbell or a notification sound and then pick up right where you left off.

{% include actions/ui_header.md %}

To restore a snapshot from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Snapcast speakers you want to restore.
6. From the actions shown for that target, select **Restore**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `snapcast.restore`. A basic example looks like this:

{% example %}
action: |
  action: snapcast.restore
  target:
    entity_id: media_player.snapcast_living_room
{% endexample %}

This returns the selected speaker to its saved playback state.

### Options in YAML

This action has no additional options in YAML.

{% include actions/targets.md domain="media_player" %}

## Good to know

- Restore only works after a [Snapshot](/actions/snapcast.snapshot/) has been taken for the same speaker. See the snapshot page for a full doorbell example.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
