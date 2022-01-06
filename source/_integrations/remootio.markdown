---
title: Remootio
description: Instructions on how to integrate Remootio controlled garage door or garden gate into Home Assistant.
ha_release: ???
ha_category:
  - Cover
ha_iot_class: Local Push
ha_domain: remootio
ha_codeowners:
  - '@ivgg-me'
ha_config_flow: true
ha_platforms:
  - cover
---

This integration lets you control [Remootio](https://www.remootio.com/) controlled garage doors and/or gates through Home Assistant.

### Requirements

To use this integration with your Remootio device it must have at least the software version _2.21_, has to be connected to your Wi-Fi, must have a fixed IP address assigned and 
a status sensor installed. Furthermore, the API access must be enabled on the device.

To enable the API access on your Remootio device you need to access it using the master key via the Remootio app, afterward go to the _Websocket API_ settings 
in the _Device software_ section of the device settings and enable the API with logging.

{% include integrations/config_flow.md %}
