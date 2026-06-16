---
title: "Get gas prices"
action: energyzero.get_gas_prices
domain: energyzero
description: "Requests gas prices from EnergyZero."
related_actions:
  - energyzero.get_energy_prices
---

The **Get gas prices** action fetches the dynamic gas prices from EnergyZero for a period you choose.

This action returns its result in a response variable, which you can use in later steps of the same automation or script, for example to show the prices in a template sensor.

{% include actions/ui_header.md %}

To get gas prices from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **EnergyZero: Get gas prices**.
6. Select the **Config entry** to use, and choose whether to include VAT. Optionally, set a **Start** and **End**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config entry:
  description: The EnergyZero config entry to use for this action.
  required: true
Including VAT:
  description: Turn on to include VAT in the prices.
  required: true
Start:
  description: The date and time from which to retrieve prices. Defaults to today if omitted.
  required: false
End:
  description: The date and time until which to retrieve prices. Defaults to today if omitted.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `energyzero.get_gas_prices`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: energyzero.get_gas_prices
  data:
    config_entry: 1b4a46c6cba0677bbfb5a8c53e8618b0
    incl_vat: true
  response_variable: gas_prices
{% endexample %}

This fetches today's gas prices, including VAT.

### Options in YAML

{% options_yaml %}
config_entry:
  description: >
    The EnergyZero config entry to use for this action.
  required: true
  type: string
incl_vat:
  description: >
    Turn on to include VAT in the prices.
  required: true
  default: true
  type: boolean
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

The response contains a `prices` list. Each entry includes the following fields:

- `timestamp`: The date and time the price applies to.
- `price`: The gas price for that timestamp.

A shortened example of the response looks like this:

```yaml
prices:
  - timestamp: "2023-09-25 03:00:00+00:00"
    price: 1.1
  - timestamp: "2023-09-25 04:00:00+00:00"
    price: 1.05
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
