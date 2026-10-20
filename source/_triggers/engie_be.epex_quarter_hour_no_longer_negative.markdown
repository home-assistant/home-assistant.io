---
title: "EPEX quarter-hourly price no longer negative"
trigger: engie_be.epex_quarter_hour_no_longer_negative
domain: engie_be
description: "Triggers when the current quarter-hourly EPEX day-ahead price returns to zero or above."
related_triggers:
  - engie_be.epex_quarter_hour_became_negative
  - engie_be.epex_hour_no_longer_negative
  - engie_be.epex_current_quarter_hour_crossed_threshold
---

The **EPEX quarter-hourly price no longer negative** trigger fires when the price of the quarter hour you are in returns to zero or above after being negative. The **EPEX current quarter-hourly price is negative** binary sensor follows the price, and this trigger fires the moment it turns off.

Use it as the stop signal that pairs with [EPEX quarter-hourly price became negative](/triggers/engie_be.epex_quarter_hour_became_negative/): start a charger or an appliance when the price turns negative, and stop it again when the negative window ends. If your contract bills you per hour, use [EPEX hour price no longer negative](/triggers/engie_be.epex_hour_no_longer_negative/) instead.

Only addresses on a dynamic tariff have EPEX price sensors. The prices are raw wholesale prices in EUR/kWh, without VAT, taxes and levies, or network costs.

{% include triggers/ui_header.md %}

To use **EPEX quarter-hourly price no longer negative** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **EPEX quarter-hourly price no longer negative**.
5. Select **Add target** (see [Targets](#targets)) and pick the **EPEX current quarter-hourly price is negative** binary sensor of your dynamic address.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick how the trigger fires when you target more than one entity.
7. Under **For at least**, set how long the price must stay at zero or above before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When more than one entity is targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted entity returns to zero or above.
    - **First**: fires only on the first entity to return to zero or above.
    - **All**: fires only after every targeted entity has returned to zero or above.
For at least:
  description: How long the price must stay at zero or above before the trigger fires. The default is `0` hours, `00` minutes and `00` seconds (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `engie_be.epex_quarter_hour_no_longer_negative`. A basic example looks like this:

{% example %}
trigger: |
  trigger: engie_be.epex_quarter_hour_no_longer_negative
  target:
    entity_id: binary_sensor.main_street_1_1000_brussels_epex_current_quarter_hourly_price_is_negative
{% endexample %}

This fires the moment the price of the current quarter hour returns to zero or above.

### Options in YAML

The options go under `options`.

{% options_yaml %}
behavior:
  description: |
    When more than one entity is targeted, controls when the trigger fires:

    - `each` (default): fires every time any targeted entity returns to zero or above.
    - `first`: fires only on the first entity to return to zero or above.
    - `all`: fires only after every targeted entity has returned to zero or above.
  required: false
  type: string
  default: each
for:
  description: How long the price must stay at zero or above before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md domain="binary_sensor" %}

{% include triggers/behavior.md %}

## Good to know

- Only addresses on a dynamic tariff have EPEX price sensors, so the trigger only offers targets when your integration has one.
- The trigger fires on the crossing back to zero or above only. While the price stays at zero or above, it does not fire again.
- The quarter-hourly price changes on every quarter-hour boundary, so the trigger can fire again as soon as the next negative quarter hour starts.
- When no price covers the current moment, for example while the EPEX prices are unavailable, the binary sensor reads unknown and the trigger does not fire.
- To gate an automation while the price is back at zero or above, use the [EPEX quarter-hourly price meets threshold](/conditions/engie_be.epex_quarter_hour_price_meets_threshold/) condition.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: stop the tumble dryer when the paid window ends

This automation pairs with the dryer that started on a negative price. When the price of the current quarter hour returns to zero or above, it stops the tumble dryer, so it only runs while electricity pays you back.

- **Trigger**: EPEX quarter-hourly price no longer negative
  - **Target**: EPEX current quarter-hourly price is negative
- **Action**: Turn off switch
  - **Target**: Tumble dryer (`switch.tumble_dryer`)

{% details "YAML example for stopping the dryer when the price recovers" %}

{% example %}
automation: |
  alias: "Stop the dryer when electricity is no longer negative"
  triggers:
    - trigger: engie_be.epex_quarter_hour_no_longer_negative
      target:
        entity_id: binary_sensor.main_street_1_1000_brussels_epex_current_quarter_hourly_price_is_negative
  actions:
    - action: switch.turn_off
      target:
        entity_id: switch.tumble_dryer
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}
{% include triggers/related.md %}
