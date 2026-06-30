---
title: Fetch message
action: imap.fetch
domain: imap
description: "Fetches the text body and part metadata of an IMAP email message."
related_actions:
  - imap.fetch_part
  - imap.seen
  - imap.move
---

The **Fetch message** action fetches the text body of an email message on your IMAP server and returns metadata about the parts inside the message. Unlike the `imap_content` event, the returned text is not limited in size.

This action returns its result in a response variable, which you can use in later steps of the same automation or script. It is meant to run after an `imap_content` event, using the entry and the message `uid` from the event data.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **IMAP: Fetch message**.
6. Select the **Config entry** and provide the message **UID**.
7. In the **Response variable** field, enter a name to store the data in, such as `message`.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Instead, you select the IMAP config entry.

### Options in the UI

{% options_ui %}
Config entry:
  description: The IMAP config entry that holds the message.
UID:
  description: The UID of the message to fetch. You can find it in the message's event data.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `imap.fetch`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: imap.fetch
  data:
    entry: 91fadb3617c5a3ea692aeb62d92aa869
    uid: "{{ trigger.event.data['uid'] }}"
  response_variable: message
{% endexample %}

This fetches the message from the triggering event and stores it in the `message` response variable.

### Options in YAML

{% options_yaml %}
entry:
  description: The ID of the IMAP config entry that holds the message. In UI mode, you can select the entry from a list. In YAML mode, you find the entry ID.
  required: true
  type: string
uid:
  description: The UID of the message to fetch. You can find it in the message's event data.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response contains the following fields:

- `text`: The plain text version of the fetched email.
- `subject`: The subject of the fetched email.
- `sender`: The sender's email address.
- `uid`: The UID of the message.
- `parts`: A dictionary with metadata about the available parts in a multipart message. Each key is a part index that you can pass to the [Fetch message part](/actions/imap.fetch_part/) action. Each part includes its `content_type`, `content_transfer_encoding`, and, if set, its `filename`.

An example of the `parts` data for a multipart message looks like this:

```json
{
  "0,0": {
    "content_type": "text/plain",
    "content_transfer_encoding": "7bit"
  },
  "0,1": {
    "content_type": "text/html",
    "content_transfer_encoding": "7bit"
  },
  "1": {
    "content_type": "text/plain",
    "filename": "Text attachment content.txt",
    "content_transfer_encoding": "base64"
  }
}
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
