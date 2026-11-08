---
title: "Get electricity prices"
action: zonneplan.get_electricity_prices
domain: zonneplan
description: "Returns the electricity prices of a Zonneplan account, per hour or per quarter hour."
---

The **Zonneplan: Get electricity prices** action returns all electricity prices that the integration has retrieved from Zonneplan, per hour or per quarter hour. The prices are the all-in prices in EUR/kWh, the same prices the price sensors show.

The list starts in the afternoon of the previous day and runs to the end of today. After Zonneplan publishes tomorrow's prices (typically around 13:00 CET/CEST), it runs to the end of tomorrow. The action uses the prices from the last update, so it does not contact Zonneplan.

{% include actions/ui_header.md %}

To get the electricity prices from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Zonneplan: Get electricity prices**.
6. Select the **Config entry** of your Zonneplan account, and an **Interval**.
7. In the **Response variable** field, enter a name to store the data in, such as `electricity_prices`.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config entry:
  description: The Zonneplan config entry to get the prices of.
  required: true
Interval:
  description: Select **Hour** for a price per hour, or **Quarter hour** for a price per 15 minutes.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zonneplan.get_electricity_prices`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: zonneplan.get_electricity_prices
  data:
    config_entry: YOUR_CONFIG_ENTRY_ID
    interval: quarter
  response_variable: electricity_prices
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry:
  description: >
    The Zonneplan config entry to get the prices of.
  required: true
  type: string
interval:
  description: >
    `hour` for a price per hour, or `quarter` for a price per 15 minutes.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response contains a `prices` list, ordered by time. Each entry has the following fields:

- `start`: The start of the hour or quarter hour, in UTC.
- `end`: The end of the hour or quarter hour, in UTC.
- `price`: The all-in electricity price in EUR/kWh.

A shortened example of the response looks like this:

```yaml
prices:
  - start: "2026-11-03T23:00:00+00:00"
    end: "2026-11-04T00:00:00+00:00"
    price: 0.2604541
  - start: "2026-11-04T00:00:00+00:00"
    end: "2026-11-04T01:00:00+00:00"
    price: 0.2398012
```

If the Zonneplan account has no electricity contract, the action fails with an error.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
