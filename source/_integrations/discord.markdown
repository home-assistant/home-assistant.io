---
title: Discord
description: Instructions on how to add Discord notifications to Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.37
ha_config_flow: true
ha_domain: discord
ha_codeowners:
  - '@tkdrob'
ha_platforms:
  - notify
ha_integration_type: service
---

The Discord integration allows Home Assistant to send messages to Discord channels or users via a Discord bot. Each channel or user is added as a separate notification entity that can be targeted from automations.

## Prerequisites

### Creating a Discord application and bot

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) and sign in.
2. Click **New Application**, give it a name, and click **Create**.
3. In the left sidebar, go to **Bot** and click **Add Bot**.
4. Under the bot's username, click **Reset Token** and copy the token — you will need this when setting up the integration.

{% note %}
Keep your bot token secret. Anyone with the token can control the bot.
{% endnote %}

### Inviting the bot to your server

1. In the Developer Portal, go to **OAuth2** > **URL Generator**.
2. Under **Scopes**, select `bot`.
3. Under **Bot Permissions**, select at minimum **Send Messages** (and **Attach Files** if you want to send images).

   ![Screenshot of Discord bot permissions](/images/screenshots/discord-bot-permissions.png)

4. Copy the generated URL, open it in a browser, and authorize the bot to join your server.

### Finding channel and user IDs

To get a channel or user ID you need to enable Developer Mode in Discord:

1. Open Discord and go to **User Settings** > **Advanced** > **Enable Developer Mode**.

   ![Screenshot of Discord Developer Mode and Copy ID](/images/screenshots/discord-api.png)

2. Right-click a channel name and select **Copy Channel ID**, or right-click a username and select **Copy User ID**.

## Add Discord integration to Home Assistant

{% include integrations/config_flow.md %}

When adding the integration, enter the **bot token** you copied earlier. Home Assistant will connect to Discord and create the integration using your bot's name.

## Adding channels

After the integration is set up, you can add Discord channels or users as notification entities:

1. Go to **Settings** > **Devices & Services** > **Discord**.
2. Click **Add entry** under your bot.
3. Enter the **Channel or User ID** you copied from Discord.
4. Click **Submit** — Home Assistant will verify the channel exists and create a notification entity for it.

Each channel or user becomes a separate entity named after the bot and the channel (for example, `notify.my_bot_general`).

## Sending messages

### Basic message

Use the standard `notify.send_message` action targeting the channel entity:

```yaml
- action: notify.send_message
  target:
    entity_id: notify.my_bot_general
  data:
    message: "Hello from Home Assistant!"
```

### Message with title

A title is prepended to the message in bold:

```yaml
- action: notify.send_message
  target:
    entity_id: notify.my_bot_general
  data:
    title: "Alert"
    message: "Motion detected in the garden."
```

## Discord action

The `discord.send_message` action provides extended functionality with file attachments and rich embeds.

| Field        | Required | Description                                                                                              |
| ------------ | -------- | -------------------------------------------------------------------------------------------------------- |
| `message`    | yes      | The text message to send.                                                                                |
| `title`      | no       | Title prepended to the message in bold.                                                                  |
| `images`     | no       | List of local file paths to attach. Paths must be in [`allowlist_external_dirs`](/integrations/homeassistant/#allowlist_external_dirs). |
| `urls`       | no       | List of URLs to download and attach. Hosts must be in [`allowlist_external_urls`](/integrations/homeassistant/#allowlist_external_urls). Discord limits attachments to 8 MB. |
| `verify_ssl` | no       | Whether to verify SSL certificates when downloading from URLs. Defaults to `true`.                       |
| `embed`      | no       | A Discord embed object. See embed attributes below.                                                      |

### Embed attributes

| Attribute     | Required | Description                                                                                              |
| ------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `title`       | no       | Title of the embed.                                                                                      |
| `description` | no       | Description text of the embed.                                                                           |
| `color`       | no       | Color of the embed's left border as an integer (e.g., `199363` for green).                               |
| `url`         | no       | URL that the embed title links to.                                                                       |
| `author`      | no       | Author section. Supports `name`, `url`, and `icon_url`.                                                  |
| `footer`      | no       | Footer section. Supports `text` and `icon_url`.                                                          |
| `thumbnail`   | no       | Thumbnail image. Supports `url`.                                                                         |
| `image`       | no       | Large image. Supports `url`.                                                                             |
| `fields`      | no       | List of fields. Each field requires `name` and `value`; `inline` is optional (defaults to `true`).       |

### Example: attach a local image

```yaml
- action: discord.send_message
  target:
    entity_id: notify.my_bot_general
  data:
    message: "Motion detected!"
    images:
      - "/config/www/garage_cam.jpg"
```

### Example: attach images from URLs

```yaml
- action: discord.send_message
  target:
    entity_id: notify.my_bot_general
  data:
    message: "Live camera snapshot"
    urls:
      - "https://example.com/camera.jpg"
    verify_ssl: true
```

### Example: rich embed

```yaml
- action: discord.send_message
  target:
    entity_id: notify.my_bot_general
  data:
    message: ""
    embed:
      title: "Home Assistant Alert"
      description: "Something happened at home."
      color: 199363
      url: "https://www.home-assistant.io"
      author:
        name: "Home Assistant"
        url: "https://www.home-assistant.io"
        icon_url: "https://www.home-assistant.io/images/favicon-192x192-full.png"
      footer:
        text: "Sent by Home Assistant"
        icon_url: "https://www.home-assistant.io/images/favicon-192x192-full.png"
      thumbnail:
        url: "https://www.home-assistant.io/images/favicon-192x192-full.png"
      image:
        url: "https://www.home-assistant.io/images/favicon-192x192-full.png"
      fields:
        - name: "Temperature"
          value: "21°C"
          inline: true
        - name: "Humidity"
          value: "55%"
          inline: true
```

## Pinging users, roles, or channels

You can use Discord's mention syntax directly in the message text:

| Type      | Format          |
| --------- | --------------- |
| `User`    | `<@userID>`     |
| `Role`    | `<@&roleID>`    |
| `Channel` | `<#channelID>`  |

For example: `message: "<@123456789> Motion detected!"`

## Notes

- Local image paths must use the full filesystem path (e.g., `/config/www/image.jpg`), not the `/local/` URL path.
- Updating a local image after sending it will not update the message already posted in Discord.
- For more information about creating and authorizing bots, see the [Discord OAuth2 documentation](https://discord.com/developers/docs/topics/oauth2).
