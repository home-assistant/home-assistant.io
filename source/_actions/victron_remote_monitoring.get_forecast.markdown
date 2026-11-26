---
title: "Get forecast"
action: victron_remote_monitoring.get_forecast
domain: victron_remote_monitoring
description: "Returns the cached hourly solar production and consumption forecast."
---

Use this action to read the hourly solar production and consumption forecast from your [Victron Remote Monitoring](/integrations/victron_remote_monitoring/) setup. The forecast sensors show a few totals and peak times. This action returns every stored hour, so you can plan around a specific part of the day.

This action returns its result in a response variable, which you can use in later steps of the same automation or script. It reads the forecast Home Assistant already stored and does not request a new forecast from <abbr title="Victron Remote Monitoring">VRM</abbr>.

{% include actions/ui_header.md %}

To get the forecast from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Victron Remote Monitoring: Get forecast**.
6. In **Victron Remote Monitoring entry**, select your installation.
7. Optional: Set **Start** and **End** to limit the forecast to a time window.
8. In the **Response variable** field, enter a name to store the forecast in, such as `victron_forecast`. You'll use this name to read the forecast in later steps.
9. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Victron Remote Monitoring entry:
  description: The Victron Remote Monitoring installation to get the forecast for.
  required: true
Start:
  description: The earliest hour to include. This hour is included. A time without a time zone uses your Home Assistant time zone. If you leave it empty, the response starts at the beginning of the stored forecast.
  required: false
End:
  description: The first hour to leave out. Hours that start at this time or later are left out. A time without a time zone uses your Home Assistant time zone. If you leave it empty, the response includes the rest of the stored forecast. If you also set **Start**, **End** must be later than **Start**.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `victron_remote_monitoring.get_forecast`. Because this action returns a response, use `response_variable` to capture the result. A basic example looks like this:

{% example %}
action: |
  action: victron_remote_monitoring.get_forecast
  data:
    config_entry: YOUR_CONFIG_ENTRY_ID
    start: "2026-04-23 06:00:00"
    end: "2026-04-23 20:00:00"
  response_variable: victron_forecast
{% endexample %}

This returns the stored hours from 06:00 up to, but not including, 20:00 on that day.

### Options in YAML

{% options_yaml %}
config_entry:
  description: The ID of the Victron Remote Monitoring configuration entry to get the forecast for.
  required: true
  type: string
start:
  description: The earliest hour to include. This hour is included. A time without a time zone uses your Home Assistant time zone.
  required: false
  type: datetime
end:
  description: The first hour to leave out. Hours that start at this time or later are left out. A time without a time zone uses your Home Assistant time zone. If you also set `start`, `end` must be later than `start`.
  required: false
  type: datetime
{% endoptions_yaml %}

## Response data

The response contains `forecast`, a list of hourly entries in chronological order. Each entry has a `datetime` timestamp in your Home Assistant time zone, with its UTC offset. Each entry also has `solar` and `consumption` values in watt-hours. If a value is unavailable for an hour, its field is set to `null`. If no forecast hours match the requested time window, `forecast` is an empty list.

A shortened example of the response looks like this:

```yaml
forecast:
  - datetime: "2026-04-23T06:00:00+02:00"
    solar: 120.5
    consumption: 480.0
  - datetime: "2026-04-23T07:00:00+02:00"
    solar: 640.2
    consumption: 455.0
```

## Good to know

- The action returns the forecast Home Assistant already stored. It does not ask <abbr title="Victron Remote Monitoring">VRM</abbr> for a new one. The integration refreshes that forecast every 60 minutes. See [Data updates](/integrations/victron_remote_monitoring/#data-updates).
- The stored forecast runs from the start of yesterday until the start of the day six days from today. Hours outside that range are not included.
- **Start** is included. **End** is not. An hour that starts exactly at **End** is left out.
- If you set both **Start** and **End**, **End** must be later than **Start**. The same time, or an earlier **End**, stops the action with the error "The end time must be after the start time."
- A time without a time zone uses your Home Assistant time zone. When daylight saving time repeats a local hour, both hours are returned and the UTC offset on `datetime` tells them apart. A skipped hour does not appear. If you set **Start** or **End** during a repeated hour, include the UTC offset so the time is unambiguous.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: send today's sunniest hour

Each morning, get today's forecast and send the hour with the most expected solar production to your phone.

- **Trigger**: Time
  - **At time**: 07:00
- **Action**: Victron Remote Monitoring: Get forecast
  - **Victron Remote Monitoring entry**: Your installation
  - **Start**: Today at 00:00
  - **End**: Tomorrow at 00:00
  - **Response variable**: `victron_forecast`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for sending today's sunniest hour" %}

{% example %}
automation: |
  alias: "Send today's sunniest hour"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: victron_remote_monitoring.get_forecast
      data:
        config_entry: YOUR_CONFIG_ENTRY_ID
        start: "{{ today_at() }}"
        end: "{{ today_at() + timedelta(days=1) }}"
      response_variable: victron_forecast
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          {% set best = victron_forecast.forecast
             | rejectattr('solar', 'none')
             | sort(attribute='solar')
             | last %}
          Today's sunniest hour starts at
          {{ as_datetime(best.datetime).strftime('%H:%M') }},
          with about {{ (best.solar / 1000) | round(1) }} kWh.
{% endexample %}

{% enddetails %}

### Automation: start the dishwasher when solar covers the load

At 11:00, compare the solar production and consumption expected over the next four hours. If production is at least 1.5 kWh above consumption, turn on the dishwasher, which is plugged into a smart plug.

- **Trigger**: Time
  - **At time**: 11:00
- **Action**: Victron Remote Monitoring: Get forecast
  - **Victron Remote Monitoring entry**: Your installation
  - **Start**: Now
  - **End**: Four hours from now
  - **Response variable**: `victron_forecast`
- **Condition**: Template
  - Expected solar production is at least 1.5 kWh above expected consumption
- **Action**: Turn on switch
  - **Target**: Dishwasher plug (`switch.dishwasher_plug`)

{% details "YAML example for starting the dishwasher on surplus solar" %}

{% example %}
automation: |
  alias: "Start the dishwasher when solar covers the load"
  triggers:
    - trigger: time
      at: "11:00:00"
  actions:
    - action: victron_remote_monitoring.get_forecast
      data:
        config_entry: YOUR_CONFIG_ENTRY_ID
        start: "{{ now() }}"
        end: "{{ now() + timedelta(hours=4) }}"
      response_variable: victron_forecast
    - condition: template
      value_template: >
        {% set hours = victron_forecast.forecast %}
        {% set solar = hours | map(attribute='solar')
           | map('float', 0) | sum %}
        {% set used = hours | map(attribute='consumption')
           | map('float', 0) | sum %}
        {{ solar - used >= 1500 }}
    - action: switch.turn_on
      target:
        entity_id: switch.dishwasher_plug
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
