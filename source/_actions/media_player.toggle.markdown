---
title: "Toggle media player"
action: media_player.toggle
domain: media_player
description: "Toggles a media player on or off."
related_actions:
  - media_player.turn_on
  - media_player.turn_off
---

Use this action to toggle a media player, turning it on if it is off and off if it is on.

{% include actions/ui_header.md %}

To toggle a media player from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the media player you want to toggle.
6. From the actions shown for that target, select **Toggle media player**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.toggle`. A basic example looks like this:

{% example %}
action: |
  action: media_player.toggle
  target:
    entity_id: media_player.living_room
{% endexample %}

This toggles `media_player.living_room` between on and off.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with media players that support being turned on and off.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: toggle the speaker with a button

Toggle a media player each time you press a button.

- **Trigger**: Button is pressed
- **Action**: Toggle media player
  - **Target**: Living room speaker

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Toggle the living room speaker with a button"
    triggers:
      - trigger: state
        entity_id: input_button.toggle_speaker
    actions:
      - action: media_player.toggle
        target:
          entity_id: media_player.living_room
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
