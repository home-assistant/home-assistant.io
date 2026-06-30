---
title: "Start irrigation"
action: rainbird.start_irrigation
domain: rainbird
description: "Starts a Rain Bird sprinkler zone for a set number of minutes."
---

Use this action to start a Rain Bird sprinkler zone for a set number of minutes. Unlike turning on the zone switch directly, this action lets you choose a custom run time, which is handy for building your own watering schedules in automations.

{% include actions/ui_header.md %}

To start a zone from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Rain Bird: Start irrigation**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), select the zone switch you want to run.
7. Enter the **Duration** in minutes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Duration:
  description: How long the zone runs, in minutes. Must be between 1 and 1440.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `rainbird.start_irrigation`. A basic example looks like this:

{% example %}
action: |
  action: rainbird.start_irrigation
  target:
    entity_id: switch.rain_bird_sprinkler_1
  data:
    duration: 5
{% endexample %}

This runs the selected zone for 5 minutes.

### Options in YAML

{% options_yaml %}
duration:
  description: >
    How long the zone runs, in minutes. Must be between 1 and 1440.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="switch" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
