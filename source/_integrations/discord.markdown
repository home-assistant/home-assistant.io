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
ha_integration_type: integration
---

The [Discord service](https://discordapp.com/) is a platform for the notify component. This allows integrations to send messages to the user using Discord.

## Prerequisites

### Creating a Discord Application

In order to create a bot user a Discord Application is required. Go to the [Discord My Apps page](https://discordapp.com/developers/applications/me) and create a new application.

When setting up the application you can use this [icon](/images/favicon-192x192-full.png).

Once the application is ready, create a [bot](https://discordapp.com/developers/docs/topics/oauth2#bots) user (**Create a Bot User**).

Retrieve the **Application ID** from the 'General Information' section and the (hidden) **Token** of your bot for later.

<div class='note'>
  
The name you give your application on the [Discord My Apps page](https://discordapp.com/developers/applications/me) will determine the name of the notify service. For example: if you enter "Discord Chat", the service will be named `notify.discord_chat`.
</div>

### Setting up the bot

Bots can send messages to servers and users or attach locally available images. To add the bot to a server you are an admin on use the **Application ID** you noted above, found on the [Discord My Apps page](https://discordapp.com/developers/applications/me).

<p class='img'>
  <img src='/images/screenshots/discord-bot.png' />
</p>

Now use the Discord Authorization page with the **Application ID** of your [application](https://discordapp.com/developers/docs/topics/oauth2#bots).

`https://discordapp.com/api/oauth2/authorize?client_id=[APPLICATION_ID]&scope=bot&permissions=0`

<p class='img'>
  <img src='/images/screenshots/discord-auth.png' />
</p>

Wait for the confirmation which should say "Authorized".

Once the bot has been added to your server, get the channel ID of the channel you want the bot to operate in. In The Discord application go to **Settings** > **Advanced** > **Enable Developer Mode**.

<p class='img'>
  <img src='/images/screenshots/discord-api.png' />
</p>

Right click channel name and copy the channel ID (**Copy ID**).

This channel or a user ID has to be used as the target when calling the notification service. Multiple channel or user IDs can be specified, across multiple servers or direct messages.

## Add Discord integration to Home Assistant

{% include integrations/config_flow.md %}

When adding the Discord integration you will be asked for an API Key. Enter the hidden **Token** of your bot to link your Discord integration to the bot you created and allow Home Assistant to send messages as that bot.

## Discord Service Data

The following attributes can be placed inside the `data` key of the service call for extended functionality:

| Attribute              | Optional | Description |
| ---------------------- | -------- | ----------- |
| `images`               |      yes | The file(s) to attach to message.
| `embed`                |      yes | Array of [Discord embeds](https://discordpy.readthedocs.io/en/latest/api.html#embed). *NOTE*: if using `embed`, `message` is still required.

To include messages with embedding, use these attributes underneath the `embed` key:

| Attribute              | Optional | Description |
| ---------------------- | -------- | ----------- |
| `title`                    |      yes  | Title of the embed.
| `description`               |      yes | Description of the embed.
| `color`                    |      yes  | Color code of the embed.  This value is an *int*.
| `url`               |      yes | URL of the embed.
| `author`                    |      yes  | Sets the footer for the embed content.
| `footer`               |      yes | Sets the footer for the embed content.
| `thumbnail`               |      yes | Sets the thumbnail for the embed content.
| `image`               |      yes | Sets the image for the embed content.
| `fields`               |      yes | Adds a field to the embed object.  `name` and `value` are *required*, `inline` is *true* by default.

### Example service call

```yaml
- service: notify.discord
  data:
    message: "A message from Home Assistant"
    target: ["1234567890", "0987654321"]
    data:
      images: 
      - "/tmp/garage_cam"
      - "/tmp/garage.jpg"
```

### Example embed service call

```yaml
- service: notify.discord
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

You can tag any user inside a channel by using their user ID in the message like so: `<@userid>` replacing `userid` with the ID you copied. To get the user ID right click on the user name to copy the ID like you did for the channel ID up above.

For more information about creating and authorizing bots, visit the [OAuth2 information page](https://discordapp.com/developers/docs/topics/oauth2)

To use notifications effectively, please see the [getting started with automation page](/getting-started/automation/).

Images are uploaded to Discord when a message is sent. As such, a local path to the image is required (i.e., `/config/www/garage.jpg` as opposed to `/local/garage.jpg`), and updating an image after sending it in a message will not update the message in Discord.
