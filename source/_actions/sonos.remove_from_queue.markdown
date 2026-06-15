---
title: "Remove from the Sonos queue"
action: sonos.remove_from_queue
domain: sonos
description: "Removes an item from a Sonos speaker's queue."
related_actions:
  - sonos.get_queue
  - sonos.play_queue
---

Use this action to remove an item from a Sonos speaker's queue by its position. This is handy for clearing tracks you no longer want to hear, for example removing a song right after it finishes playing.

{% include actions/ui_header.md %}

To remove an item from the Sonos queue from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Sonos speaker you want to remove an item from.
6. From the actions shown for that target, select **Remove from queue**.
7. Set the **Queue position** to remove.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Queue position:
  description: The position in the queue to remove. The first item is 0.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sonos.remove_from_queue`. A basic example looks like this:

{% example %}
action: |
  action: sonos.remove_from_queue
  target:
    entity_id: media_player.living_room
  data:
    queue_position: 3
{% endexample %}

### Options in YAML

{% options_yaml %}
queue_position:
  description: The position in the queue to remove. The first item is 0.
  required: false
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- When targeting a group, use the coordinator speaker.

{% include actions/more_examples.md %}

### Automation: remove a song from the queue once it finishes playing

This automation removes each song from the queue right after it has played, so the queue empties out as you listen:

```yaml
alias: "Remove last played song from queue"
triggers:
  - trigger: state
    entity_id: media_player.kitchen
  - trigger: state
    entity_id: media_player.bathroom
  - trigger: state
    entity_id: media_player.move
conditions:
  # Only act on the coordinator speaker
  - "{{ state_attr(trigger.entity_id, 'group_members')[0] == trigger.entity_id }}"
  # Only when moving from one queue position to another
  - >-
    {{
      'queue_position' in trigger.from_state.attributes
      and 'queue_position' in trigger.to_state.attributes
    }}
  # Only when moving forward in the queue
  - >-
    {{
      trigger.from_state.attributes.queue_position
      < trigger.to_state.attributes.queue_position
    }}
actions:
  - action: sonos.remove_from_queue
    target:
      entity_id: "{{ trigger.entity_id }}"
    data:
      queue_position: "{{ trigger.from_state.attributes.queue_position }}"
```

{% include actions/stuck.md %}

{% include actions/related.md %}
