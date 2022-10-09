---
title: MQTT
description: Instructions on how to setup MQTT within Home Assistant.
ha_category:
  - Hub
featured: true
ha_release: pre 0.7
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@emontnemery'
ha_domain: mqtt
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - camera
  - climate
  - cover
  - diagnostics
  - fan
  - humidifier
  - lock
  - number
  - scene
  - select
  - sensor
  - siren
  - switch
ha_integration_type: integration
---

MQTT (aka MQ Telemetry Transport) is a machine-to-machine or "Internet of Things" connectivity protocol on top of TCP/IP. It allows extremely lightweight publish/subscribe messaging transport.

Your first step to get MQTT and Home Assistant working is to choose a [broker](/docs/mqtt/broker).

{% include integrations/config_flow.md %}

### Advanced broker configuration

Some broker configuration options can't be set via the user interface, but require changes to your `configuration.yaml` file. See [advanced broker configuration](/docs/mqtt/broker/#advanced-broker-configuration) for all configuration variables.

## Additional features

- [Certificate](/docs/mqtt/certificate/)
- [Discovery](/docs/mqtt/discovery/)
- [Publish & Dump services](/docs/mqtt/service/)
- [Birth and last will messages](/docs/mqtt/birth_will/)
- [Testing your setup](/docs/mqtt/testing/)
- [Logging](/docs/mqtt/logging/)

## Event `event_mqtt_reloaded`

Event `event_mqtt_reloaded` is fired when Manually configured MQTT entities have been reloaded and entities thus might have changed.

This event has no additional data.
