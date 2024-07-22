---
title: DSMR Reader
description: Instructions on how to integrate DSMR Reader.
ha_category:
  - Energy
  - Sensor
ha_iot_class: Local Push
ha_config_flow: true
ha_mqtt: true
ha_release: 0.103
ha_codeowners:
  - '@sorted-bits'
  - '@glodenox'
  - '@erwindouna'
ha_domain: dsmr_reader
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: integration
---

The `dsmr_reader` sensor integration allows you to easily add all sensors that [DSMR Reader](https://dsmr-reader.readthedocs.io/en/latest/) (Dutch Smart Meter Requirements Reader) exposes to MQTT. It adds a separate sensor for every field in the MQTT topics which is named `sensor_dsmr_<mqtt_topic>`.

## Prerequisites

To use this DSMR Reader sensor integration, you need to have a DSMR Reader instance running and an MQTT broker to send sensor data through.

1. Add the MQTT broker integration in Home Assistant, if you haven't done so already
2. Configure the MQTT broker in the DSMR Reader application
3. Enable the following data sources in the DSMR Reader administration pages with the default mappings:
   - Day consumption: Split topic
   - Gas consumption: Split topic
   - Meter Statistics: Split topic
   - Quarter-hour peak consumption: Split topic
   - Telegram: Split topic

{% include integrations/config_flow.md %}

## Configuring the energy dashboard

It is most advisable to not use the "total" and "daily" sources. The regular "reading" sensors provide the most stable source of data for Home Assistant to use. These MQTT values are part of the "Telegram: Split topic" MQTT values within DSMR Reader, so make sure to enable them.

| Section          | Sensors to configure                        |
| ---------------- | ------------------------------------------- |
| Grid consumption | Low tariff usage, High tariff usage         |
| Return to grid   | Low tariff returned, High tariff returned   |
| Gas consumption  | Gas meter usage                             |

## Difference with the DSMR integration

This integration relies on the presence of an existing DSMR Reader application setup. It processes the events triggered by the MQTT publishing feature to create sensor entities within Home Assistant. This integration uses the data published on the MQTT broker, no matter how or where the application is installed. By comparison, the [DSMR](/integrations/dsmr/) integration connects directly to the smart meter within Home Assistant and doesn't use the DSMR Reader application.
