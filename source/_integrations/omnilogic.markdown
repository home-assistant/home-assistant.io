---
title: Hayward Omnilogic
description: Instructions on how to configure Hayward OmniLogic integration.
ha_category:
  - Sensor
ha_release: 0.116
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@oliver84'
  - '@djtimca'
  - '@gentoosu'
ha_domain: omnilogic
---

[Hayward OmniLogic](https://www.hayward-pool.com/shop/en/pools/omnilogic-i-auomni--1) smart pool and spa technology control.

There is currently support for the following device types within Home Assistant:

- Sensor

## Configuration

Home Assistant offers Hayward OmniLogic integration through **Configuration** -> **Integrations** -> **Hayward OmniLogic**. Enter your `username` and `password` when prompted. Use your registered email address as the username.

## Known limitations

- The platform only supports sensors at the initial release. Future releases will include light/switch/water heater for control of lights, pumps, relays and heaters.

## Debugging integration

If you have problems with the integration you can add debug prints to the log to aid in troubleshooting.

```yaml
logger:
  default: info
  logs:
    omnilogic: debug
    homeassistant.components.omnilogic: debug
