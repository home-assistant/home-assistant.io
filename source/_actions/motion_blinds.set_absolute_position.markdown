---
title: "Set absolute position"
action: motion_blinds.set_absolute_position
domain: motion_blinds
description: "Moves a Motionblinds cover to an exact position."
---

The **Set absolute position** action moves a Motionblinds cover to an exact position, and on tilt-capable blinds it can also set the tilt at the same time.

This is useful when you want an automation to move a blind to a precise position, in particular for Top Down Bottom Up (TDBU) blinds, where the position is set relative to the window itself.

{% include actions/targets.md domain="cover" %}

{% include actions/ui_header.md %}

To set the absolute position from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Motionblinds: Set absolute position**.
6. Choose the Motionblinds cover, then enter the **Absolute position** and any other options.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Absolute position:
  description: The position to move to, from 0 to 100.
  required: true
Tilt position:
  description: The tilt position to move to, from 0 to 100. Only applies to tilt-capable blinds.
  required: false
Width:
  description: The width that is covered, from 0 to 100. Only applies to TDBU Combined entities.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `motion_blinds.set_absolute_position`. A basic example looks like this:

{% example %}
action: |
  action: motion_blinds.set_absolute_position
  target:
    entity_id: cover.blind
  data:
    absolute_position: 70
{% endexample %}

This moves the selected cover to position `70`.

### Options in YAML

{% options_yaml %}
absolute_position:
  description: >
    The position to move to, from 0 to 100.
  required: true
  type: integer
tilt_position:
  description: >
    The tilt position to move to, from 0 to 100. Only applies to tilt-capable
    blinds.
  required: false
  type: integer
width:
  description: >
    The width that is covered, from 0 to 100. Only applies to TDBU Combined
    entities.
  required: false
  type: integer
{% endoptions_yaml %}

## Good to know

- For simple blinds, this action does the same as the [`cover.set_cover_position`](/actions/cover.set_cover_position/) action.
- For TDBU blinds, the absolute position is relative to the window, so `0` is the bottom of the window and `100` is the top. The [`cover.set_cover_position`](/actions/cover.set_cover_position/) action instead uses a scaled position relative to the space the blind is allowed to move in.
- On tilt-capable blinds, the blind first moves to the new position and then adjusts its tilt. Using the separate [`cover.set_cover_position`](/actions/cover.set_cover_position/) and [`cover.set_cover_tilt_position`](/actions/cover.set_cover_tilt_position/) actions one after the other makes the blind stop and tilt before it reaches the intended position.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
