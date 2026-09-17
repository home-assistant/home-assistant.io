---
title: Move message
action: imap.move
domain: imap
description: "Moves an IMAP email message to another folder."
related_actions:
  - imap.seen
  - imap.delete
  - imap.fetch
---

The **Move message** action moves an email message on your IMAP server to another folder, and can optionally mark it as seen at the same time. It is meant to run in an automation after an `imap_content` event, using the entry and the message `uid` from the event data.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **IMAP: Move message**.
6. Select the **Config entry**, provide the message **UID**, and set the **Target folder**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Instead, you select the IMAP config entry.

### Options in the UI

{% options_ui %}
Config entry:
  description: The IMAP config entry that holds the message.
UID:
  description: The UID of the message to move. You can find it in the message's event data.
Target folder:
  description: "The name of the folder to move the message to, for example `INBOX/Trash` or `INBOX.Trash` on older systems."
Seen:
  description: Mark the message as seen when it is moved.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `imap.move`. A basic example looks like this:

{% example %}
action: |
  action: imap.move
  data:
    entry: 91fadb3617c5a3ea692aeb62d92aa869
    uid: "{{ trigger.event.data['uid'] }}"
    target_folder: "INBOX.Trash"
{% endexample %}

This moves the message from the triggering event to the `INBOX.Trash` folder.

### Options in YAML

{% options_yaml %}
entry:
  description: The ID of the IMAP config entry that holds the message. In UI mode, you can select the entry from a list. In YAML mode, you find the entry ID.
  required: true
  type: string
uid:
  description: The UID of the message to move. You can find it in the message's event data.
  required: true
  type: string
target_folder:
  description: "The name of the folder to move the message to, for example `INBOX/Trash` or `INBOX.Trash` on older systems."
  required: true
  type: string
seen:
  description: Mark the message as seen when it is moved.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

## Good to know

- Use the correct IMAP folder separator for your mail server. Common separators are:
  - Gmail: `/`
  - Dovecot: `.` (but often `/`)
  - Courier IMAP: `.`
  - Cyrus IMAP: `/`
  - Microsoft Exchange: `/`
  - Zimbra: `/`
  - Yahoo Mail: `/`
- When you have more than one IMAP config entry, filter the triggering events by `entry` so the correct messages are processed.
- Moved messages cannot always be recovered. Make sure your triggers and filtering are set up correctly before you use this action.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
