---
title: "EPEX quarter-hourly price meets threshold"
condition: engie_be.epex_quarter_hour_price_meets_threshold
domain: engie_be
description: "Tests if the current quarter-hourly EPEX day-ahead price meets a threshold."
related_conditions:
  - engie_be.epex_hour_price_meets_threshold
  - engie_be.epex_hour_price_is_negative
  - engie_be.epex_quarter_hour_price_is_negative
---

The **EPEX quarter-hourly price meets threshold** condition passes while the price of the quarter hour you are in is above, below, or between prices you set. On a dynamic tariff, the EPEX day-ahead auction sets a new price for every quarter hour of the day, and the **EPEX current quarter-hourly price** sensor follows it.

Use it to gate an automation so it only runs during cheap quarter hours, for example starting the tumble dryer only when the current quarter hour price is under your ceiling. If your contract bills you per hour, use [EPEX hour price meets threshold](/conditions/engie_be.epex_hour_price_meets_threshold/) instead.

Only addresses on a dynamic tariff have EPEX price sensors. The prices are raw wholesale prices in EUR/kWh, without VAT, taxes and levies, or network costs, and they can be negative.

{% include conditions/ui_header.md %}

To use **EPEX quarter-hourly price meets threshold** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **EPEX quarter-hourly price meets threshold**.
5. Select **Add target** (see [Targets](#targets)) and pick the **EPEX current quarter-hourly price** sensor of your dynamic address.
6. Under **Threshold**, pick **Above**, **Below**, **In range**, or **Outside range**, then enter the price in EUR/kWh. You can also pick another ENGIE Belgium price sensor as the threshold.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the results combine when you target more than one entity.
8. Under **For at least**, set how long the price must already meet the threshold before the condition passes. Leave it at zero to ignore it.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold:
  description: |
    The price boundary in EUR/kWh that the current price is compared against:

    - **Above**: the price must be strictly above the threshold to pass.
    - **Below**: the price must be strictly below the threshold to pass.
    - **In range**: the price must be between the two values, or equal to one of them, to pass.
    - **Outside range**: the price must be beyond either value to pass.

    For each type you can enter a fixed price or pick an ENGIE Belgium sensor as a dynamic threshold. A fixed price must be between -1 and 5 EUR/kWh.
Condition passes if:
  description: |
    When more than one entity is targeted, controls how the results combine:

    - **Any** (default): the condition passes if at least one targeted entity meets the threshold.
    - **All**: the condition passes only when every targeted entity meets the threshold.
For at least:
  description: How long the price must already meet the threshold before the condition passes. The default is `0` hours, `00` minutes and `00` seconds (no minimum).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `engie_be.epex_quarter_hour_price_meets_threshold`. A basic example looks like this:

{% example %}
condition: |
  condition: engie_be.epex_quarter_hour_price_meets_threshold
  target:
    entity_id: sensor.main_street_1_1000_brussels_epex_current_quarter_hourly_price
  options:
    threshold:
      type: below
      value:
        number: 0.08
    behavior: any
{% endexample %}

This passes while the current quarter-hourly price is below 0.08 EUR/kWh.

To pass only while the price is inside a cheap range, for example between -0.05 and 0.08 EUR/kWh:

{% example %}
condition: |
  condition: engie_be.epex_quarter_hour_price_meets_threshold
  target:
    entity_id: sensor.main_street_1_1000_brussels_epex_current_quarter_hourly_price
  options:
    threshold:
      type: between
      value_min:
        number: -0.05
      value_max:
        number: 0.08
{% endexample %}

### Options in YAML

The options go under `options`.

{% options_yaml %}
threshold:
  description: |
    The price boundary in EUR/kWh that the current price is compared against:

    - `type: above` (exclusive): the price must be strictly above `value` to pass. Provide `value` with a `number` key (a price in EUR/kWh) or an `entity` key (an ENGIE Belgium sensor used as a dynamic threshold).
    - `type: below` (exclusive): the price must be strictly below `value` to pass. Provide `value` the same way.
    - `type: between` (inclusive): the price must be between the two bounds, or equal to one of them, to pass. Provide `value_min` and `value_max`, each with a `number` key or an `entity` key.
    - `type: outside` (exclusive): the price must be beyond either bound to pass. Provide `value_min` and `value_max`, each with a `number` key or an `entity` key.
  required: true
  type: map
behavior:
  description: |
    When more than one entity is targeted, controls how the results combine:

    - `any` (default): the condition passes if at least one targeted entity meets the threshold.
    - `all`: the condition passes only when every targeted entity meets the threshold.
  required: false
  type: string
  default: any
for:
  description: How long the price must already meet the threshold before the condition passes. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md domain="sensor" %}

{% include conditions/behavior.md %}

## Good to know

- Only addresses on a dynamic tariff have EPEX price sensors, so the condition only offers targets when your integration has one.
- The prices are raw wholesale prices in EUR/kWh, without VAT, taxes and levies, or network costs. The price you actually pay is higher, and wholesale prices can be negative.
- The condition is checked at the moment the automation runs. It does not track the price continuously; it is evaluated again every time the automation fires.
- When you use a sensor as a dynamic threshold, its value is read at the moment the condition runs.
{% include conditions/unavailable_targets.md entities="EPEX price sensors" %}
- To react the moment the price crosses a threshold, instead of gating an automation, use the [EPEX current quarter-hourly price crossed threshold](/triggers/engie_be.epex_current_quarter_hour_crossed_threshold/) trigger.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: run the tumble dryer only in a cheap quarter hour

This automation starts the tumble dryer at 13:00, but only when the price of that quarter hour is below 0.08 EUR/kWh. When the midday quarter hour is expensive, it does nothing and you can run the dryer later in the day.

- **Trigger**: Time (at `13:00:00`)
- **Condition**: EPEX quarter-hourly price meets threshold
  - **Target**: EPEX current quarter-hourly price
  - **Threshold type**: Below (0.08)
- **Action**: Turn on switch
  - **Target**: Tumble dryer (`switch.tumble_dryer`)

{% details "YAML example for running the dryer in a cheap quarter hour" %}

{% example %}
automation: |
  alias: "Run the tumble dryer when the midday quarter hour is cheap"
  triggers:
    - trigger: time
      at: "13:00:00"
  conditions:
    - condition: engie_be.epex_quarter_hour_price_meets_threshold
      target:
        entity_id: sensor.main_street_1_1000_brussels_epex_current_quarter_hourly_price
      options:
        threshold:
          type: below
          value:
            number: 0.08
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.tumble_dryer
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}
{% include conditions/related.md %}
