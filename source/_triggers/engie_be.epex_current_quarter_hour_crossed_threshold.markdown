---
title: "EPEX current quarter-hourly price crossed threshold"
trigger: engie_be.epex_current_quarter_hour_crossed_threshold
domain: engie_be
description: "Triggers when the current quarter-hourly EPEX day-ahead price crosses a threshold."
related_triggers:
  - engie_be.epex_current_hour_crossed_threshold
  - engie_be.epex_next_hour_crossed_threshold
  - engie_be.epex_next_quarter_hour_crossed_threshold
  - engie_be.epex_quarter_hour_became_negative
  - engie_be.epex_quarter_hour_no_longer_negative
---

The **EPEX current quarter-hourly price crossed threshold** trigger fires when the price of the quarter hour you are in crosses a threshold you set. On a dynamic tariff, the EPEX day-ahead auction sets a new price for every quarter hour of the day, and the **EPEX current quarter-hourly price** sensor follows it.

Use it to start a dishwasher, a tumble dryer, or an EV charger the moment electricity gets cheap, or to hold heavy loads back when the price climbs above a ceiling. To act on the price of the next quarter hour before it starts, use [EPEX next quarter-hourly price crossed threshold](/triggers/engie_be.epex_next_quarter_hour_crossed_threshold/). If your contract bills you per hour, use [EPEX current hour price crossed threshold](/triggers/engie_be.epex_current_hour_crossed_threshold/) instead.

Only addresses on a dynamic tariff have EPEX price sensors. The prices are raw wholesale prices in EUR/kWh, without VAT, taxes and levies, or network costs, and they can be negative.

{% include triggers/ui_header.md %}

To use **EPEX current quarter-hourly price crossed threshold** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **EPEX current quarter-hourly price crossed threshold**.
5. Select **Add target** (see [Targets](#targets)) and pick the **EPEX current quarter-hourly price** sensor of your dynamic address.
6. Under **Threshold**, pick **Above**, **Below**, **In range**, or **Outside range**, then enter the price in EUR/kWh. You can also pick another ENGIE Belgium price sensor as the threshold.
7. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick how the trigger fires when you target more than one entity.
8. Under **For at least**, set how long the price must stay past the threshold before the trigger fires. Leave it at zero to fire immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold:
  description: |
    The price boundary in EUR/kWh. The trigger fires when the price crosses into it:

    - **Above**: the price crosses to strictly above the threshold. A price equal to the threshold does not trigger a crossing.
    - **Below**: the price crosses to strictly below the threshold. A price equal to the threshold does not trigger a crossing.
    - **In range**: the price crosses into the range between two values. A price equal to either value is considered inside the range.
    - **Outside range**: the price crosses out of the range between two values. A price equal to either value is still considered inside the range.

    For each type you can enter a fixed price or pick an ENGIE Belgium sensor as a dynamic threshold. A fixed price must be between -1 and 5 EUR/kWh.
Trigger when:
  description: |
    When more than one entity is targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted entity crosses the threshold.
    - **First**: fires only on the first entity to cross.
    - **All**: fires only after every targeted entity has crossed.
For at least:
  description: How long the price must stay past the threshold before the trigger fires. Useful to ride out brief fluctuations. The default is `0` hours, `00` minutes and `00` seconds (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `engie_be.epex_current_quarter_hour_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: engie_be.epex_current_quarter_hour_crossed_threshold
  target:
    entity_id: sensor.main_street_1_1000_brussels_epex_current_quarter_hourly_price
  options:
    threshold:
      type: below
      value:
        number: 0.10
{% endexample %}

This fires the moment the price of the current quarter hour crosses below 0.10 EUR/kWh. It does not fire again while the price stays below the threshold; the price has to climb back above it first.

To fire when the price crosses into a cheap range, for example between -0.05 and 0.10 EUR/kWh:

{% example %}
trigger: |
  trigger: engie_be.epex_current_quarter_hour_crossed_threshold
  target:
    entity_id: sensor.main_street_1_1000_brussels_epex_current_quarter_hourly_price
  options:
    threshold:
      type: between
      value_min:
        number: -0.05
      value_max:
        number: 0.10
{% endexample %}

### Options in YAML

The options go under `options`.

{% options_yaml %}
threshold:
  description: |
    A mapping that defines the price crossing that fires the trigger:

    - `type: above` (exclusive): fires when the price crosses to strictly above `value`. Provide `value` with a `number` key (a price in EUR/kWh) or an `entity` key (an ENGIE Belgium sensor used as a dynamic threshold).
    - `type: below` (exclusive): fires when the price crosses to strictly below `value`. Provide `value` the same way.
    - `type: between` (inclusive): fires when the price crosses into the range. Provide `value_min` and `value_max`, each with a `number` key or an `entity` key.
    - `type: outside` (exclusive): fires when the price crosses out of the range. Provide `value_min` and `value_max`, each with a `number` key or an `entity` key.
  required: true
  type: map
behavior:
  description: |
    When more than one entity is targeted, controls when the trigger fires:

    - `each` (default): fires every time any targeted entity crosses the threshold.
    - `first`: fires only on the first entity to cross.
    - `all`: fires only after every targeted entity has crossed.
  required: false
  type: string
  default: each
for:
  description: How long the price must stay past the threshold before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md domain="sensor" %}

{% include triggers/behavior.md %}

## Good to know

- Only addresses on a dynamic tariff have EPEX price sensors, so the trigger only offers targets when your integration has one.
- The prices are raw wholesale prices in EUR/kWh, without VAT, taxes and levies, or network costs. The price you actually pay is higher, and wholesale prices can be negative.
- The trigger fires on the crossing only. While the price stays past the threshold, it does not fire again.
- The current quarter-hourly price changes on every quarter-hour boundary, so the trigger can fire again each time a new quarter hour starts.
- To gate an automation while the price is cheap, instead of reacting to the crossing, use the [EPEX quarter-hourly price meets threshold](/conditions/engie_be.epex_quarter_hour_price_meets_threshold/) condition.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: start the dishwasher when a cheap quarter hour starts

When the price of the current quarter hour crosses below 0.10 EUR/kWh, this automation starts the dishwasher, so the program runs during the cheap quarter hours.

- **Trigger**: EPEX current quarter-hourly price crossed threshold
  - **Target**: EPEX current quarter-hourly price
  - **Threshold type**: Below (0.10)
- **Action**: Turn on switch
  - **Target**: Dishwasher (`switch.dishwasher`)

{% details "YAML example for starting the dishwasher in a cheap quarter hour" %}

{% example %}
automation: |
  alias: "Start the dishwasher when a quarter hour is cheap"
  triggers:
    - trigger: engie_be.epex_current_quarter_hour_crossed_threshold
      target:
        entity_id: sensor.main_street_1_1000_brussels_epex_current_quarter_hourly_price
      options:
        threshold:
          type: below
          value:
            number: 0.10
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.dishwasher
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}
{% include triggers/related.md %}
