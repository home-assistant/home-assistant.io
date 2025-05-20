---
title: Nintendo Switch Parental Controls
description: The Nintendo Switch Parental Controls integration allows you to monitor and control screentime for children via the Nintendo Switch Parental Controls service.
ha_release: 2025.7
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@pantherale0'
ha_domain: nintendo_parental
ha_integration_type: integration
ha_platforms:
  - sensor
---


The **Nintendo Switch Parental Controls** {% term integration %} integrates with the Nintendo Switch Parental Controls service, allowing parents to monitor and control screentime for their children.

## Supported devices

Devices supported by the Nintendo Switch Parental Controls mobile app, are supported by this integration.

## Setup

The setup process for the Nintendo Switch Parental Controls integration requires accessing your Nintendo account's authentication tokens through a specific flow. This process needs to be performed on a computer or a mobile device that does **not** have the official Nintendo Switch Parental Controls mobile app installed. This is because the integration needs to intercept the authentication flow, which the app typically handles automatically.

To set up the integration, follow these steps:

 1. In the Home Assistant UI, go to **Settings > Devices & Services**.

 2. Click on **ADD INTEGRATION** and search for "Nintendo Switch Parental Controls".

 3. You will be prompted to provide an "Access Token". Click the link provided in the dialog description. This link is unique to your setup session.

 4. A new browser tab will open. Log in to your Nintendo account using your credentials.

 5. After successful login, you will see a "Linking an External Account" screen. For the Nintendo account you wish to link, **right-click** on the red button labeled **"Select this person"** and choose **"Copy Link"** (or "Copy Link Address" / "Copy URL" depending on your browser).

    * **Important:** Do **not** click the button directly, as this can redirect you and prevent you from getting the necessary token.

    * The copied link should have a format similar to `npf54789befxxxxxxxx://auth#session_token_code={redacted}&state={redacted}&session_state={redacted}`.

 6. Close the Nintendo Account browser tab.

 7. Paste the entire copied link (the full string) into the "Access Token" field in the Home Assistant configuration dialog.

 8. Click **Submit**.

 9. The configuration flow should then present additional options.

10. Click **Submit** to finalize the setup.

## Configuration options

The integration provides the following configuration options:

{% configuration_basic %}
Update Interval:
  description: The frequency to poll Nintendo's APIs for updated data. Note, screentime data from the Switch itself is only sent to Nintendo every **5 minutes**
{% endconfiguration_basic %}

## Supported functionality

### Entities

The **Nintendo Switch Parental Controls** integration provides the following entities.

#### Sensors

- **Used Screen Time**
  - **Description**: The current used screen time for a given device.
  - **Unit of measurement**: `minutes`
  - **Device class**: `duration`

## Known limitations

The integration currently does not provide all functionality found in the mobile app, future updates will see this extended.

Further, this integration relies on the cloud and cannot make a local connection to your Switch.

## Troubleshooting

### Data is not updating in Home Assistant

Make sure the Switch has access to the internet, without this, usage data is not being sent to Nintendo.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
