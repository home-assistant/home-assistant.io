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

For the other inverter families, if such sensors are not directly available by the inverter, they can be calculated from existing sensors. [Template Sensor](https://www.home-assistant.io/integrations/template/) can be used to separate buy and sell power values and [Riemann Sum](https://www.home-assistant.io/integrations/integration/) can be used to convert these instant power (W) values into cumulative energy values (Wh), which then can be used within the energy dashboard.
