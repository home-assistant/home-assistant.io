---
title: GoodWe
description: Instructions on how to connect your GoodWe Inverter to Home Assistant.
ha_category:
  - Sensor
  - Energy
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 2021.11
ha_codeowners:
  - "@mletenay"
ha_domain: goodwe
ha_platforms:
  - sensor
---

The `goodwe` integration will poll a [GoodWe](http://www.goodwe.com/) solar inverter over the local network and present its runtime values as sensors in Home Assistant.

It works with GoodWe ET, EH, BT, BH, ES, EM, DT, MS, D-NS, XS and BP families of inverters. Different inverter families/models expose different sets of sensors, the newer models have usually broader support.

<div class='note'>
If you can't communicate with the inverter despite your model is listed above, it is possible you have old ARM firmware version. You should ask manufacturer support to upgrade your ARM firmware (not just inverter firmware) to be able to communicate with the inveter via UDP.

It may work on other inverter families as well, as long as they listen on UDP port 8899 and respond to one of supported communication protocols. In general, if you can communicate with the inverter via official mobile applications (PvMaster, SolarGo), it is very likely the integration will work too.

</div>

{% include integrations/config_flow.md %}

## Energy dashboard

The plugin provides several values suitable for the energy dashboard.
The best supported are the inverters of ET/EH families, where the sensors `meter_e_total_exp`, `meter_e_total_imp`, `e_total`, `e_bat_charge_total` and `e_bat_discharge_total` are the most suitable for the dashboard measurements and statistics.
For the other inverter families, if such sensors are not directly available by the inverter, they can be calculated, see below.

## Cumulative energy values

The sensor values reported by the inverter are mostly instant measurements (e.g. power in W).
To report summary (energy) values (in kWh), the instant values have to be aggregated over time, see the example below.

[Template Sensor](https://www.home-assistant.io/integrations/template/) can be used to separate buy and sell values.
[Riemann Sum](https://www.home-assistant.io/integrations/integration/) integration can be used to convert these instant (W) values into cumulative values (Wh).
[Utility Meter](https://www.home-assistant.io/integrations/utility_meter) can report these values as human readable statistical values.

```YAML
sensor:
  - platform: template
    sensors:
      # Template sensor for values of energy bought (sensor goodwe_pgrid < 0)
      energy_buy:
        friendly_name: "Energy Buy"
        unit_of_measurement: 'W'
        value_template: >-
          {% if states("sensor.goodwe_pgrid") | float < 0 %}
            {{ states("sensor.goodwe_pgrid") | float * -1 }}
          {% else %}
            {{ 0 }}
          {% endif %}
      # Template sensor for values of energy sold (sensor goodwe_pgrid > 0)
      energy_sell:
        friendly_name: "Energy Sell"
        unit_of_measurement: 'W'
        value_template: >-
          {% if states("sensor.goodwe_pgrid") | float > 0 %}
            {{ states("sensor.goodwe_pgrid") | float }}
          {% else %}
            {{ 0 }}
          {% endif %}

  # Sensor for Riemann sum of energy bought (W -> Wh)
  - platform: integration
    source: sensor.energy_buy
    name: energy_buy_sum
    unit_prefix: k
    round: 1
    method: left
  # Sensor for Riemann sum of energy sold (W -> Wh)
  - platform: integration
    source: sensor.energy_sell
    name: energy_sell_sum
    unit_prefix: k
    round: 1
    method: left

utility_meter:
  energy_buy_daily:
    source: sensor.energy_buy_sum
    cycle: daily
  energy_sell_daily:
    source: sensor.energy_sell_sum
    cycle: daily
```
