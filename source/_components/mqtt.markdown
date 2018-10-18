---
layout: page
title: "MQTT"
description: "Instructions on how to setup MQTT within Home Assistant."
date: 2015-08-07 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Hub
featured: true
ha_release: pre 0.7
ha_iot_class: local push
---

MQTT (aka MQ Telemetry Transport) is a machine-to-machine or "Internet of Things" connectivity protocol on top of TCP/IP. It allows extremely lightweight publish/subscribe messaging transport.

Your first step to get MQTT and Home Assistant working is to choose a [broker](/docs/mqtt/broker).

To integrate MQTT into Home Assistant, add the following section to your `configuration.yaml` file. 

To connect to your [own MQTT broker](/docs/mqtt/broker#run-your-own):

```yaml
# Example configuration.yaml entry
mqtt:
  broker: IP_ADDRESS_BROKER
```

You can also use the [embedded MQTT broker](/docs/mqtt/broker#embedded-broker). A separate broker is advised for more stability.

```yaml
# Example configuration.yaml entry
mqtt:
  password: hello
```

This allows you to connect to the MQTT broker with user `homeassistant` and password `hello`.

## {% linkable_title Additional features %}

- [Certificate](/docs/mqtt/certificate/)
- [Discovery](/docs/mqtt/discovery/)
- [Publish service](/docs/mqtt/service/)
- [Birth and last will messages](/docs/mqtt/birth_will/)
- [Testing your setup](/docs/mqtt/testing/)
- [Logging](/docs/mqtt/logging/)
- [Processing JSON](/docs/mqtt/processing_json/)

