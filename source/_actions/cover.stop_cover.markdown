---
title: "Stop cover"
action: cover.stop_cover
domain: cover
description: "Stops the movement of a cover."
related_actions:
  - cover.open_cover
  - cover.close_cover
  - cover.toggle
  - cover.set_cover_position
---

Use this action to stop a cover while it is moving, for example to leave a blind partly open.

{% include actions/ui_header.md %}

To stop a cover from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the cover you want to stop.
6. From the actions shown for that target, select **Stop cover**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `cover.stop_cover`. A basic example looks like this:

{% example %}
action: |
  action: cover.stop_cover
  target:
    entity_id: cover.living_room_blind
{% endexample %}

This stops `cover.living_room_blind`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with cover entities that support stopping.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: stop a cover with a button

Stop a cover each time you press a button, for example to halt it at any point.

- **Trigger**: Button is pressed
- **Action**: Stop cover
  - **Target**: Living room blind

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Stop the living room blind with a button"
    triggers:
      - trigger: state
        entity_id: input_button.stop_blind
    actions:
      - action: cover.stop_cover
        target:
          entity_id: cover.living_room_blind
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
