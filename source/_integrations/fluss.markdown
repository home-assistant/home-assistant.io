---
title: Fluss+
description: Instructions on how to integrate Fluss+ devices within Home Assistant.
ha_category:
  - Button
  - Cover
ha_release: 2026.1
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@fluss'
ha_domain: fluss
ha_config_flow: true
ha_platforms:
  - button
  - cover
ha_integration_type: integration
ha_quality_scale: bronze
---

The **Fluss+** {% term integration %} allows you to control [Fluss+](https://fluss.io/) devices through Home Assistant. Fluss turns your phone into a remote key that can open your garage, your gate, your door or even the parking at your office - giving you complete control. The Home Assistant integration allows you to trigger Fluss+ devices via Wi-Fi to open or close a connected motor device.

## Prerequisites

- A Fluss+ device [physically connected to your appliance](https://support.fluss.io/portal/en/kb/articles/fluss-installation-guide), for example a garage door opener.
- A Fluss+ device [claimed](https://support.fluss.io/portal/en/kb/articles/claiming-a-fluss) and [connected to Wi-Fi](https://support.fluss.io/portal/en/kb/articles/how-to-connect-the-fluss-to-wi-fi).
- An [API key](https://support.fluss.io/portal/en/kb/articles/how-to-get-an-api-key-on-fluss-plus) for your Fluss+ device.
- A [Home Assistant instance](/installation/) set up and running.
- _(Optional)_ [Remote access](/cloud/) to reach your Fluss+ device from anywhere.

{% important %}
Enabling remote access to your Home Assistant instance—via port forwarding, tunnels, DuckDNS, or any other method—exposes your system to the internet. It increases the risk of unauthorized access, security breaches, or compromise of connected devices, including your Fluss+ controls.

We are not responsible for any security issues, data loss, unauthorized control of your devices, property damage, personal injury, or other consequences that may result from improper configuration, vulnerabilities, weak credentials, or external attacks.

Set up remote access only if you fully understand the risks and have implemented strong security measures, such as HTTPS, multi-factor authentication, IP banning, regular updates, and preferably a VPN or [Home Assistant Cloud](/cloud/) instead of direct exposure.

Proceed entirely at your own risk. If in doubt, keep Home Assistant local-only and avoid exposing it remotely.
{% endimportant %}

{% include integrations/config_flow.md %}

## Supported functionality

Every Fluss+ device is exposed as a [button](#button). If the device also has the open/close status sensor installed, a [cover](#cover) entity is added alongside the button.

### Button

A button in Home Assistant represents a Fluss device you have access to. You can press the button for a certain device via Wi-Fi, and it will then send a command to the connected device (like a garage door opener).

#### Example

If you have access to three devices in the Fluss+ app, named "Home Garage Door," "Front Gate," and "Office Park," Home Assistant will display three buttons, each labeled with the corresponding device name. Pressing the "Home Garage Door" button sends a command to the Fluss+ device connected to your garage door opener, which will then trigger the motor to open / close. The same applies to the other devices.

### Cover

If your Fluss+ device reports a status sensor (open or closed state of the connected motor), Home Assistant creates a cover entity for it with the **Garage** device class. You can open and close the cover from the Home Assistant UI or from automations and see its current state.

If you don't have a sensor installed yet and would like to see the open or closed status of your device, see the [Fluss+ sensor installation guide](https://support.fluss.io/portal/en/kb/articles/sensor-set-up-instructions).

## Data updates

The integration {% term polling polls %} the Fluss+ cloud API every 30 minutes for updated device status. After you open or close a cover, the integration also schedules an additional status refresh, so the entity state catches up without waiting for the next scheduled poll. This ensures the entity reflects its new position without waiting for the next scheduled poll.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
