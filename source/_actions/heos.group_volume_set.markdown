---
title: "Set group volume"
action: heos.group_volume_set
domain: heos
description: "Sets the volume of a HEOS group while preserving member volume ratios."
related_actions:
  - heos.group_volume_up
  - heos.group_volume_down
---

Use this action to set the volume of a HEOS group. It keeps the relative balance between the group members, so a player that was quieter than the others stays quieter. You can call it on any player that is joined to the group.

{% include actions/ui_header.md %}

To set the group volume from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select a HEOS media player that is joined to the group.
6. From the actions shown for that target, select **Set group volume**.
7. Set the **Level** you want.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Level:
  description: The volume to set, where 0 is inaudible and 1 is the maximum volume.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `heos.group_volume_set`. A basic example looks like this:

{% example %}
action: |
  action: heos.group_volume_set
  target:
    entity_id: media_player.kitchen
  data:
    volume_level: 0.4
{% endexample %}

This sets the group that `media_player.kitchen` belongs to, to 40% volume.

### Options in YAML

{% options_yaml %}
volume_level:
  description: The volume to set, where 0 is inaudible and 1 is the maximum volume.
  required: true
  type: float
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- The action keeps the relative volume of each member. If one player was set lower than the rest, it stays proportionally lower after the change.
- You can target any player in the group. The whole group's volume is adjusted, not just the one you target.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
