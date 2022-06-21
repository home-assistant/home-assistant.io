---
title: GoodWe Inverter
description: Instructions on how to connect your GoodWe Inverter to Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 2022.2
ha_codeowners:
  - '@mletenay'
  - '@starkillerOG'
ha_domain: goodwe
ha_platforms:
  - number
  - select
  - sensor
ha_integration_type: integration
---

The GoodWe integration will poll a [GoodWe](http://www.goodwe.com/) solar inverter over the local network and present its runtime values as sensors in Home Assistant.

It works with GoodWe ET, EH, BT, BH, ES, EM, DT, MS, D-NS, XS and BP families of inverters. Different inverter families/models expose different sets of sensors, the newer models have usually broader support.

<div class='note'>
If you can't communicate with the inverter despite your model is listed above, it is possible you have an old ARM firmware version. You should ask manufacturer support to upgrade your ARM firmware (not just inverter firmware) to be able to communicate with the inverter via UDP.

It may work on other inverter families as well, as long as they listen on UDP port 8899 and respond to one of the supported communication protocols. In general, if you can communicate with the inverter via an official mobile application (PvMaster, SolarGo), it is very likely the integration will work too.
</div>

{% include integrations/config_flow.md %}

## Energy dashboard

The plugin provides several values suitable for the energy dashboard.
The best supported are the inverters of ET/EH families, where the sensors `Meter Total Energy (export)`, `Meter Total Energy (import)`, `Total PV Generation`, `Total Battery Charge` and `Total Battery Discharge` are the most suitable for the dashboard measurements and statistics.

For the other inverter families, if such sensors are not directly available by the inverter, they can be calculated from existing sensors. [Template Sensor](/integrations/template/) can be used to separate buy and sell power values and [Riemann Sum](/integrations/integration/) can be used to convert these instant power (W) values into cumulative energy values (Wh), which then can be used within the energy dashboard.

## Inverter polling frequency

The integration will poll the inverter for new values every 10 seconds. If you wish to receive fresh inverter data less (or more) frequently, you can disable the automatic refresh in the integration's system options (Enable polling for updates) and create your own automation with your desired polling frequency. This may be required if the Goodwe SEMS cloud portal stops receiving updates from the inverter.

```yaml
- alias: "Goodwe inverter data polling"
  trigger:
    # Poll every 30 seconds.
    - platform: time_pattern
      hours: "*"
      minutes: "*"
      seconds: "/30"
#   # Poll every 5 minutes.
#   - platform: time_pattern
#     hours: "*"
#     minutes: "/5"
#     seconds: "0"
  action:
    - service: homeassistant.update_entity
      target:
        entity_id:
          - sensor.pv_power
          - sensor.pv1_current
          - sensor.pv1_power
          - sensor.pv1_voltage
          - sensor.pv2_current
          - sensor.pv2_power
          - sensor.pv2_voltage
          - ...
```

<div class='note'>
Some Goodwe inverters will stop sending updates to the Goodwe SEMS cloud portal if local polling is too frequent. If you find that the SEMS portal does not show data correctly then you may need to reduce the polling frequency of Home Assistant. Values ranging from 30 seconds to 5 minutes have been found to be effective depending on the model of inverter.
</div>
