---
layout: page
title: "Discord"
description: "Instructions how to add Discord notifications to Home Assistant."
date: 2016-01-14 15:15
sidebar: true
comments: false
sharing: true
footer: true
logo: discord.png
ha_category: Notifications
ha_release: 0.37
---

The [Discord service](https://discordapp.com/) is a platform for the notify component. This allows components to send messages to the user using Discord.

In order to get a token you need to go to the [Discord My Apps page](https://discordapp.com/developers/applications/me) and create a new application. Once the application is ready, create a [bot](https://discordapp.com/developers/docs/topics/oauth2#bots) user (**Create a Bot User**) and activate **Require OAuth2 Code Grant**. Retrieve the **Client ID** and the (hidden) **Token** of your bot for later.

When setting up the application you can use this [icon](https://home-assistant.io/demo/favicon-192x192.png).

To use Discord notifications, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: discord
    token: A1aB2b.C3cD4d-E5eF6f
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **token** (*Required*): Your bot's token.

### {% linkable_title Setting up the bot %}

Bots can only send messages to servers. To add the bot to a server you are an admin on, get the details of the bot from the [Discord My Apps page](https://discordapp.com/developers/applications/me). 

<p class='img'>
  <img src='{{site_root}}/images/screenshots/discord-bot.png' />
</p> 

Now use the Discord Authorization page with the **Client ID** of your [bot](https://discordapp.com/developers/docs/topics/oauth2#bots).

[https://discordapp.com/api/oauth2/authorize?client_id=[CLIENT_ID]&scope=bot&permissions=0](https://discordapp.com/api/oauth2/authorize?client_id=[CLIENT_ID]&scope=bot&permissions=0)

<p class='img'>
  <img src='{{site_root}}/images/screenshots/discord-auth.png' />
</p>

Wait for the confirmation which should say "Authorized".

Once the bot has been added to your server, get the channel ID of the channel you want the bot to operate in. In The Discord application go to **Settings** > **Appearance** > **Check developer mode**.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/discord-api.png' />
</p>

Right click channel name and copy the channel ID (**Copy ID**).

This channel ID has to be used as the target when calling the notification service. Multiple channel IDs can be specified, across multiple servers.

#### {% linkable_title Example service payload %}

```json
{
  "message": "A message from Home Assistant",
  "target": [
    "1234567890",
    "0987654321"
  ]
}
```

### {% linkable_title Notes %}

For more information about creating and authorizing bots, visit the [OAuth2 information page](https://discordapp.com/developers/docs/topics/oauth2)

To use notifications effectively, please see the [getting started with automation page](/getting-started/automation/).
