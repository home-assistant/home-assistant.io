---
title: Telegram bot
description: Telegram bot support
ha_category:
  - Notifications
ha_release: 0.42
ha_iot_class: Cloud Push
ha_config_flow: true
ha_domain: telegram_bot
ha_integration_type: integration
ha_quality_scale: silver
ha_codeowners:
  - '@hanwg'
ha_platforms:
  - diagnostics
  - event
  - notify
---

Use Telegram on your mobile or desktop device to send and receive messages or commands to/from your Home Assistant.
This integration creates notification actions to send, edit, receive messages or download attachments from a [Telegram Bot account](https://core.telegram.org/bots).

## Introduction - Telegram bot platforms

Platforms are Telegram bot implementations for managing communications with Telegram for sending and receiving messages.
When setting up this integration, you should specify the platform which fits your environment and use case.

### Broadcast

Telegram implementation to support **sending messages only**. Your Home Assistant instance does not have to be exposed to the internet and there is no polling to receive messages or commands sent to the bot.

### Polling

Telegram chatbot polling implementation.
This implementation fetches data from Telegram via long polling with a timeout of 10 seconds.
(In long polling, the bot will wait until the timeout expires before fetching the data again if there are no updates from Telegram.)

Your Home Assistant instance does not have to be exposed to the internet.

### Webhooks

Telegram chatbot webhooks implementation as described in the Telegram [documentation](https://core.telegram.org/bots/webhooks).
This implementation allows Telegram to push updates directly to your server and requires your Home Assistant instance to be exposed to the internet.

## Prerequisites

### Create a bot in Telegram

To create your first [Telegram bot](https://core.telegram.org/bots#how-do-i-create-a-bot), follow these steps:

1. Tell Telegram to create a bot for you:
   - In Telegram, open a chat with [@BotFather](https://t.me/BotFather) and enter `/newbot`.
   - Follow the instructions on screen and give your bot a name.
   - BotFather will give you a link to your new bot and an HTTP **API token**.
   - Store the **API token** somewhere safe, it will be used for setting up the integration later.
2. Get your **chat ID**:
   - Send any message to the [GetIDs bot](https://t.me/getidsbot).
   - Then, enter `/start`.
   - The bot will return your **chat ID** and username.
   - Note down your **chat ID**. You will need to add this ID to the allowlist after setting up the integration to permit your new bot to send/receive messages with this target.
3. Make the first contact with your new bot (bots are not allowed to initiate contact with users):
   - From the conversation with BotFather, select the link to open a chat.
   - In the chat, enter `/start`.

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

If you have a Home Assistant Cloud subscription, you can [enable remote access](https://support.nabucasa.com/hc/articles/26474279202973#to-activate-remote-access-from-outside-your-network) to your Home Assistant.

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
To allowlist the chat ID, [retrieve the chat ID](#create-a-bot-in-telegram) and create a subentry:

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

Available actions: `send_message`, `send_photo`, `send_video`, `send_animation`, `send_voice`, `send_sticker`, `send_document`, `send_location`, `send_chat_action`, `edit_message`, `edit_message_media`, `edit_caption`, `edit_replymarkup`, `answer_callback_query`, `delete_message`, `leave_chat` and `set_message_reaction`.

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

This action returns a [send message response](#send-message-response).

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
| `resize_keyboard`      | yes      | True/false for resizing the keyboard vertically for optimal fit. Defaults to False.                                                                                                                                                                                                                       |
| `one_time_keyboard`    | yes      | True/false for hiding the keyboard as soon as it’s been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat - the user can press a special button in the input field to see the custom keyboard again. Defaults to False.            |
| `keyboard`             | yes      | List of rows of commands, comma-separated, to make a custom keyboard. `[]` to reset to no custom keyboard. Example: `["/command1, /command2", "/command3"]`                                                                                                                                               |
| `inline_keyboard`      | yes      | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data or external URL (https-only). Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Google link", "https://google.com"]]]` |
| `message_tag`          | yes      | Tag for sent message. In `telegram_sent` event data: {% raw %}`{{trigger.event.data.message_tag}}`{% endraw %}                                                                                                                                                                                            |
| `reply_to_message_id`  | yes      | Mark the message as a reply to a previous message. In `telegram_callback` handling, for example, you can use {% raw %}`{{ trigger.event.data.message.message_id }}`{% endraw %}                                                                                                                       |
| `message_thread_id`    | yes      | Send the message to a specific topic or thread.|

This action returns a [send message response](#send-message-response).

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
| `resize_keyboard`      | yes      | True/false for resizing the keyboard vertically for optimal fit. Defaults to False.                                                                                                                                                                                                                       |
| `one_time_keyboard`    | yes      | True/false for hiding the keyboard as soon as it’s been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat - the user can press a special button in the input field to see the custom keyboard again. Defaults to False.            |
| `keyboard`             | yes      | List of rows of commands, comma-separated, to make a custom keyboard. `[]` to reset to no custom keyboard. Example: `["/command1, /command2", "/command3"]`                                                                                                                                               |
| `inline_keyboard`      | yes      | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data or external URL (https-only). Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Google link", "https://google.com"]]]` |
| `reply_to_message_id`  | yes      | Mark the message as a reply to a previous message. In `telegram_callback` handling, for example, you can use {% raw %}`{{ trigger.event.data.message.message_id }}`{% endraw %}                                                                                                                       |
| `message_thread_id`    | yes      | Send the message to a specific topic or thread.|

This action returns a [send message response](#send-message-response).

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
| `resize_keyboard`      | yes      | True/false for resizing the keyboard vertically for optimal fit. Defaults to False.                                                                                                                                                                                                                       |
| `one_time_keyboard`    | yes      | True/false for hiding the keyboard as soon as it’s been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat - the user can press a special button in the input field to see the custom keyboard again. Defaults to False.            |
| `keyboard`             | yes      | List of rows of commands, comma-separated, to make a custom keyboard. `[]` to reset to no custom keyboard. Example: `["/command1, /command2", "/command3"]`                                                                                                                                               |
| `inline_keyboard`      | yes      | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data or external URL (https-only). Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Google link", "https://google.com"]]]` |
| `message_tag`          | yes      | Tag for sent message. In `telegram_sent` event data: {% raw %}`{{trigger.event.data.message_tag}}`{% endraw %}                                                                                                                                                                                            |
| `reply_to_message_id`  | yes      | Mark the message as a reply to a previous message. In `telegram_callback` handling, for example, you can use {% raw %}`{{ trigger.event.data.message.message_id }}`{% endraw %}                                                                                                                       |
| `message_thread_id`    | yes      | Send the message to a specific topic or thread.|

This action returns a [send message response](#send-message-response).

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
| `resize_keyboard`      | yes      | True/false for resizing the keyboard vertically for optimal fit. Defaults to False.                                                                                                                                                                                                                       |
| `one_time_keyboard`    | yes      | True/false for hiding the keyboard as soon as it’s been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat - the user can press a special button in the input field to see the custom keyboard again. Defaults to False.            |
| `keyboard`             | yes      | List of rows of commands, comma-separated, to make a custom keyboard. `[]` to reset to no custom keyboard. Example: `["/command1, /command2", "/command3"]`                                                                                                                                               |
| `inline_keyboard`      | yes      | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data or external URL (https-only). Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Google link", "https://google.com"]]]` |
| `message_tag`          | yes      | Tag for sent message. In `telegram_sent` event data: {% raw %}`{{trigger.event.data.message_tag}}`{% endraw %}                                                                                                                                                                                            |
| `reply_to_message_id`  | yes      | Mark the message as a reply to a previous message. In `telegram_callback` handling, for example, you can use {% raw %}`{{ trigger.event.data.message.message_id }}`{% endraw %}                                                                                                                       |
| `message_thread_id`    | yes      | Send the message to a specific topic or thread.|

This action returns a [send message response](#send-message-response).

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
| `resize_keyboard`      | yes      | True/false for resizing the keyboard vertically for optimal fit. Defaults to False.                                                                                                                                                                                                                       |
| `one_time_keyboard`    | yes      | True/false for hiding the keyboard as soon as it’s been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat - the user can press a special button in the input field to see the custom keyboard again. Defaults to False.            |
| `keyboard`             | yes      | List of rows of commands, comma-separated, to make a custom keyboard. `[]` to reset to no custom keyboard. Example: `["/command1, /command2", "/command3"]`                                                                                                                                               |
| `inline_keyboard`      | yes      | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data or external URL (https-only). Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Google link", "https://google.com"]]]` |
| `message_tag`          | yes      | Tag for sent message. In `telegram_sent` event data: {% raw %}`{{trigger.event.data.message_tag}}`{% endraw %}                                                                                                                                                                                            |
| `reply_to_message_id`  | yes      | Mark the message as a reply to a previous message. In `telegram_callback` handling, for example, you can use {% raw %}`{{ trigger.event.data.message.message_id }}`{% endraw %}                                                                                                                       |
| `message_thread_id`    | yes      | Send the message to a specific topic or thread.|

This action returns a [send message response](#send-message-response).

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
| `resize_keyboard`      | yes      | True/false for resizing the keyboard vertically for optimal fit. Defaults to False.                                                                                                                                                                                                                       |
| `one_time_keyboard`    | yes      | True/false for hiding the keyboard as soon as it’s been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat - the user can press a special button in the input field to see the custom keyboard again. Defaults to False.            |
| `keyboard`             | yes      | List of rows of commands, comma-separated, to make a custom keyboard. `[]` to reset to no custom keyboard. Example: `["/command1, /command2", "/command3"]`                                                                                                                                               |
| `inline_keyboard`      | yes      | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data or external URL (https-only). Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Google link", "https://google.com"]]]` |
| `message_tag`          | yes      | Tag for sent message. In `telegram_sent` event data: {% raw %}`{{trigger.event.data.message_tag}}`{% endraw %}                                                                                                                                                                                            |
| `reply_to_message_id`  | yes      | Mark the message as a reply to a previous message. In `telegram_callback` handling, for example, you can use {% raw %}`{{ trigger.event.data.message.message_id }}`{% endraw %}                                                                                                                       |
| `message_thread_id`    | yes      | Send the message to a specific topic or thread.|

This action returns a [send message response](#send-message-response).

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

This action returns a [send message response](#send-message-response).

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
| `reply_to_message_id`     | yes      | Mark the message as a reply to a previous message. In `telegram_callback` handling, for example, you can use {% raw %}`{{ trigger.event.data.message.message_id }}`{% endraw %} |
| `message_thread_id`       | yes      | Send the message to a specific topic or thread.|

This action returns a [send message response](#send-message-response).

### Action `telegram_bot.send_chat_action`

Send a chat action. Use it to notify the user with the relevant "typing" action when a bot response may be delayed, so they know a message is coming soon. Telegram clears this status after 5 seconds or when the reply arrives.

| Data attribute     | Optional | Description                                                                                                                                                                                                                                                                                               |
| -------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config_entry_id`          | yes      | The configuration entry representing the Telegram bot to send the message. Required if you have multiple Telegram bots.|
| `target`                   | yes      | An array of pre-authorized chat_ids or user_ids to send the notification to. Defaults to the first allowed chat_id.                                                                                                                                                                                       |
| `chat_action`               | no      | Chat action to be sent: `typing`, `upload_photo`, `record_video`, `upload_video`, `record_voice`, `upload_voice`, `upload_document`, `choose_sticker`, `find_location`, `record_video_note`, `upload_video_note`.         |
| `message_thread_id`        | yes      | Send the message to a specific topic or thread.|

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

### Action `telegram_bot.edit_message_media`

Edit a previously sent message media in a conversation.

| Data attribute     | Optional | Description                                                                                                                                                                                                                                                                                               |
| -------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config_entry_id`      | yes      | The config entry representing the Telegram bot to edit the message media. Required if you have multiple Telegram bots.|
| `message_id`           | no       | ID of the message to edit. When reacting to a pressed button, the ID of the origin message is in: {% raw %}`{{ trigger.event.data.message.message_id }}`{% endraw %}. You can use `"last"` to refer to the last message sent to `chat_id`.                                                  |
| `chat_id`              | no       | The ID of the chat in which you want to edit the message media.                                                                                                                                                                                                                                                                    |
| `media_type`           | no       | The media type: `animation`, `audio`, `document`, `photo`, or `video`.  |
| `url`                  | no       | Remote path to the media.                                                                                                                                                                                                                                                                                  |
| `file`                 | no       | Local path to the media.                                                                                                                                                                                                                                                                                   |
| `caption`              | yes      | The title of the media.                                                                                                                                                                                                                                                                                   |
| `authentication`       | yes      | Define which authentication method to use. Set to `basic` for HTTP basic authentication, `digest` for HTTP digest authentication, or `bearer_token` for OAuth 2.0 bearer token authentication.                                                                                                                           |
| `username`             | yes      | Username for a URL which requires HTTP `basic` or `digest` authentication.                                                                                                                                                                                                                                                    |
| `password`             | yes      | Password (or bearer token) for a URL that requires authentication.                                                                                                                                                                                                                                   |
| `verify_ssl`           | yes      | True/false for checking the SSL certificate of the server for HTTPS URLs. Defaults to True.                                                                                                                                                                                                               |
| `inline_keyboard`      | yes      | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data or external URL (https-only). Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Google link", "https://google.com"]]]` |

### Action `telegram_bot.edit_caption`

Edit the caption of a previously sent message.

| Data attribute     | Optional | Description                                                                                                                                                                                                                                                                                               |
| -------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config_entry_id`          | yes      | The config entry representing the Telegram bot to edit the caption. Required if you have multiple Telegram bots.|
| `message_id`               | no       | Id of the message to edit. When answering a callback from a pressed button, the id of the origin message is in: {% raw %}`{{ trigger.event.data.message.message_id }}`{% endraw %}. You can use `"last"` to refer to the last message sent to `chat_id`.                                                  |
| `chat_id`                  | no       | The chat_id where to edit the caption.                                                                                                                                                                                                                                                                    |
| `caption`                  | no       | Message body of the notification.                                                                                                                                                                                                                                                                         |
| `inline_keyboard`          | yes      | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data or external URL (https-only). Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Google link", "https://google.com"]]]` |

### Action `telegram_bot.edit_replymarkup`

Edit the inline keyboard of a previously sent message.

| Data attribute     | Optional | Description                                                                                                                                                                                                                                                                                               |
| -------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config_entry_id`          | yes      | The config entry representing the Telegram bot to edit the inline keyboard. Required if you have multiple Telegram bots.|
| `message_id`               | no       | Id of the message to edit. When answering a callback from a pressed button, the id of the origin message is in: {% raw %}`{{ trigger.event.data.message.message_id }}`{% endraw %}. You can use `"last"` to refer to the last message sent to `chat_id`.                                                  |
| `chat_id`                  | no       | The chat_id where to edit the reply_markup.                                                                                                                                                                                                                                                               |
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

### Action `telegram_bot.download_file`

Download a file previously sent to the bot and save it to a local path on the Home Assistant host.

| Data attribute   | Optional | Description |
| ---------------- | -------- | ----------- |
| `config_entry_id`| yes      | The config entry representing the Telegram bot to get the file. Required if you have multiple Telegram bots. |
| `file_id`        | no       | ID of the file to get. This is provided in `telegram_attachment` event data as `file_id`. |
| `directory_path` | yes      | Local directory path to save the file to. Defaults to `/config/telegram_bot/`. |
| `file_name`      | yes      | Name to save the file as. If not provided, the original file name will be used. |

Example YAML usage:

```yaml
action: telegram_bot.download_file
data:
  config_entry_id: "<your_config_entry_id>"
  file_id: "ABCD1234Efgh5678Ijkl90mnopQRStuvwx"
  directory_path: "/config/telegram_bot/"
  file_name: "my_downloaded_file"
```

{% note %}

- For file size limits and download behavior, refer to the python-telegram-bot documentation: [python-telegram-bot - get_file](https://docs.python-telegram-bot.org/en/stable/telegram.bot.html#telegram.Bot.get_file)
- For the moment, bots can download files of up to 20 MB in size.
- Ensure the target `directory_path` is included in `allowlist_external_dirs` if you need to serve or access the file from the frontend.

{% endnote %}

## Response schemas for actions

{% tip %}

Responses can be accessed using the `response_variable` of actions.
You can refer to the [send a message then edit it after a delay](#example-send_message-then-edit-it-after-a-delay) automation for an example of usage of the response.

{% endtip %}

### Send message response

Response schema:

| Data attribute | Optional | Type                 | Description                                                               |
| -------------- | -------- | -------------------- | ------------------------------------------------------------------------- |
| `chats`        | no       | list                 | A list of chat objects. Each object represents a successful message sent. |

Chat object schema:

| Data attribute | Optional | Type    | Description                             |
| ---------------| -------- | ------- | --------------------------------------- |
| `chat_id`      | no       | integer | The target chat_id of the sent message. |
| `message_id`   | no       | integer | The id of the message.                  |

Example response:

```yaml
chats:
  - chat_id: 1234567890
    message_id: 100
  - chat_id: -1234567890
    message_id: 200
```

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

## Event entity

The **Telegram bot** integration provides an {% term event %} {% term entity %} which represents the state of the last message sent or received. It also provides several event attributes that can be used in automations.

### Event: Attachment received

The `telegram_attachment` event is triggered when the bot receives a file.

Example event attributes:

```yaml
bot:
  config_entry_id: "<config entry id of the bot>"
  first_name: "<first name of the bot>"
  id: "<id of the bot>"
  last_name: "<last name of the bot>"
  username: "<username of the bot>"
chat_id: "<origin chat id>"
date: "<message timestamp>"
event_type: "telegram_attachment"
file_id: "<unique identifier for the file>"
file_mime_type: "<MIME type of the file, if available>"
file_name: "<name of the file, if available>"
file_size: "<file size in bytes, if available>"
friendly_name: "<name of the event entity>"
from_first: "<first name of the sender>"
from_last: "<last name of the sender>"
id: "<message id>"
message_thread_id: "<message thread id>"
text: "<caption of the file, if available>"
user_id: "<id of the sender>"
```

Example automation:

{% raw %}

```yaml
triggers:
  - trigger: state
    entity_id:
      - event.bot_update_event # Replace with your telegram bot event entity
conditions:
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: event_type
    state: telegram_attachment
actions:
  - action: notify.persistent_notification
    data:
      message: >-
        Received a file.
        MIME type   : {{ trigger.to_state.attributes.file_mime_type }}
        Size (bytes): {{ trigger.to_state.attributes.file_size }}
        File ID     : {{ trigger.to_state.attributes.file_id }} 
        File name   : {{ trigger.to_state.attributes.file_name }}
```

{% endraw %}

### Event: Callback query received

The `telegram_callback` event is triggered when the bot receives a callback query from an inline keyboard button.

{% tip %}
The `id` attribute is used as the `callback_query_id` parameter for the `answer_callback_query` action.
{% endtip %}

Example event attributes:

```yaml
# Callback query always have no args
args: []
bot:
  config_entry_id: "<config entry id of the bot>"
  first_name: "<first name of the bot>"
  id: "<id of the bot>"
  last_name: "<last name of the bot>"
  username: "<username of the bot>"
chat_id: "<origin chat id>"
chat_instance: "<chat instance id>"
command: "<callback query>"
data: "<data associated to action callback>"
event_type: "telegram_callback"
from_first: "<first name of the sender>"
from_last: "<last name of the sender>"
friendly_name: "<name of the event entity>"
id: "<callback id>"
message: "<message origin of the action callback>"
user_id: "<id of the sender>"
```

Example automation:

{% raw %}

```yaml
triggers:
  - trigger: state
    entity_id:
      - event.bot_update_event # Replace with your telegram bot event entity
conditions:
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: event_type
    state: telegram_callback
actions:
  - action: notify.persistent_notification
    data:
      message: >-
        Received callback query.
        Callback ID   : {{ trigger.to_state.attributes.id }}
        Callback query: {{ trigger.to_state.attributes.data }}
```

{% endraw %}

### Event: Command received

The `telegram_command` event is triggered when the bot receives a command.
A command looks like `/thecommand` or `/othercommand with some args`.

Example event attributes:

```yaml
args: "<any other text following the command>"
bot:
  config_entry_id: "<config entry id of the bot>"
  first_name: "<first name of the bot>"
  id: "<id of the bot>"
  last_name: "<last name of the bot>"
  username: "<username of the bot>"
chat_id: "<origin chat id>"
command: "/thecommand"
date: "<message timestamp>"
event_type: "telegram_command"
friendly_name: "<name of the event entity>"
from_first: "<first name of the sender>"
from_last: "<last name of the sender>"
id: "<message id>"
message_thread_id: "<message thread id>"
user_id: "<id of the sender>"
```

Example automation:

{% raw %}

```yaml
triggers:
  - trigger: state
    entity_id:
      - event.bot_update_event # Replace with your telegram bot event entity
conditions:
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: event_type
    state: telegram_command
actions:
  - action: notify.persistent_notification
    data:
      message: >-
        Received command.
        Command: {{ trigger.to_state.attributes.command }}
        Args   : {{ trigger.to_state.attributes.args }}
```

{% endraw %}

### Event: Text received

The `telegram_text` event is triggered when the bot receives a text message (any message that does not begin with `/`).

Example event attributes:

```yaml
bot:
  config_entry_id: "<config entry id of the bot>"
  first_name: "<first name of the bot>"
  id: "<id of the bot>"
  last_name: "<last name of the bot>"
  username: "<username of the bot>"
chat_id: "<origin chat id>"
date: "<message timestamp>"
event_type: "telegram_text"
friendly_name: "<name of the event entity>"
from_first: "<first name of the sender>"
from_last: "<last name of the sender>"
id: "<message id>"
message_thread_id: "<message thread id>"
text: "<the text received>"
user_id: "<id of the sender>"
```

Example automation:

{% raw %}

```yaml
triggers:
  - trigger: state
    entity_id:
      - event.bot_update_event # Replace with your telegram bot event entity
conditions:
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: event_type
    state: telegram_text
actions:
  - action: notify.persistent_notification
    data:
      message: >-
      Message received.
      Chat ID   : {{ trigger.to_state.attributes.chat_id }}
      First name: {{ trigger.to_state.attributes.from_first }}
      Last name : {{ trigger.to_state.attributes.from_last }}
      Message   : {{ trigger.to_state.attributes.text }}
```

{% endraw %}

### Event: Message sent

The `telegram_sent` event is triggered when the bot sends a message of any type.

{% tip %}
The `message_id` attribute can be used with the edit, delete and `set_message_reaction` actions to interact with a previously sent message.
{% endtip %}

Example event attributes:

```yaml
bot:
  config_entry_id: "<config entry id of the bot>"
  first_name: "<first name of the bot>"
  id: "<id of the bot>"
  last_name: "<last name of the bot>"
  username: "<username of the bot>"
chat_id: "<origin chat id>"
from_first: "<first name of the sender>"
from_last: "<last name of the sender>"
id: "<message id>"
message_thread_id: "<message thread id>"
user_id: "<id of the sender>"
```

Example automation:

{% raw %}

```yaml
triggers:
  - trigger: state
    entity_id:
      - event.bot_update_event # Replace with your telegram bot event entity
conditions:
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: event_type
    state: telegram_sent
actions:
  - action: notify.persistent_notification
    data:
      message: >-
      Bot sent a message.
      Chat ID   : {{ trigger.to_state.attributes.chat_id }}
      Message ID: {{ trigger.to_state.attributes.message_id }}
        
```

{% endraw %}

### Sample automations with inline keyboards and callback queries

A quick example to show some of the callback capabilities of inline keyboards with a dumb automation consisting in a simple repeater of normal text that presents an inline keyboard with 3 buttons: 'EDIT', 'NO' and 'REMOVE BUTTON':

- Pressing 'EDIT' changes the sent message.
- Pressing 'NO' only shows a brief notification (answering the callback query).
- Pressing 'REMOVE BUTTON' changes the inline keyboard removing that button.

Text repeater:

{% raw %}

```yaml
alias: Telegram bot that repeats text
triggers:
  - trigger: state
    entity_id:
      - event.bot_update_event # Replace with your telegram bot event entity
conditions:
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: event_type
    state: telegram_text
actions:
  - action: telegram_bot.send_message
    data:
      message: "You said: {{ trigger.to_state.attributes.text }}"
      title: "*Dumb automation*"
      disable_notification: true
      inline_keyboard:
        - Edit message:/edit_msg, Don't:/do_nothing
        - Remove this button:/remove_button
```

{% endraw %}

Message editor:

{% raw %}

```yaml
alias: Telegram bot that edits the last sent message
description: ""
triggers:
  - trigger: state
    entity_id:
      - event.bot_update_event # Replace with your telegram bot event entity
conditions:
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: event_type
    state: telegram_callback
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: command
    state: /edit_msg
actions:
  - action: telegram_bot.answer_callback_query
    data:
      show_alert: true
      message: Editing the message!
      callback_query_id: "{{ trigger.to_state.attributes.id }}"
  - action: telegram_bot.edit_message
    data:
      inline_keyboard:
        - Edit message:/edit_msg, Don't:/do_nothing
        - Remove this button:/remove_button
      message_id: "{{ trigger.to_state.attributes.message.message_id }}"
      chat_id: "{{ trigger.to_state.attributes.chat_id }}"
      title: "*Message edit*"
      message: >-
        Callback received from {{ trigger.to_state.attributes.from_first }}.
        Message id: {{ trigger.to_state.attributes.message.message_id }}.
        Data: {{ trigger.to_state.attributes.data|replace("_", "\_") }}
```

{% endraw %}

Keyboard editor:

{% raw %}

```yaml
alias: Telegram bot that edits the keyboard
triggers:
  - trigger: state
    entity_id:
      - event.bot_update_event # Replace with your telegram bot event entity
conditions:
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: event_type
    state: telegram_callback
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: command
    state: /remove_button
actions:
  - action: telegram_bot.answer_callback_query
    data:
      callback_query_id: "{{ trigger.to_state.attributes.id }}"
      message: Callback received for editing the inline keyboard!
      show_alert: false
  - action: telegram_bot.edit_replymarkup
    data:
      inline_keyboard:
        - Edit message:/edit_msg, Don't:/do_nothing
      chat_id: "{{ trigger.to_state.attributes.chat_id }}"
      message_id: last
```

{% endraw %}

Only acknowledges the 'NO' answer:

{% raw %}

```yaml
alias: Telegram bot that simply acknowledges
triggers:
  - trigger: state
    entity_id:
      - event.bot_update_event # Replace with your telegram bot event entity
conditions:
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: event_type
    state: telegram_callback
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: command
    state: /do_nothing
actions:
  - action: telegram_bot.answer_callback_query
    data:
      message: OK, you said no!
      callback_query_id: "{{ trigger.to_state.attributes.id }}"
```

{% endraw %}

### Sample automation to receive `chat_id` and `message_id` identifiers of sent messages

The following sample automation stores the `chat_id` and `message_id` of the last sent message using input entities.
These attributes can then be used in other **Telegram bot** actions.

{% raw %}

```yaml
alias: Notifications about messages sent by Telegram bot
triggers:
  - trigger: state
    entity_id:
      - event.bot_update_event # Replace with your telegram bot event entity
conditions:
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: event_type
    state: telegram_sent
actions:
  - action: input_number.set_value
    data_template:
      value: "{{ trigger.to_state.attributes.chat_id }}"
    target:
      entity_id: input_number.chat_id # Replace with your input entity
  - action: input_number.set_value
    data_template:
      value: "{{ trigger.to_state.attributes.message_id }}"
    target:
      entity_id: input_number.message_id # Replace with your input entity
```

{% endraw %}

## Example: send_message with formatted Text

```yaml
actions:
  - action: telegram_bot.send_message
    data:
      title: Example Message
      message: 'Message with *BOLD*, _ITALIC_ and `MONOSPACE` Text'
```

## Example: send_message with message tag

```yaml
actions:
  - action: telegram_bot.send_message
    data:
      title: Example Message
      message: "Message with tag"
      message_tag: "example_tag"
```

## Example: send_message with disabled webpage preview

```yaml
actions:
  - action: telegram_bot.send_message
    data:
      message: >-
        <a href="https://www.home-assistant.io/">HA site</a>
      parse_mode: html
      disable_web_page_preview: true
```

## Example: send_message then edit it after a delay

{% raw %}

```yaml
actions:
  - action: telegram_bot.send_message
    data:
      message: testing
    response_variable: response
  - delay:
      seconds: 5
  - action: telegram_bot.edit_message
    data:
      message: done testing
      chat_id: "{{ response.chats[0].chat_id }}"
      message_id: "{{ response.chats[0].message_id }}"
```

{% endraw %}

## Example: send_message to a topic within a group

```yaml
actions:
  - action: telegram_bot.send_message
    data:
      message: "Message to a topic"
      message_thread_id: 123
```

## Example: automation to send a message and delete after a delay

{% raw %}

```yaml
alias: telegram send message and delete
actions:
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

## Known limitations

The following features are not available in this integration:

- Editing the bot (You can edit the bot using [@BotFather](https://t.me/botfather) on the Telegram app instead)
- All payment related features such as Telegram Premium, Telegram Star and Telegram Gifts
- Telegram Business
- Telegram ADS
- Mini Bot Apps and Mini Bot Store
- Calls and live streaming
- Wallpapers and Themes

## Troubleshooting

{% details "Error sending message: Can't parse entities" %}

When using send actions such as `telegram_bot.send_message` with the `markdownv2` parse mode, the action will fail with the "Can't parse entities" error if the user input in the `message` field contains malformed Markdown syntax.

You can perform any of the following steps to resolve this issue:

- Use the `plain_text` parse mode either by configuring the Telegram bot options or by specifying it via the action's `parse_mode` data attribute.
- Escape special characters in the `message` field with a preceding '\\' character.
- Format your message according to the [formatting options](https://core.telegram.org/bots/api#formatting-options).

{% enddetails %}

{% details "Telegram Webhook bot is unable to receive updates" %}

If your Telegram bot is unable to receive updates (for example, all events other than `telegram_sent` are not triggered), please follow the troubleshooting steps below:

1. Reconfigure your Telegram bot to use the **Polling** platform and test again to verify that the issue is not related to network connectivity between Telegram and your Home Assistant.
2. Check your firewall rules to verify that incoming connections are not blocked.
3. Verify that your webhook URL is public and accessible.

If the issue persists, please refer to the [Webhooks Guide](https://core.telegram.org/bots/webhooks) for more detailed troubleshooting.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
