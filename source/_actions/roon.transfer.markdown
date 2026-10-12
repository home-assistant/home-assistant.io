---
title: "Transfer"
action: roon.transfer
domain: roon
description: "Transfers playback from one Roon player to another."
---

Use this action to move playback from one Roon player to another. The player you target is the source, and the transfer ID you provide is the destination.

This is handy in automations, for example to follow you around the house by moving the music to the player in whichever room you walk into.

{% include actions/ui_header.md %}

To transfer playback from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the source player you want to transfer playback from.
6. From the actions shown for that target, select **Transfer**.
7. Set the **Transfer ID** to the destination player.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Transfer ID:
  description: The destination player to transfer playback to.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `roon.transfer`. A basic example looks like this:

{% example %}
action: |
  action: roon.transfer
  target:
    entity_id: media_player.living_room
  data:
    transfer_id: media_player.kitchen
{% endexample %}

This transfers playback from `media_player.living_room` to `media_player.kitchen`.

### Options in YAML

{% options_yaml %}
transfer_id:
  description: >
    The destination player to transfer playback to.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- The target is the source player, and the transfer ID is the destination player.
- Both players must be Roon media players.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: move music to the kitchen in the evening

In the evening, move whatever is playing in the living room to the kitchen player.

- **Trigger**: Every day at 18:00
- **Action**: Transfer
  - **Target**: Living room player
  - **Transfer ID**: Kitchen player

{% details "YAML example for moving music in the evening" %}

{% example %}
automation: |
  alias: "Move Roon music to the kitchen"
  triggers:
    - trigger: time
      at: "18:00:00"
  actions:
    - action: roon.transfer
      target:
        entity_id: media_player.living_room
      data:
        transfer_id: media_player.kitchen
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
