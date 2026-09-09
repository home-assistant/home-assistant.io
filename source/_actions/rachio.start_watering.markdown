---
title: "Start watering"
action: rachio.start_watering
domain: rachio
description: "Starts a single zone, a schedule, or any number of smart hose timer valves."
related_actions:
  - rachio.start_multiple_zone_schedule
  - rachio.pause_watering
  - rachio.resume_watering
  - rachio.stop_watering
---

Use this action to start watering. You can run a single sprinkler zone, a schedule, or any number of smart hose timer valves. To run several zones in sequence with their own run times, use [Start multiple zones](/actions/rachio.start_multiple_zone_schedule/) instead.

{% include actions/ui_header.md %}

To start watering from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Rachio: Start watering**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), select the zone, schedule, or valves to run. You can also select a smart hose timer base station to run all its valves.
7. Enter the **Duration** in minutes. Leave it empty when you start a schedule.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Duration:
  description: How long to run, in minutes. For sprinkler zones the maximum is 3 hours; for smart hose timers it is 24 hours. Leave empty for schedules.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `rachio.start_watering`. A basic example looks like this:

{% example %}
action: |
  action: rachio.start_watering
  target:
    entity_id: switch.front_yard
  data:
    duration: 15
{% endexample %}

This runs the front yard zone for 15 minutes.

### Options in YAML

{% options_yaml %}
duration:
  description: >
    How long to run, in minutes. For sprinkler zones the maximum is 3 hours;
    for smart hose timers it is 24 hours. Leave empty for schedules.
  required: false
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="switch" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
