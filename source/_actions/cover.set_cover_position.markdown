---
title: "Set cover position"
action: cover.set_cover_position
domain: cover
description: "Moves a cover to a specific position."
related_actions:
  - cover.open_cover
  - cover.close_cover
  - cover.stop_cover
  - cover.toggle
---

Use this action to move a cover to a specific position, for example to open a blind halfway.

{% include actions/ui_header.md %}

To set a cover position from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the cover you want to move.
6. From the actions shown for that target, select **Set cover position**.
7. Set the **Position** you want to apply.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Position:
  description: The target position as a percentage, from 0 (closed) to 100 (open).
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `cover.set_cover_position`. A basic example looks like this:

{% example %}
action: |
  action: cover.set_cover_position
  target:
    entity_id: cover.living_room_blind
  data:
    position: 50
{% endexample %}

This moves `cover.living_room_blind` to the halfway position.

### Options in YAML

{% options_yaml %}
position:
  description: The target position as a percentage, from 0 (closed) to 100 (open).
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works with cover entities that support setting a position.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: set a blind to half open in the morning

Move a cover to a specific position at a set time.

- **Trigger**: Time: 07:15
- **Action**: Set cover position
  - **Target**: Living room blind
  - **Position**: 50

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Set the living room blind to half open in the morning"
    triggers:
      - trigger: time
        at: "07:15:00"
    actions:
      - action: cover.set_cover_position
        target:
          entity_id: cover.living_room_blind
        data:
          position: 50
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
