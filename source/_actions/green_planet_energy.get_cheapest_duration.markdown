---
title: "Get cheapest time window"
action: green_planet_energy.get_cheapest_duration
domain: green_planet_energy
description: "Find the cheapest time window for a given duration in the selected time range."
related_actions:
  - green_planet_energy.get_prices
---

Use this action to find the cheapest consecutive time window for a job that takes between 0.5 and 24 hours, such as running the dishwasher or charging a battery. It hands the result back in a response variable, so you can use it in later steps of the same automation or script.

{% include actions/ui_header.md %}

This action returns data instead of changing something in your home, so it needs somewhere to put its result. Pair it with a template sensor, like in the [Find the cheapest time for your dishwasher](/integrations/green_planet_energy/#find-the-cheapest-time-for-your-dishwasher) example.

To find the cheapest time window from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Green Planet Energy: Get cheapest time window**.
6. Set **Duration** to how many hours the job takes.
7. _Optional_: set **Time range** to limit the search to daytime or nighttime hours.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Duration:
  description: How many hours the job takes. Accepts 0.5 to 24, in steps of 0.25.
  required: true
Time range:
  description: "The part of the day to search in: **Full day (00:00-24:00)**, **Day (06:00-18:00)**, or **Night (18:00-06:00)**. Defaults to the full day."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `green_planet_energy.get_cheapest_duration`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: green_planet_energy.get_cheapest_duration
  data:
    duration: 3.5
    time_range: night
  response_variable: cheapest
{% endexample %}

### Options in YAML

{% options_yaml %}
duration:
  description: >
    How many hours the job takes. Accepts 0.5 to 24, in steps of 0.25.
  required: true
  type: float
time_range:
  description: >
    The part of the day to search in. Accepted values are `full_day`, `day`
    (06:00 to 18:00), and `night` (18:00 to 06:00).
  required: false
  type: string
  default: full_day
{% endoptions_yaml %}

## Response data

The response is a mapping describing the cheapest window that was found:

- `duration`: The requested duration in hours.
- `average_price`: The average electricity price in EUR/kWh across the window.
- `start_time`: The start of the window, in ISO 8601 format.
- `end_time`: The end of the window, in ISO 8601 format.
- `hours_until_start`: How many hours remain until the window starts.
- `time_range`: The time range that was searched.

Example response:

```yaml
duration: 6.25
average_price: 0.1985
start_time: "2026-06-20T11:00:00+02:00"
end_time: "2026-06-20T17:15:00+02:00"
hours_until_start: 13.3
time_range: day
```

## Good to know

- The window always starts on the hour, even though prices are published in 15-minute slots.
- If you leave **Time range** empty, the whole day is searched.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
