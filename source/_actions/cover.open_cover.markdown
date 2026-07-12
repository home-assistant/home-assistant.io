---
title: "Open cover"
action: cover.open_cover
domain: cover
description: "Opens a cover."
related_actions:
  - cover.close_cover
  - cover.stop_cover
  - cover.toggle
  - cover.set_cover_position
---

Use this action to open a cover, such as a roller shutter, blind, awning, or garage door.

{% include actions/ui_header.md %}

To open a cover from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the cover you want to open.
6. From the actions shown for that target, select **Open cover**.
7. _Optional_: Set the **Speed** if your cover supports multiple speeds.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Speed:
  description: >
    The speed at which to open the cover. This option only appears if your
    cover supports speed selection, and the available speeds are listed in the
    `supported_speeds` attribute of the cover entity.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `cover.open_cover`. A basic example looks like this:

{% example %}
action: |
  action: cover.open_cover
  target:
    entity_id: cover.living_room_blind
{% endexample %}

This opens `cover.living_room_blind`.

If your cover supports multiple speeds, you can set the speed in the `data` section:

{% example %}
action: |
  action: cover.open_cover
  target:
    entity_id: cover.living_room_blind
  data:
    speed: "fast"
{% endexample %}

### Options in YAML

{% options_yaml %}
speed:
  description: >
    The speed at which to open the cover. Use one of the values listed in the
    `supported_speeds` attribute of the cover entity. Only use this if your
    cover supports it.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works with cover entities that support opening.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: open a blind in the morning

Open a cover at a set time, for example to let daylight in each morning.

- **Trigger**: Time: 07:15
- **Action**: Open cover
  - **Target**: Living room blind

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Open the living room blind in the morning"
    triggers:
      - trigger: time
        at: "07:15:00"
    actions:
      - action: cover.open_cover
        target:
          entity_id: cover.living_room_blind
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
