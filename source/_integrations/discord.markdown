---
title: Discord
description: Instructions on how to add Discord notifications to Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.37
ha_domain: discord
ha_platforms:
  - notify
---

The [Discord service](https://discordapp.com/) is a platform for the notify component. This allows integrations to send messages to the user using Discord.

In order to get a token you need to go to the [Discord My Apps page](https://discordapp.com/developers/applications/me) and create a new application. Once the application is ready, create a [bot](https://discordapp.com/developers/docs/topics/oauth2#bots) user (**Create a Bot User**).

Retrieve the **Client ID** from the information section and the (hidden) **Token** of your bot for later.

When setting up the application you can use this [icon](/images/favicon-192x192-full.png).

To use Discord notifications, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - platform: discord
    token: YOUR_DISCORD_BOT_TOKEN
```

{% configuration %}
name:
  description: The notifier will bind to the service `notify.NAME`.
  required: false
  type: string
  default: notify
token:
  description: Your bot's token.
  required: true
  type: string
{% endconfiguration %}

### Setting up the bot

Bots can send messages to servers and users or attach local available images. To add the bot to a server you are an admin on, get the details of the bot from the [Discord My Apps page](https://discordapp.com/developers/applications/me).

<p class='img'>
  <img src='/images/screenshots/discord-bot.png' />
</p>

Now use the Discord Authorization page with the **Client ID** of your [bot](https://discordapp.com/developers/docs/topics/oauth2#bots).

`https://discordapp.com/api/oauth2/authorize?client_id=[CLIENT_ID]&scope=bot&permissions=0`

<p class='img'>
  <img src='/images/screenshots/discord-auth.png' />
</p>

Wait for the confirmation which should say "Authorized".

Once the bot has been added to your server, get the channel ID of the channel you want the bot to operate in. In The Discord application go to **Settings** > **Appearance** > **Check developer mode**.

<p class='img'>
  <img src='/images/screenshots/discord-api.png' />
</p>

Right click channel name and copy the channel ID (**Copy ID**).

This channel or user ID has to be used as the target when calling the notification service. Multiple channel or user IDs can be specified, across multiple servers or direct messages.

### Discord Service Data

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
| `fields`               |      yes | Adds a field to the embed object.  `name` and `value` are *required*, `inline` is *true* by default.


#### Example service call

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

#### Example embed service call
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

### Notes

You can tag any user inside a channel by using their user ID in the message like so: `<@userid>` replacing `userid` with the ID you copied. To get the user ID right click on the user name to copy the ID like you did for the channel ID up above.

For more information about creating and authorizing bots, visit the [OAuth2 information page](https://discordapp.com/developers/docs/topics/oauth2)

To use notifications effectively, please see the [getting started with automation page](/getting-started/automation/).

Images are uploaded to Discord when a message is sent. As such, a local path to the image is required (i.e., `/config/www/garage.jpg` as opposed to `/local/garage.jpg`), and updating an image after sending it in a message will not update the message in Discord.
