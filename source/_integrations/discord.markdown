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

The **Discord** {% term integration %} lets you send notifications from Home Assistant to [Discord](https://discord.com/) channels and users via a bot. You can send text messages, attach files, like images or videos, from local paths or remote URLs, and use Discord embeds for rich formatting.

{% note %}
This integration is for outgoing messages only. It cannot read incoming Discord messages or use them as triggers for automations.
{% endnote %}

## Prerequisites

### Creating a Discord application

To send notifications from Home Assistant, first create a Discord application with a bot user:

1. Open the [Discord Developer Portal](https://discord.com/developers/applications) and select **New Application**.
2. Give the application a name and create it.
3. In the application settings, open **Bot**.
4. Under **Token**, select **Reset Token** to generate a bot token and store it securely. You will need this token when adding the Discord integration to Home Assistant.

{% important %}
Use the **bot token** from the **Bot** page. Do not use the **Public Key** or another application credential. Treat the bot token like a password and do not share it.
{% endimportant %}

The name you give your application determines the name of the notify action. For example, if you enter "Home Assistant Notifications", the action will be named `notify.home_assistant_notifications`.

![Screenshot of Discord bot config](/images/screenshots/discord-bot.png)

### Installing the bot on a Discord server

To allow the bot to send messages to a server:

1. In the Discord Developer Portal, open **Installation** for your application.
2. Make sure **Guild Install** is enabled.
3. Under **Install Link**, select **Discord Provided Link**.
4. Under **Default Install Settings** for **Guild Install**, add the `bot` scope.
5. Select the permissions the bot needs. To send notifications, grant **Send Messages**. Also grant **Embed Links** or **Attach Files** if you plan to use embeds or attachments.
6. Save the changes, copy the install link, and open it in your browser.
7. Select **Add to server**, choose the server, and authorize the application.

You need permission to manage the server to install the application.

![Screenshot of Discord bot permissions](/images/screenshots/discord-bot-permissions.png)

![Screenshot of Discord bot auth](/images/screenshots/discord-auth.png)

For more information, see Discord's [application installation documentation](https://docs.discord.com/developers/resources/application#install-links).

### Getting a channel ID

After the bot has been added to your server, get the channel ID of the channel you want the bot to send messages to:

1. Open Discord and go to **User Settings** > **Advanced**.
2. Enable **Developer Mode**.
3. Right-click the channel name and select **Copy Channel ID**.

![Screenshot of Discord developer mode](/images/screenshots/discord-api.png)

The channel ID, or a user ID for direct messages, is used as the target when calling the notification action. Multiple channel or user IDs can be specified across multiple servers or direct messages.

## Add Discord integration to Home Assistant

{% include integrations/config_flow.md %}

When adding the Discord integration, enter the **bot token** from the Discord application's **Bot** page when asked for the API key.

## Test a Discord notification

After setting up the integration, you can test it without creating an automation first:

1. In Home Assistant, go to **Settings** > **Tools** > **Actions**.
2. Select the `notify` action that matches the name of your Discord application, for example `notify.home_assistant_notifications`.
3. Enter a message.
4. In **Target**, enter the Discord channel ID or user ID.
5. Select **Perform action**.

If the action does not appear, check that the Discord integration is configured successfully.

## Use Discord in an automation

To send a Discord notification from the automation editor:

1. Go to **Settings** > **Automations & scenes** and create or edit an automation.
2. Add an action and search for the `notify` action that matches your Discord application.
3. Enter the message and the Discord channel ID or user ID in **Target**.
4. Save the automation.

The same action can also be written in YAML. The examples below show the available Discord-specific options.

## Set Message entry

The `message` field treats all input as literal text, including quotation marks.

For example: `message: Hello, world!` will appear exactly as is, while `message: "Hello, world!"` will include the quotation marks in the message.

## Set Channel IDs as necessary

The `target` field is for the channel IDs where the message should be sent. Accepted data type is `string` for a single channel or `string[]` for multiple channels.

For example: `"someChannelID"` or `["someChannelID", "anotherChannelID"]`

## Pinging users, roles, or linking to other channels in the same server

You can use standard Discord methods to ping users, roles, and channels within the server.

| Type      | Format         |
| --------- | -------------- |
| `User`    | `<@userID>`    |
| `Role`    | `<@&roleID>`   |
| `Channel` | `<#channelID>` |

## Discord action data

The following attributes can be placed inside the `data` key of the action for extended functionality:

| Attribute    | Optional | Description                                                                                                                                  |
| ------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `images`     | yes      | The file(s) to attach to message.                                                                                                            |
| `urls`       | yes      | The file(s) to download from a remote URL and attach to message.                                                                             |
| `verify_ssl` | yes      | A boolean to determine if SSL certs should be verified when calling the remote URLs in the `url` attribute. Defaults to `True`.              |
| `embed`      | yes      | Array of [Discord embeds](https://discordpy.readthedocs.io/en/latest/api.html#embed). *NOTE*: if using `embed`, `message` is still required. |

To include messages with embedding, use these attributes underneath the `embed` key:

| Attribute     | Optional | Description                                                                                          |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `title`       | yes      | Title of the embed.                                                                                  |
| `description` | yes      | Description of the embed.                                                                            |
| `color`       | yes      | Color code of the embed. This value is an *int*.                                                    |
| `url`         | yes      | Sets an embedded link for the title.                                                                  |
| `author`      | yes      | Sets the author for the embed content.                                                               |
| `footer`      | yes      | Sets the footer for the embed content.                                                               |
| `thumbnail`   | yes      | Sets the thumbnail for the embed content.                                                            |
| `image`       | yes      | Sets the image for the embed content.                                                                |
| `fields`      | yes      | Adds a field to the embed object. `name` and `value` are *required*, `inline` is *true* by default. |

### Example action

```yaml
- action: notify.home_assistant_notifications
  data:
    message: "A message from Home Assistant"
    target: ["1234567890", "0987654321"]
    data:
      images:
        - "/tmp/garage_cam"
        - "/tmp/garage.jpg"
```

### Example action with attachments sourced from remote URLs

```yaml
- action: notify.home_assistant_notifications
  data:
    message: "A message from Home Assistant"
    target: ["1234567890", "0987654321"]
    data:
      verify_ssl: false
      urls:
        - "https://example.com/image.jpg"
        - "https://example.com/video.mp4"
```

Note that `verify_ssl` defaults to `True`, and that any remote hosts will need to be in your [`allowlist_external_urls`](/integrations/homeassistant/#allowlist_external_urls) list. Discord limits attachment size to 8MB, so anything exceeding this will be skipped and noted in the error log.

### Example embed action

```yaml
- action: notify.home_assistant_notifications
  data:
    message: ""
    target: ["1234567890", "0987654321"]
    data:
      embed:
        title: 'title'
        description: 'description'
        url: 'https://www.home-assistant.io'
        color: 199363
        author:
          name: 'Author Home Assistant'
          url: 'https://www.home-assistant.io'
          icon_url: 'https://www.home-assistant.io/images/favicon-192x192-full.png'
        footer:
          text: 'Footer Text'
          icon_url: 'https://www.home-assistant.io'
        thumbnail:
          url: 'https://www.home-assistant.io/images/favicon-192x192-full.png'
        image:
          url: 'https://www.home-assistant.io/images/favicon-192x192-full.png'
        fields:
          - name: 'fieldname1'
            value: 'valuename1'
            inline: false
          - name: 'fieldname2'
            value: 'valuename2'
          - name: 'fieldname3'
            value: 'valuename3'
          - name: 'fieldname4'
            value: 'valuename4'
            inline: false
```

## Notes

You can tag any user inside a channel by using their user ID in the message like so: `<@userid>` replacing `userid` with the ID you copied. To get the user ID, right-click on the username to copy the ID like you did for the channel ID up above.

For more information about creating and authorizing bots, see Discord's [developer documentation](https://docs.discord.com/developers/quick-start/getting-started).

To use notifications effectively, see the [getting started with automation page](/getting-started/automation/).

Images are uploaded to Discord when a message is sent. As such, a local path to the image is required (that is, `/config/www/garage.jpg` as opposed to `/local/garage.jpg`), and updating an image after sending it in a message will not update the message in Discord.
