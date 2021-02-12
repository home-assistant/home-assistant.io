---
title: Apple TV
description: Instructions on how to integrate Apple TV devices into Home Assistant.
ha_category:
  - Multimedia
  - Media Player
  - Remote
ha_iot_class: Local Push
ha_release: 0.49
ha_domain: apple_tv
ha_codeowners:
  - '@postlund'
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - remote
---

The Apple TV integration allows you to control an Apple TV (any generation). See the
[remote platform](/integrations/apple_tv#remote) if you want to send remote control buttons,
e.g., arrow keys.

There is currently support for the following device types within Home Assistant:

- Media Player
- [Remote](#remote)

## Configuration

Menu: *Configuration* > *Integrations*

Press on **Apple TV** and configure the integration:

* Enter either an IP address or a device name and follow the next few steps

## FAQ

### My Apple TV does not turn on/off when I press on/off in the frontend

That is correct; it only toggles the power state in Home Assistant. Turning the device on or off is
currently not supported. However, support for this is in development so that it will be added at some
point in the future

### Is it possible to see if a device is on without interacting with it

No

### When adding a new device, a PIN code is requested, but none is shown on the screen

This can happen when pairing the AirPlay protocol in case the access settings are wrong. On your
Apple TV, navigate to Settings, find the AirPlay menu and make sure that the access setting
is set to "Everyone on the same network" and try again.

### The buttons (play, pause, etc.) does not work

The tvOS apps themselves decide what commands they support and when they support
them. Likely, the app you are using does not support the action you are trying
to perform. Before writing an issue about this, verify if the same action is possible with the
Remote app in iOS. If that is the case, please write a bug in
[pyatv](https://github.com/postlund/pyatv/issues/new?assignees=&labels=bug&template=bug_report.md&title=)
and include logs (see Debugging below).

### I'm trying to play a stream via AirPlay, but it doesn't work

The Apple TV is quite picky when it comes to which formats it plays. The best bet is MP4. If it doesn't
work, it's likely because of the media format.

## Remote

The `apple_tv` remote platform allows you to send remote control buttons to an Apple TV. It is
automatically set up when an Apple TV is configured.

At the moment, the following buttons are available (but not necessarily supported by all devices):

- `up`
- `down`
- `left`
- `right`
- `menu`
- `top_menu`
- `select`
- `volume_up`
- `volume_down`
- `home`
- `home_hold`

A typical service call for press several buttons looks like this.

```yaml
service: remote.send_command
data:
  entity_id: remote.apple_tv
  command:
    - left
    - left
    - menu
    - select
```

## Debugging

If you have any problems and intend to write an issue, make sure you have the
relevant logs included. For this integration, you can enable them like this:

```yaml
logger:
  logs:
    pyatv: debug
    homeassistant.components.apple_tv: debug
```

By providing logs directly when creating the issue, you will likely get help
much faster.
