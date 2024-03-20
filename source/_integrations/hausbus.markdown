---
title: Haus-Bus
description: Instructions on how to setup Haus-Bus devices from Haus-Bus.de within Home Assistant.
ha_category:
  - Light
ha_release: 2024.4
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@Zero545'
ha_domain: hausbus
ha_platforms:
  - light
ha_integration_type: hub
---

[Haus-Bus.de](https://haus-bus.secure-stores.de/) is a manufacturer of smart home equipment based in Germany.
This integration communicates to any of the Haus-Bus devices equipped with a LAN port.


There is currently support for the following device types within Home Assistant:

- [Light](#light)

### Supported devices

Currently only light based devices are supported, i.e. all dimmer channels on the devices [IO-Module](https://haus-bus.secure-stores.de/?showProduct=6), [8-channel 230V dimmer](https://haus-bus.secure-stores.de/?showProduct=14), [2-channel RGB dimmer](https://haus-bus.secure-stores.de/?showProduct=9).

The supported devices are automatically detected in the local network via UDP broadcast, upon loading the integration.

{% include integrations/config_flow.md %}

## Debugging integration

If you have problems with the Haus-Bus integration you can add debug prints to the log.

```yaml
logger:
  default: info
  logs:
    homeassistant.components.hausbus: debug
```