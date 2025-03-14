---
title: Slack
description: Instructions on how to add Slack notifications to Home Assistant.
ha_category:
  - Notifications
ha_release: pre 0.7
ha_config_flow: true
ha_domain: slack
ha_iot_class: Cloud Push
ha_codeowners:
  - '@tkdrob'
  - '@fletcherau'
ha_platforms:
  - notify
  - sensor
ha_integration_type: service
---

The `slack` platform allows you to deliver notifications from Home Assistant to [Slack](https://slack.com/).

![](/images/integrations/slack/slack-message.png)


## Setup

### Slack App

1. Create a [new app](https://api.slack.com/apps) under your Slack.com account.
2. Click the `OAuth & Permissions` link in the sidebar, under the Features heading.

Find `Features/OAuth and Permissions/Scopes/Bot Token Scopes`

3. Add the `chat:write` and `dnd:read` scopes
  - To modify your Slack bot's username and icon, additionally add the `chat:write.customize` OAuth scope

![](/images/integrations/slack/bot-token-scopes.png)

4. Scroll up to `OAuth Tokens & Redirect URLs` and click `Install to Workspace`.

In `Features/OAuth and Permissions/OAuth Tokens for Your Workspace`:

5. Copy the Bot User OAuth Token. Use this as 'API Key' when setting up in Home Assistant

![](/images/integrations/slack/oauth-tokens-for-workspace.png)

6. Ensure that the bot user is added to the channel in which you want it to post. This can be completed in several ways:

- Using `/invite @bot` from the channel
- Tagging the bot user in a message, then adding it to the channel via the Slackbot prompt.
- Channel settings -> `Integrations` -> `Add apps`

#### Sample App Manifest

You can easily create a bot with all the permissions needed from an App Manifest. 

```yaml
display_information:
  name: Home Notifications
features:
  bot_user:
    display_name: Home Notifications
    always_online: false
oauth_config:
  scopes:
    bot:
      - incoming-webhook
      - chat:write
      - dnd:read
      - chat:write.customize
settings:
  org_deploy_enabled: false
  socket_mode_enabled: false
  token_rotation_enabled: false
```

### Integration Setup

When installing the integration, use these settings:

API Key: `xoxb-abc-def`
- Bot User OAuth Token (from step 5 above)

Default Channel: `#channel`
- Channel name that bot will post to if a channel is not supplied when called

Icon/Username:
- optional - if you want to have a custom name/icon for the bot user not already set in Slack

![](/images/integrations/slack/slack-integration-setup.png)

## Usage

### Sending Messages

One of the easiest ways to send a message, is to create a script. You can paste in YAML and make changes in the GUI.

You can call this script as an action. 

1. Go to Home Assistant Settings > Automations and Scenes > Scripts > Add Script
2. Click the three dots in the top right, and pick 'Edit in YAML'. Paste in the contents below.
3. Change `YOUR_SLACK_TEAM` to the team name `(*.slack.com)`

```yaml
alias: "Notify: Slack Notification Template"
sequence:
  - action: notify.YOUR_SLACK_TEAM
    data:
      message: "Fallback Text"
      target: "#test-channel" # Single channel target
      title: "Reminder"
      data:
        blocks:
          - type: section
            text:
              type: mrkdwn
              text: >-
                This is a mrkdwn section block *this is bold*, and ~this is
                crossed out~, and <https://google.com|this is a link>
```

Update the blocks array with valid Slack blocks. The easiest way to create this is using [Slack Block Kit Builder](https://app.slack.com/block-kit-builder).  Up to 50 blocks may be included per message.

Create a duplicate of this script to use for different messages, and different channels (the door was opened in #security, the light was left on on #lights, etc).

You can also send messages to multiple targets (channels and/or users) at once:

```yaml
alias: "Notify: Multiple Targets Message"
sequence:
  - action: notify.YOUR_SLACK_TEAM
    data:
      message: "Alert: Motion detected!"
      target: 
        - "#security"    # Channel by name
        - "C01234ABCD"   # Channel by ID
        - "U5678EFGH"    # Direct message to user by ID
      title: "Security Alert"
      data:
        blocks:
          - type: section
            text:
              type: mrkdwn
              text: "Motion detected in the backyard camera"
```

### Target Types

The `target` field accepts either a single value or a list of values. Each target can be:

- A channel name with a `#` prefix (e.g., `#general`)
- A channel name without the `#` prefix (e.g., `general`)
- A channel ID (e.g., `C01234ABCD`)
- A user ID for direct messages (e.g., `U5678EFGH`)

When sending files, make sure you have the proper permissions set up as described in the Setup section.

### Icons

Slack uses the standard emoji sets used [here](https://slack.com/intl/en-gb/help/articles/202931348-Use-emoji-and-reactions#add-emoji-to-your-messages). Alternatively a publicly accessible URL may be used.

{% include integrations/config_flow.md %}

One sensor entity will be created:

- **Do Not Disturb Timer**: The amount of time left for Do Not Disturb status.

### Slack action data

The following attributes can be placed inside the `data` key of the action for extended functionality:

| Attribute         | Optional | Description                                                                                                                                                                                                                                                                                                                                     |
| ----------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `username`        | yes      | The username of the Slack bot.                                                                                                                                                                                                                                                                                                                  |
| `icon`            | yes      | The icon of the Slack bot.                                                                                                                                                                                                                                                                                                                      |
| `file`            | yes      | A file to include with the message; see below.                                                                                                                                                                                                                                                                                                  |
| `blocks`          | yes      | Array of [Slack blocks](https://api.slack.com/messaging/composing/layouts). *NOTE*: if using `blocks`, they are shown **in place of** the `message` within Slack apps. The message field will be used as notification text and anywhere else Slack is unable to display blocks. `message` is required regardless of whether this field is used. |
| `blocks_template` | yes      | The same as `blocks`, but able to support [templates](https://www.home-assistant.io/docs/configuration/templating).                                                                                                                                                                                                                             |
| `thread_ts`       | yes      | Sends the message as a reply to a specified parent message.                                                                                                                                                                                                                                                                                     |

Note that using `file` will ignore all usage of `blocks` and `blocks_template` (as Slack does not support those frameworks in messages that accompany uploaded files).

To include a local file with the Slack message, use these attributes underneath the `file` key:

| Attribute | Optional | Description                                                                                         |
| --------- | -------- | --------------------------------------------------------------------------------------------------- |
| `path`    | no       | A local filepath that has been [whitelisted](/integrations/homeassistant/#allowlist_external_dirs). |

To include a remote file with the Slack message, use these attributes underneath the `file` key:

| Attribute  | Optional | Description                                                                              |
| ---------- | -------- | ---------------------------------------------------------------------------------------- |
| `url`      | no       | A URL that has been [whitelisted](/integrations/homeassistant/#allowlist_external_urls). |
| `username` | yes      | An optional username if the URL is protected by HTTP Basic Auth.                         |
| `password` | yes      | An optional password if the URL is protected by HTTP Basic Auth.                         |

### Obtaining a member ID

Some of the examples below use a member ID. This is a unique string assigned by Slack to all users (members and guests) and not a username set by the user. To get a member ID:

1. Select a Slack user (both name and profile image work) to bring up their profile side panel.
2. Open the context menu by selecting the three dots.
3. Select **Copy member ID**.

![](/images/integrations/slack/slack-member-id.png)

### Examples

To send a file from local path:

```yaml
message: Message that will be added as a comment to the file.
title: Title of the file.
data:
  file:
    path: /path/to/file.ext
```

To send a file from remote path:

```yaml
message: Message that will be added as a comment to the file.
title: Title of the file.
data:
  file:
    url: "http://site.com/image.jpg"
```

To send a file from remote path that is protected by HTTP Basic Auth:

```yaml
message: Message that will be added as a comment to the file.
title: Title of the file.
data:
  file:
    url: "http://site.com/image.jpg"
    username: user
    password: pass
```

To use the block framework:

```yaml
message: Fallback message for notifications or in case the blocks don't display anything.
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


Send a message directly to a user by setting the target to their member ID.


```yaml
message: "Hello there!"
target: "U12345"
title: "Hi"
data:
  blocks: []
```

Send a message to a channel that mentions (@username, highlights a users name in yellow) a user.

```yaml
message: "<@MEMBER_ID> your appointment starts soon"
target: "#general"
title: "Reminder"
data:
  blocks: []
```

Send a message as reply to an existing message. `thread_ts` can be retrieved via a script utilising [Bolt](https://slack.dev/bolt-python/tutorial/getting-started), any other Slack library, or the Slack API directly.

```yaml
message: "Here's some supplementary information that doesn't need to be present in the channel directly."
target: "#general"
data:
  thread_ts: "1684736481.064129"
```
