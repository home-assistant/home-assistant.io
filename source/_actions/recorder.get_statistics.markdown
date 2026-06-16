---
title: "Get Recorder statistics"
action: recorder.get_statistics
domain: recorder
description: "Retrieves long-term statistics for one or more entities."
related_actions:
  - recorder.purge
  - recorder.purge_entities
  - recorder.enable
  - recorder.disable
---

Use this action to retrieve long-term statistics, such as the mean, minimum, maximum, or sum, for one or more entities over a time period. This is handy when an automation or script needs historical values, for example to compare this week's energy use with last week's.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

Only users with administrator rights can run this action.

{% note %}
Statistics are only available for entities that store {% term "Long-term statistics" %}.
{% endnote %}

{% include actions/ui_header.md %}

To get statistics from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **Recorder: Get Recorder statistics**.
6. Set the options you want to use.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Statistic IDs:
  description: The entities or statistics to return statistics for.
Start time:
  description: The start of the period to return statistics for.
End time:
  description: The end of the period to return statistics for. If omitted, all statistics from the start time onward are returned.
  required: false
Period:
  description: The time period to group the statistics by. One of: 5minute, hour, day, week, month, or year.
Types:
  description: The types of values to return. One or more of: change, last_reset, max, mean, min, state, or sum.
Units:
  description: An optional unit conversion mapping. Provide a target unit per device class to convert the statistics from the units stored in the database.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `recorder.get_statistics`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: recorder.get_statistics
  data:
    statistic_ids:
      - sensor.energy_meter
      - sensor.water_usage
    start_time: "2025-06-10 00:00:00"
    end_time: "2025-06-11 23:00:00"
    period: hour
    types:
      - sum
      - mean
    units:
      energy: kWh
      volume: L
  response_variable: consumption_stats
{% endexample %}

### Options in YAML

{% options_yaml %}
statistic_ids:
  description: The entities or statistics to return statistics for.
  required: true
  type: list
start_time:
  description: The start of the period to return statistics for, such as 2025-06-10 00:00:00.
  required: true
  type: string
end_time:
  description: The end of the period to return statistics for. If omitted, all statistics from the start time onward are returned.
  required: false
  type: string
period:
  description: "The time period to group the statistics by. One of: 5minute, hour, day, week, month, or year."
  required: true
  type: string
types:
  description: "The types of values to return. One or more of: change, last_reset, max, mean, min, state, or sum."
  required: true
  type: list
units:
  description: An optional unit conversion mapping. Provide a target unit per device class to convert the statistics from the units stored in the database.
  required: false
  type: map
{% endoptions_yaml %}

## Response data

The action returns the statistics keyed by each statistic ID you requested. Each one holds a list of periods. Every period always includes a start and end, plus the value types you asked for:

- `start`: The start of the period.
- `end`: The end of the period.
- `change`: The change in value during the period.
- `last_reset`: The time the value was last reset, for metered values.
- `max`: The highest value during the period.
- `mean`: The average value during the period.
- `min`: The lowest value during the period.
- `state`: The recorded state at the period.
- `sum`: The running total at the end of the period.

A shortened example of the response looks like this:

```yaml
statistics:
  sensor.energy_meter:
    - start: "2025-06-10T00:00:00+00:00"
      end: "2025-06-10T01:00:00+00:00"
      sum: 1234.5
      mean: 0.42
    - start: "2025-06-10T01:00:00+00:00"
      end: "2025-06-10T02:00:00+00:00"
      sum: 1236.1
      mean: 0.39
```

## Good to know

- Only entities that store {% term "Long-term statistics" %} return data. If an entity has no statistics, it is not included in the response.
- The value types you set in **Types** decide which fields each period contains, on top of the start and end that are always present.

{% include actions/stuck.md %}

{% include actions/related.md %}
