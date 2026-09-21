---
title: Threema
description: Instructions on how to send Threema messages from Home Assistant.
ha_category:
  - Notifications
ha_release: "2026.10"
ha_config_flow: true
ha_iot_class: Cloud Push
ha_domain: threema
ha_platforms:
  - notify
ha_integration_type: service
ha_quality_scale: bronze
ha_codeowners:
  - '@LukasQ'
---

The **Threema** {% term integration %} allows you to send end-to-end encrypted text messages from Home Assistant to [Threema](https://threema.ch) users via the [Threema Gateway](https://gateway.threema.ch) service. This integration is designed for the **E2E (end-to-end) encryption mode** of Threema Gateway, where messages are encrypted locally before being sent. If no private key is configured, the integration falls back to **basic mode** (server-side encryption).

## Prerequisites

- A [Threema Gateway](https://gateway.threema.ch) account. For testing purposes, you can [request developer credits](https://gateway.threema.ch) from Threema.
- A Gateway ID (starts with `*`). You can use an existing ID or create a new one during setup. Make sure to select the **E2E Gateway** configuration when making the request.
- An API secret from the Threema Gateway dashboard.
- Message credits on your Threema Gateway account. Sending a message costs **1,600 credits with E2E mode** or **800 credits with basic mode**.

Setting up Threema Gateway is a two-step process:

1. Generate encryption keys
   - The integration generates a public and private key pair.
   - Provide the public key when creating your Gateway ID on the Threema Gateway website.
   - Threema reviews and approves each public key manually, which can take a few days — so you may well be completing the Home Assistant setup long after the keys were generated.
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

Should your API secret later be revoked or changed on the Threema Gateway side, Home Assistant will prompt you to re-authenticate instead of requiring you to remove and re-add the integration. See [Troubleshooting](#troubleshooting).

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

Each recipient subentry creates its own **device**, named after the recipient (e.g., "Dad (AB1CD2EF)" or just the Threema ID if no name was given). The device hosts a single notify entity used to send messages to that recipient.

## Entities

### Notify

Each recipient device has one notify entity. Its entity ID is derived from the recipient's device name: if you gave the recipient a display name, that's `notify.<name>_<recipient_id>` (for example `notify.dad_ab1cd2ef`); otherwise it's just `notify.<recipient_id>` (for example `notify.ab1cd2ef`). You can find the exact entity ID under **Settings** > **Devices & services** > **Threema** > **Entities**.

## Actions

### Action `notify.send_message`

Send a text message to a Threema recipient via its notify entity.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `message` | no | The text message to send. |
| `title` | yes | An optional title, shown in bold before the message. |

### Examples

#### Send a simple text message

```yaml
action: notify.send_message
target:
  entity_id: notify.dad_ab1cd2ef
data:
  message: "The front door was just opened!"
```

#### Send a message with a title

```yaml
action: notify.send_message
target:
  entity_id: notify.dad_ab1cd2ef
data:
  title: "Security Alert"
  message: "Motion detected in the backyard."
```

#### Send a message from an automation

```yaml
alias: "Notify on door open"
triggers:
  - trigger: state
    entity_id: binary_sensor.front_door
    to: "on"
actions:
  - action: notify.send_message
    target:
      entity_id: notify.dad_ab1cd2ef
    data:
      message: "Front door opened!"
```

#### Send a message with a template

{% raw %}

```yaml
action: notify.send_message
target:
  entity_id: notify.dad_ab1cd2ef
data:
  message: "Temperature is {{ states('sensor.temperature') }}°C"
```

{% endraw %}

## Troubleshooting

### "Invalid authentication" during setup

Double-check that your Gateway ID starts with `*` and is exactly 8 characters. Verify the API secret matches what is shown on the [Threema Gateway dashboard](https://gateway.threema.ch). If you entered both a private and a public key, make sure they belong to the same key pair — otherwise setup fails with a key mismatch error.

### Home Assistant asks you to re-authenticate

If your API secret is changed or revoked on the Threema Gateway side, Home Assistant detects this — either at startup or the next time a message fails to send — and creates a repair notification asking you to re-authenticate. Go to **Settings** > **Devices & services**, select the notification (or open the Threema integration entry, which shows a **Reauthenticate** button), and enter the new API secret from [gateway.threema.ch](https://gateway.threema.ch). Removing and re-adding the integration is not necessary.

### Messages not arriving

- Make sure you have sufficient credits on your Threema Gateway account.
- Verify the recipient's Threema ID is correct (8 alphanumeric characters).
- Check **Settings** > **System** > **Logs** for error details from the `threema` integration.

### "Config entry not loaded"

This means the integration could not reach the Threema Gateway when Home Assistant started, for example due to a network issue or a temporary Threema Gateway outage. Home Assistant retries automatically; if the problem persists, check your internet connection, then try reloading the integration from **Settings** > **Devices & services** > **Threema**.

## Known limitations

- Text messages only: images, files, and other media are not supported.
- **No group messaging** — only 1-to-1 messages are supported.
- **Send only** — receiving messages is not supported.
- **No credit balance sensor** — check your remaining Gateway credits on the [Threema Gateway dashboard](https://gateway.threema.ch).

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
