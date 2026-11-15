---
description: Read stored device data from The Things Network in Home Assistant.
ha_release: 0.55
ha_domain: thethingsnetwork
---

The **The Things Network (Cloud Storage)** {% term integration %} creates sensors from decoded payload fields stored by [The Things Network](https://www.thethingsnetwork.org/).

To connect live device traffic through LoRaWAN device integrations, use [The Things Network](/integrations/thethingsnetwork_lorawan/).

The Things Network supports various integrations to make the data available:

| The Things Network Integration | Home Assistant platform |
|---|---|
| [MQTT](https://www.thethingsindustries.com/docs/integrations/mqtt) | [`MQTT`](/integrations/mqtt) |
| [Storage](https://www.thethingsindustries.com/docs/integrations/storage) | [`thethingsnetwork`](#setup) |
| [HTTP](https://www.thethingsindustries.com/docs/integrations/webhooks) | |

There is currently support for the following device types within Home Assistant:

- [Prerequisites](#prerequisites)
- [Sensor](#sensor)


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


## Sensor

All uplink messages decoded by The Things Network (including a `decoded_payload` entry) will be processes by this integration. Each field in `decoded_payload` will be added as a Home Assistant sensor entity.
