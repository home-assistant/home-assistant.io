---
description: Instructions on how to configure fjäråskupan integration.
ha_release: 2021.9
ha_domain: fjaraskupan
---

[Fjäråskupan](https://fjaraskupan.se/) allows you to control your Bluetooth equipped kitchen fan.

There is currently support for the following device types within Home Assistant:

- Binary sensor
- Button
- Fan
- Light

The integration allow control of fan speeds, lights and after cooking timer for kitchen fans.

{% include integrations/config_flow.md %}

## Button

The integration provides a **Reset grease filter** button. Press it after cleaning the grease filter to clear the filter indicator on the hood.

## Debugging integration

If you have problems with the integration you can add debug prints to the log.

```yaml
logger:
  default: info
  logs:
    homeassistant.components.fjaraskupan: debug
```
