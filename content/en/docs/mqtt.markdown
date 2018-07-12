---
layout: page
title: "MQTT"
description: "Details about the MQTT support of Home Assistant."
date: 2017-02-15 08:00
sidebar: true
comments: false
sharing: true
footer: true
---

MQTT (aka MQ Telemetry Transport) is a machine-to-machine or "Internet of Things" connectivity protocol on top of TCP/IP. It allows extremely lightweight publish/subscribe messaging transport.

To integrate MQTT into Home Assistant, add the following section to your `configuration.yaml` file. Keep in mind that the minimal setup will run with [an embedded MQTT broker](/docs/mqtt/broker#embedded-broker):

```yaml
# Example configuration.yaml entry
mqtt:
```

For other setup methods, please refer to the [MQTT broker](/docs/mqtt/broker) documentation.

## {% linkable_title Additional features %}

- [Certificate](/docs/mqtt/certificate/)
- [Discovery](/docs/mqtt/discovery/)
- [Publish service](/docs/mqtt/service/)
- [Birth and last will messages](/docs/mqtt/birth_will/)
- [Testing your setup](/docs/mqtt/testing/)
- [Logging](/docs/mqtt/logging/)
- [Processing JSON](/docs/mqtt/processing_json/)

See the [MQTT example component](/cookbook/python_component_mqtt_basic/) how to integrate your own component.
