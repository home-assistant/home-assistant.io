---
title: "Turn up group volume"
action: heos.group_volume_up
domain: heos
description: "Turns up the volume of a HEOS group a step."
related_actions:
  - heos.group_volume_down
  - heos.group_volume_set
---

Use this action to turn up the volume of a HEOS group by a step, while keeping the relative balance between the group members. You can call it on any player that is joined to the group.

{% include actions/ui_header.md %}

To turn up the group volume from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select a HEOS media player that is joined to the group.
6. From the actions shown for that target, select **Turn up group volume**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `heos.group_volume_up`. A basic example looks like this:

{% example %}
action: |
  action: heos.group_volume_up
  target:
    entity_id: media_player.kitchen
{% endexample %}

This turns up the volume of the group that `media_player.kitchen` belongs to.

{% include actions/targets.md domain="media_player" %}

## Good to know

- The step keeps the relative volume of each member, so the group stays in balance.
- To set an exact level instead of stepping, use [Set group volume](/actions/heos.group_volume_set/).

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
