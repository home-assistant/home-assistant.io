---
title: "Rotarex DIMES SRG"
description: "Instructions on how to integrate your Rotarex gas tanks into Home Assistant."
documentation: https://rotarexsrg.com/category/digital-measurement-system
ha_release: 2026.1
ha_domain: rotarex
ha_iot_class: cloud_polling
ha_codeowners:
  - '@Rotarex'
---

The **Rotarex DIMES SRG** {% term integration %} allows you to monitor your Rotarex DIMES SRG Camping gas tanks in Home Assistant.

This integration uses the official Rotarex cloud API to fetch the latest data.

## Supported devices

- Rotarex DIMES SRG camping gas tanks added to your Rotarex account

## Prerequisites

1. Install the **Rotarex DIMES SRG Camping** app on your phone.
2. Create a Rotarex account, then sign in.
3. Add your tank to the app and confirm it syncs.
4. Have your app login credentials (email and password) ready.

## Configuration

{% include integrations/config_flow.md %}

{% configuration_basic %}

[![Open your Home Assistant instance and start setting up a new integration.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=rotarex)

1. In the pop-up, you will be asked to enter the **email** and **password** you use for the Rotarex DIMES SRG Camping mobile app.
2. After you submit the credentials, the integration is set up, and a device is created for each tank associated with your account.
{% endconfiguration_basic %}

## Sensors

This integration creates a device for each tank found in your account. Each device has the following sensors:

- **Level**: The remaining gas level in the tank (in %).
- **Battery**: The battery level of the tank's monitoring device (in %).
- **Last Synchronization**: The date and time of the last successful data sync with the Rotarex service.

The Level sensor also provides the following state attributes:

- `temperature`: The last recorded temperature.
- `last_sync`: The timestamp of the last data update.


## Known limitations

- Requires internet access; local access is not supported.

## Troubleshooting

### Can’t sign in

- Check your email and password.
- Try signing in to the Rotarex DIMES SRG Camping app to verify your
  credentials.
- If you recently changed your password, reconfigure the integration.

### Tanks are missing

- Make sure your tanks are visible and up to date in the Rotarex app.
- Confirm the same Rotarex account is used in the integration.
- Wait a few minutes and try reloading the integration from
  {% my integrations title="**Settings** > **Devices & services**" %}.

## Removing the integration

{% include integrations/remove_device_service.md %}