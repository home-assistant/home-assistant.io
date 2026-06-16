---
title: "Download file"
action: telegram_bot.download_file
domain: telegram_bot
description: "Downloads a file received by a Telegram bot to local storage."
---

Use this action to save a file someone sent to your Telegram bot, such as a photo or document, to your Home Assistant storage. You need the file ID, which Telegram includes in the event for the received message.

{% include actions/ui_header.md %}

To download a file from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Telegram bot: Download file**.
6. Enter the **File ID** and, optionally, a **Directory path** and **File name**.
7. Select **Save**.

If you have more than one Telegram bot, set the **Config entry ID** to choose which bot downloads the file. With a single bot, you can leave it empty.

### Options in the UI

{% options_ui %}
File ID:
  description: "The ID of the file to download. It comes from the event for the received message."
  required: true
Directory path:
  description: "The local directory to save the file to. Defaults to the telegram_bot directory in your Home Assistant configuration directory."
File name:
  description: "The name to save the file as. Defaults to the original file name."
Config entry ID:
  description: "The Telegram bot to use. Required if you have more than one bot."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `telegram_bot.download_file`:

{% example %}
action: |
  action: telegram_bot.download_file
  data:
    file_id: "{{ trigger.event.data.document.file_id }}"
{% endexample %}

### Options in YAML

{% options_yaml %}
file_id:
  description: "The ID of the file to download. It comes from the event for the received message."
  required: true
  type: string
directory_path:
  description: "The local directory to save the file to. Defaults to the telegram_bot directory in your Home Assistant configuration directory."
  required: false
  type: string
file_name:
  description: "The name to save the file as. Defaults to the original file name."
  required: false
  type: string
config_entry_id:
  description: "The Telegram bot to use. Required if you have more than one bot."
  required: false
  type: string
{% endoptions_yaml %}

## Response data

When the file is downloaded, the action returns the local path where it was saved:

- `file_path`: The full path to the downloaded file.

An example response looks like this:

```yaml
file_path: /config/telegram_bot/my_downloaded_file
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
