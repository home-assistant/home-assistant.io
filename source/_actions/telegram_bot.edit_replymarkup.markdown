---
title: "Edit reply markup"
action: telegram_bot.edit_replymarkup
domain: telegram_bot
description: "Edits the inline keyboard of a message a Telegram bot sent earlier."
---

Use this action to replace the inline keyboard below a message your Telegram bot sent earlier. You need the ID of the message you want to edit. To remove the keyboard, send an empty list.

{% include actions/ui_header.md %}

To edit the inline keyboard from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Telegram bot: Edit reply markup**.
6. Enter the **Message ID** and the **Inline keyboard** and, optionally, other options.
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
Inline keyboard:
  description: "Rows of buttons to show below the message, each linked to callback data or an external URL. Use an empty list to remove the keyboard."
  required: true
Config entry ID:
  description: "The Telegram bot to use. Required if you have more than one bot."
Chat ID:
  description: "The pre-authorized chat ID where the message lives. Defaults to the bot's first allowed chat."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `telegram_bot.edit_replymarkup`:

{% example %}
action: |
  action: telegram_bot.edit_replymarkup
  data:
    message_id: last
    inline_keyboard:
      - "Approve:/approve, Reject:/reject"
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
inline_keyboard:
  description: "Rows of buttons to show below the message, each linked to callback data or an external URL. Use an empty list to remove the keyboard."
  required: true
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
