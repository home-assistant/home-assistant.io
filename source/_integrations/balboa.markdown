---
title: "Balboa Spa"
description: "Instructions on how to configure Balboa Spa integration."
ha_category:
  - Binary Sensor
  - Climate
  - Fan
  - Switch
ha_release: 0.104
ha_iot_class: Local Push
---

This integration adds "local push" support for [Balboa](http://www.balboawatergroup.com/) Spa WiFi Modules to be used within Home Assistant.

There is currently support for the following device types within Home Assistant:

- Binary Sensor
- Climate
- Fan
- Switch

## Configuration

Home Assistant offers Balboa Spa integration through **Configuration** -> **Integrations** -> **Balboa Spa**. Simply enter `host` when prompted.

## Known limitations

- The WiFi Module is a direct connection to the control panel of the spa.  Certain combinations of settings are not possible due to limitations of the spa.
- Turning on certain pumps, depending on the spa configuration, may cause other pumps to come online as well.
- The spa WiFi Module will need to be configured initially by the phone app to authenticate and get an IP on your network.
- The WiFi Module will automatically disconnect from Home Assistant periodically, and then be automatically reconnected.  This is built-in to the hardware.

## Debugging integration

If you have problems with Balboa or the integration you can add debug prints to the log.

```yaml
logger:
  default: info
  logs:
    pybalboa: debug
    homeassistant.components.balboa: debug
```
