---
title: Slack
description: Instructions on how to add Slack notifications to Home Assistant.
ha_category:
  - Notifications
ha_release: pre 0.7
ha_domain: slack
---

The `slack` platform allows you to deliver notifications from Home Assistant to [Slack](https://slack.com/).

## Setup

### Bot posting as you

1. Create a [new app](https://api.slack.com/apps) under your Slack.com account.
2. Click the `OAuth & Permissions` link in the sidebar, under the Features heading.
3. In the Scopes section, add the `chat:write` scope, `Send messages as user`. If you get a `missing_scope` error when trying to send a message, check these permissions.
4. Scroll up to `OAuth Tokens & Redirect URLs` and click `Install App`.
5. Copy your `OAuth Access Token` and put that key into your `configuration.yaml` file -- see below.

<div class='note'>

There is an app credential Verification Token on the Basic Settings of your app. This is **not** the API key you want.

</div>

### Bot posting as its own user

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
  description: Use one of the Slack emojis as an Icon for the supplied username.  Slack uses the standard emoji sets used [here](https://www.webpagefx.com/tools/emoji-cheat-sheet/).
  required: false
  type: string
{% endconfiguration %}

### Slack service data

The following attributes can be placed inside `data` for extended functionality.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `file`                   |      yes | Local path of file, photo, etc. to post to Slack.
| `attachments`            |      yes | Array of [Slack attachments](https://api.slack.com/messaging/composing/layouts#attachments) (legacy). *NOTE*: if using `attachments`, they are shown **in addition** to `message`.
| `blocks`                 |      yes | Array of [Slack blocks](https://api.slack.com/messaging/composing/layouts). *NOTE*: if using `blocks`, they are shown **in place of** the `message` (note that the `message` is required nonetheless).
| `blocks_template`        |      yes | The same as `blocks`, but able to support [templates](https://www.home-assistant.io/docs/configuration/templating).

Example for posting a file from local path:

```yaml
message: Message that will be added as a comment to the file.
title: Title of the file.
data:
  file: "/path/to/file.ext"
```

Please note that `file` is validated against the `whitelist_external_dirs` in the `configuration.yaml`.

Example for using the block framework:

```yaml
message: Fallback message in case the blocks don't display anything.
title: Title of the file.
data:
  blocks:
    - type: section
      text:
        type: mrkdwn
        text: 'Danny Torrence left the following review for your property:'
    - type: section
      block_id: section567
      text:
        type: mrkdwn
        text: "<https://example.com|Overlook Hotel> \n :star: \n Doors had too many
          axe holes, guest in room 237 was far too rowdy, whole place felt stuck in
          the 1920s."
      accessory:
        type: image
        image_url: https://is5-ssl.mzstatic.com/image/thumb/Purple3/v4/d3/72/5c/d3725c8f-c642-5d69-1904-aa36e4297885/source/256x256bb.jpg
        alt_text: Haunted hotel image
    - type: section
      block_id: section789
      fields:
      - type: mrkdwn
        text: |-
          *Average Rating*
          1.0
```

Example for using the legacy attachments framework:

```yaml
message: Message that will be added as a comment to the file.
title: Title of the file.
data:
  attachments:
    - title: WHAT A HORRIBLE NIGHT TO HAVE A CURSE.
      image_url: https://i.imgur.com/JEExnsI.gif
```
