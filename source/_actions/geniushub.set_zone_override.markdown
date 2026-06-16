---
title: "Genius Hub: Set zone override"
action: geniushub.set_zone_override
domain: geniushub
description: "Overrides the setpoint of a Genius Hub zone for a set duration."
related_actions:
  - geniushub.set_zone_mode
  - geniushub.set_switch_override
---

Use this action to override the setpoint of a Genius Hub zone for a set duration, up to 24 hours. After the duration passes, the zone returns to its scheduled behavior.

{% include actions/ui_header.md %}

To override a zone setpoint from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Genius Hub: Set zone override**.
6. Select the **Entity** for the zone, set the **Temperature**, and optionally set a **Duration**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. The zone is selected through the **Entity** option instead.

### Options in the UI

{% options_ui %}
Entity:
  description: The climate entity of the zone you want to override.
  required: true
Temperature:
  description: The setpoint temperature to override the zone to.
  required: true
Duration:
  description: How long the override stays active, between 5 minutes and 24 hours. If you leave this empty, the override lasts 1 hour.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `geniushub.set_zone_override`. A basic example looks like this:

{% example %}
action: |
  action: geniushub.set_zone_override
  data:
    entity_id: climate.kitchen
    temperature: 20
    duration:
      minutes: 135
{% endexample %}

This overrides the `climate.kitchen` zone to 20° for 2 hours and 15 minutes.

### Options in YAML

{% options_yaml %}
entity_id:
  description: The climate entity of the zone you want to override.
  required: true
  type: string
temperature:
  description: The setpoint temperature to override the zone to, between 4 and 28.
  required: true
  type: float
duration:
  description: How long the override stays active, given as a time mapping such as `minutes: 135`. The value must be between 5 minutes and 24 hours. If you omit it, the override lasts 1 hour.
  required: false
  type: map
{% endoptions_yaml %}

This action does not support targets.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
