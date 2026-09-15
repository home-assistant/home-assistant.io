---
title: "Set zone moisture percent"
action: rachio.set_zone_moisture_percent
domain: rachio
description: "Sets the moisture percentage of one or more sprinkler zones."
related_actions:
  - rachio.start_watering
  - rachio.start_multiple_zone_schedule
---

Use this action to set the moisture percentage of a zone or a list of zones. Rachio only uses moisture levels for zones in a Flex Daily schedule, so this action is available only when at least one zone is part of a Flex Daily schedule.

{% include actions/ui_header.md %}

To set the zone moisture from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Rachio: Set zone moisture percent**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), select the zone or zones to update.
7. Enter the **Percent**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Percent:
  description: The desired zone moisture percentage. Must be between 0 and 100.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `rachio.set_zone_moisture_percent`. A basic example looks like this:

{% example %}
action: |
  action: rachio.set_zone_moisture_percent
  target:
    entity_id: switch.front_yard
  data:
    percent: 50
{% endexample %}

This sets the front yard zone moisture to 50%.

### Options in YAML

{% options_yaml %}
percent:
  description: >
    The desired zone moisture percentage. Must be between 0 and 100.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="switch" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
