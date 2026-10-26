---
title: "EPEX quarter-hourly price is negative"
condition: engie_be.epex_quarter_hour_price_is_negative
domain: engie_be
description: "Tests if the current quarter-hourly EPEX price is negative."
related_conditions:
  - engie_be.epex_hour_price_is_negative
  - engie_be.epex_hour_price_meets_threshold
  - engie_be.epex_quarter_hour_price_meets_threshold
---

The **EPEX quarter-hourly price is negative** condition passes when the price of the quarter hour you are in is below zero.

Use it when your contract bills you per quarter hour, to run an automation only during negative quarter hours. To check the hourly price instead, use [EPEX hour price is negative](/conditions/engie_be.epex_hour_price_is_negative/). To react the moment the price turns negative, use the [EPEX quarter-hourly price became negative](/triggers/engie_be.epex_quarter_hour_became_negative/) trigger.

Only contracts with a dynamic tariff have EPEX prices. The prices are raw wholesale prices in EUR/kWh, without VAT, taxes and levies, or network costs, and they can be negative.

{% include conditions/ui_header.md %}

To use **EPEX quarter-hourly price is negative** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Search for **EPEX quarter-hourly price is negative** and select it.
5. Under **Contracts**, select one or more of your contracts with a dynamic tariff.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Contracts:
  description: The ENGIE Belgium contracts with a dynamic tariff to watch.
  required: true
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `engie_be.epex_quarter_hour_price_is_negative`. A basic example looks like this:

{% example %}
condition: |
  condition: engie_be.epex_quarter_hour_price_is_negative
  options:
    device_id: 0123456789abcdef0123456789abcdef
{% endexample %}

This passes when the current quarter-hourly price of the contract with that device ID is below zero. When you create the automation in the automation editor, it fills in the device ID of your contract for you.

### Options in YAML

The options go under `options`.

{% options_yaml %}
device_id:
  description: One or more device IDs of ENGIE Belgium contracts with a dynamic tariff.
  required: true
  type: [string, list]
{% endoptions_yaml %}

## Good to know

- Only contracts with a dynamic tariff have EPEX prices.
- The condition passes only when every selected device has a dynamic tariff, known EPEX prices, and a current price that is negative.
- The condition is checked when the automation runs.
- A price of exactly zero is not negative.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: charge the home battery only in negative quarter hours

Every quarter hour, this automation starts charging the home battery, but only when the price of that quarter hour is negative.

- **Trigger**: Time pattern (every 15 minutes)
- **Condition**: EPEX quarter-hourly price is negative
  - **Contracts**: Main Street 1
- **Action**: Turn on switch
  - **Target**: Battery charging (`switch.battery_charging`)

{% details "YAML example for this automation" %}

{% example %}
automation: |
  alias: "Charge the battery in negative quarter hours"
  triggers:
    - trigger: time_pattern
      minutes: "/15"
  conditions:
    - condition: engie_be.epex_quarter_hour_price_is_negative
      options:
        device_id: 0123456789abcdef0123456789abcdef
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.battery_charging
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
