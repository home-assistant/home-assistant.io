---
title: Mark message as seen
action: imap.seen
domain: imap
description: "Marks an IMAP email message as seen."
related_actions:
  - imap.move
  - imap.delete
  - imap.fetch
---

The **Mark message as seen** action marks an email message on your IMAP server as seen (read). It is meant to run in an automation after an `imap_content` event, using the entry and the message `uid` from the event data.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **IMAP: Mark message as seen**.
6. Select the **Config entry** and provide the message **UID**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Instead, you select the IMAP config entry.

### Options in the UI

{% options_ui %}
Config entry:
  description: The IMAP config entry that holds the message.
UID:
  description: The UID of the message to mark as seen. You can find it in the message's event data.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `imap.seen`. A basic example looks like this:

{% example %}
action: |
  action: imap.seen
  data:
    entry: 91fadb3617c5a3ea692aeb62d92aa869
    uid: "{{ trigger.event.data['uid'] }}"
{% endexample %}

This marks the message from the triggering event as seen.

### Options in YAML

{% options_yaml %}
entry:
  description: The ID of the IMAP config entry that holds the message. In UI mode, you can select the entry from a list. In YAML mode, you find the entry ID.
  required: true
  type: string
uid:
  description: The UID of the message to mark as seen. You can find it in the message's event data.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- When you have more than one IMAP config entry, filter the triggering events by `entry` so the correct messages are processed.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
