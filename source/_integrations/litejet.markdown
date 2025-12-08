---
title: LiteJet
description: Instructions on how to setup the LiteJet hub, Centralite Elegance or Centralite Jetstream within Home Assistant.
ha_category:
  - Light
  - Scene
  - Switch
ha_iot_class: Local Push
ha_release: 0.32
ha_domain: litejet
ha_config_flow: true
ha_platforms:
  - diagnostics
  - light
  - scene
  - switch
ha_codeowners:
  - '@joncar'
ha_integration_type: hub
---

LiteJet is a centralized lighting system that predates most home automation technology. All lights and wall switches are wired to a central panel. This central panel has a serial port interface that allows a computer to control the system via LiteJet's third party protocol. Home Assistant integrates the LiteJet 3rd party protocol and allows you to get the status and control the connected lights. This integration also supports the Centralite Elegance and Centralite Jetstream.

## Prerequisites

Your LiteJet MCP should be configured for 19.2 K baud, 8 data bits, 1 stop bit, no parity, and to transmit a 'CR' after each response. These settings can be configured using the LiteJet programming software from the [Dragon Technologies](https://www.dragontechinc.com/) Programming page. Connect the LiteJet's RS232-2 port to your computer.

{% include integrations/config_flow.md %}

By default only light entities will be enabled. Scene and switch entities can be individually enabled on the integration's entity list page.

### Trigger

LiteJet switches can be used as triggers to allow those buttons to behave differently based on hold time. For example, automation can distinguish quick tap versus long hold.

- **platform** (*Required*): Must be 'litejet'.
- **number** (*Required*): The switch number to be monitored.
- **held_more_than** (*Optional*): The minimum time the switch must be held before the trigger can activate.
- **held_less_than** (*Optional*): The maximum time the switch can be held for the trigger to activate.

The trigger will activate at the earliest moment both `held_more_than` and `held_less_than` are known to be satisfied. If neither are specified, the trigger activates the moment the switch is pressed. If only `held_more_than` is specified, the trigger will activate the moment the switch has been held down at least that time. If `held_less_than` specified, the trigger can only activate when the switch is released.

```yaml
automation:
- triggers:
    platform: litejet
    number: 55
    held_more_than:
      milliseconds: 1000
    held_less_than:
      milliseconds: 2000
```
