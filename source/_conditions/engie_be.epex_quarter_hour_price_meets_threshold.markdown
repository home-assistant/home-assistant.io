---
title: "EPEX quarter-hourly price is in range"
condition: engie_be.epex_quarter_hour_price_meets_threshold
domain: engie_be
description: "Tests if the current quarter-hourly EPEX price is in a price range."
related_conditions:
  - engie_be.epex_hour_price_meets_threshold
  - engie_be.epex_hour_price_is_negative
  - engie_be.epex_quarter_hour_price_is_negative
---

The **EPEX quarter-hourly price is in range** condition passes when the price of the quarter hour you are in is above, below, or between prices you set.

Use it when your contract bills you per quarter hour, to run an automation only during cheap quarter hours. For the hourly price, use [EPEX hourly price is in range](/conditions/engie_be.epex_hour_price_meets_threshold/). To react the moment the price enters a range, use the [EPEX current quarter-hourly price crossed threshold](/triggers/engie_be.epex_current_quarter_hour_crossed_threshold/) trigger.

Only contracts with a dynamic tariff have EPEX prices. The prices are raw wholesale prices in EUR/kWh, without VAT, taxes and levies, or network costs, and they can be negative.

{% include conditions/ui_header.md %}

To use **EPEX quarter-hourly price is in range** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Search for **EPEX quarter-hourly price is in range** and select it.
5. Under **Contracts**, select one or more of your contracts with a dynamic tariff.
6. Enter a price in EUR/kWh under **Above**, **Below**, or both.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Contracts:
  description: The ENGIE Belgium contracts with a dynamic tariff to watch.
  required: true
Above:
  description: The price in EUR/kWh that the current quarter-hourly price must be above. Enter a number from -1 to 5.
  required: false
Below:
  description: The price in EUR/kWh that the current quarter-hourly price must be below. Enter a number from -1 to 5.
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `engie_be.epex_quarter_hour_price_meets_threshold`. A basic example looks like this:

{% example %}
condition: |
  condition: engie_be.epex_quarter_hour_price_meets_threshold
  options:
    device_id: 0123456789abcdef0123456789abcdef
    below: 0.10
{% endexample %}

This passes when the current quarter-hourly price of the contract with that device ID is below 0.10 EUR/kWh. When you create the automation in the automation editor, it fills in the device ID of your contract for you.

### Options in YAML

The options go under `options`.

{% options_yaml %}
device_id:
  description: One or more device IDs of ENGIE Belgium contracts with a dynamic tariff.
  required: true
  type: [string, list]
above:
  description: The price in EUR/kWh that the current quarter-hourly price must be above. Set at least one of `above` and `below`. When you set both, `above` must be lower than `below`.
  required: false
  type: float
below:
  description: The price in EUR/kWh that the current quarter-hourly price must be below. Set at least one of `above` and `below`. When you set both, `above` must be lower than `below`.
  required: false
  type: float
{% endoptions_yaml %}

## Good to know

- In the UI, Above and Below accept a number from -1 to 5 EUR/kWh.
- Only contracts with a dynamic tariff have EPEX prices.
- The condition passes only when every selected device has a confirmed dynamic tariff, known EPEX prices, and a current price that is in the range.
- The condition is checked when the automation runs.
- Both comparisons are strict. With **Below** set to 0.10, a price of exactly 0.10 EUR/kWh is not in the range.
- Set at least one of **Above** and **Below**. When you set both, **Above** must be lower than **Below**.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: start the EV charger in a cheap quarter hour

Every quarter hour, this automation starts the EV charger, but only when the price is between -0.05 and 0.08 EUR/kWh. This automation only starts charging. To stop it when the price goes up again, add a second automation with the [EPEX current quarter-hourly price crossed threshold](/triggers/engie_be.epex_current_quarter_hour_crossed_threshold/) trigger set to `above: 0.08`.

- **Trigger**: Time pattern (every 15 minutes)
- **Condition**: EPEX quarter-hourly price is in range
  - **Contracts**: Main Street 1
  - **Above**: -0.05
  - **Below**: 0.08
- **Action**: Turn on switch
  - **Target**: EV charger (`switch.ev_charger`)

{% details "YAML example for this automation" %}

{% example %}
automation: |
  alias: "Charge the EV in cheap quarter hours"
  triggers:
    - trigger: time_pattern
      minutes: "/15"
  conditions:
    - condition: engie_be.epex_quarter_hour_price_meets_threshold
      options:
        device_id: 0123456789abcdef0123456789abcdef
        above: -0.05
        below: 0.08
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.ev_charger
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
