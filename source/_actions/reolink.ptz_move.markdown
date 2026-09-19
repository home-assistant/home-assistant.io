---
title: "PTZ move"
action: reolink.ptz_move
domain: reolink
description: "Moves a Reolink camera at a specific speed."
related_actions:
  - reolink.play_chime
---

Use this action to move a Reolink <abbr title="pan, tilt, and zoom">PTZ</abbr> camera at a speed you choose. Some Reolink PTZ cameras can move at different speeds. For those cameras, this action works together with the **PTZ left**, **right**, **up**, **down**, **zoom in**, and **zoom out** button entities.

{% include actions/ui_header.md %}

To move a camera from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Reolink PTZ button entity you want to move, for example **PTZ left**.
6. From the actions shown for that target, select **PTZ move**.
7. Enter the **Speed** you want to move at.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Speed:
  description: The speed to move at, from 1 to 64.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `reolink.ptz_move`. A basic example looks like this:

{% example %}
action: |
  action: reolink.ptz_move
  target:
    entity_id: button.trackmix_ptz_left
  data:
    speed: 10
{% endexample %}

This moves the camera left at speed `10` using the `button.trackmix_ptz_left` entity.

### Options in YAML

{% options_yaml %}
speed:
  description: The speed to move at, from 1 to 64.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="button" %}

## Good to know

- If the PTZ button entities for a camera do not appear when you choose a target, that camera does not support custom PTZ speeds.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
