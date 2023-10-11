---
title: Browan (BETA)
description: Instructions on how to integrate Browan (LoRaWAN communication) devices with Home Assistant.
ha_category:
  - Sensor
ha_release: '2023.11'
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - 'Oliv4945'
ha_domain: browan
ha_platforms:
  - sensor
ha_integration_type: integration
---

The Browan integration allows you to read data and control [Browan](https://www.browan.com/product/XP/VJ) LoRaWAN® devices from Home Assistant.

<div class='note warning'>
The integration is marked BETA: The implementation within Home Assistant is in a early stage: only one network server compatible, and one device.
</div>

## What is LoRaWAN?

[LoRaWAN](<https://en.wikipedia.org/wiki/LoRa#LoRaWAN>) is a Low Power, Wide Area (LPWA) networking protocol designed to wirelessly connect battery operated ‘things’ to the internet in regional, national or global networks, and targets key Internet of Things (IoT) requirements such as bi-directional communication, end-to-end security, mobility and localization services.
 Low Power, Wide Area (LPWA) networking protocol designed to wirelessly connect battery operated ‘things’ to the internet in regional, national or global networks, and targets key Internet of Things (IoT) requirements such as bi-directional communication, end-to-end security, mobility and localization services.

One of the great things about LoRaWAN is that you can have both local and cloud networks, allowing you to operate LoRaWAN devices entirely locally at home, but also benefit from worldwide operators like [Helium](<https://www.helium.com/>) for example to get trackers data while they are away, or sensors in remote locations.

{% include integrations/config_flow.md %}

For communicating with LoRaWAN devices, the Home Assistant integration connects to any external network server managing your devices.

<div class='note info'>

Currently, the only compatible network server is [The Things Stack](<https://www.thethingsindustries.com/docs/getting-started/the-things-stack-basics/>); either on [TTN](<https://www.thethingsnetwork.org/>), [TTI](<https://www.thethingsindustries.com/>) or self hosted.

</div>

## Adding Browan devices to Home Assistant

1. Open Home Assistant
2. Setup the MQTT integration to connect to your network server instance, follow TTN [documentation](<https://www.thethingsindustries.com/docs/integrations/mqtt/#creating-an-api-key>) to get your server URL and credentials.
3. Go to {% my integrations title="**Settings** > **Devices & Services**" %}.
4. On the **Devices** tab, press the **Add device** button.
5. Choose **Add Browan device** at the top of the list.
6. Fill the required information.
7. Hit `SUBMIT`, the device is ready for use.

<div class='note info'>
MQTT broker needs to be setup only once.
</div>

<div class='note warning'>

The integration does not yet provide its own MQTT client, if you are already using an MQTT broker you need an additional software to subscribe to TTN broker and republish the messages to yours. This can easily be done with [Node-RED](<https://nodered.org>).

</div>

![image](/images/integrations/browan/hass_config.png)

## Compatible devices

Each device needs specific conversion from the raw data its send over the air to one or several Home Assistant {% term entity %}; to request a new device open an issue in the library [repository](<https://gitlab.com/oliv4945/pyliblorawan/-/issues>).

- [TBMS100](<https://www.browan.com/product/motion-sensor-pir/detail>): PIR sensor for motion detection, also provides temperature (+/- 2°C).
