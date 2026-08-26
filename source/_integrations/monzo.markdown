---
title: Monzo
description: Connect Monzo bank accounts to Home Assistant to monitor account and pot balances.
ha_category:
  - Event
  - Finance
  - Sensor
ha_release: 2024.6
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@jakemartin-icl'
ha_config_flow: true
ha_domain: monzo
ha_platforms:
  - event
  - sensor
ha_integration_type: service
---

[Monzo](https://monzo.com/) is a digital bank. The **Monzo** {% term integration %} connects your Monzo accounts to Home Assistant. You can monitor account and pot balances, track how much you have spent today, react to new transactions, and move money between an account and its pots.

## Prerequisites and approval

1. Sign in to the [Monzo developer portal](https://developers.monzo.com/) with your Monzo account.
2. Go to **Clients** > **New OAuth Client** to create an OAuth client for Home Assistant.
3. Enter the following values. Use the redirect URL exactly as shown; do not replace it with the URL of your Home Assistant instance:
   - **Name**: `Home Assistant`
   - **Logo URL**: Leave this field blank
   - **Redirect URLs**: `https://my.home-assistant.io/redirect/oauth`
   - **Description**: For example, `Used by the Monzo Home Assistant integration`
   - **Confidentiality**: **Confidential**

4. Once submitted, you can proceed with adding the integration.
   - Go to {% my integrations title="**Settings** > **Devices & services**" %} and add the **Monzo** integration.
   - Enter the client ID and client secret for the OAuth client you created in the Monzo developer portal.
   - After you authorize Home Assistant access, approve the request in the Monzo app. Home Assistant waits for this second approval and completes setup automatically. If you see **Approval timed out** or **Connection error**, follow the on-screen instructions to try again.

{% include integrations/config_flow.md %}

### Adding a second account

1. Create another OAuth client by repeating the steps above.
2. In Home Assistant, add the new credentials before adding the new integration entry.
   - On the **Devices & services** page, select the three dots {% icon "mdi:dots-vertical" %} menu in the top-right corner, select **Application credentials**, and then select **Add application credentials**.
3. Return to **Devices & services** > **Monzo**, select **Add entry**, and authenticate the second account.

## Supported functionality

The integration creates a device for each Monzo account and pot.

### Sensors

Account and pot devices provide the following sensor:

- **Balance**: The current balance of the account or pot.

Account devices also provide the following sensors:

- **Total balance**: The current balance of that account plus all of its pots.
- **Spent today**: The amount spent from the account since around 4:00 AM (Monzo's day boundary), shown as a positive value. Money received does not reduce this amount.

### Transaction events

The integration creates a **Transaction** {% term event %} {% term entity %} for each Monzo account. When Monzo reports a new transaction, the entity fires a `transaction_created` event and the integration refreshes the account and pot balances.

The complete transaction data provided by Monzo is available in the event entity's `data` attribute for use in automations. By default, Home Assistant also stores this data in the recorder history.

Transaction events require either [Home Assistant Cloud](/cloud/) or an external URL configured under {% my network title="**Settings** > **System** > **Network**" %} that is accessible from the web.

{% include integrations/actions.md %}

## Monzo automation examples

These blueprints provide reusable automations for moving money between a Monzo account and one of its pots.

{% caution %}
These blueprints move money automatically. Check that you selected the matching account, pot, and entities, and test the automation with a small amount first.
{% endcaution %}

### Automation: keep an account at a target balance

This blueprint keeps a selected account at a target balance. When the account balance changes, it deposits any excess into the selected pot or withdraws the shortfall from it. The withdrawal is limited to the pot's available balance. The automation also checks the balance every 15 minutes as a fallback.

For example, you can keep 1,000 in your account's currency in your current account and move the remainder to or from a savings pot.

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/monzo_keep_account_at_target.yaml" %}

### Automation: reimburse purchases from a pot by merchant

This blueprint watches the selected account's **Transaction** event entity. When it receives a debit transaction from the specified merchant, it withdraws the transaction amount from a selected pot. For example, after a Netflix payment, it can move the same amount from a subscriptions pot back into the account.

Before importing the blueprint, create an **Input text** {% term helper %} under {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %}. Set its maximum length to 255 characters. The blueprint uses it to remember recent transaction IDs and guard against a repeated webhook moving money twice.

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/monzo_reimburse_merchant_from_pot.yaml" %}

## Data updates

The integration {% term polling polls %} Monzo for account and pot data every minute. When Monzo sends a new transaction through a webhook, the integration fires the account's **Transaction** event entity and requests an immediate refresh of the account and pot balances.

New accounts and pots are added after a successful refresh. Devices for accounts and pots that Monzo no longer returns are removed.

If Home Assistant cannot register a webhook, account and pot sensors continue to update every minute, but the **Transaction** event entities do not receive new events.

## Known limitations

- Transaction events require either [Home Assistant Cloud](/cloud/) or an external URL configured under {% my network title="**Settings** > **System** > **Network**" %} that is accessible from the web.
- Pot transfers only work between a pot and its associated account in the same Monzo connection.
- Loan, Flex, and Rewards accounts do not support pot transfers.
- You cannot withdraw from a pot that has **Added security** enabled. Use the Monzo app to withdraw from that pot.

## Troubleshooting

### Approval times out

#### Symptom: “Approval timed out”

Home Assistant displays **Approval timed out** while you are setting up or reauthenticating the integration.

#### Description

After you authorize Home Assistant in your browser, Monzo requires a second approval in the Monzo app. Home Assistant waits up to five minutes for this approval.

#### Resolution

Approve the request in the Monzo app, then select **Try again** in Home Assistant.

### Transaction events are not received

#### Symptom: balances update, but no transaction events are received

Account and pot balances continue to update, but the **Transaction** event entity does not receive `transaction_created` events.

#### Description

Monzo must be able to reach the Home Assistant webhook from the web. Balance sensors use polling and can continue to work when the webhook is unavailable.

#### Resolution

Use [Home Assistant Cloud](/cloud/) or configure a publicly accessible external URL under {% my network title="**Settings** > **System** > **Network**" %}. Home Assistant automatically retries webhook registration after temporary failures.

### A pot transfer fails

#### Symptom: an action reports that the transfer failed or was rejected

The **Deposit into pot** or **Withdraw from pot** action does not complete successfully.

#### Resolution

- Make sure the account and pot belong to the same Monzo connection and that the pot belongs to the selected account.
- Do not select a Loan, Flex, or Rewards account.
- For withdrawals, make sure the pot has enough money and does not have **Added security** enabled.
- If Home Assistant cannot confirm whether a transfer completed, check the balance in the Monzo app before trying again.

If the problem continues, download diagnostics from the Monzo integration entry and include them when reporting the issue.

## Removing the integration

This integration follows the standard integration removal process. Home Assistant also attempts to remove the webhooks it registered with Monzo. No extra steps are required.

{% include integrations/remove_device_service.md %}
