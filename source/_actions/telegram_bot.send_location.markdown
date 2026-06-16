---
title: "Send location"
action: telegram_bot.send_location
domain: telegram_bot
description: "Sends a location through a Telegram bot to one or more chats."
---

Use this action to send a location to one or more chats. Telegram shows it as a point on the map.

{% include actions/ui_header.md %}

To send a location from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Telegram bot: Send location**.
6. Enter the **Latitude** and **Longitude** and, optionally, other options.
7. Choose where to send it, then select **Save**.

This action does not use a standard target. Instead, you choose where it sends in one of these ways:

- Select one or more **Notify target** entities. Each one already points at a specific Telegram bot and chat.
- Provide a **Config entry ID** together with one or more **Chat IDs**.
- If you have a single bot and provide neither, the bot's first chat is used by default.

### Options in the UI

{% options_ui %}
Notify target:
  description: "One or more Telegram notify entities to send the location to. Each entity points at a specific bot and chat."
Latitude:
  description: "The latitude to send."
  required: true
Longitude:
  description: "The longitude to send."
  required: true
Disable notification:
  description: "Send the message silently. The recipient receives a notification with no sound."
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

In YAML, refer to this action as `telegram_bot.send_location`:

{% example %}
action: |
  action: telegram_bot.send_location
  data:
    latitude: 52.0705
    longitude: 4.3007
{% endexample %}

### Options in YAML

{% options_yaml %}
entity_id:
  description: "One or more Telegram notify entities to send the location to. Each entity points at a specific bot and chat."
  required: false
  type: [string, list]
latitude:
  description: "The latitude to send."
  required: true
  type: float
longitude:
  description: "The longitude to send."
  required: true
  type: float
disable_notification:
  description: "Send the message silently. The recipient receives a notification with no sound."
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

When the location is sent, the action returns a `chats` list. Each item describes one delivered message:

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
