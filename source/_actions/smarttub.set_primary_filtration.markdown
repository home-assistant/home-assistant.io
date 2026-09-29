---
title: "Set primary filtration"
action: smarttub.set_primary_filtration
domain: smarttub
description: "Updates the primary filtration cycle settings on a hot tub."
---

Use this action to update the primary filtration cycle settings on your hot tub. You can set how long the cycle runs and when it starts.

{% include actions/ui_header.md %}

To update the primary filtration settings from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **SmartTub: Update primary filtration settings**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), select your hot tub's primary filtration cycle sensor.
7. Optionally, set a **Duration** and a **Start hour**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Duration:
  description: How long the primary filtration cycle runs, in hours. Must be between 1 and 24. Defaults to 8.
  required: false
Start hour:
  description: The hour of the day at which the primary filtration cycle begins, from 0 (midnight) to 23. Defaults to 0.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `smarttub.set_primary_filtration`. A basic example looks like this:

{% example %}
action: |
  action: smarttub.set_primary_filtration
  target:
    entity_id: sensor.jacuzzi_j_335_primary_filtration_cycle
  data:
    duration: 4
    start_hour: 2
{% endexample %}

This sets the primary filtration cycle to run for four hours, starting at 02:00.

### Options in YAML

{% options_yaml %}
duration:
  description: >
    How long the primary filtration cycle runs, in hours. Must be between 1
    and 24.
  required: false
  type: integer
  default: 8
start_hour:
  description: >
    The hour of the day at which the primary filtration cycle begins, from 0
    (midnight) to 23.
  required: false
  type: integer
  default: 0
{% endoptions_yaml %}

{% include actions/targets.md domain="sensor" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Script: schedule filtration for off-peak hours

Run this script to set the primary filtration cycle to run overnight, when electricity is often cheaper.

{% details "YAML example for scheduling filtration overnight" %}

{% example %}
script: |
  sequence:
    - action: smarttub.set_primary_filtration
      target:
        entity_id: sensor.jacuzzi_j_335_primary_filtration_cycle
      data:
        duration: 6
        start_hour: 1
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
