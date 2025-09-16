---
title: Telegram bot
description: Telegram bot support
ha_category:
  - Hub
ha_release: 0.42
ha_iot_class: Cloud Push
ha_config_flow: true
ha_domain: telegram_bot
ha_integration_type: integration
ha_quality_scale: bronze
ha_codeowners:
  - '@hanwg'
ha_platforms:
  - notify
---

Use Telegram on your mobile or desktop device to send and receive messages or commands to/from your Home Assistant.
This integration creates notification actions to send, edit or receive messages from a [Telegram Bot account](https://core.telegram.org/bots).

## Introduction - Telegram bot platforms

Platforms are Telegram bot implementations for managing communications with Telegram for sending and receiving messages.
When setting up this integration, you should specify the platform which fits your environment and use case.

### Broadcast

Telegram implementation to support **sending messages only**. Your Home Assistant instance does not have to be exposed to the internet and there is no polling to receive messages or commands sent to the bot.

### Polling

Telegram chatbot polling implementation.
Your Home Assistant instance does not have to be exposed to the internet.

### Webhooks

Telegram chatbot webhooks implementation as described in the Telegram [documentation](https://core.telegram.org/bots/webhooks).
This implementation allows Telegram to push updates directly to your server and requires your Home Assistant instance to be exposed to the internet.

## Prerequisites

### Create Telegram bot

Create your Telegram bot and [retrieve the API key](/integrations/telegram). The `api_key` will be used for adding the bot to Home Assistant during integration setup.

### Allow Telegram bot to access your Home Assistant files (Optional)

To enable Telegram bot to send local files, you must grant access to it by adding the file's folder to [`allowlist_external_dirs`](/integrations/homeassistant/#allowlist_external_dirs).

Example `configuration.yaml`:

```yaml
homeassistant:
  allowlist_external_dirs:
    - "/media"
```

### Allow Telegram to connect to your Home Assistant (Webhooks platform only)

{% note %}
This integration currently does not support self-signed certificates for HTTPS.
If you are using the *Reverse proxy* or *Direct* method, please ensure that your certificates are signed by a public Certificate Authority (CA).
{% endnote %}

If you plan to use the `Webhooks` platform, you will need to allow Telegram to connect to your Home Assistant using one of the following methods:

#### Home Assistant Cloud

If you have a Home Assistant Cloud subscription, you can [enable remote access](https://support.nabucasa.com/hc/en-us/articles/26474279202973-Enabling-remote-access-to-Home-Assistant#to-activate-remote-control-from-outside-your-network) to your Home Assistant.

#### Reverse proxy

If your Home Assistant is behind a publicly accessible reverse proxy (for example NGINX, Caddy, Traefik) with HTTPS enabled, do the following:

1. Go to {% my network title="**Settings** > **System** > **Network**" %} and configure *Home Assistant URL*.
2. Configure the [HTTP integration](/integrations/http) to allow Home Assistant to accept connections from your reverse proxy:
   - Set `use_x_forwarded_for` to `true`.
   - Add the IP address of the reverse proxy to `trusted_proxies`.

Example `configuration.yaml`:

```yaml
http:
  use_x_forwarded_for: true
  trusted_proxies:
    - 192.168.0.0/16
```

#### Direct

If your Home Assistant is publicly accessible, do the following:

1. Go to {% my network title="**Settings** > **System** > **Network**" %} and configure *Home Assistant URL*.
2. Configure the [HTTP integration](/integrations/http) to enable HTTPS on your Home Assistant by configuring the following variables:
   - `server_host`
   - `server_port`
   - `ssl_certificate`
   - `ssl_key`

{% include integrations/config_flow.md %}

{% configuration_basic %}
Platform:
  description: The Telegram bot type, either `Broadcast`, `Polling` or `Webhooks`.
API key:
  description: The API token of your bot.
Proxy URL:
  description: Proxy URL if working behind one, optionally including username and password. (`socks5://username:password@proxy_ip:proxy_port`).
{% endconfiguration_basic %}

### Webhooks configuration

{% note %}
If you are using Home Assistant Cloud, you must include `127.0.0.1` in the **Trusted networks** field as IP address of incoming requests are not forwarded to your Home Assistant.
{% endnote %}

If you have selected the `Webhooks` Telegram bot type, the integration setup will continue with the webhooks configuration step.
{% configuration_basic %}
URL:
  description: Allow to overwrite the external URL from the Home Assistant [configuration](/integrations/homeassistant/#editing-the-general-settings-in-yaml) for different setups (`https://<public_url>:<port>`).
Trusted networks:
  description: Telegram server access ACL as list. Default is `149.154.160.0/20, 91.108.4.0/22`.
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

The integration can be configured to use a default parse mode for messages.

{% configuration_basic %}
Parse mode:
  description: Default parser for messages if not explicit in message data, either `markdown` (legacy), `markdownv2`, `html` or `plain_text`. Refer to Telegram's [formatting options](https://core.telegram.org/bots/api#formatting-options) for more information.
{% endconfiguration_basic %}

## Allowlisting chat IDs via Subentries

A Telegram chat ID is a unique numerical identifier for an individual user (positive) or a chat group (negative).
You must allowlist the chat ID for the Telegram bot before it can send/receive messages for that chat.
To allowlist the chat ID, [retrieve the chat ID](/integrations/telegram#methods-to-retrieve-a-chat_id) and create a subentry:

1. Go to **{% my integrations title="Settings > Devices & services" %}**.
2. Select the Telegram bot integration.
3. Next to the entry, select the three dots {% icon "mdi:dots-vertical" %} menu. Then, select **Add allowed chat ID**.

{% configuration_basic %}
Chat ID:
  description: ID representing the user or group chat to which messages can be sent.
{% endconfiguration_basic %}

## Notifiers

This integration will add a notify {% term entity %} for each configured chat ID.
You can use the `notify.send_message` action to publish notifications.

{% details "Example YAML configuration" %}

{% raw %}

```yaml
action: notify.send_message
data:
  message: "Reminder: Have you considered frogs?"
  entity_id: notify.telegram_bot_chat
```

{% endraw %}

{% enddetails %}

## Notification actions

Available actions: `send_message`, `send_photo`, `send_video`, `send_animation`, `send_voice`, `send_sticker`, `send_document`, `send_location`, `edit_message`, `edit_caption`, `edit_replymarkup`, `answer_callback_query`, `delete_message`, `leave_chat` and `set_message_reaction`.

Actions that send contents (`send_*`) will return a list of `message_id`/`chat_id` for messages delivered (in a property called `chats`). This will populate [Response Data](/docs/scripts/perform-actions#use-templates-to-handle-response-data) that you can further utilize in your automations to edit/delete the message later based on the `message_id`. See the example later on this page for usage instructions.

### Action `telegram_bot.send_message`

Send a notification.

| Data attribute     | Optional | Description                                                                                                                                                                                                                                                                                               |
| -------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config_entry_id`          | yes      | The config entry representing the Telegram bot to send the message. Required if you have multiple Telegram bots.|
| `message`                  | no       | Message body of the notification.                                                                                                                                                                                                                                                                         |
| `title`                    | yes      | Optional title for your notification. Will be composed as '%title\n%message'.                                                                                                                                                                                                                             |
| `target`                   | yes      | An array of pre-authorized chat_ids or user_ids to send the notification to. Defaults to the first allowed chat_id.                                                                                                                                                                                       |
| `parse_mode`               | yes      | Parser for the message text: `markdownv2`, `html`, `markdown` or `plain_text`.                                                                                                                                                                                                                            |
| `disable_notification`     | yes      | True/false for send the message silently. iOS users and web users will not receive a notification, Android users will receive a notification with no sound. Defaults to False.                                                                                                                            |
| `disable_web_page_preview` | yes      | True/false for disable link previews for links in the message.                                                                                                                                                                                                                                            |
| `resize_keyboard`          | yes      | True/false for resizing the keyboard vertically for optimal fit. Defaults to False.                                                                                                                                                                                                                       |
| `one_time_keyboard`        | yes      | True/false for hiding the keyboard as soon as it’s been used. The keyboard will still be available, but clients will automatically display the usual letter keyboard in the chat - the user can press a special button in the input field to see the custom keyboard again. Defaults to False.            |
| `keyboard`                 | yes      | List of rows of commands, comma-separated, to make a custom keyboard. `[]` to reset to no custom keyboard. Example: `["/command1, /command2", "/command3"]`                                                                                                                                               |
| `inline_keyboard`          | yes      | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data or external URL (https-only). Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Google link", "https://google.com"]]]` |
| `message_tag`              | yes      | Tag for sent message. In `telegram_sent` event data: {% raw %}`{{trigger.event.data.message_tag}}`{% endraw %}                                                                                                                                                                                            |
| `reply_to_message_id`      | yes      | Mark the message as a reply to a previous message. In `telegram_callback` handling, for example, you can use {% raw %}`{{ trigger.event.data.message.message_id }}`{% endraw %}                                                                                                                           |
| `message_thread_id`        | yes      | Send the message to a specific topic or thread.|

### Action `telegram_bot.send_photo`

Send a photo.

| Data attribute | Optional | Description                                                                                                                                                                                                                                                                                               |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config_entry_id`      | yes      | The config entry representing the Telegram bot to send the photo. Required if you have multiple Telegram bots.|
| `url`                  | no       | Remote path to an image.                                                                                                                                                                                                                                                                                  |
| `file`                 | no       | Local path to an image.                                                                                                                                                                                                                                                                                   |
| `caption`              | yes      | The title of the image.                                                                                                                                                                                                                                                                                   |
| `authentication`       | yes      | Define which authentication method to use. Set to `basic` for HTTP basic authentication, `digest` for HTTP digest authentication, or `bearer_token` for OAuth 2.0 bearer token authentication.                                                                                                                           |
| `username`             | yes      | Username for a URL which requires HTTP `basic` or `digest` authentication.                                                                                                                                                                                                                                                    |
| `password`             | yes      | Password (or bearer token) for a URL that requires authentication.                                                                                                                                                                                                                                   |
| `target`               | yes      | An array of pre-authorized chat_ids or user_ids to send the notification to. Defaults to the first allowed chat_id.                                                                                                                                                                                       |
| `parse_mode`           | yes      | Parser for the message text: `markdownv2`, `html`, `markdown` or `plain_text`.                                                                                                                                                                                                                            |
| `disable_notification` | yes      | True/false for send the message silently. iOS users and web users will not receive a notification, Android users will receive a notification with no sound. Defaults to False.                                                                                                                            |
| `verify_ssl`           | yes      | True/false for checking the SSL certificate of the server for HTTPS URLs. Defaults to True.                                                                                                                                                                                                               |
| `timeout`              | yes      | Timeout for sending photo in seconds. Will help with timeout errors (poor internet connection, etc)                                                                                                                                                                                                       |
| `resize_keyboard`      | yes      | True/false for resizing the keyboard vertically for optimal fit. Defaults to False.                                                                                                                                                                                                                       |
| `one_time_keyboard`    | yes      | True/false for hiding the keyboard as soon as it’s been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat - the user can press a special button in the input field to see the custom keyboard again. Defaults to False.            |
| `keyboard`             | yes      | List of rows of commands, comma-separated, to make a custom keyboard. `[]` to reset to no custom keyboard. Example: `["/command1, /command2", "/command3"]`                                                                                                                                               |
| `inline_keyboard`      | yes      | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data or external URL (https-only). Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Google link", "https://google.com"]]]` |
| `message_tag`          | yes      | Tag for sent message. In `telegram_sent` event data: {% raw %}`{{trigger.event.data.message_tag}}`{% endraw %}                                                                                                                                                                                            |
| `reply_to_message_id`  | yes      | Mark the message as a reply to a previous message. In `telegram_callback` handling, for example, you can use {% raw %}`{{ trigger.event.data.message.message_id }}`{% endraw %}                                                                                                                       |
| `message_thread_id`    | yes      | Send the message to a specific topic or thread.|

### Action `telegram_bot.send_video`

Send a video.

| Data attribute | Optional | Description                                                                                                                                                                                                                                                                                               |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config_entry_id`      | yes      | The config entry representing the Telegram bot to send the video. Required if you have multiple Telegram bots.|
| `url`                  | no       | Remote path to a video.                                                                                                                                                                                                                                                                                   |
| `file`                 | no       | Local path to a video.                                                                                                                                                                                                                                                                                    |
| `caption`              | yes      | The title of the video.                                                                                                                                                                                                                                                                                   |
| `authentication`       | yes      | Define which authentication method to use. Set to `basic` for HTTP basic authentication, `digest` for HTTP digest authentication, or `bearer_token` for OAuth 2.0 bearer token authentication.                                                                                                                           |
| `username`             | yes      | Username for a URL which requires HTTP `basic` or `digest` authentication.                                                                                                                                                                                                                                                    |
| `password`             | yes      | Password (or bearer token) for a URL that requires authentication.                                                                                                                                                                                                                                   |
| `target`               | yes      | An array of pre-authorized chat_ids or user_ids to send the notification to. Defaults to the first allowed chat_id.                                                                                                                                                                                       |
| `parse_mode`           | yes      | Parser for the message text: `markdownv2`, `html`, `markdown` or `plain_text`.                                                                                                                                                                                                                            |
| `disable_notification` | yes      | True/false to send the message silently. iOS users and web users will not receive a notification. Android users will receive a notification with no sound. Defaults to False.                                                                                                                             |
| `verify_ssl`           | yes      | True/false for checking the SSL certificate of the server for HTTPS URLs. Defaults to True.                                                                                                                                                                                                               |
| `timeout`              | yes      | Timeout for sending video in seconds. Will help with timeout errors (poor internet connection, etc)                                                                                                                                                                                                       |
| `resize_keyboard`      | yes      | True/false for resizing the keyboard vertically for optimal fit. Defaults to False.                                                                                                                                                                                                                       |
| `one_time_keyboard`    | yes      | True/false for hiding the keyboard as soon as it’s been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat - the user can press a special button in the input field to see the custom keyboard again. Defaults to False.            |
| `keyboard`             | yes      | List of rows of commands, comma-separated, to make a custom keyboard. `[]` to reset to no custom keyboard. Example: `["/command1, /command2", "/command3"]`                                                                                                                                               |
| `inline_keyboard`      | yes      | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data or external URL (https-only). Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Google link", "https://google.com"]]]` |
| `reply_to_message_id`  | yes      | Mark the message as a reply to a previous message. In `telegram_callback` handling, for example, you can use {% raw %}`{{ trigger.event.data.message.message_id }}`{% endraw %}                                                                                                                       |
| `message_thread_id`    | yes      | Send the message to a specific topic or thread.|

### Action `telegram_bot.send_animation`

Send an animation.

| Data attribute | Optional | Description                                                                                                                                                                                                                                                                                               |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config_entry_id`      | yes      | The config entry representing the Telegram bot to send the animation. Required if you have multiple Telegram bots.|
| `url`                  | no       | Remote path to a GIF or H.264/MPEG-4 AVC video without sound.                                                                                                                                                                                                                                             |
| `file`                 | no       | Local path to a GIF or H.264/MPEG-4 AVC video without sound.                                                                                                                                                                                                                                              |
| `caption`              | yes      | The title of the animation.                                                                                                                                                                                                                                                                               |
| `authentication`       | yes      | Define which authentication method to use. Set to `basic` for HTTP basic authentication, `digest` for HTTP digest authentication, or `bearer_token` for OAuth 2.0 bearer token authentication.                                                                                                                           |
| `username`             | yes      | Username for a URL which requires HTTP `basic` or `digest` authentication.                                                                                                                                                                                                                                                    |
| `password`             | yes      | Password (or bearer token) for a URL that requires authentication.                                                                                                                                                                                                                                   |
| `target`               | yes      | An array of pre-authorized chat_ids or user_ids to send the notification to. Defaults to the first allowed chat_id.                                                                                                                                                                                       |
| `parse_mode`           | yes      | Parser for the message text: `markdownv2`, `html`, `markdown` or `plain_text`.                                                                                                                                                                                                                            |
| `disable_notification` | yes      | True/false to send the message silently. iOS users and web users will not receive a notification. Android users will receive a notification with no sound. Defaults to False.                                                                                                                             |
| `verify_ssl`           | yes      | True/false for checking the SSL certificate of the server for HTTPS URLs. Defaults to True.                                                                                                                                                                                                               |
| `timeout`              | yes      | Timeout for sending video in seconds. Will help with timeout errors (poor internet connection, etc)                                                                                                                                                                                                       |
| `resize_keyboard`      | yes      | True/false for resizing the keyboard vertically for optimal fit. Defaults to False.                                                                                                                                                                                                                       |
| `one_time_keyboard`    | yes      | True/false for hiding the keyboard as soon as it’s been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat - the user can press a special button in the input field to see the custom keyboard again. Defaults to False.            |
| `keyboard`             | yes      | List of rows of commands, comma-separated, to make a custom keyboard. `[]` to reset to no custom keyboard. Example: `["/command1, /command2", "/command3"]`                                                                                                                                               |
| `inline_keyboard`      | yes      | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data or external URL (https-only). Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Google link", "https://google.com"]]]` |
| `message_tag`          | yes      | Tag for sent message. In `telegram_sent` event data: {% raw %}`{{trigger.event.data.message_tag}}`{% endraw %}                                                                                                                                                                                            |
| `reply_to_message_id`  | yes      | Mark the message as a reply to a previous message. In `telegram_callback` handling, for example, you can use {% raw %}`{{ trigger.event.data.message.message_id }}`{% endraw %}                                                                                                                       |
| `message_thread_id`    | yes      | Send the message to a specific topic or thread.|

### Action `telegram_bot.send_voice`

Send a voice message.

| Data attribute | Optional | Description                                                                                                                                                                                                                                                                                               |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config_entry_id`      | yes      | The config entry representing the Telegram bot to send the voice message. Required if you have multiple Telegram bots.|
| `url`                  | no       | Remote path to a voice message.                                                                                                                                                                                                                                                                           |
| `file`                 | no       | Local path to a voice message.                                                                                                                                                                                                                                                                            |
| `caption`              | yes      | The title of the voice message.                                                                                                                                                                                                                                                                           |
| `authentication`       | yes      | Define which authentication method to use. Set to `basic` for HTTP basic authentication, `digest` for HTTP digest authentication, or `bearer_token` for OAuth 2.0 bearer token authentication.                                                                                                                           |
| `username`             | yes      | Username for a URL which requires HTTP `basic` or `digest` authentication.                                                                                                                                                                                                                                                    |
| `password`             | yes      | Password (or bearer token) for a URL that requires authentication.                                                                                                                                                                                                                                   |
| `target`               | yes      | An array of pre-authorized chat_ids or user_ids to send the notification to. Defaults to the first allowed chat_id.                                                                                                                                                                                       |
| `disable_notification` | yes      | True/false to send the message silently. iOS users and web users will not receive a notification. Android users will receive a notification with no sound. Defaults to False.                                                                                                                             |
| `verify_ssl`           | yes      | True/false for checking the SSL certificate of the server for HTTPS URLs. Defaults to True.                                                                                                                                                                                                               |
| `timeout`              | yes      | Timeout for sending voice in seconds. Will help with timeout errors (poor internet connection, etc)                                                                                                                                                                                                       |
| `resize_keyboard`      | yes      | True/false for resizing the keyboard vertically for optimal fit. Defaults to False.                                                                                                                                                                                                                       |
| `one_time_keyboard`    | yes      | True/false for hiding the keyboard as soon as it’s been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat - the user can press a special button in the input field to see the custom keyboard again. Defaults to False.            |
| `keyboard`             | yes      | List of rows of commands, comma-separated, to make a custom keyboard. `[]` to reset to no custom keyboard. Example: `["/command1, /command2", "/command3"]`                                                                                                                                               |
| `inline_keyboard`      | yes      | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data or external URL (https-only). Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Google link", "https://google.com"]]]` |
| `message_tag`          | yes      | Tag for sent message. In `telegram_sent` event data: {% raw %}`{{trigger.event.data.message_tag}}`{% endraw %}                                                                                                                                                                                            |
| `reply_to_message_id`  | yes      | Mark the message as a reply to a previous message. In `telegram_callback` handling, for example, you can use {% raw %}`{{ trigger.event.data.message.message_id }}`{% endraw %}                                                                                                                       |
| `message_thread_id`    | yes      | Send the message to a specific topic or thread.|

### Action `telegram_bot.send_sticker`

Send a sticker.

| Data attribute | Optional | Description                                                                                                                                                                                                                                                                                               |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config_entry_id`      | yes      | The config entry representing the Telegram bot to send the sticker. Required if you have multiple Telegram bots.|
| `url`                  | no       | Remote path to a static .webp or animated .tgs sticker.                                                                                                                                                                                                                                                   |
| `file`                 | no       | Local path to a static .webp or animated .tgs sticker.                                                                                                                                                                                                                                                    |
| `sticker_id`           | no       | ID of a sticker that exists  on telegram servers. The ID can be found by sending a sticker to your bot and querying the telegram-api method [getUpdates](https://core.telegram.org/bots/api#getting-updates) or by using the [@idstickerbot](https://t.me/idstickerbot)                                   |
| `authentication`       | yes      | Define which authentication method to use. Set to `basic` for HTTP basic authentication, `digest` for HTTP digest authentication, or `bearer_token` for OAuth 2.0 bearer token authentication.                                                                                                                           |
| `username`             | yes      | Username for a URL which requires HTTP `basic` or `digest` authentication.                                                                                                                                                                                                                                                    |
| `password`             | yes      | Password (or bearer token) for a URL that requires authentication.                                                                                                                                                                                                                                   |
| `target`               | yes      | An array of pre-authorized chat_ids or user_ids to send the notification to. Defaults to the first allowed chat_id.                                                                                                                                                                                       |
| `disable_notification` | yes      | True/false for send the message silently. iOS users and web users will not receive a notification, Android users will receive a notification with no sound. Defaults to False.                                                                                                                            |
| `verify_ssl`           | yes      | True/false for checking the SSL certificate of the server for HTTPS URLs. Defaults to True.                                                                                                                                                                                                               |
| `timeout`              | yes      | Timeout for sending photo in seconds. Will help with timeout errors (poor internet connection, etc)                                                                                                                                                                                                       |
| `resize_keyboard`      | yes      | True/false for resizing the keyboard vertically for optimal fit. Defaults to False.                                                                                                                                                                                                                       |
| `one_time_keyboard`    | yes      | True/false for hiding the keyboard as soon as it’s been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat - the user can press a special button in the input field to see the custom keyboard again. Defaults to False.            |
| `keyboard`             | yes      | List of rows of commands, comma-separated, to make a custom keyboard. `[]` to reset to no custom keyboard. Example: `["/command1, /command2", "/command3"]`                                                                                                                                               |
| `inline_keyboard`      | yes      | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data or external URL (https-only). Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Google link", "https://google.com"]]]` |
| `message_tag`          | yes      | Tag for sent message. In `telegram_sent` event data: {% raw %}`{{trigger.event.data.message_tag}}`{% endraw %}                                                                                                                                                                                            |
| `reply_to_message_id`  | yes      | Mark the message as a reply to a previous message. In `telegram_callback` handling, for example, you can use {% raw %}`{{ trigger.event.data.message.message_id }}`{% endraw %}                                                                                                                       |
| `message_thread_id`    | yes      | Send the message to a specific topic or thread.|

### Action `telegram_bot.send_document`

Send a document.

| Data attribute | Optional | Description                                                                                                                                                                                                                                                                                               |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config_entry_id`      | yes      | The config entry representing the Telegram bot to send the document. Required if you have multiple Telegram bots.|
| `url`                  | no       | Remote path to a document.                                                                                                                                                                                                                                                                                |
| `file`                 | no       | Local path to a document.                                                                                                                                                                                                                                                                                 |
| `caption`              | yes      | The title of the document.                                                                                                                                                                                                                                                                                |
| `authentication`       | yes      | Define which authentication method to use. Set to `basic` for HTTP basic authentication, `digest` for HTTP digest authentication, or `bearer_token` for OAuth 2.0 bearer token authentication.                                                                                                                           |
| `username`             | yes      | Username for a URL which requires HTTP `basic` or `digest` authentication.                                                                                                                                                                                                                                                    |
| `password`             | yes      | Password (or bearer token) for a URL that requires authentication.                                                                                                                                                                                                                                   |
| `target`               | yes      | An array of pre-authorized chat_ids or user_ids to send the notification to. Defaults to the first allowed chat_id.                                                                                                                                                                                       |
| `parse_mode`           | yes      | Parser for the message text: `markdownv2`, `html`, `markdown` or `plain_text`.                                                                                                                                                                                                                            |
| `disable_notification` | yes      | True/false for send the message silently. iOS users and web users will not receive a notification, Android users will receive a notification with no sound. Defaults to False.                                                                                                                            |
| `verify_ssl`           | yes      | True/false for checking the SSL certificate of the server for HTTPS URLs. Defaults to True.                                                                                                                                                                                                               |
| `timeout`              | yes      | Timeout for sending document in seconds. Will help with timeout errors (poor internet connection, etc)                                                                                                                                                                                                    |
| `resize_keyboard`      | yes      | True/false for resizing the keyboard vertically for optimal fit. Defaults to False.                                                                                                                                                                                                                       |
| `one_time_keyboard`    | yes      | True/false for hiding the keyboard as soon as it’s been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat - the user can press a special button in the input field to see the custom keyboard again. Defaults to False.            |
| `keyboard`             | yes      | List of rows of commands, comma-separated, to make a custom keyboard. `[]` to reset to no custom keyboard. Example: `["/command1, /command2", "/command3"]`                                                                                                                                               |
| `inline_keyboard`      | yes      | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data or external URL (https-only). Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Google link", "https://google.com"]]]` |
| `message_tag`          | yes      | Tag for sent message. In `telegram_sent` event data: {% raw %}`{{trigger.event.data.message_tag}}`{% endraw %}                                                                                                                                                                                            |
| `reply_to_message_id`  | yes      | Mark the message as a reply to a previous message. In `telegram_callback` handling, for example, you can use {% raw %}`{{ trigger.event.data.message.message_id }}`{% endraw %}                                                                                                                       |
| `message_thread_id`    | yes      | Send the message to a specific topic or thread.|

### Action `telegram_bot.send_location`

Send a location.

| Data attribute | Optional | Description                                                                                                                                                                                                                                                                                               |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config_entry_id`      | yes      | The config entry representing the Telegram bot to send the location. Required if you have multiple Telegram bots.|
| `latitude`             | no       | The latitude to send.                                                                                                                                                                                                                                                                                     |
| `longitude`            | no       | The longitude to send.                                                                                                                                                                                                                                                                                    |
| `target`               | yes      | An array of pre-authorized chat_ids or user_ids to send the notification to. Defaults to the first allowed `chat_id`.                                                                                                                                                                                     |
| `disable_notification` | yes      | True/false for send the message silently. iOS users and web users will not receive a notification, Android users will receive a notification with no sound. Defaults to False.                                                                                                                            |
| `resize_keyboard`      | yes      | True/false for resizing the keyboard vertically for optimal fit. Defaults to False.                                                                                                                                                                                                                       |
| `one_time_keyboard`    | yes      | True/false for hiding the keyboard as soon as it’s been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat - the user can press a special button in the input field to see the custom keyboard again. Defaults to False.            |
| `keyboard`             | yes      | List of rows of commands, comma-separated, to make a custom keyboard. `[]` to reset to no custom keyboard. Example: `["/command1, /command2", "/command3"]`                                                                                                                                               |
| `inline_keyboard`      | yes      | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data or external URL (https-only). Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Google link", "https://google.com"]]]` |
| `message_tag`          | yes      | Tag for sent message. In `telegram_sent` event data: {% raw %}`{{trigger.event.data.message_tag}}`{% endraw %}                                                                                                                                                                                            |
| `reply_to_message_id`  | yes      | Mark the message as a reply to a previous message. In `telegram_callback` handling, for example, you can use {% raw %}`{{ trigger.event.data.message.message_id }}`{% endraw %}                                                                                                                       |
| `message_thread_id`    | yes      | Send the message to a specific topic or thread.|

### Action `telegram_bot.send_poll`

Send a poll.

| Data attribute    | Optional | Description                                                                                                                                                                    |
| ------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `config_entry_id`         | yes      | The config entry representing the Telegram bot to send the poll. Required if you have multiple Telegram bots.|
| `question`                | no       | Poll question, 1-300 characters.                                                                                                                                               |
| `options`                 | no       | List of answer options, 2-10 strings 1-100 characters each.                                                                                                                    |
| `target`                  | yes      | An array of pre-authorized chat_ids or user_ids to send the notification to. Defaults to the first allowed `chat_id`.                                                          |
| `is_anonymous`            | yes      | True/false for if the poll needs to be anonymous, defaults to True.                                                                                                            |
| `allows_multiple_answers` | yes      | True/false for if the poll allows multiple answers, defaults to False.                                                                                                         |
| `open_period`             | yes      | Amount of time in seconds the poll will be active after creation, 5-600.                                                                                                       |
| `disable_notification`    | yes      | True/false for send the message silently. iOS users and web users will not receive a notification, Android users will receive a notification with no sound. Defaults to False. |
| `timeout`                 | yes      | Timeout for sending voice in seconds. Will help with timeout errors (poor internet connection, etc)                                                                            |
| `reply_to_message_id`     | yes      | Mark the message as a reply to a previous message. In `telegram_callback` handling, for example, you can use {% raw %}`{{ trigger.event.data.message.message_id }}`{% endraw %} |
| `message_thread_id`       | yes      | Send the message to a specific topic or thread.|

### Action `telegram_bot.edit_message`

Edit a previously sent message in a conversation.

| Data attribute     | Optional | Description                                                                                                                                                                                                                                                                                               |
| -------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config_entry_id`          | yes      | The config entry representing the Telegram bot to edit the message. Required if you have multiple Telegram bots.|
| `message_id`               | no       | Id of the message to edit. When answering a callback from a pressed button, the id of the origin message is in: {% raw %}`{{ trigger.event.data.message.message_id }}`{% endraw %}. You can use `"last"` to refer to the last message sent to `chat_id`.                                                  |
| `chat_id`                  | no       | The chat_id where to edit the message.                                                                                                                                                                                                                                                                    |
| `message`                  | no       | Message body of the notification.                                                                                                                                                                                                                                                                         |
| `title`                    | yes      | Optional title for your notification. Will be composed as '%title\n%message'.                                                                                                                                                                                                                             |
| `parse_mode`               | yes      | Parser for the message text: `markdownv2`, `html`, `markdown` or `plain_text`.                                                                                                                                                                                                                            |
| `disable_web_page_preview` | yes      | True/false for disable link previews for links in the message.                                                                                                                                                                                                                                            |
| `inline_keyboard`          | yes      | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data or external URL (https-only). Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Google link", "https://google.com"]]]` |

### Action `telegram_bot.edit_caption`

Edit the caption of a previously sent message.

| Data attribute     | Optional | Description                                                                                                                                                                                                                                                                                               |
| -------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config_entry_id`          | yes      | The config entry representing the Telegram bot to edit the caption. Required if you have multiple Telegram bots.|
| `message_id`               | no       | Id of the message to edit. When answering a callback from a pressed button, the id of the origin message is in: {% raw %}`{{ trigger.event.data.message.message_id }}`{% endraw %}. You can use `"last"` to refer to the last message sent to `chat_id`.                                                  |
| `chat_id`                  | no       | The chat_id where to edit the caption.                                                                                                                                                                                                                                                                    |
| `caption`                  | no       | Message body of the notification.                                                                                                                                                                                                                                                                         |
| `disable_web_page_preview` | yes      | True/false for disable link previews for links in the message.                                                                                                                                                                                                                                            |
| `inline_keyboard`          | yes      | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data or external URL (https-only). Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Google link", "https://google.com"]]]` |

### Action `telegram_bot.edit_replymarkup`

Edit the inline keyboard of a previously sent message.

| Data attribute     | Optional | Description                                                                                                                                                                                                                                                                                               |
| -------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config_entry_id`          | yes      | The config entry representing the Telegram bot to edit the inline keyboard. Required if you have multiple Telegram bots.|
| `message_id`               | no       | Id of the message to edit. When answering a callback from a pressed button, the id of the origin message is in: {% raw %}`{{ trigger.event.data.message.message_id }}`{% endraw %}. You can use `"last"` to refer to the last message sent to `chat_id`.                                                  |
| `chat_id`                  | no       | The chat_id where to edit the reply_markup.                                                                                                                                                                                                                                                               |
| `disable_web_page_preview` | yes      | True/false for disable link previews for links in the message.                                                                                                                                                                                                                                            |
| `inline_keyboard`          | yes      | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data or external URL (https-only). Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Google link", "https://google.com"]]]` |

### Action `telegram_bot.answer_callback_query`

Respond to a callback query originated by clicking on an online keyboard button. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert.

| Data attribute | Optional | Description                                                                                                                   |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `config_entry_id`      | yes      | The config entry representing the Telegram bot to answer the callback query. Required if you have multiple Telegram bots.|
| `message`              | no       | Unformatted text message body of the notification.                                                                            |
| `callback_query_id`    | no       | Unique id of the callback response. In the `telegram_callback` event data: {% raw %}`{{ trigger.event.data.id }}`{% endraw %} |
| `show_alert`           | yes      | True/false for show a permanent notification. Defaults to False.                                                              |

### Action `telegram_bot.delete_message`

Delete a previously sent message in a conversation.

| Data attribute | Optional | Description                                                                                                                                                                                                                                                |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config_entry_id`      | yes      | The config entry representing the Telegram bot to delete the message. Required if you have multiple Telegram bots.|
| `message_id`           | no       | Id of the message to delete. When answering a callback from a pressed button, the id of the origin message is in: {% raw %}`{{ trigger.event.data.message.message_id }}`{% endraw %}. You can use `"last"` to refer to the last message sent to `chat_id`. |
| `chat_id`              | no       | The chat_id where to delete the message.                                                                                                                                                                                                                   |

### Action `telegram_bot.leave_chat`

Remove the bot from the chat group where it was added.

| Data attribute | Optional | Description                               |
| ---------------------- | -------- | ----------------------------------------- |
| `config_entry_id`      | yes      | The config entry representing the Telegram bot to leave the chat. Required if you have multiple Telegram bots.|
| `chat_id`              | no       | The chat_id from where to remove the bot. |

### Action `telegram_bot.set_message_reaction`

Sets the bot's reaction for a given message.

| Data data attribute | Optional | Description                                                      |
| ------------------- | -------- | ---------------------------------------------------------------- |
| `config_entry_id`   | yes      | The config entry representing the Telegram bot to set the message reaction. Required if you have multiple Telegram bots. |
| `message_id`        | no       | Id of the message to react to.                                   |
| `chat_id`           | no       | Id of the chat containing the message.                           |
| `reaction`          | no       | Emoji to react to the message with. |
| `is_big`            | yes      | Whether to use a large variant of the reaction animation.        |

## Telegram notification platform

{% warning %}

The notification platform has been marked as legacy and might be deprecated in the future.
Please use [notifiers](./#notifiers) instead.

{% endwarning %}

The [`telegram` notification platform](/integrations/telegram) requires the `telegram_bot` integration to work with, and it's designed to generate a customized shortcut (`notify.USERNAME`) to send notifications (messages, photos, documents, and locations) to a particular `chat_id` with the old syntax, allowing backward compatibility. The data attributes `parse_mode`, `disable_notification`, `message_tag`, `disable_web_page_preview`, and `message_thread_id` are also supported.

The required YAML configuration now reduces to:

```yaml
notify:
  - platform: telegram
    name: NOTIFIER_NAME
    chat_id: USER_CHAT_ID
```

## Event triggering

A command looks like `/thecommand` or `/othercommand with some args`.

When received by Home Assistant it will fire a `telegram_command` event on the event bus with the following `event_data`:

```yaml
command: "/thecommand"
args: "<any other text following the command>"
from_first: "<first name of the sender>"
from_last: "<last name of the sender>"
user_id: "<id of the sender>"
id: "<message id>"
chat_id: "<origin chat id>"
chat: "<chat info>"
date: "<message timestamp>"
message_thread_id: "<message thread id>"
bot:
  config_entry_id: "<config entry id of the bot>"
  id: "<id of the bot>"
  first_name: "<first name of the bot>"
  last_name: "<last name of the bot>"
  username: "<username of the bot>"
```

Any other message not starting with `/` will be processed as simple text, firing a `telegram_text` event on the event bus with the following `event_data`:

```yaml
text: "some text received"
from_first: "<first name of the sender>"
from_last: "<last name of the sender>"
user_id: "<id of the sender>"
id: "<message id>"
chat_id: "<origin chat id>"
date: "<message timestamp>"
message_thread_id: "<message thread id>"
bot:
  config_entry_id: "<config entry id of the bot>"
  id: "<id of the bot>"
  first_name: "<first name of the bot>"
  last_name: "<last name of the bot>"
  username: "<username of the bot>"
```

If the message is sent from a [press from an inline button](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating), for example, a callback query is received, and Home Assistant will fire a `telegram_callback` event with:

```yaml
data: "<data associated to action callback>"
message: <message origin of the action callback>
from_first: "<first name of the sender>"
from_last: "<last name of the sender>"
user_id: "<id of the sender>"
id: "<unique id of the callback>"
chat_instance: "<chat instance>"
chat_id: "<origin chat id>"
bot:
  config_entry_id: "<config entry id of the bot>"
  id: "<id of the bot>"
  first_name: "<first name of the bot>"
  last_name: "<last name of the bot>"
  username: "<username of the bot>"
```

### Configuration samples

Simple ping pong example.

```yaml
alias: "Telegram bot that reply pong to ping"
triggers:
  - trigger: event
    event_type: telegram_command
    event_data:
      command: "/ping"
actions:
  - action: notify.notify
    data:
      message: "pong"
```

An example that shows keyboard interaction with `notify.telegram`

```yaml
triggers:
  - trigger: event
    event_type: telegram_command
    event_data:
      command: "/start"
actions:
  - action: notify.telegram
    data:
      message: "commands"
      data:
        keyboard:
          - '/ping, /alarm'
          - '/siren'
```

and an automation to trigger a related command "/siren".

```yaml
triggers:
  - trigger: event
    event_type: telegram_command
    event_data:
      command: "/siren"
actions:
  - action: homeassistant.turn_on
    target:
      entity_id: switch.vision_zm1601eu5_battery_operated_siren_switch_9_0
  - delay:
      seconds: 10
  - action: homeassistant.turn_off
    target:
      entity_id: switch.vision_zm1601eu5_battery_operated_siren_switch_9_0
```

An example to show the use of event_data in action:

{% raw %}

```yaml
- alias: "Kitchen Telegram Speak"
  triggers:
    - trigger: event
      event_type: telegram_command
      event_data:
        command: "/speak"
  actions:
    - action: notify.kitchen_echo
      data:
        message: >
          Message from {{ trigger.event.data["from_first"] }}. {% for state in trigger.event.data["args"] %} {{ state }} {% endfor %}
```

{% endraw %}

### Sample automations with callback queries and inline keyboards

A quick example to show some of the callback capabilities of inline keyboards with a dumb automation consisting in a simple repeater of normal text that presents an inline keyboard with 3 buttons: 'EDIT', 'NO' and 'REMOVE BUTTON':

- Pressing 'EDIT' changes the sent message.
- Pressing 'NO' only shows a brief notification (answering the callback query).
- Pressing 'REMOVE BUTTON' changes the inline keyboard removing that button.

Text repeater:

{% raw %}

```yaml
- alias: "Telegram bot that repeats text"
  triggers:
    - trigger: event
      event_type: telegram_text
  actions:
    - action: telegram_bot.send_message
      data:
        title: "*Dumb automation*"
        target: "{{ trigger.event.data.user_id }}"
        message: "You said: {{ trigger.event.data.text }}"
        disable_notification: true
        inline_keyboard:
          - "Edit message:/edit_msg, Don't:/do_nothing"
          - "Remove this button:/remove_button"
```

{% endraw %}

Message editor:

{% raw %}

```yaml
- alias: "Telegram bot that edits the last sent message"
  triggers:
    - trigger: event
      event_type: telegram_callback
      event_data:
        command: "/edit_msg"
  actions:
    - action: telegram_bot.answer_callback_query
      data:
        callback_query_id: "{{ trigger.event.data.id }}"
        message: "Editing the message!"
        show_alert: true
    - action: telegram_bot.edit_message
      data:
        message_id: "{{ trigger.event.data.message.message_id }}"
        chat_id: "{{ trigger.event.data.chat_id }}"
        title: "*Message edit*"
        inline_keyboard:
          - "Edit message:/edit_msg, Don't:/do_nothing"
          - "Remove this button:/remove_button"
        message: >
          Callback received from {{ trigger.event.data.from_first }}.
          Message id: {{ trigger.event.data.message.message_id }}.
          Data: {{ trigger.event.data.data|replace("_", "\_") }}
```

{% endraw %}

Keyboard editor:

{% raw %}

```yaml
- alias: "Telegram bot that edits the keyboard"
  triggers:
    - trigger: event
      event_type: telegram_callback
      event_data:
        command: "/remove_button"
  actions:
    - action: telegram_bot.answer_callback_query
      data:
        callback_query_id: "{{ trigger.event.data.id }}"
        message: "Callback received for editing the inline keyboard!"
    - action: telegram_bot.edit_replymarkup
      data:
        message_id: "last"
        chat_id: "{{ trigger.event.data.chat_id }}"
        inline_keyboard:
          - "Edit message:/edit_msg, Don't:/do_nothing"
```

{% endraw %}

Only acknowledges the 'NO' answer:

{% raw %}

```yaml
- alias: "Telegram bot that simply acknowledges"
  triggers:
    - trigger: event
      event_type: telegram_callback
      event_data:
        command: "/do_nothing"
  actions:
    - action: telegram_bot.answer_callback_query
      data:
        callback_query_id: "{{ trigger.event.data.id }}"
        message: "OK, you said no!"
```

{% endraw %}

Telegram callbacks also support arguments and commands the same way as normal messages.

{% raw %}

```yaml
- alias: "Telegram bot repeats arguments on callback query"
  triggers:
    - trigger: event
      event_type: telegram_callback
      event_data:
        command: "/repeat"
  actions:
    - action: telegram_bot.answer_callback_query
      data:
        show_alert: true
        callback_query_id: "{{ trigger.event.data.id }}"
        message: "I repeat: {{trigger.event.data['args']}}"
```

{% endraw %}

In this case, having a callback with `/repeat 1 2 3` will pop a notification saying `I repeat: [1, 2, 3]`

Receiving `chat_id` and `message_id` identifiers of sent messages by the `telegram_bot`.

{% raw %}

```yaml
- alias: 'Notifications about messages sent by Telegram bot'
  triggers:
    - trigger: event
      event_type: telegram_sent
      event_data:
        message_tag: "msg_start"
  actions:
    - action: input_number.set_value
      data_template:
        entity_id: input_number.chat_id
        value: "{{ trigger.event.data.chat_id }}"
    - action: input_number.set_value
      data_template:
        entity_id: input_number.message_id
        value: "{{ trigger.event.data.message_id }}"
```

{% endraw %}

## Example: send_message with formatted Text

```yaml
actions:
- action: notify.telegrambot
  data:
    title: Example Message
    message: 'Message with *BOLD*, _ITALIC_ and `MONOSPACE` Text'
```

## Example: send_message with message tag

```yaml
actions:
- action: notify.telegrambot
  data:
    title: Example Message
    message: "Message with tag"
    data:
      message_tag: "example_tag"
```

## Example: send_message with disabled webpage preview

```yaml
actions:
- action: notify.telegram
  data:
    message: >-
      <a href="https://www.home-assistant.io/">HA site</a>
    data:
      parse_mode: html
      disable_web_page_preview: true
```

## Example: send_message to a topic within a group

```yaml
actions:
- action: notify.telegram
  data:
    message: "Message to a topic"
    data:
      message_thread_id: 123
```

## Example: automation to send a message and delete after a delay

{% raw %}

```yaml
alias: telegram send message and delete
sequence:
  - action: telegram_bot.send_message
    data:
      message: testing
    response_variable: response
  - delay:
      seconds: 5
  - repeat:
      sequence:
        - action: telegram_bot.delete_message
          data:
            message_id: "{{ repeat.item.message_id }}"
            chat_id: "{{ repeat.item.chat_id }}"
      for_each: "{{ response.chats }}"
```

{% endraw %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
