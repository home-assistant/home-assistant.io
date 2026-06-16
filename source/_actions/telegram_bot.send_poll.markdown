---
title: "Send poll"
action: telegram_bot.send_poll
domain: telegram_bot
description: "Sends a poll through a Telegram bot to one or more chats."
---

Use this action to send a poll with a question and a set of answer options to one or more chats.

{% include actions/ui_header.md %}

To send a poll from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Telegram bot: Send poll**.
6. Enter the **Question** and the answer **Options** and, optionally, other options.
7. Choose where to send it, then select **Save**.

This action does not use a standard target. Instead, you choose where it sends in one of these ways:

- Select one or more **Notify target** entities. Each one already points at a specific Telegram bot and chat.
- Provide a **Config entry ID** together with one or more **Chat IDs**.
- If you have a single bot and provide neither, the bot's first chat is used by default.

### Options in the UI

{% options_ui %}
Notify target:
  description: "One or more Telegram notify entities to send the poll to. Each entity points at a specific bot and chat."
Question:
  description: "The poll question, 1 to 300 characters."
  required: true
Options:
  description: "The answer options, 2 to 10 strings of 1 to 100 characters each."
  required: true
Is anonymous:
  description: "Make the poll anonymous. Enabled by default."
Allow multiple answers:
  description: "Let people choose more than one answer."
Open period:
  description: "How long the poll stays open after creation, in seconds, 5 to 600."
Disable notification:
  description: "Send the message silently. The recipient receives a notification with no sound."
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

In YAML, refer to this action as `telegram_bot.send_poll`:

{% example %}
action: |
  action: telegram_bot.send_poll
  data:
    question: What should we have for dinner?
    options:
      - Pizza
      - Pasta
      - Salad
{% endexample %}

### Options in YAML

{% options_yaml %}
entity_id:
  description: "One or more Telegram notify entities to send the poll to. Each entity points at a specific bot and chat."
  required: false
  type: [string, list]
question:
  description: "The poll question, 1 to 300 characters."
  required: true
  type: string
options:
  description: "The answer options, 2 to 10 strings of 1 to 100 characters each."
  required: true
  type: list
is_anonymous:
  description: "Make the poll anonymous."
  required: false
  type: boolean
  default: true
allows_multiple_answers:
  description: "Let people choose more than one answer."
  required: false
  type: boolean
  default: false
open_period:
  description: "How long the poll stays open after creation, in seconds, 5 to 600."
  required: false
  type: integer
disable_notification:
  description: "Send the message silently. The recipient receives a notification with no sound."
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

When the poll is sent, the action returns a `chats` list. Each item describes one delivered message:

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
