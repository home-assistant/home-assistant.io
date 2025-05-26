---
title: Daikin Smart AC
description: Instructions on how to integrate Daikin Smart AC devices with Home Assistant.
ha_category:
  - Climate
ha_release: 2025.3
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@daikin-br'
ha_domain: daikin_br
ha_zeroconf: true
ha_platforms:
  - climate
ha_integration_type: integration
---


The **Daikin Smart AC** {% term integration %} enables Home Assistant to control Daikin smart air conditioning systems.

There is currently support for the following device types within Home Assistant:

- [Climate](#climate)

## Supported hardware

This Home Assistant integration supports the **Brazilian** version of Daikin Smart AC products, which are operated by **Daikin Smart AC** mobile apps available on the following mobile platforms:

- [iOS](https://apps.apple.com/br/app/daikin-smart-ac/id1557849398)

- [Android](https://play.google.com/store/apps/details?id=in.co.iotalabs.dmb.smartac)

## Prerequisites
  
- The Daikin air conditioning device must already be added to your account using the Daikin Smart AC mobile app.

- The integration requires a **Device Key**. To retrieve the Device Key for the SSID (shown in the Home Assistant configuration UI during setup), open the Daikin Smart AC mobile app, navigate to **Menu -> Integrations -> Home Assistant**, enter or select the SSID, and press **Submit**.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Device IP Address:
    description: "The IP address of your Daikin Smart AC device. This is only required when automatic device discovery does not work."
Device Name:
    description: "The name of your Daikin smart AC device."
Device Key:
    description: "The API key of your Daikin smart AC device. To get this key, open the Daikin Smart AC mobile app, navigate to **Menu -> Integrations -> Home Assistant**, enter or select the SSID, and press **Submit**."
{% endconfiguration_basic %}

{% note %}
  
If your Daikin Smart AC unit is not on the same network as your Home Assistant instance (e.g., if your network is segmented), **automatic device discovery** may not work. In this case, you will need to manually find the **Device IP** by:

- Accessing your network router’s setup page and locating the device/client IP for the Daikin Smart AC device (hostname format: DAIKINXXXXXX).

**To configure the device, ensure the following ports are accessible:**

- From Home Assistant to the Daikin Smart AC Device : `TCP Port` => `15914`

- Default mDNS port.

If this applies to your setup, adjust your firewall settings to allow access to the required ports.

{% endnote %}

## Climate

The `Daikin Smart AC` climate platform integrates Daikin air conditioning systems with Home Assistant, allowing control over the following parameters:

- [**Set hvac mode**](/integrations/climate/#action-climateset_hvac_mode) (`off`, `heat`, `cool`, `dry`, `fan_only`)
- [**Set target temperature**](/integrations/climate#action-climateset_temperature)
- [**Turn on/off**](/integrations/climate#action-climateturn_on)
- [**Set fan mode**](/integrations/climate#action-climateset_fan_mode) (fan speed)
- [**Set swing mode**](/integrations/climate#action-climateset_swing_mode)
- [**Set preset mode**](/integrations/climate#action-climateset_preset_mode) (eco, boost)

The current ambient temperature is also displayed.

## Data updates

The integration fetches data from the device every 10 seconds by default.
It is recommended not to reduce the polling time below 10 seconds. For users who want to set their own custom polling interval, they can [configure a custom polling interval](https://www.home-assistant.io/common-tasks/general/#defining-a-custom-polling-interval).

## Known limitations

Preset mode `Coanda` is currently not supported.

## Troubleshooting

### Can’t set up the device

#### Symptom: “Failed to connect”

When trying to set up the integration, the form shows the message “Failed to connect”.

##### Description

This indicates that either the device has gone offline or network firewall settings are blocking local communication.

##### Resolution

To resolve this issue, try the following steps:

1. Make sure your device is powered up.
2. Make sure your device is connected to the network:
   - Make sure the app of the manufacturer can see and operate the device.
3. Make sure the network firewall settings are not blocking the local communication on port 15914.

### I deleted my device from the manufacturer's app and added it again. After this, my device in Home Assistant appears offline or unavailable

Reconfigure the device.

### The device is not getting auto-discovered

Make sure the network firewall settings are not blocking the default mDNS port.

### The device is appearing offline or unavailable

Make sure the device is visible and controllable via the manufacturer's app.
If it is not, check the device's power and network connection.

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
