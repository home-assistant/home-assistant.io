---
title: Withings
description: Instructions on how to integrate Withings health products within Home Assistant.
ha_category:
  - Health
  - Sensor
ha_release: 0.99
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@joostlek'
ha_domain: withings
ha_platforms:
  - binary_sensor
  - calendar
  - diagnostics
  - sensor
ha_integration_type: integration
ha_dhcp: true
---

The **Withings** {% term integration %} consumes data from various health products produced by [Withings](https://www.withings.com).

## Prerequisites

- Withings account
- Withings app installed
- Withings device setup in the app
- [Withings developer account](#creating-a-withings-developer-account) to get a *ClientID* and *Secret* to connect to be able to get the data from the Withings cloud API

### Creating a Withings developer account

You must have a developer account to distribute the data.

{% note %}
  You only need one developer account. The same account and credentials are used for each Withings configuration.
{% endnote %}

1. [Create a free developer account](https://account.withings.com/partner/add_oauth2).
2. Make sure to select **Withings public cloud** (and not Withings US medical cloud or similar).
3. Select **Create an application**.
4. Under **Application creation**, select **Public API integration**.
   - Read and accept the terms and select **Next**.
5. Under **Information**:
   - **Target environment**: *Development*
   - **Application name**: [any name]
   - **Application description**: [any description]
   - **Registered URLs**: `https://my.home-assistant.io/redirect/oauth`
     - Do not test this URL. It won't work at this stage. It will be setup once you install the integration in Home Assistant.
   - **Change logo**: Optional
6. **Save** your changes.
   - Once saved, the *ClientID* and *Secret* fields will be populated.
   - Copy and store them in a save place. You will need these in the next step.

{% details "I have manually disabled My Home Assistant" %}

If you don't have [My Home Assistant](/integrations/my) on your installation,
you can use `<HOME_ASSISTANT_URL>/auth/external/callback` as the redirect URI
instead.

The `<HOME_ASSISTANT_URL>` must be the same as used during the configuration/
authentication process.

Withings will validate (with HTTP HEAD) these requirements each time you save your Withings developer account. When these checks fail, the Withings UI is not always clear about why.

- Home Assistant (For create/update of Withings developer account):
  - Publicly accessible.
  - Running on a fully qualified domain name.
  - Running over HTTPS signed by a globally recognized Certificate Authority. Let's Encrypt will work.

{% enddetails %}

{% include integrations/config_flow.md %}

## Data updates

The {% term integration %} automatically detects if you can use webhooks. This enables the {% term integration %} only to update when there is new data.
The binary sensor for sleep will only work if the {% term integration %} can establish webhooks with Withings.


{% note %}
Sleep sensors will only appear when the integration can successfully receive webhook updates from Withings and find sleep data within the last day.
{% endnote %}

### Webhook requirements

For webhooks to work, your Home Assistant instance must be reachable by the Withings cloud service. The following requirements must be met:

- Your Home Assistant instance must be reachable from the internet.
- Withings requires HTTPS specifically on port 443. Using HTTPS on a non-standard port (such as 8443) will not work.
- The certificate must be signed by a globally recognized Certificate Authority (for example, Let's Encrypt). Self-signed certificates will not work.

{% important %}
If webhooks cannot be established, some sensors will not be available. In particular, the sleep binary sensor has no polling fallback and requires working webhooks to function.
{% endimportant %}

## Available data

The {% term integration %} provides several entities, some of which are dynamically enabled if data is available.

For example, measurement sensors like weight only work when data has been registered in the last 14 days. So if you start using a new device, for example, to measure your temperature or you manually update a value in the app, the sensor automatically appears.

Sleep sensors are only created if the {% term integration %} can find sleep data for you within the last day.

Workout calendar and the workout and activity sensors show if the latest available data point is no older than 14 days.

## Troubleshooting

If you're having issues with your Withings Sleep Mat or other devices not appearing, follow these steps:

### Sleep sensors not appearing

#### Symptom

Your Withings Sleep Mat entities are not showing up.

#### Description

Sleep sensors (including the "in bed" binary sensor) require successful webhook registration. 

#### Resolution

Check if webhooks are working properly as described in the [data updates](#data-updates) section.

### In bed entity missing

#### Symptom

The **In bed** entity does not show up.

#### Description

This entity specifically requires webhook functionality to work. 

#### Resolution

- Ensure your Home Assistant instance is accessible from the internet and webhooks are properly registered.
- [Enable debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics) to see webhook registration status as described in the [data updates](#data-updates) section.

### General troubleshooting steps

1. Make sure your Withings device is properly set up in the Withings app and showing data.
2. Verify that data exists in your Withings account from within the last 14 days (or last day for sleep data).
3. Wait up to 15 minutes after adding the integration for all entities to appear.
4. If using a sleep mat, ensure it has recorded sleep data within the last day.
5. Restart the integration by removing and re-adding it if entities still don't appear after verifying the above.

{% note %}
If you're still having issues after following these steps, enable debug logging to gather more information about what might be preventing the integration from working properly.
{% endnote %}

### Webhook detection and troubleshooting

If you're having issues with webhook detection or your Withings Sleep Mat "in bed" entity is not showing up, please follow these troubleshooting steps:

1. Verify webhook status: Check your Home Assistant logs for messages about webhook registration. Successful webhook registration will show a message like "Successfully registered Withings webhook".
2. Check network accessibility: For webhooks to work, your Home Assistant instance must be accessible from the internet. This requires the following:
   - A public IP address 
   - Port forwarding configured on your router (typically port 443 or 8123)
   - A domain name pointing to your public IP or using a dynamic DNS service (like DuckDNS)
   - SSL certificate configured (Let's Encrypt or a trusted certificate)
3. Check Withings cloud connectivity: If webhook registration fails, the integration will fall back to polling, which only updates every 5 minutes and doesn't support sleep sensors.
4. Enable debug logging: To see detailed information about webhook registration,  [enable debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics).

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
