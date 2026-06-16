---
title: "Send media group"
action: telegram_bot.send_media_group
domain: telegram_bot
description: "Sends a group of photos, videos, documents, or audio files as an album."
---

Use this action to send several media files as a single album to one or more chats. Documents and audio files can only be grouped with media of the same type.

{% include actions/ui_header.md %}

To send a media group from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Telegram bot: Send media group**.
6. Add the **Media** items and, optionally, other options.
7. Choose where to send it, then select **Save**.

This action does not use a standard target. Instead, you choose where it sends in one of these ways:

- Select one or more **Notify target** entities. Each one already points at a specific Telegram bot and chat.
- Provide a **Config entry ID** together with one or more **Chat IDs**.
- If you have a single bot and provide neither, the bot's first chat is used by default.

### Options in the UI

{% options_ui %}
Notify target:
  description: "One or more Telegram notify entities to send the media to. Each entity points at a specific bot and chat."
Media:
  description: "The list of media items to send. Each item has a media type (audio, document, photo, or video), a URL or local file, an optional caption, and optional authentication for the URL."
  required: true
Parse mode:
  description: "How to interpret formatting in the captions. One of html, markdown, markdownv2, or plain_text."
Disable notification:
  description: "Send the message silently. The recipient receives a notification with no sound."
Protect content:
  description: "Prevent the sent messages from being forwarded or saved."
Reply to message ID:
  description: "Mark the message as a reply to an earlier message, given its ID."
Message thread ID:
  description: "Send the message to a specific topic or thread in a forum supergroup."
Config entry ID:
  description: "The Telegram bot to use. Required if you have more than one bot."
Chat ID:
  description: "One or more pre-authorized chat IDs to send to. Defaults to the bot's first allowed chat."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `telegram_bot.send_media_group`:

{% example %}
action: |
  action: telegram_bot.send_media_group
  data:
    media:
      - media_type: photo
        url: http://example.org/path/to/the/first.png
        caption: First image
      - media_type: photo
        url: http://example.org/path/to/the/second.png
        caption: Second image
{% endexample %}

### Options in YAML

{% options_yaml %}
entity_id:
  description: "One or more Telegram notify entities to send the media to. Each entity points at a specific bot and chat."
  required: false
  type: [string, list]
media:
  description: "The list of media items to send. Each item has a media_type (audio, document, photo, or video), a url or file, an optional caption, and optional authentication, username, password, and verify_ssl for the URL."
  required: true
  type: list
parse_mode:
  description: "How to interpret formatting in the captions. One of html, markdown, markdownv2, or plain_text."
  required: false
  type: string
disable_notification:
  description: "Send the message silently. The recipient receives a notification with no sound."
  required: false
  type: boolean
  default: false
protect_content:
  description: "Prevent the sent messages from being forwarded or saved."
  required: false
  type: boolean
  default: false
reply_to_message_id:
  description: "Mark the message as a reply to an earlier message, given its ID."
  required: false
  type: integer
message_thread_id:
  description: "Send the message to a specific topic or thread in a forum supergroup."
  required: false
  type: integer
config_entry_id:
  description: "The Telegram bot to use. Required if you have more than one bot."
  required: false
  type: string
chat_id:
  description: "One or more pre-authorized chat IDs to send to. Defaults to the bot's first allowed chat."
  required: false
  type: [integer, list]
{% endoptions_yaml %}

## Response data

When the media group is sent, the action returns a `chats` list. Each item describes one delivered message:

- `chat_id`: The chat the message was sent to.
- `message_id`: The ID of the sent message. Use it later to edit or delete the message.
- `entity_id`: The notify entity that sent the message.

An example response looks like this:

```yaml
chats:
  - chat_id: 1234567890
    message_id: 100
    entity_id: notify.telegram_bot_chat
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
