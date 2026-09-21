---
title: "Answer callback query"
action: telegram_bot.answer_callback_query
domain: telegram_bot
description: "Responds to a button press on a Telegram inline keyboard."
---

Use this action to respond when someone presses a button on an inline keyboard. The response shows as a short notification at the top of the chat, or as a pop-up alert. Telegram includes the callback query ID in the `telegram_callback` event, so you usually answer from an automation triggered by that event.

{% include actions/ui_header.md %}

To answer a callback query from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Telegram bot: Answer callback query**.
6. Enter the **Message** and the **Callback query ID** and, optionally, other options.
7. Select **Save**.

If you have more than one Telegram bot, set the **Config entry ID** to choose which bot answers. With a single bot, you can leave it empty.

### Options in the UI

{% options_ui %}
Message:
  description: "The text to show to the person who pressed the button."
  required: true
Callback query ID:
  description: "The ID of the callback query to answer. It comes from the telegram_callback event."
  required: true
Show alert:
  description: "Show the message as a pop-up alert instead of a brief notification."
Config entry ID:
  description: "The Telegram bot to use. Required if you have more than one bot."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `telegram_bot.answer_callback_query`:

{% example %}
action: |
  action: telegram_bot.answer_callback_query
  data:
    message: "OK, I'm on it!"
    callback_query_id: "{{ trigger.event.data.id }}"
{% endexample %}

### Options in YAML

{% options_yaml %}
message:
  description: "The text to show to the person who pressed the button."
  required: true
  type: string
callback_query_id:
  description: "The ID of the callback query to answer. It comes from the telegram_callback event."
  required: true
  type: integer
show_alert:
  description: "Show the message as a pop-up alert instead of a brief notification."
  required: false
  type: boolean
  default: false
config_entry_id:
  description: "The Telegram bot to use. Required if you have more than one bot."
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
