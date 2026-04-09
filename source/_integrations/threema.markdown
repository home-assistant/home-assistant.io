---
title: Threema
description: Instructions on how to send Threema messages from Home Assistant.
ha_category:
  - Notifications
ha_release: 2026.4
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

- A [Threema Gateway](https://gateway.threema.ch) account. For testing purposes, you can [request developer credits](https://gateway.threema.ch) from Threema — make sure to select the **E2E Gateway** configuration when making the request.
- A Gateway ID (starts with `*`). You can use an existing ID or create a new one during setup.
- An API secret from the Threema Gateway dashboard.
- Message credits on your Threema Gateway account. Sending a message costs **1,600 credits with E2E mode** or **800 credits with basic mode**.

Setting up Threema Gateway is a two-step process:

1. Generate encryption keys
   - The integration generates a public and private key pair.
   - Provide the public key when creating your Gateway ID on the Threema Gateway website.
   - As of March 2026, this requires manual approval by Threema, which may take some time.
2. Configure the integration
   - Once your Gateway ID is approved, use the Gateway ID, API secret, and the previously generated keys to complete the integration setup in Home Assistant.

During setup, you can choose between two options:

- **Add existing Gateway ID**: Enter your Gateway ID, API secret, and your private and public keys to configure an existing Threema Gateway.
- **Generate new encryption keys**: The integration generates an encryption key pair and displays them. Save the keys — they cannot be recovered later. Then register a new Gateway ID at [gateway.threema.ch](https://gateway.threema.ch) using the generated public key, and complete setup with your Gateway credentials.

{% include integrations/config_flow.md %}
{% configuration_basic %}
Gateway ID:
  description: "Your Threema Gateway ID (starts with `*` and is 8 characters total)."
API secret:
  description: "The API secret from your Threema Gateway dashboard."
Private key:
  description: "Optional for basic mode, required for end-to-end encryption mode."
Public key:
  description: "Optional for basic mode, required for end-to-end encryption mode."
{% endconfiguration_basic %}
## Recipients

After setting up the gateway, add recipients as **subentries**. Go to **Settings** > **Devices & services** > **Threema**, select your gateway, and use **Add recipient**. Enter the 8-character Threema ID of the person you want to message and optionally a friendly display name (e.g., "Dad"). Each recipient creates a dedicated **notify entity**.

## Entities

### Notify

Each recipient subentry creates a notify entity (e.g., `notify.threema_ab1cd2ef`).

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
  entity_id: notify.threema_YOUR_THREEMA_ID
data:
  message: "The front door was just opened!"
```

#### Send a message with a title

```yaml
action: notify.send_message
target:
  entity_id: notify.threema_YOUR_THREEMA_ID
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
      entity_id: notify.threema_YOUR_THREEMA_ID
    data:
      message: "Front door opened!"
```

#### Send a message with a template

{% raw %}

```yaml
action: notify.send_message
target:
  entity_id: notify.threema_YOUR_THREEMA_ID
data:
  message: "Temperature is {{ states('sensor.temperature') }}°C"
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

The integration failed to initialize. Go to **Settings** > **Devices & services** > **Threema** and check the integration status. You may need to remove and re-add the integration.

## Removing the integration

This integration follows standard integration removal, no additional steps are required after removing it.

## Known limitations

- **Text messages only** — images, files, and other media are not supported.
- **No group messaging** — only 1-to-1 messages are supported.
- **Send only** — receiving messages is not supported.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
