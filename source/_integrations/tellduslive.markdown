---
title: Telldus Live
description: Instructions on how to integrate Telldus Live into Home Assistant.
ha_category:
  - Hub
  - Binary Sensor
  - Cover
  - Light
  - Sensor
  - Switch
ha_release: 0.11
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_quality_scale: gold
ha_codeowners:
  - '@fredrike'
ha_domain: tellduslive
ha_platforms:
  - binary_sensor
  - cover
  - light
  - sensor
  - switch
---

The `tellduslive` integration let you connect to [Telldus Live](https://live.telldus.com). It's cloud platform that connects to your Tellstick Net or Tellstick ZNet connected gear at home.

Home Assistant will automatically discover the presence of a Tellstick Net or Tellstick ZNet on your local network if the [discovery](/integrations/discovery/) integration is enabled. When discovery and the key exchange with Telldus Live have been completed, you will be presented with an option to integrate with the cloud or local API for direct communication with your hardware in your LAN. Local API supports only one device at this stage. Local API is only supported with the Znet Lite products, the older hardware (such as Tellstick Net) does not support local API.

## Configuration

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
scan_interval:
  description: Interval (in seconds) for polling the Telldus Live server (or the local server).
  required: false
  type: integer
  default: 60
{% endconfiguration %}

<div class='note'>

It is only possible to configure the `scan_interval` when setting up the device. If the polling interval needs to be changed after the device is configured it must be changed manually by changing `"scan_interval": 60,` for the device in the file `.storage/core.config_entries`.

</div>

The integration will offer configuration through the Home Assistant user interface where it will let you associate it with your Telldus Live account.
