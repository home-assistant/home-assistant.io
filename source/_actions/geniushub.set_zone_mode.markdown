---
title: "Set zone mode"
action: geniushub.set_zone_mode
domain: geniushub
description: "Changes the mode of a Genius Hub zone."
related_actions:
  - geniushub.set_zone_override
  - geniushub.set_switch_override
---

Use this action to change a Genius Hub zone to one of its modes. This exposes modes that are not available through the standard climate controls, such as **Footprint** mode.

{% include actions/ui_header.md %}

To set a zone mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Genius Hub: Set zone mode**.
6. Select the **Entity** for the zone you want to change, and set the **Mode**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. The zone is selected through the **Entity** option instead.

### Options in the UI

{% options_ui %}
Entity:
  description: The climate entity of the zone you want to change.
  required: true
Mode:
  description: "The mode to set the zone to: `off`, `timer`, or `footprint`. Footprint mode is only available for radiator zones that have room sensors."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `geniushub.set_zone_mode`. A basic example looks like this:

{% example %}
action: |
  action: geniushub.set_zone_mode
  data:
    entity_id: climate.kitchen
    mode: footprint
{% endexample %}

This sets the `climate.kitchen` zone to footprint mode.

### Options in YAML

{% options_yaml %}
entity_id:
  description: The climate entity of the zone you want to change.
  required: true
  type: string
mode:
  description: "The mode to set the zone to: `off`, `timer`, or `footprint`. Footprint mode is only available for radiator zones that have room sensors."
  required: true
  type: string
{% endoptions_yaml %}

This action does not support targets.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
