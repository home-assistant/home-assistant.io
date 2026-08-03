---
title: Monzo
description: Instructions on how to integrate Monzo integration into Home Assistant.
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

The **Monzo** {% term integration %} allows you to connect your Monzo bank accounts to Home Assistant.


## Prerequisites and approval

1. Before adding the Monzo integration, you'll need to create a [Monzo developer account](https://developers.monzo.com/). 
2. From here, you need to create a new OAuth client for Home Assistant to use by going to **Clients** > **New OAuth Client**. 
3. Then, fill in the form as follows, making sure to **copy the URL shown** - don't replace it with your own URL:
   - Name: Home Assistant
   - Logo URL: This can be left blank
   - Redirect URLs: <https://my.home-assistant.io/redirect/oauth>
   - Description: For example: Used by the Monzo Home Assistant Integration
   - Confidentiality: Confidential

4. Once submitted, you can proceed with adding the integration.
   - Go to {% my integrations title="**Settings** > **Devices & services**" %}, and add the **Monzo** integration.
   - Fill in the OAuth details for the client you've created in the Monzo developer portal.
   - After you authorize Home Assistant access, approve the request in the Monzo app. Home Assistant waits for this second approval and completes setup automatically. If you see **Approval timed out** or **Connection error**, follow the on-screen instructions to try again.

{% include integrations/config_flow.md %}

### Adding a second account

1. To add a second Monzo account in Home Assistant, repeat the above process for creating an OAuth client.
2. Then, in Home Assistant, add the new credentials *before* trying to add the new entry.
   - In the top right of **Devices & services** page, select the three dots {% icon "mdi:dots-vertical" %} menu, open **Application Credentials**, and select **Add application credentials**
   - It is recommended to include the person's name in the *Name* field so you can distinguish it later.
3. Once added, you can return to **Devices & services** > **Monzo** > **Add Entry** to proceed with authentication.

## Sensor

The integration will create a device for each of your accounts and pots. For an account or a pot, you'll have:

- Balance: The current balance of the account.

Additionally, an account will also have:

- Total Balance: The current balance of that account plus all of its pots.
