---
title: PubliBike
description: Instructions on how to integrate PubliBike API with Home Assistant
ha_category: Transport
ha_release: "2022.4"
ha_iot_class: "Cloud Polling"
ha_domain: publibike
ha_codeowners:
  - '@misialq'
ha_config_flow: true
---

This `publibike` sensor platform allows you to connect the [PubliBike API](https://api.publibike.ch/v1/static/api.html) to Home Assistant to access real time data on availability of [PubliBike](https://www.publibike.ch/)s in some Swiss cities. 
It reports counts of available bikes and e-bikes given station geo-coordinates. Displayed count of available e-bikes can be adjusted to take into account their battery level, i.e. only show bikes with battery level higher than the provided threshold.

Coordinates are picked up from Home Assistant's configuration (and can be adjusted manually using the integration's configuration panel) - the sensor will find the nearest available PubliBike station. 
Alternatively, you can provide an ID of the station you want to get bikes for. See [here](https://github.com/misialq/publibike-stations) for the list of available stations (updated weekly).

{% include integrations/config_flow.md %}
