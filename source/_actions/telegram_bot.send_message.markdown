---
title: "Send message"
action: telegram_bot.send_message
domain: telegram_bot
description: "Sends a text message through a Telegram bot to one or more chats."
---

Use this action to send a text message from your Telegram bot to one or more chats. You can add a title, format the text, and attach a custom keyboard or inline buttons.

{% include actions/ui_header.md %}

To send a message from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Telegram bot: Send message**.
6. Enter the **Message** and, optionally, a **Title** and other options.
7. Choose where to send it, then select **Save**.

This action does not use a standard target. Instead, you choose where it sends in one of these ways:

- Select one or more **Notify target** entities. Each one already points at a specific Telegram bot and chat.
- Provide a **Config entry ID** together with one or more **Chat IDs**.
- If you have a single bot and provide neither, the bot's first chat is used by default.

### Options in the UI

{% options_ui %}
Notify target:
  description: "One or more Telegram notify entities to send the message to. Each entity points at a specific bot and chat."
Title:
  description: "An optional title shown above the message."
Message:
  description: "The body of the message."
  required: true
Parse mode:
  description: "How to interpret formatting in the message text. One of html, markdown, markdownv2, or plain_text."
Disable notification:
  description: "Send the message silently. The recipient receives a notification with no sound."
Disable web page preview:
  description: "Disable link previews for links in the message."
Keyboard:
  description: "Rows of commands to show as a custom keyboard. Use an empty list to clear a previously set keyboard."
Inline keyboard:
  description: "Rows of buttons to show below the message, each linked to callback data or an external URL."
Message tag:
  description: "A tag added to the telegram_sent event when the message is sent, so you can identify it later."
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

In YAML, refer to this action as `telegram_bot.send_message`:

{% example %}
action: |
  action: telegram_bot.send_message
  data:
    title: Your garage door friend
    message: The garage door has been open for 10 minutes.
{% endexample %}

### Options in YAML

{% options_yaml %}
entity_id:
  description: "One or more Telegram notify entities to send the message to. Each entity points at a specific bot and chat."
  required: false
  type: [string, list]
title:
  description: "An optional title shown above the message."
  required: false
  type: string
message:
  description: "The body of the message."
  required: true
  type: string
parse_mode:
  description: "How to interpret formatting in the message text. One of html, markdown, markdownv2, or plain_text."
  required: false
  type: string
disable_notification:
  description: "Send the message silently. The recipient receives a notification with no sound."
  required: false
  type: boolean
  default: false
disable_web_page_preview:
  description: "Disable link previews for links in the message."
  required: false
  type: boolean
  default: false
keyboard:
  description: "Rows of commands to show as a custom keyboard. Use an empty list to clear a previously set keyboard."
  required: false
  type: list
inline_keyboard:
  description: "Rows of buttons to show below the message, each linked to callback data or an external URL."
  required: false
  type: list
message_tag:
  description: "A tag added to the telegram_sent event when the message is sent, so you can identify it later."
  required: false
  type: string
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

When the message is sent, the action returns a `chats` list. Each item describes one delivered message:

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
