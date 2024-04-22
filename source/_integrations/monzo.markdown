---
title: Monzo
description: Instructions on how to integrate Monzo integration into Home Assistant.
ha_category:
  - Sensor
ha_release: "2023.10.1"
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@JakeMartin-ICL'
ha_config_flow: true
ha_domain: monzo
ha_homekit: true
ha_platforms:
  - sensor
---

The Monzo integration allows you to connect your Monzo bank accounts to Home Assistant

- [Prerequisites and Approval](#prerequisites-and-approval)
  - [Adding a second account](#adding-a-second-account)
- [Sensor](#sensor)
- [Webhooks and Triggers](#webhooks-and-triggers)
- [Services](#services)
  - [Pot transfer](#pot-transfer)
  - [(Un-)Register Webhooks](#un-register-webhooks)

{% include integrations/config_flow.md %}

## Prerequisites and Approval

Before adding the Monzo integration, you'll need to create a [Monzo developer account](https://developers.monzo.com/). From here, you need to create a new OAuth client for Home Assistant to use by going to *Clients* > *New OAuth Client*, then fill in the form as follows:

- Name: Home Assistant
- Logo URL: This can be left blank
- Redirect URLs: <https://my.home-assistant.io/redirect/oauth>
- Description: Eg: Used by the Monzo Home Assistant Integration
- Confidentiality: Confidential

Make sure to **copy the URL shown** - don't replace it with your own URL.

Once submitted, you can proceed with adding the integration, filling in the OAuth details for the client you've created in the Monzo developer portal.

**Important** - After authorizing Home Assistant access via email, for security you'll also need to verify again from within the Monzo app. A reminder to do this will be displayed in Home Assistant before completing the installation - don't proceed until you've done this from the popup in the mobile app.

If you've forgotten to do this, the integration will fail to load, but you can simply accept the popup and reload the integration without entering your details again.

### Adding a second account

To add a second Monzo account in Home Assistant, you'll need to repeat the above process for creating an OAuth client. Then in Home Assistant, you need to add the new credentials *before* trying to add the new entry. Open *Application Credentials* (three dots menu, top right of Devices & Services page) and click add application credentials - I'd recommend including the person's name in the *Name* field so you can distinguish it later. Once added you can return to Devices & Services -> Monzo -> Add Entry to proceed with authentication.

## Sensor

The integration will create a device for each of your accounts and pots. For an account or a pot, you'll have:

- Balance: The current balance of the account.

Additionally, an account will also have:

- Total Balance: The current balance of that account plus all of its pots.

## Webhooks and Triggers

Each account will setup a webhook that will fire an event in Home Assistant for each transaction created. The event contains lots of data about the transaction provided exactly reported by the Monzo API. For the structure of this data, see Monzo's [transaction created documentation](https://docs.monzo.com/#transaction-created).

These events are also registered as device triggers, so you can, for example, trigger an automation when a transaction is created on your current account and access the data from that event for use in your automation.

<div class='note warning'>

For this to work, your Home Assistant instance must be accessible remotely.

</div>

## Services

### Pot transfer

`pot_transfer`

Transfer money between one of your accounts (default: current account) and one of your pots.

### (Un-)Register Webhooks

`register_webhook` and `unregister_webhook`

Service to manually register and unregister the webhook. This is done automatically as part of (un)installation, but can also be triggered manually with this service.
