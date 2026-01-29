---
title: Liebherr
description: Instructions on how to integrate Liebherr SmartDevice appliances into Home Assistant.
ha_release: 2026.3
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@mettolen'
ha_domain: liebherr
ha_integration_type: hub
ha_zeroconf: true
ha_config_flow: true
ha_quality_scale: bronze
related:
  - url: https://home.liebherr.com/
    title: Liebherr
  - url: https://www.liebherr.com/en-us/refrigerators-freezers/smartdevice-3033395
    title: Liebherr SmartDevice appliances
  - url: https://developer.liebherr.com/apis/smartdevice-homeapi/
    title: Liebherr SmartDevice HomeAPI
  - docs: /common-tasks/general/#defining-a-custom-polling-interval
    title: Defining a custom polling interval
ha_category:
  - Sensor
ha_platforms:
  - climate
---

The **Liebherr** {% term integration %} allows you to control and monitor [Liebherr](https://home.liebherr.com/) SmartDevice refrigerators and freezers via the cloud-based [SmartDevice HomeAPI](https://developer.liebherr.com/apis/smartdevice-homeapi/). With this integration, you can monitor temperatures, adjust cooling settings, and create automations to alert you when temperatures exceed safe food storage thresholds.

## Supported devices

The following appliances are supported by the integration:

- Liebherr SmartDevice refrigerators and freezers with Wi-Fi connectivity

## Prerequisites

Before setting up the integration, you need to obtain an API key from the Liebherr SmartDevice app:

1. Connect your appliance: Download the [SmartDevice app](https://smartdevice.onelink.me/OrY5/8neax8lp) and connect your Liebherr appliance to your home WiFi network. Follow the [setup instructions](https://go.liebherr.com/cb2ct1) to complete the initial configuration.

2. Get your API key:
   - Open the SmartDevice app.
   - Go to **Settings**.
   - Select **Become a beta tester**.
   - Activate the **Beta testing HomeAPI**.
   - Select **Generate new key**.
   - Copy the API key.

   {% note %}
   **Important**: The API key can only be copied once from the app. Once you leave the screen, it cannot be retrieved again. If you lose your API key, you'll need to generate a new one.
   {% endnote %}

3. Verify connectivity: Only appliances that are connected to the internet via the SmartDevice app can be accessed through the HomeAPI. Appliances that are only registered but not actively connected will not appear in Home Assistant.

{% include integrations/config_flow.md %}

The integration can be automatically discovered when your appliances are on the same network. If automatic discovery does not work, you can manually add the integration.

{% configuration_basic %}
API key:
    description: "The API key from the Liebherr SmartDevice app (**Settings** > **Become a beta tester**). Note: The API key can only be copied once from the app."
{% endconfiguration_basic %}

## Supported functionality

The **Liebherr** integration provides climate control functionality for refrigerator and freezer zones in your SmartDevice appliances.

### Climate

Each cooling or freezing zone in your appliance is represented as a climate entity with the following capabilities:

- **Current temperature**: Displays the actual temperature measured in the zone.
- **Target temperature**: Shows and allows you to set the desired temperature for the zone.
  - Temperature range varies by zone type (cooling or freezing)
  - Adjustments are in whole degree increments
- **HVAC mode**: Always set to Cool for these cooling-only appliances.
- **Temperature unit**: Displays temperature in Celsius or Fahrenheit based on your Home Assistant settings.

#### Multi-zone appliances

For appliances with multiple cooling zones (for example, a fridge-freezer combination):

- **Top zone**: The uppermost cooling compartment
- **Middle zone**: The middle compartment (if present)
- **Bottom zone**: The lowermost cooling compartment (if present)

Each zone has independent temperature control.

## Changing temperature unit

The temperature unit displayed in Home Assistant is controlled by your Home Assistant system settings, not by the integration or the appliance settings.

To change between Celsius and Fahrenheit:

1. Go to {% my general title="**Settings** > **System** > **General**" %}.
2. Under **Unit system**, select either:
   - **Metric** for Celsius (°C)
   - **Imperial** for Fahrenheit (°F)
3. The temperature entities will automatically update to display in your chosen unit.

The Liebherr appliances operate based on the temperature unit selected on the device itself. Home Assistant displays temperatures in the unit system you configure in your Home Assistant settings, automatically converting between Celsius and Fahrenheit as needed.

## Use cases

The **Liebherr** integration enables smart refrigerator and freezer management with practical automation opportunities:

- Energy optimization: Adjust cooling temperatures based on door sensors or usage patterns to save energy.
- Temperature monitoring: Send alerts when temperatures exceed safe food storage thresholds.
- Vacation mode: Automatically adjust temperature settings when you're away from home for extended periods.
- Smart scheduling: Integrate with your daily routines to optimize cooling performance and energy consumption.

## Data updates

The **Liebherr** integration {% term polling polls %} data from the SmartDevice HomeAPI cloud service every 1 minute.

If you have more than 2 devices, it is recommended to increase the polling interval to avoid hitting API rate limits.

{% details "Defining a custom polling interval" %}

{% include common-tasks/define_custom_polling.md %}

{% enddetails %}

## Known limitations

- Cloud dependency: The integration requires internet connectivity to communicate with the Liebherr SmartDevice HomeAPI cloud service. If your internet connection is down, you won't be able to control your appliances through Home Assistant.
- Beta API: The SmartDevice HomeAPI is currently in beta. Features and functionality may change as Liebherr continues to develop the API.
- API key limitations: The API key can only be copied once from the SmartDevice app. If you lose it, you'll need to generate a new one.
- Connected devices only: Only appliances that are actively connected to the internet via Wi-Fi appear in Home Assistant. Registered but disconnected appliances are not accessible.

## Troubleshooting

{% details "Connection error during setup" %}

**Symptom:** Configuration flow shows a connection error

When trying to set up the integration, Home Assistant cannot establish a connection to the Liebherr SmartDevice HomeAPI cloud service.

To resolve this issue, try the following steps:

1. Check internet connectivity:
   - Ensure your Home Assistant instance has an active internet connection.
   - Verify that you can access `https://home-api.smartdevice.liebherr.com` from your network.

2. Verify the API key:
   - Double-check that you copied the complete API key from the SmartDevice app.
   - Ensure there are no extra spaces or characters.

3. Check the API status:
   - The SmartDevice HomeAPI is a beta service and may occasionally be unavailable.
   - Wait a few minutes and try again.

4. Regenerate the API key (if needed):
   - If you suspect the API key is invalid, generate a new one in the SmartDevice app (**Settings** > **Become a beta tester** > **Generate new key**).

{% enddetails %}

{% details "Invalid authentication error" %}

**Symptom:** "Invalid authentication" error when entering the API key

The API key provided is incorrect, expired, or was regenerated in the SmartDevice app.

1. **Generate a new API key:**
   - In the SmartDevice app, go to **Settings** > **Become a beta tester**.
   - Generate a new API key.
   - Copy it immediately (you can only copy it once).
   - Use the new API key in Home Assistant.

{% enddetails %}

{% details "No devices found after setup" %}

**Symptom:** Setup completes but no devices appear

The API key is valid, but no appliances are currently connected to the Liebherr SmartDevice cloud service.

1. Check appliance connectivity:
   - Open the SmartDevice app and verify your appliances are shown as connected (not just registered).
   - Ensure your appliances have an active WiFi connection.

2. Reconnect appliances:
   - If your appliances show as disconnected in the app, reconnect them to your WiFi network.
   - Follow the [setup instructions](https://go.liebherr.com/cb2ct1) to reconnect.

3. Wait for synchronization:
   - After reconnecting appliances, wait a few minutes for them to synchronize with the cloud service.
   - Try setting up the integration again.

{% enddetails %}

{% details "Appliances become unavailable" %}

**Symptom:** Entities show as unavailable

The integration loses connection to the Liebherr cloud service. This can happen due to internet connectivity issues, API service interruptions, or appliance offline status.

1. Check internet connectivity:
   - Ensure your Home Assistant instance has a stable internet connection.
   - Verify your appliances are connected to Wi-Fi and online in the SmartDevice app.

2. Check the API service status:
   - The SmartDevice HomeAPI is a beta service and may occasionally be unavailable.
   - Wait a few minutes for the service to recover.

3. Restart the integration:
   - Go to {% my integrations title="**Settings** > **Devices & services**" %}.
   - Select the **Liebherr** integration.
   - Select the three-dot menu {% icon "mdi:dots-vertical" %} and choose **Reload**.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

After removing the integration, your API key remains active in the SmartDevice app. To revoke access, generate a new API key in the app, which will invalidate the old one.
