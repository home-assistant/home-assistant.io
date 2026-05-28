---
title: Cielo Home
description: Instructions on how to integrate Cielo smart thermostats in Home Assistant.
ha_category:
  - Climate
ha_iot_class: Cloud Polling
ha_release: 2026.6
ha_config_flow: true
ha_codeowners:
  - '@cielo-connect'
  - '@ihsan-cielo'

ha_domain: cielo_home
ha_platforms:
  - climate
ha_integration_type: integration
ha_quality_scale: bronze
---

The **Cielo Home** {% term integration %} allows you to control [Cielo](https://www.cielowigle.com) devices directly from Home Assistant, using the cloud-based **Cielo Connect API**.

## Supported devices

The **Cielo Home** {% term integration %} supports the following devices.

- **Cielo Breez Max**: Smart thermostat for mini-splits.
- **Cielo Breez Edge Pro**: Smart thermostat for mini-splits.
- **Cielo Thermostat Eco**: Smart thermostat for central HVAC systems.
- **Cielo Smart Thermostat**: Smart thermostat for central HVAC systems.

## Prerequisites

Before integrating the Cielo devices with Home Assistant, ensure that: 

- Your Cielo device is already registered in the **Cielo Home** app. 
- The device is among the supported devices listed above.
- The device has a configured remote (automatically or manually). 
- Your Home Assistant server has internet access. 
- Before proceeding, ensure the Cielo device is fully compatible with Home Assistant.

### Important API key rules

To safeguard security and prevent unauthorized access, Cielo enforces the following API security restrictions:

- Each API key can be used only once. 
- A new API key cannot be generated until the current one is revoked. 
- You may generate a maximum of 3 keys per month. 
- Once a new API key is generated, wait 60 seconds for it to be displayed on the screen.
- Revoking an API key will disconnect Home Assistant immediately or within about a minute.

### Obtaining an API key

1. Visit the [Cielo Web Portal](https://home.cielowigle.com).
2. Open the Menu by selecting the hamburger menu icon {% icon "mdi:menu" %} at the top left side.
3. Select **Home Assistant** from the sidebar.
4. The API key will be displayed. Copy the API key from the dialog.


{% tip %}
If the message **This key is already used** appears, you must first revoke the old key before generating a new one. 
{% endtip %}

{% include integrations/config_flow.md %}

If authentication succeeds, Home Assistant will automatically create the climate entities for all supported Cielo devices in your account.

{% note %}

If you add or set up a new Cielo device after configuring the integration in Home Assistant, you must reload the integration: 

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}. 
2. Select **Cielo Home** and in the right corner, select the three dots {% icon "mdi:dots-vertical" %} menu.
3. Select **Reload**.

{% endnote %}

## Supported functionality

Each supported device exposes at least one **climate** entity.

{% note %}

Depending on device support, some entities might not be available as the device does not support them.

{% endnote %}

### Climates

The climate platform integrates the compatible Cielo devices into Home Assistant, allowing control through its user interface.

#### Cielo Breez Max & Cielo Breez Edge Pro

- **HVAC modes** (varies by device): Heat, Cool, Dry, Fan, Auto, Off
- **Temperature control**: Provide a target temperature where applicable.
- **Fan modes**: Provide a fan mode if applicable.
- **Vertical swing position**: Provide a vertical swing position where applicable.
- **Presets**: Home, Away, Sleep, & Pets (where supported & defined)

{% note %}

Some fan modes or swing positions depend on the device’s remote configuration.

{% endnote %}

#### Cielo Smart Thermostat & Cielo Smart Thermostat Eco

- **HVAC modes** (varies by equipment): Cool, Auto, Heat, Off
- **Temperature control**: Set the temperature setpoint.
- **Presets**: Home, Away, Sleep & pets (where supported and defined)

## Data updates

This integration relies on cloud {% term polling %}, with data refreshed approximately every 120 seconds (2 minutes). If the Cielo API or your device becomes unavailable, Home Assistant will automatically retry.

- Manual changes made in the Cielo Home app or via IR remote are synced automatically on the next poll.

{% note %}

If the device is added after the integration, you need to reload the Cielo Home integration.

{% endnote %}

## Actions

This integration does _not_ provide any custom service actions. All controls are performed using the standard Home Assistant climate services.

## API limitations

- API key cannot be reused.
- Revoking an API key will immediately disconnect Home Assistant.
- You can generate a maximum of three API keys within last 30 days.

## Troubleshooting

This integration relies on an active internet connection and access to the Cielo Home API. Here are a few things to check before raising an issue:

- Confirm that your Home Assistant has internet access.
- Verify that your Cielo device is online by checking its status in the Cielo Home app. 
- Ensure that the device’s remote configuration is complete. Devices without remotes will not expose HVAC modes. 
- Check that your API key is still valid and hasn’t been revoked. 
- Reconfigure the integration and provide a freshly generated key. 
- Try refreshing the entities manually in Home Assistant.

If devices still fail to load after these steps, please contact [Cielo Tech Support](https://support.cielowigle.com/).

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

{% note %}

**Optional**: Revoke your API key in the [Cielo Home Web Portal](https://home.cielowigle.com).

{% endnote %}

