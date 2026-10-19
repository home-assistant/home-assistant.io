---
title: "Send message draft"
action: telegram_bot.send_message_draft
domain: telegram_bot
description: "Shows a temporary draft message in a Telegram chat."
---

Use this action to show a temporary message in a chat that disappears after a few seconds. You can use it to show partial messages while a full message is still being generated, or to signal an ongoing process. Sending another draft with the same draft ID animates the change.

{% include actions/ui_header.md %}

To send a message draft from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Telegram bot: Send message draft**.
6. Enter the **Message** and a **Draft ID** and, optionally, other options.
7. Choose where to send it, then select **Save**.

This action does not use a standard target. Instead, you choose where it sends in one of these ways:

- Select one or more **Notify target** entities. Each one already points at a specific Telegram bot and chat.
- Provide a **Config entry ID** together with one or more **Chat IDs**.
- If you have a single bot and provide neither, the bot's first chat is used by default.

### Options in the UI

{% options_ui %}
Notify target:
  description: "One or more Telegram notify entities to send the draft to. Each entity points at a specific bot and chat."
Draft ID:
  description: "A unique identifier for the draft. Drafts that share the same identifier are animated as they change. Must be a positive whole number."
  required: true
Message:
  description: "The available part of the message to show as a temporary draft."
  required: true
Parse mode:
  description: "How to interpret formatting in the message text. One of html, markdown, markdownv2, or plain_text."
Message thread ID:
  description: "Send the draft to a specific topic or thread in a forum supergroup."
Config entry ID:
  description: "The Telegram bot to use. Required if you have more than one bot."
Chat ID:
  description: "One or more pre-authorized chat IDs to send to. Defaults to the bot's first allowed chat."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `telegram_bot.send_message_draft`:

{% example %}
action: |
  action: telegram_bot.send_message_draft
  data:
    draft_id: 1
    message: The garage door has been o
{% endexample %}

### Options in YAML

{% options_yaml %}
entity_id:
  description: "One or more Telegram notify entities to send the draft to. Each entity points at a specific bot and chat."
  required: false
  type: [string, list]
draft_id:
  description: "A unique identifier for the draft. Drafts that share the same identifier are animated as they change. Must be a positive whole number."
  required: true
  type: integer
message:
  description: "The available part of the message to show as a temporary draft."
  required: true
  type: string
parse_mode:
  description: "How to interpret formatting in the message text. One of html, markdown, markdownv2, or plain_text."
  required: false
  type: string
message_thread_id:
  description: "Send the draft to a specific topic or thread in a forum supergroup."
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

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
