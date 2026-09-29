---
title: "Turn on media player"
action: media_player.turn_on
domain: media_player
description: "Turns on a media player."
related_actions:
  - media_player.turn_off
  - media_player.toggle
  - media_player.media_play
---

Use this action to turn on a media player, such as a TV, speaker, or receiver.

{% include actions/ui_header.md %}

To turn on a media player from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the media player you want to turn on.
6. From the actions shown for that target, select **Turn on media player**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.turn_on`. A basic example looks like this:

{% example %}
action: |
  action: media_player.turn_on
  target:
    entity_id: media_player.living_room
{% endexample %}

This turns on `media_player.living_room`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with media players that support being turned on.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: turn on the TV when you get home

Turn on a media player when you arrive home, for example to bring up your TV.

- **Trigger**: Person arrives home
- **Action**: Turn on media player
  - **Target**: Living room TV

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Turn on the TV when you get home"
    triggers:
      - trigger: state
        entity_id: person.home_owner
        to: home
    actions:
      - action: media_player.turn_on
        target:
          entity_id: media_player.living_room
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
