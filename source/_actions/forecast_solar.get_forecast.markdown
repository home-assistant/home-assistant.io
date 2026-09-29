---
title: "Get forecast"
action: forecast_solar.get_forecast
domain: forecast_solar
description: "Returns the solar production forecast from Forecast.Solar."
---

Use this action to get the full solar production forecast from [Forecast.Solar](/integrations/forecast_solar/), for example to plan when to run your dishwasher or charge your car on sunshine. Where the forecast sensors give you a few key numbers, this action gives you the whole forecast, period by period.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get the forecast from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Forecast.Solar: Get forecast**.
6. In **Forecast.Solar entry**, select your Forecast.Solar setup.
7. Optional: Set a **Start** and **End** to limit the forecast to a period, and choose a **Resolution**.
8. In the **Response variable** field, enter a name to store the forecast in, such as `solar_forecast`. You'll use this name to read the forecast in later steps.
9. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Forecast.Solar entry:
  description: The Forecast.Solar setup to get the forecast for.
  required: true
Start:
  description: The earliest time to include in the forecast. If you leave it empty, the forecast starts at the beginning of the available data.
  required: false
End:
  description: The time the forecast should stop at. Periods starting at or after this time are left out. If you leave it empty, the forecast runs until the end of the available data.
  required: false
Resolution:
  description: "How detailed the forecast is. **Native (15-minute or hourly, depending on account)** uses the periods Forecast.Solar provides: 15 minutes with a paid account, one hour with a free account. **Aggregated to whole hours** combines them into hourly periods."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `forecast_solar.get_forecast`. Because this action returns a response, use `response_variable` to capture the result. A basic example looks like this:

{% example %}
action: |
  action: forecast_solar.get_forecast
  data:
    config_entry: 1b4a46c6d0f3406c80d275f5b0c6483b
    start: "2026-09-30 06:00:00"
    end: "2026-09-30 20:00:00"
    resolution: hourly
  response_variable: solar_forecast
{% endexample %}

This returns the hourly forecast for September 30, between 6:00 and 20:00.

### Options in YAML

{% options_yaml %}
config_entry:
  description: The ID of the Forecast.Solar configuration entry to get the forecast for.
  required: true
  type: string
start:
  description: The earliest time to include. Times without a time zone use the time zone of your Forecast.Solar location.
  required: false
  type: datetime
end:
  description: The time the forecast should stop at. Periods starting at or after this time are left out. Times without a time zone use the time zone of your Forecast.Solar location.
  required: false
  type: datetime
resolution:
  description: Use `raw` for the periods Forecast.Solar provides, or `hourly` to combine them into whole hours.
  required: false
  type: string
  default: raw
{% endoptions_yaml %}

## Response data

The response contains two lists of values, each keyed by the start time of a period:

- `watts`: The estimated power at that time, in watts. With `hourly`, this is the average for the hour.
- `wh_period`: The estimated energy produced during the period that starts at that time, in watt-hours. With `hourly`, this is the total for the hour.

The times include the time zone of your Forecast.Solar location. A shortened example of the response looks like this:

```yaml
watts:
  "2026-09-30T08:00:00+02:00": 412
  "2026-09-30T09:00:00+02:00": 1350
  "2026-09-30T10:00:00+02:00": 2280
wh_period:
  "2026-09-30T08:00:00+02:00": 395
  "2026-09-30T09:00:00+02:00": 1312
  "2026-09-30T10:00:00+02:00": 2241
```

## Good to know

- The action returns the forecast Home Assistant already has. It doesn't ask Forecast.Solar for a new one. How often the forecast updates depends on your account, see [Data updates](/integrations/forecast_solar/#data-updates).
- If you set an **End** that is before the **Start**, the action fails with an error.
- If you added more than one plane, the forecast combines all of them, just like the forecast sensors do.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
