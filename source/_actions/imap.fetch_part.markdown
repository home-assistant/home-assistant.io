---
title: Fetch message part
action: imap.fetch_part
domain: imap
description: "Fetches a single part or attachment from an IMAP email message."
related_actions:
  - imap.fetch
  - imap.seen
  - imap.move
---

The **Fetch message part** action fetches a single part or attachment from an email message on your IMAP server. Use it to retrieve the content of a specific part, such as an attachment, that you found with the [Fetch message](/actions/imap.fetch/) action or in the `imap_content` event data.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **IMAP: Fetch message part**.
6. Select the **Config entry**, provide the message **UID**, and set the **Part** index.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Instead, you select the IMAP config entry.

### Options in the UI

{% options_ui %}
Config entry:
  description: The IMAP config entry that holds the message.
UID:
  description: The UID of the message to fetch from. You can find it in the message's event data.
Part:
  description: The index of the message part to fetch. Use the part information from the message's event data or from the Fetch message action.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `imap.fetch_part`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: imap.fetch_part
  data:
    entry: 91fadb3617c5a3ea692aeb62d92aa869
    uid: "{{ trigger.event.data['uid'] }}"
    part: "1"
  response_variable: message_part
{% endexample %}

This fetches part `1` of the message and stores it in the `message_part` response variable.

### Options in YAML

{% options_yaml %}
entry:
  description: The ID of the IMAP config entry that holds the message. In UI mode, you can select the entry from a list. In YAML mode, you find the entry ID.
  required: true
  type: string
uid:
  description: The UID of the message to fetch from. You can find it in the message's event data.
  required: true
  type: string
part:
  description: The index of the message part to fetch. Use the part information from the message's event data or from the Fetch message action.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response contains the following fields:

- `part_data`: The encoded data of the fetched message part.
- `content_type`: The MIME content type of the part, for example `image/jpeg`.
- `content_transfer_encoding`: The encoding of the data in `part_data`.
- `filename`: The filename of the part when it is an attachment. This is `null` when no filename is set.
- `uid`: The UID of the message.
- `part`: The part index.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
