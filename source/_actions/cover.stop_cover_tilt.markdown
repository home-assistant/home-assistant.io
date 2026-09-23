---
title: "Stop cover tilt"
action: cover.stop_cover_tilt
domain: cover
description: "Stops the tilting of a cover."
related_actions:
  - cover.open_cover_tilt
  - cover.close_cover_tilt
  - cover.toggle_cover_tilt
  - cover.set_cover_tilt_position
---

Use this action to stop a cover while it is tilting, for example to leave the slats at a partial angle.

{% include actions/ui_header.md %}

To stop a cover tilt from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the cover you want to stop.
6. From the actions shown for that target, select **Stop cover tilt**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `cover.stop_cover_tilt`. A basic example looks like this:

{% example %}
action: |
  action: cover.stop_cover_tilt
  target:
    entity_id: cover.living_room_blind
{% endexample %}

This stops the tilting of `cover.living_room_blind`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with cover entities that support tilting.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: stop a cover tilt with a button

Stop a cover tilt each time you press a button, for example to halt the slats at any angle.

- **Trigger**: Button is pressed
- **Action**: Stop cover tilt
  - **Target**: Living room blind

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Stop the living room blind tilt with a button"
    triggers:
      - trigger: state
        entity_id: input_button.stop_blind_tilt
    actions:
      - action: cover.stop_cover_tilt
        target:
          entity_id: cover.living_room_blind
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
