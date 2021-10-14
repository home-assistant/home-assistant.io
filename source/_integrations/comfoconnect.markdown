---
title: Zehnder ComfoAir Q
description: Instructions on how to integrate Zehnder ComfoAir Q350/450/600 ventilation systems into Home Assistant.
ha_category:
  - Fan
  - Sensor
ha_release: 0.48
ha_iot_class: Local Push
ha_codeowners:
  - '@michaelarnauts'
ha_domain: comfoconnect
ha_config_flow: true
ha_platforms:
  - fan
  - sensor
---

The `comfoconnect` integration lets you control Zehnder ComfoAir [Q350](https://www.international.zehnder-systems.com/products-and-systems/comfosystems/zehnder-comfoair-q350-tr)/[Q450](https://www.international.zehnder-systems.com/products-and-systems/comfosystems/zehnder-comfoair-q450-tr)/[Q600](https://www.international.zehnder-systems.com/products-and-systems/comfosystems/zehnder-comfoair-q600-st)
ventilation units from Home Assistant. You need a [ComfoConnect LAN C](https://www.zehnder.co.uk/products-and-systems/comfortable-indoor-ventilation/ms-comfoair-q/ideal-control#node-21233)
bridge to connect the unit to your local network.

There is an official iPhone and Android app to configure and control your unit. This platform connects with the help of
the unofficial [pycomfoconnect](https://github.com/michaelarnauts/comfoconnect) library.

The integration has a fan platform to view and control the ventilation speed, and a sensors platform to read out the outdoor temperature and humidity, the indoor temperature and humidity, and the extract and supply air flow (in m³ per hour).

{% include integrations/config_flow.md %}

<div class='note'>
Note that it's not possible to have multiple connection to the bridge at the same time. This integration will keep the connection open, and if you open the app, it will ask you to disconnect Home Assistant. If you close the app again, Home Assistant will reconnect automatically.
</div>
