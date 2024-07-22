---
title: AprilAire
description: Instructions on how to integrate AprilAire devices into Home Assistant.
ha_category:
  - Climate
ha_iot_class: Local Push
ha_release: 2024.3
ha_domain: aprilaire
ha_codeowners:
  - '@chamberlain2007'
ha_config_flow: true
ha_platforms:
  - climate
  - humidifier
  - select
  - sensor
ha_integration_type: device
---

The AprilAire integration allows you to control an AprilAire thermostat.

## Supported Models

This integration supports AprilAire [8800-series Home Automation Wi-Fi Thermostats](https://www.aprilaire.com/whole-house-products/thermostats/home-automation) and [6000-series Wi-Fi Zone Control devices](https://www.aprilaire.com/whole-house-products/zone-control) which support setting the thermostat to automation mode. It is known that there are some models which are marketed as home automation capable that do not support automation mode, and are therefore not supported.

## Prerequisites

In order to connect to the thermostat, you will need to enable automation mode. This involves going into the Contractor Menu on your thermostat and changing the Connection Type to Automation. As the specific instructions can vary per model, consult the manual for your specific model.

{% include integrations/config_flow.md %}

## Caution regarding device limitations

Due to limitations of the thermostats, only one automation connection to a device is permitted at one time (the AprilAire app is not included in this limitation as it uses a separate protocol). Attempting to connect multiple times to the same thermostat simultaneously can cause various issues, including the thermostat becoming unresponsive and shutting down. If this does occur, power cycling the thermostat should restore functionality.
