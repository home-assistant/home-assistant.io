---
title: "MQTT"
description: "Details about the MQTT support of Home Assistant."
---

MQTT (aka MQ Telemetry Transport) is a machine-to-machine or "Internet of Things" connectivity protocol on top of TCP/IP. It allows extremely lightweight publish/subscribe messaging transport.

To integrate MQTT into Home Assistant, you need to setup the [MQTT integration](/integrations/mqtt).

You will also need to setup an MQTT broker, please refer to the [MQTT broker](/docs/mqtt/broker) documentation.

All [MQTT supported platforms](/integrations/mqtt/#supported-platforms) support discovery, alternatively most platforms can be setup manually using `configuration.yaml`.

## Additional features

- [Certificate](/docs/mqtt/certificate/)
- [Discovery](/docs/mqtt/discovery/)
- [Publish service](/docs/mqtt/service/)
- [Birth and last will messages](/docs/mqtt/birth_will/)
- [Testing your setup](/docs/mqtt/testing/)
- [Logging](/docs/mqtt/logging/)
- [Using templates](/docs/configuration/templating/#using-templates-with-the-mqtt-integration)
