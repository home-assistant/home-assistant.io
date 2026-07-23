---
title: "Send text command"
action: google_assistant_sdk.send_text_command
domain: google_assistant_sdk
description: "Sends a command as a text query to Google Assistant."
---

The **Send text command** action sends one or more commands as text queries to Google Assistant, just as if you had spoken them out loud. This lets you reach Google Assistant features that aren't otherwise available in Home Assistant, like controlling devices that are only linked to your Google account.

You can optionally have Google Assistant's spoken response played back on a media player, which is useful for commands that answer a question, such as asking for a joke or the weather.

{% include actions/ui_header.md %}

To send a text command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Google Assistant SDK: Send text command**.
6. Enter the **Command** to send, and optionally select a **Media player entity** to play the audio response on.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Command:
  description: One or more commands to send to Google Assistant.
  required: true
Media player entity:
  description: One or more media player entities to play Google Assistant's audio response on. This does not target the device for the command itself.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `google_assistant_sdk.send_text_command`. A basic example looks like this:

{% example %}
action: |
  action: google_assistant_sdk.send_text_command
  data:
    command: "turn off kitchen TV"
{% endexample %}

### Options in YAML

{% options_yaml %}
command:
  description: >
    One or more commands to send to Google Assistant.
  required: true
  type: string
media_player:
  description: >
    One or more media player entities to play Google Assistant's audio
    response on. This does not target the device for the command itself.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- To control a specific device, like streaming a camera to a TV, include the device's name (as known by Google Assistant) in the text command itself. The **Media player entity** option only plays back the audio response and does not direct the command.
- You can send multiple commands in the same conversation context, which is useful for commands that need a follow-up, such as unlocking a door or opening a cover that requires a PIN.
- This action can optionally return Google Assistant's responses. Store them in a [response variable](/docs/scripts/perform-actions/#use-templates-to-handle-response-data) to use them later in your automation or script.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Play a joke on a speaker

Ask Google Assistant to tell a joke and play the spoken response on a living room speaker.

{% details "YAML example for playing a joke on a speaker" %}

{% example %}
action: |
  action: google_assistant_sdk.send_text_command
  data:
    command: "tell me a joke"
    media_player: media_player.living_room_speaker
{% endexample %}

{% enddetails %}

### Send multiple commands in one conversation

Send a sequence of commands in the same conversation context, for example to open a garage door that needs a PIN.

{% details "YAML example for sending multiple commands" %}

{% example %}
action: |
  action: google_assistant_sdk.send_text_command
  data:
    command:
      - "open the garage door"
      - "1234"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
