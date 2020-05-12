---
title: Universal Powerline Bus (UPB)
description: Instructions on how to setup Univseral Powerline Bus integration.
ha_category:
  - Light
  - Scene
ha_release: "0.110"
ha_config_flow: true
ha_quality_scale: platinum
ha_iot_class: Local Polling
ha_codeowners:
  - '@gwww'
---

The UPB integration allows Home Assistant to connect to a Universal Powerline Bus Powerline Interface Module (UPB PIM) to get status and control UPB devices and UPB links. The UPB PIM may be connected either to a serial port or over TCP. The integration implements the following platforms:
- Light

## Configuration

To add UPB to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **Universal Powerline Bus (UPB)**.

The UPB integration requires that an export from the `UPStart` UPB configuration program. To create an export, in `UPStart`, click the UPB button in the top left and select **Export to File**. This will create a file with the `.upe` extension. The file must be placed somewhere in your Home Assistant installation, for example, in the configuration directory.

## Events

An event is generated whenever a UPB Link is:

- activated
- deactivated
- goes to a new level
- fade is started
- fade is stopped
- blink is started

The event is `upb.link_changed`.

The `event_data` contains the following:

- `command`: One of `activated`, `blink`, `deactivated`, `fade_started`,
  `fade_stopped`, or `goto`.
- `address`: The address of the link reporting the event. The `address`
  is comprised of the UPB network number and the UPB Link number.
  For example for UPB Network number 42 and UPB Link number 24 the
  `address` would be 42_24.
- `brightness_pct`: The brightness level as a percentage. `brightness_pct` is
  reported as -1 if the brightness is a default level or brightness is not
  applicable to the link change.
- `rate`: The rate for link to transition to the new level. `rate` is
  -1 for the default transiton rate.
