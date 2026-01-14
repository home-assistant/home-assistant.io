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
  - device_tracker
  - sensor
ha_integration_type: hub
ha_config_flow: true
---

The **The Things Network** {% term integration%} allows you to interact with the [The Things Network](https://www.thethingsnetwork.org) from within Home Assistant. This community-driven and open network supports [LoRaWAN](https://www.lora-alliance.org/) for long-range (~5 to 15 km) communication with low bandwidth (51 bytes/message). [Gateways](https://www.thethingsnetwork.org/docs/gateways/) transfer the received data from the sensors to The Things Network.

The Things Network supports various integrations to make the data available:

| The Things Network Integration | Home Assistant platform |
|---|---|
| [MQTT](https://www.thethingsindustries.com/docs/integrations/mqtt) | [`MQTT`](/integrations/mqtt) |
| [Storage](https://www.thethingsindustries.com/docs/integrations/storage) | [`thethingsnetwork`](#setup) |
| [HTTP](https://www.thethingsindustries.com/docs/integrations/webhooks) | |

There is currently support for the following device types within Home Assistant:

- [Prerequisites](#prerequisites)
- [Sensor](#sensor)
- [Device Tracker](#device-tracker)


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

All uplink messages decoded by The Things Network (including a `decoded_payload` entry) will be processed by this integration. Each field in `decoded_payload` will be added as a Home Assistant sensor entity.


## Device Tracker

The integration automatically creates device tracker entities for TTN devices that report location data. Device trackers are created when the device sends uplink messages containing:

- **GPS coordinates**: Fields named `Latitude_4198` and `Longitude_4197` in the decoded payload
- **Wi-Fi access points**: List of detected Wi-Fi networks with MAC addresses and signal strength

### GPS-based tracking

Devices with GPS capabilities (such as asset trackers) automatically appear as device trackers with their location displayed on the Home Assistant map. The tracker updates whenever the device sends new GPS coordinates.

### Wi-Fi-based tracking

For indoor tracking or devices without GPS, the integration exposes Wi-Fi scan data in the device tracker's state attributes. This data can be used by external geolocation services to determine the device's location based on nearby Wi-Fi networks.

The Wi-Fi data is exposed in the `wifi_access_points` attribute in a format compatible with geolocation APIs:

```json
{
  "wifi_access_points": [
    {
      "macAddress": "AA:BB:CC:DD:EE:FF",
      "signalStrength": -45
    },
    {
      "macAddress": "11:22:33:44:55:66",
      "signalStrength": -67
    }
  ]
}
```

### Priority and fallback

When a device provides GPS coordinates, those take priority over other location methods. If GPS data is unavailable, the device tracker can display locations from external geolocation services that process the Wi-Fi data.

The `location_source` attribute indicates whether the current location is from `gps` or `geocoded` (Wi-Fi-based).
