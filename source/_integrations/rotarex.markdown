---
title: "Rotarex DIMES SRG"
description: "Instructions on how to integrate your Rotarex gas tanks into Home Assistant."
ha_release: 2026.2
ha_domain: rotarex
ha_iot_class: cloud_polling
ha_codeowners:
  - '@Rotarex'
related:
  - url: https://rotarexsrg.com/category/digital-measurement-system
    title: Rotarex digital measurement system product page
---

The **Rotarex DIMES SRG** {% term integration %} allows you to monitor your [Rotarex DIMES SRG Camping gas tanks](https://rotarexsrg.com/category/digital-measurement-system) in Home Assistant.

This integration uses the official Rotarex cloud API to fetch the latest data.

## Supported devices

- Rotarex DIMES SRG camping gas tanks added to your Rotarex account

## Prerequisites

1. Install the **Rotarex DIMES SRG Camping** app on your phone.
2. Create a Rotarex account, then sign in.
3. Add your tank to the app and confirm it syncs.
4. Have your app login credentials (email and password) ready.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: "The email address you use to sign in to the Rotarex DIMES SRG Camping app."
Password:
  description: "The password you use to sign in to the Rotarex DIMES SRG Camping app."
{% endconfiguration_basic %}

## Sensors

This integration creates a device for each tank found in your account. Each device has the following sensors:

- **Level**: The remaining gas level in the tank (in %).
- **Battery**: The battery level of the tank's monitoring device (in %).
- **Last synchronization**: The date and time of the last successful data sync with the Rotarex service.

The Level sensor also provides the following state attributes:

- `temperature`: The last recorded temperature.
- `last_sync`: The timestamp of the last data update.


## Known limitations

- Requires internet access; local access is not supported.

## Troubleshooting

### Can’t sign in

- Check your email and password.
- Try signing in to the Rotarex DIMES SRG Camping app to verify your credentials.
- If you recently changed your password, reconfigure the integration.

### Tanks are not visible in Home Assistant

- Make sure your tanks are visible and up to date in the Rotarex app.
- Confirm the same Rotarex account is used in the integration.
- Wait a few minutes and try reloading the integration from {% my integrations title="**Settings** > **Devices & services**" %}.

## Removing the integration

{% include integrations/remove_device_service.md %}