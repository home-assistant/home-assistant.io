---
title: Raspberry Pi
description: Shows information about your Raspberry Pi in Home Assistant and keeps its firmware up to date.
ha_release: 2022.6
ha_category:
  - Other
  - Update
ha_codeowners:
  - '@home-assistant/core'
ha_domain: raspberry_pi
ha_integration_type: hardware
ha_platforms:
  - update
---

The **Raspberry Pi** {% term integration %} shows which Raspberry Pi board Home Assistant is running on. On a Raspberry Pi 4 or 5, it also lets you update the board's firmware from Home Assistant.

You don't need to set anything up. When you run {% term "Home Assistant Operating System" %} on a Raspberry Pi, Home Assistant detects the board and adds this integration by itself.

If you want to install Home Assistant on a Raspberry Pi, see the [Raspberry Pi installation guide](/installation/raspberrypi/).

## Supported devices

The integration recognizes these boards when they run Home Assistant Operating System:

- Raspberry Pi 5
- Raspberry Pi 4
- Raspberry Pi 3
- Raspberry Pi 2

The [installation guide](/installation/raspberrypi/) lists the boards currently supported by Home Assistant Operating System. Older boards may still be recognized, even when they are no longer supported.

## Configuration

This integration is set up automatically. There is nothing to configure.

## Supported functionality

### Hardware information

Go to {% my hardware title="**Settings** > **System** > **Hardware**" %} to see which Raspberry Pi board you are running.

### Firmware updates

On a Raspberry Pi 5, or a Raspberry Pi 4 booting from an SD card, the integration adds a **Firmware** update entity for the board's bootloader firmware. This requires Home Assistant Operating System 18 or newer. When a new version is available, it shows up under {% my updates title="**Settings** > **System** > **Updates**" %}, like any other update.

To install a firmware update:

1. Go to {% my updates title="**Settings** > **System** > **Updates**" %} and select the Raspberry Pi firmware update.
2. Read the release notes, then select **Update**.
3. After the update is installed, reboot your system for the new firmware to take effect.

{% caution %}
Don't unplug or power off your Raspberry Pi while the firmware is being installed. Losing power during a firmware update can leave the board unable to start.
{% endcaution %}

## Removing the integration

You don't need to remove this integration. If you do, Home Assistant adds it again the next time it starts on a Raspberry Pi.
