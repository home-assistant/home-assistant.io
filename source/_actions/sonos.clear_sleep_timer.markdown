---
title: "Clear a Sonos sleep timer"
action: sonos.clear_sleep_timer
domain: sonos
description: "Clears the sleep timer on a Sonos speaker."
related_actions:
  - sonos.set_sleep_timer
---

Use this action to clear a sleep timer on a Sonos speaker, if one is set. This cancels a pending fade-out so the speaker keeps playing.

{% include actions/ui_header.md %}

To clear a Sonos sleep timer from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Sonos speaker you want to clear the timer for.
6. From the actions shown for that target, select **Clear timer**.
7. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sonos.clear_sleep_timer`. A basic example looks like this:

{% example %}
action: |
  action: sonos.clear_sleep_timer
  target:
    entity_id: media_player.bedroom
{% endexample %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- Target a coordinator speaker when clearing the timer for a group.

{% include actions/stuck.md %}

{% include actions/related.md %}
