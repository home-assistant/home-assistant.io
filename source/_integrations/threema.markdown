---
title: Threema
description: Instructions on how to send Threema messages from Home Assistant.
ha_category:
  - Notifications
ha_release: 2026.10
ha_config_flow: true
ha_iot_class: Cloud Push
ha_domain: threema
ha_platforms:
  - notify
ha_integration_type: service
ha_codeowners:
  - '@LukasQ'
ha_quality_scale: silver
---

The **Threema** {% term integration %} allows you to send end-to-end encrypted text messages from Home Assistant to [Threema](https://threema.ch) users via the [Threema Gateway](https://gateway.threema.ch) service. This integration is designed for the **E2E (end-to-end) encryption mode** of Threema Gateway, where messages are encrypted locally before being sent. If no private key is configured, the integration falls back to **basic mode** (server-side encryption).

## Prerequisites

- A [Threema Gateway](https://gateway.threema.ch) account. For testing purposes, you can [request developer credits](https://gateway.threema.ch) from Threema — make sure to select the **E2E Gateway** configuration when making the request.
- A Gateway ID (starts with `*`). You can use an existing ID or create a new one during setup.
- An API secret from the Threema Gateway dashboard.
- Message credits on your Threema Gateway account. Sending a message costs **1,600 credits with E2E mode** or **800 credits with basic mode**.

Setting up Threema Gateway is a two-step process:

1. Generate encryption keys
   - The integration generates a public and private key pair.
   - Provide the public key when creating your Gateway ID on the Threema Gateway website.
   - Threema reviews and approves each public key manually, which can take a few days — so you may well be completing the Home Assistant setup long after the keys were generated.
2. Configure the integration
   - Once your Gateway ID is approved, use the Gateway ID, API secret, and the previously generated private key to complete the integration setup in Home Assistant.

## Setup

During setup, you can choose between two options:

- **Add existing Gateway ID**: Enter your Gateway ID, API secret, and the private key generated for it. You can optionally also paste the public key you registered at [gateway.threema.ch](https://gateway.threema.ch) — it is only used once, to verify it matches the private key, and is never stored.
- **Generate new encryption keys**: The integration generates an encryption key pair and displays them. Save the keys — they cannot be recovered later. Then register a new Gateway ID at [gateway.threema.ch](https://gateway.threema.ch) using the generated public key, and complete setup with your Gateway credentials.

If you leave the private key empty, the integration uses **basic mode** instead, sending messages via the Gateway without local end-to-end encryption.

Should your API secret later be revoked or changed on the Threema Gateway side, Home Assistant will prompt you to re-authenticate instead of requiring you to remove and re-add the integration — see [Troubleshooting](#troubleshooting).

{% include integrations/config_flow.md %}

## Recipients

After setting up the gateway, add recipients as **subentries**. Go to **Settings** > **Devices & services** > **Threema**, select your gateway, and use **Add recipient**. Enter the 8-character Threema ID of the person you want to message and optionally a friendly display name (e.g., "Dad").

## Devices

Each recipient subentry creates its own **device**, named after the recipient (e.g., "Dad (AB1CD2EF)" or just the Threema ID if no name was given). The device hosts a single notify entity used to send messages to that recipient.

## Entities

### Notify

Each recipient device has one notify entity, with an entity ID of the form `notify.threema_<gateway_id>_<recipient_id>` (or `notify.threema_<gateway_id>_<name>_<recipient_id>` if a display name was set), for example `notify.threema_abcd123_ab1cd2ef` or `notify.threema_abcd123_dad_ab1cd2ef`. You can find the exact entity ID under **Settings** > **Devices & services** > **Threema** > **Entities**.

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
  entity_id: notify.threema_YOUR_GATEWAY_ID_YOUR_THREEMA_ID
data:
  message: "The front door was just opened!"
```

#### Send a message with a title

```yaml
action: notify.send_message
target:
  entity_id: notify.threema_YOUR_GATEWAY_ID_YOUR_THREEMA_ID
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
      entity_id: notify.threema_YOUR_GATEWAY_ID_YOUR_THREEMA_ID
    data:
      message: "Front door opened!"
```

#### Send a message with a template

{% raw %}

```yaml
action: notify.send_message
target:
  entity_id: notify.threema_YOUR_GATEWAY_ID_YOUR_THREEMA_ID
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

## Removing the integration

This integration follows standard integration removal, no additional steps are required after removing it.

## Known limitations

- **Text messages only** — images, files, and other media are not supported.
- **No group messaging** — only 1-to-1 messages are supported.
- **Send only** — receiving messages is not supported.
- **No credit balance sensor** — check your remaining Gateway credits on the [Threema Gateway dashboard](https://gateway.threema.ch).
