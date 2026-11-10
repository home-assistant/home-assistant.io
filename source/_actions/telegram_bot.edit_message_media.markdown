---
title: "Edit message media"
action: telegram_bot.edit_message_media
domain: telegram_bot
description: "Replaces the media of a message a Telegram bot sent earlier."
---

Use this action to replace the photo, video, or other media of a message your Telegram bot sent earlier. You need the ID of the message you want to edit.

{% include actions/ui_header.md %}

To edit the media from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Telegram bot: Edit message media**.
6. Enter the **Message ID**, select the **Media type**, and provide a **URL** or **File** and, optionally, other options.
7. Choose where the message lives, then select **Save**.

This action does not use a standard target. Instead, you point at the message you want to edit in one of these ways:

- Select a **Notify target** entity that points at the bot and chat holding the message.
- Provide a **Config entry ID** together with the **Chat ID** of that chat.
- If you have a single bot and provide neither, the bot's first chat is used by default.

### Options in the UI

{% options_ui %}
Notify target:
  description: "One or more Telegram notify entities that point at the bot and chat holding the message."
Message ID:
  description: "The ID of the message to edit. You can also use last to target the most recently sent message."
  required: true
Media type:
  description: "The type of the new media. One of animation, audio, document, photo, or video."
  required: true
URL:
  description: "Remote path to the new media."
File:
  description: "Local path to the new media."
Verify SSL:
  description: "Check the server's SSL certificate when downloading from an HTTPS URL. Enabled by default."
Authentication method:
  description: "Authentication method for the URL. One of basic, digest, or bearer_token."
Username:
  description: "Username for a URL that requires basic or digest authentication."
Password:
  description: "Password or bearer token for a URL that requires authentication."
Caption:
  description: "The caption shown with the new media."
Inline keyboard:
  description: "Rows of buttons to show below the message, each linked to callback data or an external URL."
Config entry ID:
  description: "The Telegram bot to use. Required if you have more than one bot."
Chat ID:
  description: "The pre-authorized chat ID where the message lives. Defaults to the bot's first allowed chat."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `telegram_bot.edit_message_media`:

{% example %}
action: |
  action: telegram_bot.edit_message_media
  data:
    message_id: last
    media_type: photo
    url: http://example.org/path/to/the/image.png
    caption: Updated image
{% endexample %}

### Options in YAML

{% options_yaml %}
entity_id:
  description: "One or more Telegram notify entities that point at the bot and chat holding the message."
  required: false
  type: [string, list]
message_id:
  description: "The ID of the message to edit. You can also use last to target the most recently sent message."
  required: true
  type: [integer, string]
media_type:
  description: "The type of the new media. One of animation, audio, document, photo, or video."
  required: true
  type: string
url:
  description: "Remote path to the new media."
  required: false
  type: string
file:
  description: "Local path to the new media."
  required: false
  type: string
verify_ssl:
  description: "Check the server's SSL certificate when downloading from an HTTPS URL."
  required: false
  type: boolean
  default: true
authentication:
  description: "Authentication method for the URL. One of basic, digest, or bearer_token."
  required: false
  type: string
username:
  description: "Username for a URL that requires basic or digest authentication."
  required: false
  type: string
password:
  description: "Password or bearer token for a URL that requires authentication."
  required: false
  type: string
caption:
  description: "The caption shown with the new media."
  required: false
  type: string
inline_keyboard:
  description: "Rows of buttons to show below the message, each linked to callback data or an external URL."
  required: false
  type: list
config_entry_id:
  description: "The Telegram bot to use. Required if you have more than one bot."
  required: false
  type: string
chat_id:
  description: "The pre-authorized chat ID where the message lives. Defaults to the bot's first allowed chat."
  required: false
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
