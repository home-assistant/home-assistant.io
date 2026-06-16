---
title: "Start zone"
action: rainmachine.start_zone
domain: rainmachine
description: "Starts a RainMachine zone for a set time."
related_actions:
  - rainmachine.stop_zone
  - rainmachine.start_program
---

The **Start zone** action starts a single RainMachine zone for a set number of seconds. Each zone is represented by a switch entity, and this action turns that zone on for the run time you choose.

{% include actions/ui_header.md %}

To start a zone from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **RainMachine: Start zone**.
6. Under **Targets**, choose the zone switch entities to start.
7. Optionally set the **Run time**.
8. Select **Save**.

{% include actions/targets.md domain="switch" %}

### Options in the UI

{% options_ui %}
Run time:
  description: The amount of time, in seconds, to run the zone. Defaults to 600 seconds.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `rainmachine.start_zone`. A basic example looks like this:

{% example %}
action: |
  action: rainmachine.start_zone
  target:
    entity_id: switch.rainmachine_front_lawn
  data:
    zone_run_time: 900
{% endexample %}

### Options in YAML

{% options_yaml %}
zone_run_time:
  description: >
    The amount of time, in seconds, to run the zone. Defaults to 600
    seconds.
  required: false
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
