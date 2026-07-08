---
title: "Get cheapest duration"
action: green_planet_energy.get_cheapest_duration
domain: green_planet_energy
description: "Find the cheapest time window for a given duration in the selected time range."
---

The **Get cheapest duration** action calculates the cheapest consecutive time window for a duration between 0.5 and 24 hours.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create**.
3. In **Then do**, select **Add action**.
4. Search for and select **Green Planet Energy: Get cheapest duration**.
5. Enter the Green Planet Energy price sensor in **Entity ID**.
6. Set the duration in hours.
7. Optional: Set **Time range** to limit the search window.
8. Select **Save**.

## Options in the UI

{% options_ui %}
Entity ID:
  description: Green Planet Energy sensor entity used to identify the integration instance.
Duration:
  description: Duration, in hours, for which to find the cheapest time window. Allowed range is 0.5 to 24.
Time range:
  description: Optional time range to search within. Choose from `full_day`, `day`, or `night`.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `green_planet_energy.get_cheapest_duration`:

{% example %}
action: |
  action: green_planet_energy.get_cheapest_duration
  data:
    entity_id: sensor.green_planet_energy_current_price
    duration: 3.5
    time_range: night
{% endexample %}

## Options in YAML

{% options_yaml %}
entity_id:
  description: >
    Green Planet Energy sensor entity used to identify the integration instance.
  required: true
  type: string
duration:
  description: >
    Duration, in hours, for which to find the cheapest time window. Accepts values from 0.5 to 24.
  required: true
  type: float
time_range:
  description: >
    Optional time range to search within. Accepted values are `full_day`, `day`, or `night`. Default is `full_day`.
  required: false
  type: string
{% endoptions_yaml %}

## Response data

The action response includes:

- `duration`: Requested duration in hours
- `average_price`: Average electricity price in EUR/kWh for the selected window
- `start_time`: Start timestamp of the cheapest window
- `end_time`: End timestamp of the cheapest window
- `hours_until_start`: Hours remaining until the selected start time
- `time_range`: The applied time range

Example response:

```json
{
  "duration": 6.25
  "average_price": 0.1985
  "start_time": "2026-06-20T11:00:00+02:00"
  "end_time": "2026-06-20T17:15:00+02:00"
  "hours_until_start": 13.3
  "time_range": "day"
}
```

## Good to know

- If you do not provide `time_range`, Home Assistant uses `full_day`.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
