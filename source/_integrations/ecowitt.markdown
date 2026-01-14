---
title: Ecowitt
description: Instructions on how to integrate Ecowitt Weather Station within Home Assistant.
ha_category:
  - Binary sensor
  - Sensor
  - Weather
ha_release: 2022.9
ha_iot_class: Local Push
ha_domain: ecowitt
ha_config_flow: true
ha_codeowners:
  - '@pvizeli'
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: device
---

The **Ecowitt** {% term integration %} allows you to integrate [Ecowitt](https://www.ecowitt.com/) devices into Home Assistant.

{% include integrations/config_flow.md %}

## Ecowitt Weather Station configuration

The **Ecowitt** {% term integration %} works by first creating a callback endpoint on your Home Assistant instance and then adding this configuration to the Ecowitt console so that it starts sending data.

The integration will display a Server IP / Host Name, Path, and Port. You can input it into the Ecowitt configuration in one of two ways:

**Option 1**: Use the Ecowitt app (on your phone):

1. In the top-left corner, select the menu icon ({% icon "mdi:menu" %}) and select **Devices**.
   - Under **My Devices**, select your Ecowitt station.
2. In the top-right corner, select the ellipsis icon ({% icon "mdi:dots-horizontal" %}).
   - From the list, select **Others**.
   - Select the **DIY Upload Servers** button, and from the **Supported Servers List**, select **Customized**.
   - From the **Protocol Type Same As** list, select **Ecowitt**.
   - Enter the Server IP / Host Name, Path, and Port from the integration.
     - The path has to match! Remove the first forward slash from the path, as the app will prepend one.
3. Save your settings.

**Option 2**: Navigate to the Ecowitt web UI in a browser at the station IP address:

1. Select **Weather Services** then scroll down to the **Customized** section.
2. Under **Customized**, select 🔘 Enable and **Protocol Type Same As** 🔘 Ecowitt.
3. Enter the Server IP / Host Name, Path, and Port from the integration.
4. Save your settings.

## TLS/SSL limitations

Ecowitt devices do not support TLS/SSL connections (HTTPS). If your Home Assistant instance is configured to use HTTPS only, the Ecowitt integration will not work properly. You must ensure your Home Assistant instance is accessible via HTTP (non-secure) for the Ecowitt devices to successfully send data.

If you're using SSL/TLS for your Home Assistant instance, you'll need to configure your setup to accept both secure (HTTPS) and non-secure (HTTP) connections. This can typically be done by adjusting your reverse proxy configuration or by using the NGINX Home Assistant add-on which can handle both HTTP and HTTPS traffic simultaneously.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}