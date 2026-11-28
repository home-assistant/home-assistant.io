---
title: "Clear sleep timer"
action: yoto.clear_sleep_timer
domain: yoto
description: "Cancels the sleep timer on a Yoto player."
related_actions:
  - yoto.set_sleep_timer
---

Use this action to cancel the sleep timer on a Yoto player, if one is running. The player keeps playing until it is stopped some other way.

{% include actions/ui_header.md %}

To clear a Yoto sleep timer from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Yoto player you want to clear the timer for.
6. From the actions shown for that target, under **Yoto**, select **Clear sleep timer**.
7. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `yoto.clear_sleep_timer`. A basic example looks like this:

{% example %}
action: |
  action: yoto.clear_sleep_timer
  target:
    entity_id: media_player.yoto_player
{% endexample %}

{% include actions/targets.md domain="media_player" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: keep the story playing with a button

Sometimes a story is too good to stop. This automation cancels the sleep timer when a button helper is pressed, so the player keeps playing.

- **Trigger**: Entity state: Keep playing button changes
- **Action**: Yoto clear sleep timer
  - **Target**: Yoto player

{% details "YAML example for cancelling the timer with a button" %}

{% example %}
automation: |
  alias: "Keep the story playing"
  triggers:
    - trigger: state
      entity_id: input_button.keep_playing
  actions:
    - action: yoto.clear_sleep_timer
      target:
        entity_id: media_player.yoto_player
{% endexample %}

{% enddetails %}

### Automation: cancel the sleep timer when day mode starts

A timer left over from the night should not stop the first story of the morning. This automation cancels the sleep timer when the player switches to day mode.

- **Trigger**: Entity state: Yoto player Day mode changes to **Day**
- **Action**: Yoto clear sleep timer
  - **Target**: Yoto player

{% details "YAML example for cancelling the timer in the morning" %}

{% example %}
automation: |
  alias: "Cancel the Yoto sleep timer in the morning"
  triggers:
    - trigger: state
      entity_id: sensor.yoto_player_day_mode
      to: "day"
  actions:
    - action: yoto.clear_sleep_timer
      target:
        entity_id: media_player.yoto_player
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
