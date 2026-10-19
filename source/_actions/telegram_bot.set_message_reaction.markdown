---
title: "Set message reaction"
action: telegram_bot.set_message_reaction
domain: telegram_bot
description: "Sets a Telegram bot's emoji reaction on a message."
---

Use this action to react to a message with an emoji, the same way you tap a reaction in the Telegram app. You need the ID of the message you want to react to.

{% include actions/ui_header.md %}

To set a reaction from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Telegram bot: Set message reaction**.
6. Enter the **Message ID** and the **Reaction** and, optionally, other options.
7. Choose where the message lives, then select **Save**.

This action does not use a standard target. Instead, you point at the message in one of these ways:

- Provide a **Config entry ID** together with the **Chat ID** of the chat holding the message.
- If you have a single bot and provide neither, the bot's first chat is used by default.

### Options in the UI

{% options_ui %}
Message ID:
  description: "The ID of the message to react to. You can also use last to target the most recently sent message."
  required: true
Reaction:
  description: "The emoji to react with."
  required: true
Large animation:
  description: "Play a larger animation for the reaction."
Config entry ID:
  description: "The Telegram bot to use. Required if you have more than one bot."
Chat ID:
  description: "The pre-authorized chat ID where the message lives. Defaults to the bot's first allowed chat."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `telegram_bot.set_message_reaction`:

{% example %}
action: |
  action: telegram_bot.set_message_reaction
  data:
    message_id: last
    reaction: 👍
{% endexample %}

### Options in YAML

{% options_yaml %}
message_id:
  description: "The ID of the message to react to. You can also use last to target the most recently sent message."
  required: true
  type: [integer, string]
reaction:
  description: "The emoji to react with."
  required: true
  type: string
is_big:
  description: "Play a larger animation for the reaction."
  required: false
  type: boolean
  default: false
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
