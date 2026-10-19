---
title: "Get price forecasts"
action: amberelectric.get_forecasts
domain: amberelectric
description: "Retrieves price forecasts from Amber Electric for a site and channel."
---

Use this action to retrieve the price forecasts from Amber Electric for one of your channels, such as general usage, controlled load, or feed-in.

This action returns its result in a response variable, which you can use in later steps of the same automation or script, for example to start an appliance during the cheapest forecast hour.

{% include actions/ui_header.md %}

To get price forecasts from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Amber Electric: Get price forecasts**.
6. Select the **Config entry** for the site and the **Channel type** to fetch.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config entry:
  description: The Amber Electric site to get forecasts for.
  required: true
Channel type:
  description: The channel to get forecasts for. One of general, controlled load, or feed-in.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `amberelectric.get_forecasts`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: amberelectric.get_forecasts
  data:
    config_entry_id: 6b4be47a1fa7c3764f14cf756dc9899d
    channel_type: general
  response_variable: forecasts
{% endexample %}

This fetches the price forecasts for the general channel.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The Amber Electric site to get forecasts for.
  required: true
  type: string
channel_type:
  description: >
    The channel to get forecasts for. One of general, controlled_load,
    or feed_in.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response contains a `forecasts` list. Each forecast interval includes the following fields:

- `duration`: The length of the interval in minutes.
- `date`: The date of the interval.
- `nem_date`: The interval end time in National Electricity Market (NEM) time.
- `per_kwh`: The forecasted price in dollars per kWh.
- `spot_per_kwh`: The wholesale spot price in dollars per kWh.
- `start_time`: The start time of the interval.
- `end_time`: The end time of the interval.
- `renewables`: The percentage of renewable energy in the grid for the interval.
- `spike_status`: Whether a price spike is forecast for the interval.
- `descriptor`: A description of the price, such as `low`, `neutral`, or `high`.

A shortened example of the response looks like this:

```yaml
forecasts:
  - duration: 30
    date: "2024-01-01"
    nem_date: "2024-01-01T12:30:00+10:00"
    per_kwh: 0.08
    spot_per_kwh: 0.04
    start_time: "2024-01-01T12:00:00+10:00"
    end_time: "2024-01-01T12:30:00+10:00"
    renewables: 45
    spike_status: "none"
    descriptor: "low"
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
