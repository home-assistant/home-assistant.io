---
title: "Purge Recorder entities"
action: recorder.purge_entities
domain: recorder
description: "Removes recorded data for specific entities, domains, or patterns."
related_actions:
  - recorder.purge
  - recorder.enable
  - recorder.disable
  - recorder.get_statistics
---

Use this action to remove recorded data for specific entities, whole domains, or entities that match a pattern. This is handy when a few noisy entities take up most of your database, for example sensors that report every few seconds, and you want to clear their history without touching everything else.

You must provide at least one of the entities, domains, or entity globs options.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To purge entities from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **Purge Recorder entities**.
6. Set the options you want to use.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Entities to remove:
  description: The entities for which data is removed from the database.
  required: false
Domains to remove:
  description: The domains for which all data is removed from the database, for example sun.
  required: false
Entity globs to remove:
  description: Glob patterns that select the entities for which data is removed, for example sensor.weather_*.
  required: false
Days to keep:
  description: The number of days of history to keep for the matching data, counting back from today. The default of 0 days removes all matching data right away.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `recorder.purge_entities`. A basic example looks like this:

{% example %}
action: |
  action: recorder.purge_entities
  data:
    entity_id: sensor.power_sensor_0
{% endexample %}

### Options in YAML

{% options_yaml %}
entity_id:
  description: The entities for which data is removed from the database.
  required: false
  type: list
domains:
  description: The domains for which all data is removed from the database, for example sun.
  required: false
  type: list
entity_globs:
  description: Glob patterns that select the entities for which data is removed, for example sensor.weather_*.
  required: false
  type: list
keep_days:
  description: The number of days of history to keep for the matching data, counting back from today. The default of 0 days removes all matching data right away.
  required: false
  type: integer
  default: 0
{% endoptions_yaml %}

## Good to know

- You must provide at least one of `entity_id`, `domains`, or `entity_globs`. You can combine them to select exactly what to remove.
- To clean up the whole database based on age instead of specific entities, use the [Purge Recorder database](/actions/recorder.purge/) action.

{% include actions/more_examples.md %}

### Automation: remove data for a noisy sensor every night

If a sensor reports very frequently and fills up your database, you can remove its older data on a schedule. This example removes history for `sensor.power_sensor_0` older than 5 days, every day at 04:15.

{% example %}
automation: |
  alias: "Purge noisy power sensor"
  triggers:
    - trigger: time
      at: "04:15:00"
  actions:
    - action: recorder.purge_entities
      data:
        keep_days: 5
        entity_id: sensor.power_sensor_0
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
