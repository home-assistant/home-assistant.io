---
title: Threema
description: Instructions on how to send Threema messages from Home Assistant.
ha_category:
  - Notifications
ha_release: '2026.10'
ha_config_flow: true
ha_iot_class: Cloud Push
ha_domain: threema
ha_platforms:
  - notify
ha_integration_type: service
ha_quality_scale: silver
ha_codeowners:
  - '@LukasQ'
---

The **Threema** {% term integration %} allows you to send end-to-end encrypted text messages from Home Assistant to [Threema](https://threema.ch) users via the [Threema Gateway](https://gateway.threema.ch) service. This integration is designed for the **E2E (end-to-end) encryption mode** of Threema Gateway, where messages are encrypted locally before being sent. If no private key is configured, the integration falls back to **basic mode** (server-side encryption).

## Prerequisites

- A [Threema Gateway](https://gateway.threema.ch) account. For testing purposes, you can [request developer credits](https://gateway.threema.ch) from Threema.
- A Gateway ID (starts with `*`). You can use an existing ID or create a new one during setup. Make sure to select the **E2E Gateway** configuration when making the request.
- An API secret from the Threema Gateway dashboard.
- Message credits on your Threema Gateway account. Requesting a Threema ID with E2E support **costs 1,600 credits** or **800 credits with basic support.**

Setting up Threema Gateway is a two-step process:

1. Generate encryption keys
   - The integration generates a public and private key pair.
   - Provide the public key when creating your Gateway ID on the Threema Gateway website.
   - Threema reviews and approves each public key manually, which can take a few days. So you might complete the Home Assistant setup long after the keys were generated.
2. Configure the integration
   - Once your Gateway ID is approved, use the Gateway ID, API secret, and the previously generated private key to complete the integration setup in Home Assistant.

During setup, you can choose between two options:

- **Add existing Gateway ID**: Enter your Gateway ID, API secret, and the private key generated for it. You can optionally also paste the public key you registered at [gateway.threema.ch](https://gateway.threema.ch). The key is only used once to verify it matches the private key and is never stored.
- **Generate new encryption keys**: The integration generates an encryption key pair and displays them. Save the keys. You can't recover them later. Then register a new Gateway ID at [gateway.threema.ch](https://gateway.threema.ch) using the generated public key, and complete setup with your Gateway credentials.

If you leave the private key empty, the integration uses **basic mode** instead, sending messages via the Gateway without local end-to-end encryption.

{% details "How the encryption works" %}

Threema Gateway's end-to-end mode uses the same NaCl "box" construction as Threema's apps, built on Curve25519. To encrypt a message, your private key is combined with the recipient's public key in an Elliptic Curve Diffie-Hellman exchange to derive a shared secret. That secret encrypts the message with XSalsa20 and authenticates it with Poly1305. The recipient does the same operation in reverse: their private key combined with your public key yields the identical shared secret, since Diffie-Hellman on an elliptic curve gives the same result regardless of which side's keys are used.

This is why the config flow only ever asks for a public key to double-check what you pasted: your private key is what does the actual encrypting, so it is the one that gets stored, while a public key you enter is only used once, locally, to confirm it matches that private key.

{% enddetails %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Gateway ID:
  description: "Your Threema Gateway ID (starts with `*` and is 8 characters total)."
API secret:
  description: "The API secret from your Threema Gateway dashboard."
Private key:
  description: "Optional for basic mode, required for end-to-end encryption mode."
Public key:
  description: "Optional. Used once to verify it matches the private key; it is never stored."
{% endconfiguration_basic %}

## Recipients

After setting up the gateway, add recipients as **subentries**. Go to **Settings** > **Devices & services** > **Threema**, select your gateway, and use **Add recipient**. Enter the 8-character Threema ID of the person you want to message and optionally a friendly display name (for example, "Dad").

## Devices

Each recipient subentry creates its own **device**, named after the recipient, for example, "Dad (AB1CD2EF)", or only the Threema ID if no name was given. The device hosts a single notify entity used to send messages to that recipient.

### Supported functionality

The **Threema** integration provides the following entities.

#### Notify

Each recipient device has one notify entity, named after the recipient. To find its entity ID, go to **Settings** > **Devices & services** > **Threema**, and open the device of the recipient.

## Actions

The Threema integration creates a notify entity for each recipient you configure.
Use the [`notify.send_message` action](/actions/notify.send_message/) to send a message to a recipient.

When adding the action in an automation or script, select the recipient's Threema notify entity as the target. In the YAML examples below, replace `notify.YOUR_RECIPIENT` with the entity ID of your recipient.

### Send a message

{% example %}
action: |
  action: notify.send_message
  target:
    entity_id: notify.YOUR_RECIPIENT
  data:
    message: "The front door was opened."
{% endexample %}

### Send a message with a title

Threema displays the title in bold above the message.

{% example %}
action: |
  action: notify.send_message
  target:
    entity_id: notify.YOUR_RECIPIENT
  data:
    title: "Security alert"
    message: "Motion was detected in the backyard."
{% endexample %}

## Troubleshooting

### "Invalid authentication" during setup

Double-check that your Gateway ID starts with `*` and is exactly 8 characters. Verify the API secret matches what is shown on the [Threema Gateway dashboard](https://gateway.threema.ch). If you entered both a private and a public key, make sure they belong to the same key pair. Otherwise, setup fails with a key mismatch error.

### Messages not arriving

- Make sure you have sufficient credits on your Threema Gateway account.
- Verify the recipient's Threema ID is correct (8 alphanumeric characters).
- Check **Settings** > **System** > **Logs** for error details from the `threema` integration.

### "Config entry not loaded"

This means the integration could not reach the Threema Gateway when Home Assistant started, for example due to a network issue or a temporary Threema Gateway outage. Home Assistant retries automatically. If the problem persists, check your internet connection, then try reloading the integration from **Settings** > **Devices & services** > **Threema**.

## Known limitations

- Text messages only: images, files, and other media are not supported.
- No group messaging: only 1-to-1 messages are supported.
- Send only: receiving messages is not supported.
- No credit balance sensor: check your remaining Gateway credits on the [Threema Gateway dashboard](https://gateway.threema.ch).

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
