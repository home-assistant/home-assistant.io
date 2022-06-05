---
title: Growatt
description: Instructions on how to integrate your Growatt server solar inverter within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 0.99
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@indykoning'
  - '@muppet3000'
  - '@JasperPlant'
ha_domain: growatt_server
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: integration
---

This is a sensor to collect information from your Growatt inverters using [Growatt server](https://server.growatt.com/) by default. It is possible to specify an alternative endpoint server at configuration time e.g., [SMTEN](http://server.smten.com/).

This will log into your Growatt account and grab the first "Plant", after which it collects the inverters on this plant and creates sensors for these inverters as well as total sensors.

{% include integrations/config_flow.md %}
