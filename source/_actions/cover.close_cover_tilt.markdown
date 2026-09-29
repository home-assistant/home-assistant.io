---
title: "Close cover tilt"
action: cover.close_cover_tilt
domain: cover
description: "Tilts a cover closed."
related_actions:
  - cover.open_cover_tilt
  - cover.stop_cover_tilt
  - cover.toggle_cover_tilt
  - cover.set_cover_tilt_position
---

Use this action to tilt a cover closed, for example to angle the slats of a venetian blind to block light.

{% include actions/ui_header.md %}

To close a cover tilt from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the cover you want to tilt closed.
6. From the actions shown for that target, select **Close cover tilt**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `cover.close_cover_tilt`. A basic example looks like this:

{% example %}
action: |
  action: cover.close_cover_tilt
  target:
    entity_id: cover.living_room_blind
{% endexample %}

This tilts `cover.living_room_blind` closed.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with cover entities that support tilting.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: tilt a blind closed at sunset

Tilt a cover closed at sunset, for example to block the low evening sun.

- **Trigger**: Sunset
- **Action**: Close cover tilt
  - **Target**: Living room blind

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Tilt the living room blind closed at sunset"
    triggers:
      - trigger: sun.sunset
    actions:
      - action: cover.close_cover_tilt
        target:
          entity_id: cover.living_room_blind
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
