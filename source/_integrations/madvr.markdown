---
title: madVR Envy
description: Instructions on how to integrate a madVR Envy into Home Assistant.
ha_category:
  - Remote
  - Binary Sensor
  - Sensor
  - Button
ha_release: '2024.8'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@iloveicedgreentea'
ha_domain: madvr
ha_platforms:
  - binary_sensor
  - remote
  - sensor
  - button
ha_integration_type: device
---

The madVR Envy allows for the automation and control of [madVR Envy devices](https://madvrenvy.com).

## Supported Devices

This integration supports all current madVR Envy models.

{% include integrations/config_flow.md %}

## Remote

The madVR Envy remote platform will create a [remote](/integrations/remote/) entity for the device. This entity allows you to send the following commands via the [remote.send_command](/integrations/remote/) action.

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

### Usage Example
`remote.send_command`: `KeyPress, MENU`

## Binary sensor

- `Power state` is On when the device is turned on.
- `Signal state` is On when the device is receiving a signal from the source.
- `HDR flag` is On when the device is receiving an HDR signal. This is useful to trigger automations based on the HDR flag, such as changing projector settings.
- `Outgoing HDR flag` is On when the device is sending an HDR signal.

These can be used for various purposes, such as triggering your masking system based on the detected aspect ratio.

## Sensor

### Enabled By Default

- `Aspect ratio decimal`: The aspect ratio as a decimal value.
- `Incoming bit depth`: The bit depth of the incoming video signal.
- `Incoming black levels`: The black level setting of the incoming video signal.
- `Incoming color space`: The color space of the incoming video signal.
- `Incoming colorimetry`: The colorimetry of the incoming video signal.
- `Incoming frame rate`: The frame rate of the incoming video signal.
- `Incoming resolution`: The resolution of the incoming video signal.
- `Masking decimal`: The masking ratio as a decimal value.
- `Outgoing bit depth`: The bit depth of the outgoing video signal.
- `Outgoing black levels`: The black level setting of the outgoing video signal.
- `Outgoing color space`: The color space of the outgoing video signal.
- `Outgoing colorimetry`: The colorimetry of the outgoing video signal.
- `Outgoing frame rate`: The frame rate of the outgoing video signal.
- `Outgoing resolution`: The resolution of the outgoing video signal.

### Disabled By Default

- `Aspect ratio integer`: The aspect ratio as an integer ratio.
- `Aspect ratio name`: The name of the current aspect ratio.
- `Aspect ratio resolution`: The resolution corresponding to the current aspect ratio.
- `CPU temperature`: The temperature of the CPU.
- `GPU temperature`: The temperature of the GPU.
- `HDMI temperature`: The temperature of the HDMI interface.
- `Incoming aspect ratio`: The aspect ratio of the incoming video signal.
- `Incoming signal type`: The type of the incoming signal (3D or 2D).
- `Mainboard temperature`: The temperature of the mainboard.
- `Masking integer`: The masking ratio as an integer ratio.
- `Masking resolution`: The resolution for the current masking setting.
- `Outgoing signal type`: The type of the outgoing signal (3D or 2D).

These sensors are disabled because their values are not commonly needed but they can be enabled in the UI according to your needs.

## Buttons

The integration creates buttons which send commands to the device. You can add these buttons in the UI to build a virtual remote or add them in scripts/automations.

### Navigation & Menus

- `Up`: Simulates pressing the up button.
- `Down`: Simulates pressing the down button.
- `Left`: Simulates pressing the left button.
- `Right`: Simulates pressing the right button.
- `OK`: Simulates pressing the OK button.
- `Back`: Simulates pressing the back button.
- `Red`: Simulates pressing the red button.
- `Green`: Simulates pressing the green button.
- `Blue`: Simulates pressing the blue button.
- `Yellow`: Simulates pressing the yellow button.
- `Magenta`: Simulates pressing the magenta button.
- `Cyan`: Simulates pressing the cyan button.
- `Open info menu`: Opens the info menu.
- `Open settings menu`: Opens the settings menu.
- `Open configuration menu`: Opens the configuration menu.
- `Open profiles menu`: Opens the profiles menu.
- `Open test patterns menu`: Opens the test patterns menu.

### Debugging & Demos

- `Reset temporary`: Resets temporary settings to their default values.
- `Toggle tone map`: Toggles the tone mapping feature on or off.
- `Toggle highlight recovery`: Toggles the highlight recovery feature on or off.
- `Toggle contrast recovery`: Toggles the contrast recovery feature on or off.
- `Toggle shadow recovery`: Toggles the shadow recovery feature on or off.
- `Toggle 3D LUT`: Toggles the 3D Look-Up Table (LUT) feature on or off.
- `Toggle screen boundaries`: Toggles the display of screen boundaries.
- `Toggle histogram`: Toggles the display of the video histogram.
- `Toggle debug OSD`: Toggles the debug on-screen display.
- `Refresh license info`: Refreshes the license information.
- `Force 1080p60 output`: Forces the output to 1080p at 60Hz (basically safe mode).
