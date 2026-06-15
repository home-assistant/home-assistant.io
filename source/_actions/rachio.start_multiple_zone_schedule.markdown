---
title: "Start multiple zones"
action: rachio.start_multiple_zone_schedule
domain: rachio
description: "Creates a custom schedule from a list of zones and run times."
related_actions:
  - rachio.start_watering
  - rachio.set_zone_moisture_percent
  - rachio.stop_watering
---

Use this action to build a custom schedule on the fly. You pass a list of zones and the run times to use, and Rachio runs them in the order listed. Keep all zones on the same controller to avoid issues.

{% include actions/ui_header.md %}

To start multiple zones from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Rachio: Start multiple zones**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), select the zones to run, in the order you want them to run.
7. Enter the **Duration** in minutes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Duration:
  description: The number of minutes to run. Provide a single value to use for every zone, or a comma-separated list to give each zone its own run time, in the same order as the zones.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `rachio.start_multiple_zone_schedule`. Give each zone its own run time by passing a comma-separated list of minutes in the same order as the zones:

{% example %}
action: |
  action: rachio.start_multiple_zone_schedule
  target:
    entity_id:
      - switch.front_yard_west
      - switch.front_yard_east
      - switch.side_yard_west
  data:
    duration: 20, 15, 10
{% endexample %}

This runs the front yard west zone for 20 minutes, the front yard east zone for 15 minutes, and the side yard west zone for 10 minutes.

To use the same run time for every zone, pass a single value:

{% example %}
action: |
  action: rachio.start_multiple_zone_schedule
  target:
    entity_id:
      - switch.front_yard_west
      - switch.front_yard_east
      - switch.side_yard_west
  data:
    duration: 20
{% endexample %}

### Options in YAML

{% options_yaml %}
duration:
  description: >
    The number of minutes to run. Provide a single value to use for every zone,
    or a comma-separated list to give each zone its own run time, in the same
    order as the zones.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="switch" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
