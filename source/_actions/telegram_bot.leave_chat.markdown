---
title: "Leave chat"
action: telegram_bot.leave_chat
domain: telegram_bot
description: "Removes a Telegram bot from a chat."
---

Use this action to remove your Telegram bot from a group or channel.

{% include actions/ui_header.md %}

To leave a chat from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Telegram bot: Leave chat**.
6. Choose which chat to leave, then select **Save**.

This action does not use a standard target. Instead, you choose which chat to leave in one of these ways:

- Select a **Notify target** entity that points at the bot and chat to leave.
- Provide a **Config entry ID** together with the **Chat ID** of that chat.
- If you have a single bot and provide neither, the bot's first chat is used by default.

### Options in the UI

{% options_ui %}
Notify target:
  description: "One or more Telegram notify entities that point at the bot and chat to leave."
Config entry ID:
  description: "The Telegram bot to use. Required if you have more than one bot."
Chat ID:
  description: "The pre-authorized chat ID to leave. Defaults to the bot's first allowed chat."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `telegram_bot.leave_chat`:

{% example %}
action: |
  action: telegram_bot.leave_chat
  data:
    chat_id: 123456789
{% endexample %}

### Options in YAML

{% options_yaml %}
entity_id:
  description: "One or more Telegram notify entities that point at the bot and chat to leave."
  required: false
  type: [string, list]
config_entry_id:
  description: "The Telegram bot to use. Required if you have more than one bot."
  required: false
  type: string
chat_id:
  description: "The pre-authorized chat ID to leave. Defaults to the bot's first allowed chat."
  required: false
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
