---
title: madVR Envy
description: Instructions on how to integrate a madVR Envy into Home Assistant.
ha_category:
  - Remote
  - Binary Sensor
ha_release: '2024.8'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@iloveicedgreentea'
ha_domain: madvr
ha_platforms:
  - binary_sensor
  - remote
ha_integration_type: device
---

The madVR Envy allows for the automation and control of [madVR Envy devices](https://madvrenvy.com).

## Supported Devices

This integration supports all current madVR Envy models.

{% include integrations/config_flow.md %}

## Remote

The madVR Envy remote platform will create a [remote](/integrations/remote/) entity for the device. This entity allows you to send the following commands via the [remote.send_command](/integrations/remote/) service.

The command structure uses the same keywords as the [official documentation](https://madvrenvy.com/wp-content/uploads/EnvyIpControl.pdf?r=113a) and simply sends the corresponding command to the device. Please refer to the official documentation for more details and usage.

Using these commands, you can create a digital remote in the UI.

### Single Commands

These are commands that can be sent standalone, no parameters.

- `PowerOff`
- `Standby`
- `Restart`
- `ReloadSoftware`
- `Bye`
- `ResetTemporary`
- `CloseMenu`
- `GetMaskingRatio`
- `GetMacAddress`
- `ToneMapOn`
- `ToneMapOff`
- `Hotplug`
- `RefreshLicenseInfo`
- `Force1080p60Output`


### Commands with Parameters

These are commands that have parameters with a comma separating them.

- `ActivateProfile (SOURCE | DISPLAY | CUSTOM)`
- `OpenMenu (Info | Settings | Configuration | Profiles | TestPatterns)`
- `KeyPress (MENU | UP | DOWN | LEFT | RIGHT | OK | INPUT | SETTINGS | RED | GREEN | BLUE | YELLOW | POWER)`
- `KeyHold (MENU | UP | DOWN | LEFT | RIGHT | OK | INPUT | SETTINGS | RED | GREEN | BLUE | YELLOW | POWER)`

### Binary sensor

The integration creates the following binary sensors:

- `Power state` is True when the device is physically on.
- `Signal state` is True when the device is receiving a signal from the source.
- `HDR flag` is True when the device is receiving an HDR signal. This is useful to trigger automations based on the HDR flag, such as changing projector settings.
- `Outgoing HDR flag` is True when the device is sending an HDR signal.
These can be used for various purposes, such as triggering your masking system based on the detected aspect ratio.
