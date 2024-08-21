---
title: The Things Network
description: Instructions for how to integrate The Things Network within Home Assistant.
ha_category:
  - Hub
  - Sensor
ha_release: 0.55
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@angelnu'
ha_domain: thethingsnetwork
ha_platforms:
  - sensor
  - binary_sensor
ha_integration_type: hub
ha_config_flow: true
---

The `thethingsnetwork` {% term integration%} allows you to interact with the [The Things Network](https://www.thethingsnetwork.org) from within Home Assistant. This community-driven and open network supports [LoRaWAN](https://www.lora-alliance.org/) for long-range (~5 to 15 km) communication with low bandwidth (51 bytes/message). [Gateways](https://www.thethingsnetwork.org/docs/gateways/) transfer the received data from the sensors to The Things Network.

The Things Network supports various integrations to make the data available:

| The Things Network Integration | Home Assistant platform |
|---|---|
| [MQTT](https://www.thethingsindustries.com/docs/integrations/mqtt) | [`MQTT`](/integrations/mqtt) |
| [Storage](https://www.thethingsindustries.com/docs/integrations/storage) | [`thethingsnetwork`](#setup) |
| [HTTP](https://www.thethingsindustries.com/docs/integrations/webhooks) | |


## Prerequisites

1. Visit the [The Things Network Console](https://console.thethingsnetwork.org/) website, log in with your The Things Network credentials, choose your application from **Applications**.
   - The **Application ID** is used to identify the scope of your data.

   ![Application overview](/images/integrations/thethingsnetwork/applications.png)

2. Under the integrations menu, enable the storage integration:

   ![Storage Integration](/images/integrations/thethingsnetwork/storage_integration.png)

3. Ensure you have an [Uplink Payload Formatter](https://www.thethingsindustries.com/docs/integrations/payload-formatters/) for your device.

   ![Payload Formatters](/images/integrations/thethingsnetwork/payload_formatters.png)

4. You need an API key to be able to read the data from your application. 
   - The minimum required rights are `Read Application Traffic (uplink and downlink)`.

   ![API keys](/images/integrations/thethingsnetwork/apis_key.png)

{% include integrations/config_flow.md %}

## Entity types

All uplink messages decoded by The Things Network (including a `decoded_payload` entry) will be processes by this integration. The integration uses the [ttn_client library](https://github.com/angelnu/thethingsnetwork_python_client) to parse the `decoded_payload`.

The client library has support for some [specific devices](https://github.com/angelnu/thethingsnetwork_python_client?tab=readme-ov-file#supported-devices) but also includes a [default parser](https://github.com/angelnu/thethingsnetwork_python_client/blob/main/tests/parsers/test_data/default_valid.json) which will be described here.

With the default parser and if a field in `decoded_payload` has type object (a dictionary in Python), then each member of the object becomes an entity in Home Assistant.

### Binary Sensor

Any field of type `bool` in the `decoded_payload` JSON will be mapped to a Binary Sensor in Home Assistant.

### Sensor

The following field types in `decoded_payload` are converted to a Sensor in Home Assistant:

- `lists`: converted to a string
- `float`
- `int`
