---
title: Swing2Sleep Smarla
description: Instructions on connecting Swing2Sleep Smarla to Home Assistant.
ha_category:
  - Button
  - Number
  - Sensor
  - Switch
  - Update
ha_iot_class: Cloud Push
ha_release: 2025.6
ha_codeowners:
  - '@explicatis'
  - '@rlint-explicatis'
ha_domain: smarla
ha_integration_type: device
ha_config_flow: true
ha_platforms:
  - button
  - number
  - sensor
  - switch
  - update
ha_quality_scale: bronze
---

The **Swing2Sleep Smarla** {% term integration %} enables Home Assistant to integrate [Swing2Sleep](https://swing2sleep.de) (Smarla) motorized cradles. This integration will allow you to control your Smarla device.

## Requirements

- Swing2Sleep Smarla device with Version 1.6.X or later.
- Swing2Sleep app.
- Internet connectivity.

## Registration

1. Follow the instructions in the Swing2Sleep app.
2. Connect the device to your Wi-Fi network.
3. Follow the steps for **Configuration** until the access token field appears
4. In the Swing2Sleep app, generate an access token under **Settings**.
5. Copy the access token and continue with the **Configuration**.

{% include integrations/config_flow.md %}

## Provided entities

The **Swing2Sleep Smarla** integration provides one `switch` entity for each configured Smarla device as its main feature, allowing you to toggle the cradle's oscillation.
The firmware of each device can be monitored and updated through an `update` entity available on the device page.

Additionally, the integration sets up the following entities:

- **Switches**
  - `Smart mode`: Enables or disables automatic intensity control.
- **Numbers**
  - `Intensity`: Sets the intensity level (range: `0` to `100`).
- **Sensors**
  - `Amplitude`: Displays the current measured amplitude of the oscillation.
  - `Period`: Displays the current measured period of the oscillation.
  - `Activity`: Displays the current measured activity level.
  - `Swing count`: Displays the total number of swings.
  - `Total swing time`: Displays the total swing time in seconds.
- **Buttons**
  - `Send diagnostics`: Triggers a one-time event to send diagnostic data to the manufacturer.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After deleting the integration, go to the Swing2Sleep app and remove the "Home Assistant" entry under **Settings** > **Connected devices** as well.
