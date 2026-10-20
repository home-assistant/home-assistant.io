---
title: "EPEX quarter-hourly price became negative"
trigger: engie_be.epex_quarter_hour_became_negative
domain: engie_be
description: "Triggers when the current quarter-hourly EPEX day-ahead price turns negative."
related_triggers:
  - engie_be.epex_quarter_hour_no_longer_negative
  - engie_be.epex_hour_became_negative
  - engie_be.epex_current_quarter_hour_crossed_threshold
---

The **EPEX quarter-hourly price became negative** trigger fires when the price of the quarter hour you are in drops below zero. On a dynamic tariff, the EPEX day-ahead price can turn negative: when supply exceeds demand, you are paid to consume. The **EPEX current quarter-hourly price is negative** binary sensor follows the price, and this trigger fires the moment it turns on.

Use it to charge an EV or a home battery, or to run heavy appliances during the quarter hours that electricity pays you. The price changes every quarter hour, so the negative windows can be as short as fifteen minutes. To stop again when the negative window ends, use [EPEX quarter-hourly price no longer negative](/triggers/engie_be.epex_quarter_hour_no_longer_negative/). If your contract bills you per hour, use [EPEX hour price became negative](/triggers/engie_be.epex_hour_became_negative/) instead.

Only addresses on a dynamic tariff have EPEX price sensors. The prices are raw wholesale prices in EUR/kWh, without VAT, taxes and levies, or network costs.

{% include triggers/ui_header.md %}

To use **EPEX quarter-hourly price became negative** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **EPEX quarter-hourly price became negative**.
5. Select **Add target** (see [Targets](#targets)) and pick the **EPEX current quarter-hourly price is negative** binary sensor of your dynamic address.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick how the trigger fires when you target more than one entity.
7. Under **For at least**, set how long the price must stay negative before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When more than one entity is targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted entity turns negative.
    - **First**: fires only on the first entity to turn negative.
    - **All**: fires only after every targeted entity has turned negative.
For at least:
  description: How long the price must stay negative before the trigger fires. The default is `0` hours, `00` minutes and `00` seconds (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `engie_be.epex_quarter_hour_became_negative`. A basic example looks like this:

{% example %}
trigger: |
  trigger: engie_be.epex_quarter_hour_became_negative
  target:
    entity_id: binary_sensor.main_street_1_1000_brussels_epex_current_quarter_hourly_price_is_negative
{% endexample %}

This fires the moment the price of the current quarter hour turns negative.

### Options in YAML

The options go under `options`.

{% options_yaml %}
behavior:
  description: |
    When more than one entity is targeted, controls when the trigger fires:

    - `each` (default): fires every time any targeted entity turns negative.
    - `first`: fires only on the first entity to turn negative.
    - `all`: fires only after every targeted entity has turned negative.
  required: false
  type: string
  default: each
for:
  description: How long the price must stay negative before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md domain="binary_sensor" %}

{% include triggers/behavior.md %}

## Good to know

- Only addresses on a dynamic tariff have EPEX price sensors, so the trigger only offers targets when your integration has one.
- The prices are raw wholesale prices in EUR/kWh, without VAT, taxes and levies, or network costs. Wholesale prices can be negative, and then you are paid to consume.
- The trigger fires on the crossing to negative only. While the price stays negative, it does not fire again.
- The quarter-hourly price changes on every quarter-hour boundary. A negative quarter hour does not mean the whole hour is negative.
- When no price covers the current moment, for example while the EPEX prices are unavailable, the binary sensor reads unknown and the trigger does not fire.
- To gate an automation while the price is negative, instead of reacting to the crossing, use the [EPEX quarter-hourly price is negative](/conditions/engie_be.epex_quarter_hour_price_is_negative/) condition.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: run the tumble dryer while electricity is paid to consume

When the price of the current quarter hour turns negative, this automation starts the tumble dryer, so it runs during the quarter hours that pay you back.

- **Trigger**: EPEX quarter-hourly price became negative
  - **Target**: EPEX current quarter-hourly price is negative
- **Action**: Turn on switch
  - **Target**: Tumble dryer (`switch.tumble_dryer`)

{% details "YAML example for running the dryer on negative prices" %}

{% example %}
automation: |
  alias: "Run the dryer when electricity turns negative"
  triggers:
    - trigger: engie_be.epex_quarter_hour_became_negative
      target:
        entity_id: binary_sensor.main_street_1_1000_brussels_epex_current_quarter_hourly_price_is_negative
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.tumble_dryer
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}
{% include triggers/related.md %}
