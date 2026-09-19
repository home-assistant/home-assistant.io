---
title: "Toggle cover"
action: cover.toggle
domain: cover
description: "Toggles a cover open or closed."
related_actions:
  - cover.open_cover
  - cover.close_cover
  - cover.stop_cover
  - cover.set_cover_position
---

Use this action to toggle a cover, opening it if it is closed and closing it if it is open.

{% include actions/ui_header.md %}

To toggle a cover from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the cover you want to toggle.
6. From the actions shown for that target, select **Toggle cover**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `cover.toggle`. A basic example looks like this:

{% example %}
action: |
  action: cover.toggle
  target:
    entity_id: cover.living_room_blind
{% endexample %}

This toggles `cover.living_room_blind` between open and closed.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with cover entities that support both opening and closing.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: toggle a cover with a button

Toggle a cover each time you press a button.

- **Trigger**: Button is pressed
- **Action**: Toggle cover
  - **Target**: Living room blind

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Toggle the living room blind with a button"
    triggers:
      - trigger: state
        entity_id: input_button.toggle_blind
    actions:
      - action: cover.toggle
        target:
          entity_id: cover.living_room_blind
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
