---
title: "Get minute forecast"
action: tomorrowio.get_minute_forecast
domain: tomorrowio
response: required
description: "Retrieves the minute-level forecast (nowcast) for a location, in intervals of the length configured for that location. The data comes from the latest scheduled update, so this action does not use any API requests. Precipitation is the amount expected in each interval, in the weather entity's precipitation unit."
related_actions:
  - weather.get_forecasts
---

Use this action to get a short-term forecast, also called a nowcast, for one of your Tomorrow.io weather {% term entities %}. It splits the near future into short intervals, so you can tell whether rain is about to start and when it is expected to stop.

This is more detailed than the hourly forecast from the `weather.get_forecasts` action. Use it when the timing matters, for example to send yourself a heads-up a few minutes before rain reaches your house.

The length of each interval is the **Minutes between NowCast forecasts** setting of the location: 1, 5, 15, 30, or 60 minutes. The action returns up to 30 intervals, so a 1-minute setting covers the next half hour and a 60-minute setting covers the next 30 hours. To change the setting, [reconfigure the location](/integrations/tomorrowio/#changing-a-location).

The action returns the data from the integration's latest scheduled update, so it does not use any of your Tomorrow.io API requests and you can call it as often as you like. The data is only as fresh as that update, and intervals that have already ended are left out.

{% include actions/ui_header.md %}

To get a minute forecast from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the Tomorrow.io weather entity you want the forecast for. You can also select an area, a device, or a label.
6. From the actions shown for that target, select **Tomorrow.io: Get minute forecast**.
7. In the **Response variable** field, enter a name to store the data in, such as `nowcast`.
8. Select **Save**.

### Options in the UI

This action has no options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tomorrowio.get_minute_forecast`. Because it returns data, store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: tomorrowio.get_minute_forecast
  target:
    entity_id: weather.home_daily
  response_variable: nowcast
{% endexample %}

This stores the nowcast for `weather.home_daily` in `nowcast`.

### Options in YAML

This action has no options beyond the target.

{% include actions/targets.md domain="weather" %}

## Response data

{% include actions/response.md %}

The response has the same shape as the response of `weather.get_forecasts`. It is keyed by the entity ID of each targeted weather entity, and for every entity it contains a `forecast` list with one entry per interval, in chronological order. Each entry can have these fields:

- `datetime`: when the interval starts.
- `condition`: the expected weather condition, such as `sunny` or `rainy`.
- `precipitation`: the expected amount of precipitation during the interval.
- `precipitation_probability`: how likely precipitation is, from 0 to 100.
- `temperature`: the expected temperature.
- `dew_point`: the expected dew point.
- `humidity`: the expected relative humidity, in percent.
- `wind_bearing`: the expected wind direction, in degrees.
- `wind_speed`: the expected wind speed.

Values use the units of the weather entity, the same as `weather.get_forecasts`. The `precipitation` value is not rounded, because the amounts in short intervals can be very small. A field is left out when Tomorrow.io doesn't provide a value for it, and the list is empty when no nowcast data is available yet.

A shortened example response looks like this:

```yaml
weather.home_daily:
  forecast:
    - datetime: "2026-11-12T17:55:00+00:00"
      condition: rainy
      precipitation: 0.1
      precipitation_probability: 75
      temperature: 8.2
      wind_bearing: 315
      wind_speed: 14.4
    - datetime: "2026-11-12T18:00:00+00:00"
      condition: cloudy
      precipitation: 0
      precipitation_probability: 10
      temperature: 8.1
      wind_bearing: 312
      wind_speed: 13.7
```

## Good to know

- Each entry covers one interval of the configured length, starting at its `datetime`.
- Precipitation amounts are per interval, not per hour. To get the total for a period, add up the amounts of its intervals.
- Changing the interval length reloads the integration, which fetches new data.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: get a heads-up before rain starts

Check the nowcast every 5 minutes, and send a notification when rain is expected to start within the next half hour. It stays quiet while it is already raining, so you only hear about it before it starts. Because the action doesn't use any API requests, checking this often costs nothing.

- **Trigger**: Time pattern, every 5 minutes
- **Action**: Tomorrow.io: Get minute forecast
  - **Target**: Home Daily (`weather.home_daily`)
  - **Response variable**: `nowcast`
- **Condition**: Template, no rain is falling now and rain is expected within 30 minutes
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a heads-up before rain starts" %}

{% example %}
automation: |
  alias: "Warn me before rain starts"
  triggers:
    - trigger: time_pattern
      minutes: /5
  actions:
    - action: tomorrowio.get_minute_forecast
      target:
        entity_id: weather.home_daily
      response_variable: nowcast
    - variables:
        intervals: "{{ nowcast['weather.home_daily']['forecast'] }}"
        next_rain: >
          {{ intervals | selectattr('precipitation', 'defined')
             | selectattr('precipitation', '>', 0) | first | default(none) }}
    - condition: template
      value_template: >
        {{ next_rain is not none
           and 0 < as_timestamp(next_rain['datetime'])
                   - now().timestamp() < 1800 }}
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          Rain expected in about
          {{ ((as_timestamp(next_rain['datetime'])
               - now().timestamp()) / 60) | round | int }} minutes.
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
