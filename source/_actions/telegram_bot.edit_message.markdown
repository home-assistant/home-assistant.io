---
title: "Edit message"
action: telegram_bot.edit_message
domain: telegram_bot
description: "Edits the text of a message a Telegram bot sent earlier."
---

Use this action to change the text of a message your Telegram bot sent earlier. You need the ID of the message you want to edit.

{% include actions/ui_header.md %}

To edit a message from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Telegram bot: Edit message**.
6. Enter the **Message ID** and the new **Message** and, optionally, other options.
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
Message:
  description: "The new body of the message."
  required: true
Title:
  description: "An optional title shown above the message."
Parse mode:
  description: "How to interpret formatting in the message text. One of html, markdown, markdownv2, or plain_text."
Disable web page preview:
  description: "Disable link previews for links in the message."
Inline keyboard:
  description: "Rows of buttons to show below the message, each linked to callback data or an external URL."
Config entry ID:
  description: "The Telegram bot to use. Required if you have more than one bot."
Chat ID:
  description: "The pre-authorized chat ID where the message lives. Defaults to the bot's first allowed chat."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `telegram_bot.edit_message`:

{% example %}
action: |
  action: telegram_bot.edit_message
  data:
    message_id: last
    message: The garage door has been closed again.
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
message:
  description: "The new body of the message."
  required: true
  type: string
title:
  description: "An optional title shown above the message."
  required: false
  type: string
parse_mode:
  description: "How to interpret formatting in the message text. One of html, markdown, markdownv2, or plain_text."
  required: false
  type: string
disable_web_page_preview:
  description: "Disable link previews for links in the message."
  required: false
  type: boolean
  default: false
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
