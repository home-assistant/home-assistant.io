---
title: "Set cover tilt position"
action: cover.set_cover_tilt_position
domain: cover
description: "Tilts a cover to a specific position."
related_actions:
  - cover.open_cover_tilt
  - cover.close_cover_tilt
  - cover.stop_cover_tilt
  - cover.toggle_cover_tilt
---

Use this action to tilt a cover to a specific position, for example to angle the slats of a venetian blind halfway.

{% include actions/ui_header.md %}

To set a cover tilt position from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the cover you want to tilt.
6. From the actions shown for that target, select **Set cover tilt position**.
7. Set the **Tilt position** you want to apply.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Tilt position:
  description: The target tilt position as a percentage, from 0 (closed) to 100 (open).
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `cover.set_cover_tilt_position`. A basic example looks like this:

{% example %}
action: |
  action: cover.set_cover_tilt_position
  target:
    entity_id: cover.living_room_blind
  data:
    tilt_position: 50
{% endexample %}

This tilts `cover.living_room_blind` to the halfway position.

### Options in YAML

{% options_yaml %}
tilt_position:
  description: The target tilt position as a percentage, from 0 (closed) to 100 (open).
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works with cover entities that support setting a tilt position.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: tilt a blind halfway in the morning

Tilt a cover to a specific position at a set time.

- **Trigger**: Time: 07:15
- **Action**: Set cover tilt position
  - **Target**: Living room blind
  - **Tilt position**: 50

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Set the living room blind tilt to halfway in the morning"
    triggers:
      - trigger: time
        at: "07:15:00"
    actions:
      - action: cover.set_cover_tilt_position
        target:
          entity_id: cover.living_room_blind
        data:
          tilt_position: 50
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
