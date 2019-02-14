---
layout: page
title: "Telldus Live"
description: "Instructions on how to integrate Telldus Live into Home Assistant."
date: 2016-01-17 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: tellduslive.svg
ha_category: 
  - Hub
  - Binary Sensor
  - Cover
  - Light
  - Sensor
  - Switch
featured: false
ha_release: 0.11
ha_config_flow: true
ha_qa_scale: gold
ha_iot_class: 'Cloud Polling'
redirect_from:
  - /components/binary_sensor.tellduslive/
  - /components/cover.tellduslive/
  - /components/light.tellduslive/
  - /components/sensor.tellduslive/
  - /components/switch.tellduslive/
---

The `tellduslive` component let you connect to [Telldus Live](https://live.telldus.com). It's cloud platform that connects to your Tellstick Net or Tellstick ZNet connected gear at home.

<p class='note warning'>
If you are upgrading from 0.58 or older, you need to remove all Telldus configuration from your `configuration.yaml` file before continuing.
</p>

Home Assistant will automatically discover the presence of a Tellstick Net or Tellstick ZNet on your local network if the [discovery]({{site_root}}/components/discovery/) component is enabled. When discovery and the key exchange with Telldus Live have been completed, you will be presented with an option to integrate with the cloud or local API for direct communication with your hardware in your LAN. Local API supports only one device at this stage. Local API is only supported with the Znet Lite products, the older hardware (such as Tellstick Net) does not support local API.

## {% linkable_title Configuration %}

To manually integrate your Telldus Live with Home Assistant, e.g., if your device is on another network or in another location, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
tellduslive:
```

{% configuration %}
host:
  description: Host address to Tellstick Net or Tellstick ZNet for Local API, only useful when automatic discovery is not enabled.
  required: false
  type: string
update_interval:
  description: Interval (in seconds) for polling the Telldus Live server (or the local server).
  required: false
  type: integer
  default: 60
{% endconfiguration %}

<p class='note'>  
It is only possible to configure the `update_interval` when setting up the device. If the polling interval needs to be changed after the device is configured it must be changed manually by changing `"scan_interval": 60,` for the device in the file `.storage/core.config_entries`.
</p>

The component will offer configuration through the Home Assistant user interface where it will let you associate it with your Telldus Live account.
