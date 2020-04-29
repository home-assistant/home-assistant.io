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
  - '@home-assistant/core'
  - '@emontnemery'
ha_domain: mqtt
---

MQTT (aka MQ Telemetry Transport) is a machine-to-machine or "Internet of Things" connectivity protocol on top of TCP/IP. It allows extremely lightweight publish/subscribe messaging transport.

Your first step to get MQTT and Home Assistant working is to choose a [broker](/docs/mqtt/broker).

The preferred way to setup MQTT for your installation is via **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **MQTT**.

Alternatively, if you want to manually configure MQTT, you will need to add the following to your `configuration.yaml` file.

To connect to your [own MQTT broker](/docs/mqtt/broker#run-your-own):

```yaml
# Example configuration.yaml entry
mqtt:
  broker: IP_ADDRESS_BROKER
```

You can also use the [embedded MQTT broker](/docs/mqtt/broker#embedded-broker). A separate broker is advised for more stability.

<div class='note warning'>
As of release 0.92, the embedded broker has been marked as deprecated. This means bugs may not be fixed, and the broker functionality will be removed in a future release.
</div>

```yaml
# Example configuration.yaml entry
mqtt:
  password: hello
```

This allows you to connect to the MQTT broker with user `homeassistant` and password `hello`.

## Additional features

- [Certificate](/docs/mqtt/certificate/)
- [Discovery](/docs/mqtt/discovery/)
- [Publish & Dump services](/docs/mqtt/service/)
- [Birth and last will messages](/docs/mqtt/birth_will/)
- [Testing your setup](/docs/mqtt/testing/)
- [Logging](/docs/mqtt/logging/)
- [Processing JSON](/docs/mqtt/processing_json/)
