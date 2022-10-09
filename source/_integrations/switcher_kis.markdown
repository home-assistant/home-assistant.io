---
title: Switcher
description: Integrate Switcher devices.
ha_category:
  - Switch
ha_release: 0.93
ha_iot_class: Local Push
ha_codeowners:
  - '@tomerfi'
  - '@thecode'
ha_domain: switcher_kis
ha_platforms:
  - sensor
  - switch
ha_config_flow: true
ha_quality_scale: platinum
ha_integration_type: integration
---

This `Switcher` integration allows you to control your [Switcher Devices](https://www.switcher.co.il/).

Supported devices:

- Switcher Power Plug
- Switcher Touch (from firmware 1.51)
- Switcher V2 (Espressif chipset - from firmware 3.21)
- Switcher V2 (Qualcomm chipset - from firmware 72.32)
- Switcher V4

If you completed the integration setup but are still unable to control the device, please make sure your device's firmware is up-to-date.

{% include integrations/config_flow.md %}

## Sensors

| Sensor Name         | Description                                            | Example           |
| ------------------- | ------------------------------------------------------ | ----------------- |
| `Auto Shutdown`     | The auto shutdown time limit configured on the device  | 01:30:00          |
| `Remaining Time`    | Time remaining to shutdown (auto or timer)             | 01:29:41          |
| `Electric Current`  | The electric current in amps                           | 12.5 A            |
| `Power Consumption` | The power consumption in watts                         | 2756 W            |

## Services

### Service: `switcher_kis.set_auto_off`

You can use the `switcher_kis.set_auto_off` service to set the auto-off configuration setting for the device.

Meaning the device will turn itself off when reaching the auto-off configuration limit.

| Service Field | Mandatory | Description                                                                            | Example                    |
| ------------- | --------- | -------------------------------------------------------------------------------------- | -------------------------- |
| `entity_id`   | Yes       | Name of the entity id associated with the integration, used for permission validation  | switch.switcher_kis_boiler |
| `auto_off`    | Yes       | Time period string containing hours and minutes                                        | "02:30"                    |

### Service: `switcher_kis.turn_on_with_timer`

You can use the `switcher_kis.turn_on_with_timer` service to turn on the switcher device with timer.

Meaning the device will turn itself off when timer ends.
Note: This does not affect the auto off timer.
| Service Field | Mandatory | Description                                                                            | Example                    |
| ------------- | --------- | -------------------------------------------------------------------------------------- | -------------------------- |
| `entity_id`   | Yes       | Name of the entity id associated with the integration, used for permission validation  | switch.switcher_kis_boiler |
| `timer_minutes`    | Yes       | Integer containing timer minutes (valid range 1 to 150)                                      | 90                    |

## Notes

Make sure that Home Assistant host's firewall allows incoming traffic on UDP port 20002 and outgoing connections to Switcher device(s) on TCP port 9957.
If Home Assistant and the Switcher device(s) are not on the same network, you will also need to have their traffic properly forwarded between the two networks.
