---
title: "Start irrigation"
action: yardian.start_irrigation
domain: yardian
description: "Starts the irrigation for a zone for a set number of minutes."
---

Use this action to start watering a Yardian zone for a set number of minutes. The target is a Yardian zone switch, and the duration controls how long that zone stays on.

{% include actions/ui_header.md %}

To start irrigation from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Yardian zone switch you want to water.
6. From the actions shown for that target, select **Start irrigation**.
7. Enter the **Duration** in minutes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Duration:
  description: The number of minutes for the zone to stay on.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `yardian.start_irrigation`. A basic example looks like this:

{% example %}
action: |
  action: yardian.start_irrigation
  target:
    entity_id: switch.front_lawn
  data:
    duration: 10
{% endexample %}

This waters the `switch.front_lawn` zone for 10 minutes.

### Options in YAML

{% options_yaml %}
duration:
  description: The number of minutes for the zone to stay on, between 1 and 1440.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="switch" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: Water the lawn early in the morning

This automation waters your front lawn for 10 minutes every morning before sunrise, when evaporation is low.

- **Trigger**: the time is 5:30 AM
- **Action**: start irrigation
  - **Target**: the front lawn zone switch
  - **Duration**: `10`

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Morning lawn watering"
  triggers:
    - trigger: time
      at: "05:30:00"
  actions:
    - action: yardian.start_irrigation
      target:
        entity_id: switch.front_lawn
      data:
        duration: 10
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
