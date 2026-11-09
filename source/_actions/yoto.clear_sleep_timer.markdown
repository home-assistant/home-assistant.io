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

{% include actions/stuck.md %}

{% include actions/related.md %}
