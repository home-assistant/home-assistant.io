---
title: "EPEX quarter-hourly price is negative"
condition: engie_be.epex_quarter_hour_price_is_negative
domain: engie_be
description: "Tests if the current quarter-hourly EPEX day-ahead price is negative."
related_conditions:
  - engie_be.epex_hour_price_is_negative
  - engie_be.epex_quarter_hour_price_meets_threshold
---

The **EPEX quarter-hourly price is negative** condition passes while the price of the quarter hour you are in is below zero. On a dynamic tariff, the EPEX day-ahead price can turn negative: when supply exceeds demand, you are paid to consume. The **EPEX current quarter-hourly price is negative** binary sensor follows the price, and this condition checks it.

Use it to gate an automation so it only runs during the quarter hours that electricity pays you. The price changes every quarter hour, so the negative windows can be as short as fifteen minutes. To check the hourly price instead, use [EPEX hour price is negative](/conditions/engie_be.epex_hour_price_is_negative/).

Only addresses on a dynamic tariff have EPEX price sensors. The prices are raw wholesale prices in EUR/kWh, without VAT, taxes and levies, or network costs.

{% include conditions/ui_header.md %}

To use **EPEX quarter-hourly price is negative** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **EPEX quarter-hourly price is negative**.
5. Select **Add target** (see [Targets](#targets)) and pick the **EPEX current quarter-hourly price is negative** binary sensor of your dynamic address.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the results combine when you target more than one entity.
7. Under **For at least**, set how long the price must already be negative before the condition passes. Leave it at zero to ignore it.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: |
    When more than one entity is targeted, controls how the results combine:

    - **Any** (default): the condition passes if at least one targeted entity is negative.
    - **All**: the condition passes only when every targeted entity is negative.
For at least:
  description: How long the price must already be negative before the condition passes. The default is `0` hours, `00` minutes and `00` seconds (no minimum).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `engie_be.epex_quarter_hour_price_is_negative`. A basic example looks like this:

{% example %}
condition: |
  condition: engie_be.epex_quarter_hour_price_is_negative
  target:
    entity_id: binary_sensor.main_street_1_1000_brussels_epex_current_quarter_hourly_price_is_negative
  options:
    behavior: any
{% endexample %}

This passes while the price of the current quarter hour is negative.

### Options in YAML

The options go under `options`.

{% options_yaml %}
behavior:
  description: |
    When more than one entity is targeted, controls how the results combine:

    - `any` (default): the condition passes if at least one targeted entity is negative.
    - `all`: the condition passes only when every targeted entity is negative.
  required: false
  type: string
  default: any
for:
  description: How long the price must already be negative before the condition passes. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md domain="binary_sensor" %}

{% include conditions/behavior.md %}

## Good to know

- Only addresses on a dynamic tariff have EPEX price sensors, so the condition only offers targets when your integration has one.
- The quarter-hourly price changes on every quarter-hour boundary. A negative quarter hour does not mean the whole hour is negative.
- The condition is checked at the moment the automation runs. It does not track the price continuously; it is evaluated again every time the automation fires.
{% include conditions/unavailable_targets.md entities="EPEX price sensors" %}
- To react the moment the price turns negative, instead of gating an automation, use the [EPEX quarter-hourly price became negative](/triggers/engie_be.epex_quarter_hour_became_negative/) trigger.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: charge the home battery only while electricity is paid to consume

Every quarter hour, this automation starts the home battery charger, but only when the price of that quarter hour is negative. The [EPEX quarter-hourly price no longer negative](/triggers/engie_be.epex_quarter_hour_no_longer_negative/) trigger can stop it again when the paid window ends.

- **Trigger**: Time pattern (every 15 minutes)
- **Condition**: EPEX quarter-hourly price is negative
  - **Target**: EPEX current quarter-hourly price is negative
- **Action**: Turn on switch
  - **Target**: Battery charger (`switch.battery_charger`)

{% details "YAML example for charging the battery on negative prices" %}

{% example %}
automation: |
  alias: "Charge the battery while electricity is paid to consume"
  triggers:
    - trigger: time_pattern
      minutes: "/15"
  conditions:
    - condition: engie_be.epex_quarter_hour_price_is_negative
      target:
        entity_id: binary_sensor.main_street_1_1000_brussels_epex_current_quarter_hourly_price_is_negative
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.battery_charger
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}
{% include conditions/related.md %}
