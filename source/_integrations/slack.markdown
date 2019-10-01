---
title: "Slack"
description: "Instructions on how to add Slack notifications to Home Assistant."
logo: slack.png
ha_category:
  - Notifications
ha_release: pre 0.7
---


The `slack` platform allows you to deliver notifications from Home Assistant to [Slack](https://slack.com/).

## Setup

If you are planning to use Slack as yourself then you'll need to create a [new app](https://api.slack.com/apps) under your Slack.com account. After creating the app, access the OAuth & Permissions link under the Features heading in the sidebar. Your OAuth Access Token should be located there. This is the key that you'll use in your `configuration.yaml` file.

<div class='note'>

There is an app credential Verification Token on the Basic Settings of your app. This is **not** the API key you want.

</div>

You will also need to ensure that you have added the appropriate scope when configuring your app. In this case, in the Scopes section, add the `Send messages as user` scope, e.g., (chat:write:user).

It is also possible to use Slack bots as users. Just create a new bot at https://[YOUR_TEAM].slack.com/apps/build/custom-integration and use the provided token for that. You can add an icon from the frontend for Home Assistant and give the bot a meaningful name.

Don't forget to invite the bot to the room where you want to get the notifications.

## Configuration

To enable the Slack notification in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: slack
    api_key: YOUR_API_KEY
    default_channel: '#general'
```

{% configuration %}
name: 
  description: Setting this parameter allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  type: string
  default: "notify"
api_key:
  description: The Slack API token to use for sending Slack messages.
  required: true
  type: string
default_channel:
  description: The default channel to post to if no channel is explicitly specified when sending the notification message.  A channel can be specified adding a target attribute to the JSON at the same level as "message".
  required: true
  type: string
username:
  description: Home Assistant will post to Slack using the username specified.
  required: false
  type: string
  default: The user account or botname that you generated the API key as.
icon:
  description: Use one of the Slack emojis as an Icon for the supplied username.  Slack uses the standard emoji sets used [here](http://www.webpagefx.com/tools/emoji-cheat-sheet/).
  required: false
  type: string
{% endconfiguration %}

### Slack service data

The following attributes can be placed inside `data` for extended functionality.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `file`                 |      yes | Groups the attributes for file upload. If present, either `url` or `path` have to be provided.
| `path `                |      yes | Local path of file, photo etc to post to slack. Is placed inside `file`.
| `url`                  |      yes | URL of file, photo etc to post to slack. Is placed inside `file`.
| `username`             |      yes | Username if the url requires authentication. Is placed inside `file`.
| `password`             |      yes | Password if the url requires authentication. Is placed inside `file`.
| `auth`                 |      yes | If set to `digest` HTTP-Digest-Authentication is used. If missing HTTP-BASIC-Authentication is used. Is placed inside `file`.
| `attachments`          |      yes | Array of [Slack attachments](https://api.slack.com/docs/message-attachments). See [the attachment documentation](https://api.slack.com/docs/message-attachments) for how to format. *NOTE*: if using `attachments`, they are shown **in addition** to `message`

Example for posting file from URL:

```json
{
  "message":"Message that will be added as a comment to the file.",
  "title":"Title of the file.",
  "target": ["#channelname"], 
  "data":{
    "file":{
      "url":"http://[url to file, photo, security camera etc]",
      "username":"optional user, if necessary",
      "password":"optional password, if necessary",
      "auth":"digest"
    }
  }
}
```

Example for posting file from local path:

```json
{
  "message":"Message that will be added as a comment to the file.",
  "title":"Title of the file.",
  "data":{
    "file":{
      "path":"/path/to/file.ext"
    }
  }
}
```

Please note that `path` is validated against the `whitelist_external_dirs` in the `configuration.yaml`.

Example for posting formatted attachment:

```json
{
  "message": "",
  "data": {
    "attachments": [
      {
        "title": "WHAT A HORRIBLE NIGHT TO HAVE A CURSE.",
        "image_url": "http://i.imgur.com/JEExnsI.gif"
      }
    ]
  }
}
```

Please note that both `message` is a required key, but is always shown, so use an empty (`""`) string for `message` if you don't want the extra text.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
