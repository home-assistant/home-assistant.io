---
title: "Set radar type"
action: environment_canada.set_radar_type
domain: environment_canada
description: "Sets the type of radar imagery shown by an Environment Canada radar camera."
related_actions:
  - environment_canada.get_alerts
  - environment_canada.get_forecasts
---

Use this action to set the type of radar imagery that an Environment Canada radar camera retrieves. By default, the camera shows rain radar from 1 April to 30 November and snow radar from 1 December to 31 March. With this action, you can switch the layer yourself, for example to show snow radar during an early cold snap.

{% include actions/ui_header.md %}

To set the radar type from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the radar camera you want to change.
6. From the actions shown for that target, select **Set radar type**.
7. Select the **Radar type** you want the camera to show.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Radar type:
  description: The radar layer to show. One of Auto, Rain, Snow, or Precipitation type.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `environment_canada.set_radar_type`. A basic example looks like this:

{% example %}
action: |
  action: environment_canada.set_radar_type
  target:
    entity_id: camera.home_radar
  data:
    radar_type: Rain
{% endexample %}

This sets `camera.home_radar` to show the rain radar layer.

### Options in YAML

{% options_yaml %}
radar_type:
  description: >
    The radar layer to show. One of Auto, Rain, Snow, or Precipitation type.
    When set to Auto, the camera selects rain or snow based on the time of
    year.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="camera" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: switch to snow radar when it gets cold

When the outdoor temperature drops below freezing, switch the radar camera to show the snow layer.

- **Trigger**: Temperature drops below 0 °C
- **Action**: Environment Canada: Set radar type
- **Target**: Home radar
- **Radar type**: Snow

{% details "YAML example for switching to snow radar" %}

{% example %}
automation: |
  alias: "Snow radar when it freezes"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.home_temperature
      below: 0
  actions:
    - action: environment_canada.set_radar_type
      target:
        entity_id: camera.home_radar
      data:
        radar_type: Snow
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
