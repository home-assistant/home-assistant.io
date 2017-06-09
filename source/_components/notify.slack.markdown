---
layout: page
title: "Slack"
description: "Instructions how to add Slack notifications to Home Assistant."
date: 2015-08-06 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: slack.png
ha_category: Notifications
ha_release: pre 0.7
---


The `slack` platform allows you to deliver notifications from Home Assistant to [Slack](https://slack.com/). This can be used to either send messages or update a user's status.

If you are planning to use Slack as yourself then you need to obtain a [Slack API token](https://api.slack.com/web?sudo=1) to be able to send notifications.

It is also possible to use Slack bots as users. Just create a new bot at https://[YOUR_TEAM].slack.com/apps/build/custom-integration and use the provided token for that. You can add an icon from the frontend for Home Assistant and give the bot a meaningful name.

Don't forget to invite the bot to the room where you want to get the notifications.

To enable the Slack notification in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: slack
    api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
    default_channel: '#general'
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **api_key** (*Required*): The Slack API token to use for sending Slack messages.
- **default_channel** (*Required*): The default channel to post to if no channel is explicitly specified when sending the notification message.
- **username** (*Optional*): Setting username will allow Home Assistant to post to Slack using the username specified. By default not setting this will post to Slack using the user account or botname that you generated the api_key as.
- **icon** (*Optional*): Use one of the Slack emoji's as an Icon for the supplied username.  Slack uses the standard emoji sets used [here](http://www.webpagefx.com/tools/emoji-cheat-sheet/).

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

In addition to sending messages, you can use the Slack component to change your Slack status (the emoji and text that appears after users' names.) To do this, pass in a `parameter` inside `data`:

```yaml
# Inside an automation
action:
  service: notify.slack
  data:
    message: "I just left the house!"
    data:
      status:
        status_text: "Away",
        status_emoji: ":desert_island:"
```

**Note**: Your Slack app must have the `users.profile:write` permission scope to change status. Also, changing status is only available to the user that authorized the app. If your Slack component is configured as a "Bot User", then trying to update status will fail, as bots cannot have statuses.

If you want to clear your status, simply pass in an empty `status_text` and `status_emoji`.
