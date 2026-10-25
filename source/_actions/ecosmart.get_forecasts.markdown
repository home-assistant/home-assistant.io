---
title: "Get price forecast"
action: ecosmart.get_forecasts
domain: ecosmart
description: "Retrieves the wholesale price forecast for a New Zealand connection point from ecosmart."
---

Use this action to retrieve the forecast wholesale price for the half hours ahead at one of your connection points. The forecast comes from the market's published price schedules, so how far ahead it reaches changes during the day, and it is a forecast, not a promise of the price you will pay.

This action returns its result in a response variable, which you can use in later steps of the same automation or script, for example to start a heat pump or charge a battery in the cheapest forecast half hour.

The action asks the ecosmart API each time it runs, and each run counts against the same per-minute request allowance as the spot price sensor. Run it when you need a fresh forecast, for example every 30 minutes when the short schedule is republished, rather than every minute.

{% include actions/ui_header.md %}

To get the price forecast from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **ecosmart: Get price forecast**.
6. Select the **Connection point** to forecast. Each connection point on your key is its own device, named after the ICP number on your bill.
7. In the **Response variable** field, enter a name to store the forecast in, such as `forecast`. You'll use this name to read the forecast in later steps.
8. Select **Save**.

This action does not support targets. You choose the connection point in its own field instead of by area, entity, or label.

### Options in the UI

{% options_ui %}
Connection point:
  description: The connection point (ICP) to get the price forecast for. Each ICP on your key is its own device, named after the ICP number on your bill. Prices are set per grid exit point, so connection points that share one get the same forecast.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ecosmart.get_forecasts`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: ecosmart.get_forecasts
  data:
    device_id: <id>
  response_variable: forecast
{% endexample %}

This fetches the price forecast for that connection point. The easiest way to get the device ID is to pick the connection point in the UI editor and then switch to YAML.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the connection point (ICP) device to get the price forecast
    for.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response contains `forecasts`: a list of forecast half hours, earliest first. It is empty when no forecast is published for your grid exit point. How far ahead it reaches changes during the day and is usually far less than a week.

Each forecast half hour includes the following fields:

- `start_time`: The start of the half hour, in UTC.
- `price`: The forecast wholesale price in cents per kWh including GST, the same unit as the spot price sensor. It can be negative.
- `price_excl_gst`: The same price excluding GST.

A shortened example of the response looks like this:

```yaml
forecasts:
  - start_time: "2026-08-24T15:00:00+00:00"
    price: 3.8238
    price_excl_gst: 3.325
  - start_time: "2026-08-24T15:30:00+00:00"
    price: 0.2289
    price_excl_gst: 0.199
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
