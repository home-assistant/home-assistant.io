---
title: JuiceNet
description: Instructions on how to setup WiFi-equipped JuiceNet/JuiceBox charging stations with Home Assistant.
ha_category:
  - Car
  - Energy
  - Number
  - Sensor
  - Switch
ha_iot_class: Cloud Polling
ha_release: 0.47
ha_codeowners:
  - '@jesserockz'
ha_domain: juicenet
ha_config_flow: true
ha_platforms:
  - number
  - sensor
  - switch
ha_integration_type: integration
---

The `juicenet` platform pulls data from a [JuiceNet](https://evcharging.enelx.com/products/juicebox) charging station equipped with a Wi-Fi connection. It will access and make available all of the devices attached to your account. It also exposes a switch allowing you to charge your car now instead of waiting for the pre-set schedule.

{% important %}
This integration can no longer be set up as the required API token cannot be obtained. However, if you have it working, it may remain functional.
{% endimportant %}

{% include integrations/config_flow.md %}


## Sensor

The `juicenet` sensor platform allows you to get data from your [JuiceNet](https://evcharging.enelx.com/products/juicebox) charger.

### Added sensors

These sensors will be added for each JuiceNet device in your account:

- Status
- Temperature (inside the device)
- Voltage
- Amps
- Watts
- Charge time of session
- Energy added this session

## Switch

The `juicenet` switch platform allows you to override the charging schedule for your JuiceNet device.

## Number

The `juicenet` number platform allows you to control the charging amperage limit.
