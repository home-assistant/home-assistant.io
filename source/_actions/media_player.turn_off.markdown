---
title: "Turn off media player"
action: media_player.turn_off
domain: media_player
description: "Turns off a media player."
related_actions:
  - media_player.turn_on
  - media_player.toggle
  - media_player.media_stop
---

Use this action to turn off a media player, such as a TV, speaker, or receiver.

{% include actions/ui_header.md %}

To turn off a media player from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the media player you want to turn off.
6. From the actions shown for that target, select **Turn off media player**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.turn_off`. A basic example looks like this:

{% example %}
action: |
  action: media_player.turn_off
  target:
    entity_id: media_player.living_room
{% endexample %}

This turns off `media_player.living_room`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with media players that support being turned off.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: turn off the TV when everyone leaves

Turn off a media player when nobody is home, for example to make sure the TV is not left running.

- **Trigger**: Everyone leaves home
- **Action**: Turn off media player
  - **Target**: Living room TV

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Turn off the TV when everyone leaves"
    triggers:
      - trigger: state
        entity_id: zone.home
        to: "0"
    actions:
      - action: media_player.turn_off
        target:
          entity_id: media_player.living_room
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
