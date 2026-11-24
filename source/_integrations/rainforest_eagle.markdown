---
description: Instructions on how to set up the Rainforest Eagle with Home Assistant.
ha_release: 0.97
ha_domain: rainforest_eagle
---

Integrates energy usage and pricing from the Rainforest Automation's [Eagle 3](https://www.rainforestautomation.com/rfa-z114-eagle-200-2/), Eagle-200 and [Legacy Eagle](https://rainforestautomation.com/support/rfa-z109-eagle-support/) energy gateways. These devices work over Zigbee Energy Profile to connect to your smart meter. As such, they do not connect to your regular Zigbee network (you don't even need a Zigbee network as part of your system), but typically will need to be provisioned (that is to say, connected to your meter) by your utility. You then connect the Eagle to your home network and can pull energy usage via the device's local API. The price will only be included if it is provided by the electricity meter. If you picked an electricity plan in the app, the price data will not be available.

As the Eagle 3 runs the same API as the Eagle 200, Home Assistant will set up your Eagle 3 as an "Eagle 200".

{% include integrations/config_flow.md %}

## Meter connectivity

For Eagle-200 and Eagle 3 gateways, the **Meter connectivity** binary sensor reports whether the gateway is connected to its electricity meter. Its state is **Connected** or **Disconnected**. If Home Assistant cannot retrieve data from the gateway, the sensor becomes **Unavailable** instead.

To view connection changes, go to **Settings** > **Devices & services**, select **Rainforest Eagle**, and open your gateway's device page. The **Activity** panel shows changes to the meter connectivity sensor. Power and energy readings are shown in **History** because numeric sensor changes are excluded from **Activity**.

The integration checks the meter connection every 30 seconds. A disconnect and reconnect between checks may not be detected. Legacy Eagle-100 gateways do not provide this sensor.
