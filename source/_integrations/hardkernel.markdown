---
title: Hardkernel
description: Shows information about your Hardkernel ODROID board in Home Assistant.
ha_release: 2022.6
ha_category:
  - Other
ha_codeowners:
  - '@home-assistant/core'
ha_domain: hardkernel
ha_integration_type: hardware
---

The **Hardkernel** {% term integration %} shows which Hardkernel ODROID board Home Assistant is running on. This includes the Home Assistant Blue, which is based on the ODROID-N2+.

You don't need to set anything up. When you run {% term "Home Assistant Operating System" %} on an ODROID board, Home Assistant detects the board and adds this integration by itself.

If you want to install Home Assistant on an ODROID, see the [ODROID installation guide](/installation/odroid/).

## Supported devices

The integration recognizes these boards when they run Home Assistant Operating System:

- Home Assistant Blue
- ODROID-N2 and ODROID-N2+
- ODROID-M1 and ODROID-M1S
- ODROID-C4
- ODROID-C2
- ODROID-XU4

The [installation guide](/installation/odroid/) lists the boards currently supported by Home Assistant Operating System. Older boards may still be recognized, even when they are no longer supported.

## Configuration

This integration is set up automatically. There is nothing to configure.

## Supported functionality

Go to {% my hardware title="**Settings** > **System** > **Hardware**" %} to see which ODROID board you are running.

## Removing the integration

You don't need to remove this integration. If you do, Home Assistant adds it again the next time it starts on an ODROID board.
