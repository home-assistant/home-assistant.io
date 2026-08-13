---
title: Monzo
description: Connect Monzo bank accounts to Home Assistant to monitor account and pot balances.
ha_category:
  - Finance
  - Sensor
ha_release: 2024.6
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@jakemartin-icl'
ha_config_flow: true
ha_domain: monzo
ha_platforms:
  - sensor
ha_integration_type: service
---

[Monzo](https://monzo.com/) is a digital bank. The **Monzo** {% term integration %} connects your Monzo accounts to Home Assistant, where you can monitor account and pot balances.

## Prerequisites and approval

1. Sign in to the [Monzo developer portal](https://developers.monzo.com/) with your Monzo account.
2. Go to **Clients** > **New OAuth Client** to create an OAuth client for Home Assistant.
3. Enter the following values. Use the redirect URL exactly as shown; do not replace it with the URL of your Home Assistant instance:
   - **Name**: `Home Assistant`
   - **Logo URL**: Leave this field blank.
   - **Redirect URLs**: `https://my.home-assistant.io/redirect/oauth`
   - **Description**: For example, `Used by the Monzo Home Assistant integration`
   - **Confidentiality**: **Confidential**

4. Once submitted, you can proceed with adding the integration.
   - Go to {% my integrations title="**Settings** > **Devices & services**" %}, and add the **Monzo** integration.
   - Enter the client ID and client secret for the OAuth client you created in the Monzo developer portal.
   - After you authorize Home Assistant access, approve the request in the Monzo app. Home Assistant waits for this second approval and completes setup automatically. If you see **Approval timed out** or **Connection error**, follow the on-screen instructions to try again.

{% include integrations/config_flow.md %}

### Adding a second account

1. Create another OAuth client by repeating the steps above.
2. In Home Assistant, add the new credentials before adding the new integration entry.
   - On the **Devices & services** page, select the three dots {% icon "mdi:dots-vertical" %} menu in the top-right corner, select **Application credentials**, and then select **Add application credentials**.
   - In the **Name** field, include the Monzo user's name so you can identify the correct OAuth client during setup.
3. Return to **Devices & services** > **Monzo**, select **Add entry**, and authenticate the second account.

## Sensors

The integration creates a device for each account and pot. Each device has the following sensor:

- **Balance**: The current balance of the account or pot.

Each account device also has the following sensor:

- **Total balance**: The current balance of the account plus all of its pots.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
