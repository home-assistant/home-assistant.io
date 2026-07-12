---
title: "Close cover"
action: cover.close_cover
domain: cover
description: "Closes a cover."
related_actions:
  - cover.open_cover
  - cover.stop_cover
  - cover.toggle
  - cover.set_cover_position
---

Use this action to close a cover, such as a roller shutter, blind, awning, or garage door.

{% include actions/ui_header.md %}

To close a cover from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the cover you want to close.
6. From the actions shown for that target, select **Close cover**.
7. _Optional_: Set the **Speed** if your cover supports multiple speeds.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Speed:
  description: >
    The speed at which to close the cover. This option only appears if your
    cover supports it, and the available speeds are listed in the
    `supported_speeds` attribute of the cover entity.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `cover.close_cover`. A basic example looks like this:

{% example %}
action: |
  action: cover.close_cover
  target:
    entity_id: cover.living_room_blind
{% endexample %}

This closes `cover.living_room_blind`.

If your cover supports multiple speeds, you can set the speed in the `data` section:

{% example %}
action: |
  action: cover.close_cover
  target:
    entity_id: cover.living_room_blind
  data:
    speed: "fast"
{% endexample %}

### Options in YAML

{% options_yaml %}
speed:
  description: >
    The speed at which to close the cover. Use one of the values listed in the
    `supported_speeds` attribute of the cover entity. Only use this if your
    cover supports it.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works with cover entities that support closing.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: close a shutter at sunset

Close a cover at sunset, for example to keep heat in for the night.

- **Trigger**: Sun: Sunset
- **Action**: Close cover
  - **Target**: Bedroom shutter

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Close the bedroom shutter at sunset"
    triggers:
      - trigger: sun
        event: sunset
    actions:
      - action: cover.close_cover
        target:
          entity_id: cover.bedroom_shutter
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
