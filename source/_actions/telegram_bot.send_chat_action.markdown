---
title: "Send chat action"
action: telegram_bot.send_chat_action
domain: telegram_bot
description: "Shows a status such as typing in a Telegram chat."
---

Use this action to show a status in a chat, such as "typing", when a bot response may be delayed. This lets people know a message is coming soon. Telegram clears the status after 5 seconds or when the reply arrives.

{% include actions/ui_header.md %}

To send a chat action from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Telegram bot: Send chat action**.
6. Select the **Chat action** to show.
7. Choose where to send it, then select **Save**.

This action does not use a standard target. Instead, you choose where it sends in one of these ways:

- Select one or more **Notify target** entities. Each one already points at a specific Telegram bot and chat.
- Provide a **Config entry ID** together with one or more **Chat IDs**.
- If you have a single bot and provide neither, the bot's first chat is used by default.

### Options in the UI

{% options_ui %}
Notify target:
  description: "One or more Telegram notify entities to send the chat action to. Each entity points at a specific bot and chat."
Chat action:
  description: "The status to show. One of typing, upload_photo, record_video, upload_video, record_voice, upload_voice, upload_document, choose_sticker, find_location, record_video_note, or upload_video_note."
Message thread ID:
  description: "Send the chat action to a specific topic or thread in a forum supergroup."
Config entry ID:
  description: "The Telegram bot to use. Required if you have more than one bot."
Chat ID:
  description: "One or more pre-authorized chat IDs to send to. Defaults to the bot's first allowed chat."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `telegram_bot.send_chat_action`:

{% example %}
action: |
  action: telegram_bot.send_chat_action
  data:
    chat_action: typing
{% endexample %}

### Options in YAML

{% options_yaml %}
entity_id:
  description: "One or more Telegram notify entities to send the chat action to. Each entity points at a specific bot and chat."
  required: false
  type: [string, list]
chat_action:
  description: "The status to show. One of typing, upload_photo, record_video, upload_video, record_voice, upload_voice, upload_document, choose_sticker, find_location, record_video_note, or upload_video_note."
  required: false
  type: string
message_thread_id:
  description: "Send the chat action to a specific topic or thread in a forum supergroup."
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
