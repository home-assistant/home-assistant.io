---
title: "Get energy prices"
action: energyzero.get_energy_prices
domain: energyzero
description: "Requests energy prices from EnergyZero."
related_actions:
  - energyzero.get_gas_prices
---

The **Get energy prices** action fetches the dynamic energy prices from EnergyZero for a period you choose.

You can retrieve market or all-in electricity prices at hourly or quarter-hourly intervals. By default, the action returns hourly market prices, regardless of the **Electricity price interval** selected in the [integration options](/integrations/energyzero/#options). Choosing a price type or interval for this action does not change your integration options or sensors.

This action returns its result in a response variable, which you can use in later steps of the same automation or script, for example to show the prices in a template sensor.

{% include actions/ui_header.md %}

To get energy prices from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **EnergyZero: Get energy prices**.
6. Select the **Config entry** to use, and choose whether to include VAT.
7. Optionally, select a **Price type** and **Interval**, and set a **Start** and **End**. For example, select **All-in** and **Quarter-hourly** to retrieve all-in prices per 15 minutes.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config entry:
  description: The EnergyZero config entry to use for this action.
  required: true
Including VAT:
  description: Turn on to include VAT in the selected market or all-in prices. Enabled by default.
  required: true
Price type:
  description: Select **Market** (the default) for market prices or **All-in** for EnergyZero's all-in prices.
  required: false
Interval:
  description: Select **Hourly** (the default) for prices per hour or **Quarter-hourly** for prices per 15 minutes. This is independent of the interval configured for your sensors.
  required: false
Start:
  description: The date and time from which to retrieve prices. Defaults to today if omitted.
  required: false
End:
  description: The date and time until which to retrieve prices. Defaults to today if omitted.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `energyzero.get_energy_prices`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: energyzero.get_energy_prices
  data:
    config_entry: YOUR_CONFIG_ENTRY_ID
    incl_vat: true
  response_variable: energy_prices
{% endexample %}

This fetches today's hourly market prices, including VAT. To retrieve all-in prices per 15 minutes, add `price_type: all_in` and `interval: quarter` under `data`. Set `incl_vat: false` to exclude VAT from either price type.

### Options in YAML

{% options_yaml %}
config_entry:
  description: >
    The EnergyZero config entry to use for this action.
  required: true
  type: string
incl_vat:
  description: >
    Set to true to include VAT in the selected market or all-in prices, or false to exclude VAT.
  required: true
  default: true
  type: boolean
price_type:
  description: >
    The electricity price type to retrieve: `market` for market prices or `all_in` for EnergyZero's all-in prices.
  required: false
  default: market
  type: string
interval:
  description: >
    The electricity price interval: `hour` for hourly prices or `quarter` for prices per 15 minutes. This is independent of the interval configured for your sensors.
  required: false
  default: hour
  type: string
start:
  description: >
    The date and time from which to retrieve prices. Defaults to today if
    omitted.
  required: false
  type: datetime
end:
  description: >
    The date and time until which to retrieve prices. Defaults to today if
    omitted.
  required: false
  type: datetime
{% endoptions_yaml %}

## Response data

The response contains a `prices` list for the selected price type and interval. Each entry includes the following fields:

- `timestamp`: The date and time the price applies to.
- `price`: The energy price for that timestamp.

A shortened example of the response looks like this:

```yaml
prices:
  - timestamp: "2023-09-25 03:00:00+00:00"
    price: 0.05
  - timestamp: "2023-09-25 04:00:00+00:00"
    price: 0.12
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
