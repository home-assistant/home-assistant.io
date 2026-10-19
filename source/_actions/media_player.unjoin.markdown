---
title: "Unjoin media player"
action: media_player.unjoin
domain: media_player
description: "Removes a media player from a group."
related_actions:
  - media_player.join
---

Use this action to remove a media player from a player group. This only works on platforms that support player groups.

{% include actions/ui_header.md %}

To unjoin a media player from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the media player you want to remove from its group.
6. From the actions shown for that target, select **Unjoin media player**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.unjoin`. A basic example looks like this:

{% example %}
action: |
  action: media_player.unjoin
  target:
    entity_id: media_player.kitchen
{% endexample %}

This removes `media_player.kitchen` from any group it is part of.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works on multiroom audio systems that support player groups. To group players together, use [Join media players](/actions/media_player.join/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: remove the kitchen speaker from the group at dinner

Unjoin a media player at a set time, for example to play different audio in the kitchen.

- **Trigger**: Time: 18:00
- **Action**: Unjoin media player
  - **Target**: Kitchen speaker

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Remove the kitchen speaker from the group at dinner"
    triggers:
      - trigger: time
        at: "18:00:00"
    actions:
      - action: media_player.unjoin
        target:
          entity_id: media_player.kitchen
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
