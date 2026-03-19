---
title: Threema
description: Instructions on how to send Threema messages from Home Assistant.
ha_category:
  - Notifications
ha_release: "2026.4"
ha_config_flow: true
ha_iot_class: Cloud Push
ha_domain: threema
ha_platforms:
  - notify
ha_integration_type: service
ha_codeowners:
  - '@LukasQ'
---

The **Threema** {% term integration %} allows you to send end-to-end encrypted text messages from Home Assistant to [Threema](https://threema.ch) users via the [Threema Gateway](https://gateway.threema.ch) service. This integration is designed for the **E2E (end-to-end) encryption mode** of Threema Gateway, where messages are encrypted locally before being sent. If no private key is configured, the integration falls back to **basic mode** (server-side encryption).

## Prerequisites

- A [Threema Gateway](https://gateway.threema.ch) account. For testing purposes, you can [request developer credits](https://gateway.threema.ch) from Threema — make sure to select the **E2E Gateway** configuration when requesting.
- A Gateway ID (starts with `*`) — either an existing one or a new one created during setup.
- An API secret from the Threema Gateway dashboard.
- Message credits on your Threema Gateway account. Sending a message costs **1,600 credits with E2E mode** or **800 credits with basic mode**.

**Note:** Setting up Threema Gateway is a two-step process:

1. **Generate encryption keys**: The integration generates a public and private key pair. You then need to provide the public key when creating your Gateway ID on the Threema Gateway website. As of March 2026, this requires manual approval by Threema, which may take some time.
2. **Configure the integration**: Once your Gateway ID is approved, use the Gateway ID, API secret, and the previously generated keys to complete the integration setup in Home Assistant.

## Setup

During setup, you can choose between two options:

- **Create a new Gateway ID**: The integration generates an encryption key pair for you. Save the displayed keys — they cannot be recovered later. Then enter the Gateway ID and API secret from the Threema Gateway dashboard.
- **Use an existing Gateway ID**: Enter your Gateway ID, API secret, and your private and public keys for end-to-end encryption.

{% include integrations/config_flow.md %}

## Recipients

After setting up the gateway, add recipients as **subentries**. Go to **Settings** > **Devices & services** > **Threema**, select your gateway, and use **Add recipient**. Enter the 8-character Threema ID of the person you want to message and optionally a friendly display name (e.g., "Dad"). Each recipient creates a dedicated **notify entity**.

## Entities

### Notify

Each recipient subentry creates a notify entity (e.g., `notify.threema_ab1cd2ef`).

## Actions

### Action `notify.threema`

Send a text message to a Threema recipient.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `message` | no | The text message to send. |
| `title` | yes | An optional title, shown in bold before the message. |
| `target` | yes | The 8-character Threema ID of the recipient. |

### Examples

#### Send a simple text message

```yaml
action: notify.threema
data:
  message: "The front door was just opened!"
  target: "YOUR_THREEMA_ID"
```

#### Send a message with a title

```yaml
action: notify.threema
data:
  title: "Security Alert"
  message: "Motion detected in the backyard."
  target: "YOUR_THREEMA_ID"
```

#### Send a message from an automation

```yaml
alias: "Notify on door open"
triggers:
  - trigger: state
    entity_id: binary_sensor.front_door
    to: "on"
actions:
  - action: notify.threema
    data:
      message: "Front door opened!"
      target: "YOUR_THREEMA_ID"
```

#### Send a message with a template

{% raw %}

```yaml
action: notify.threema
data:
  message: "Temperature is {{ states('sensor.temperature') }}°C"
  target: "YOUR_THREEMA_ID"
```

{% endraw %}

## Troubleshooting

### "Invalid authentication" during setup

Double-check that your Gateway ID starts with `*` and is exactly 8 characters. Verify the API secret matches what is shown on the [Threema Gateway dashboard](https://gateway.threema.ch).

### Messages not arriving

- Make sure you have sufficient credits on your Threema Gateway account.
- Verify the recipient's Threema ID is correct (8 alphanumeric characters).
- Check **Settings** > **System** > **Logs** for error details from the `threema` integration.

### "Config entry not loaded" when sending a message

The integration failed to initialize. Go to **Settings** > **Devices & services** > **Threema** and check if a reauthentication is required.

## Known limitations

- **Text messages only** — images, files, and other media are not supported.
- **No group messaging** — only 1-to-1 messages are supported.
- **Send only** — receiving messages is not supported.
