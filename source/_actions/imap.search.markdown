---
title: Search for messages
action: imap.search
domain: imap
description: "Performs an IMAP search to retrieve UIDs of matching messages."
related_actions:
  - imap.fetch
  - imap.fetch_part
  - imap.seen
  - imap.move
  - imap.delete
---

The **Search for messages** action searches for matching email messages on your IMAP server and returns their UIDs.

This action returns its result in a response variable which you can use in later steps of the same automation or script. It is meant to run before another IMAP action, that uses the returned `uids` (for example, by repeating an action for each `uid`).

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **IMAP: Search for messages**.
6. Select the **Entry** and provide the IMAP **Search command**.
7. In the **Response variable** field, enter a name to store the data in, such as `search_results`.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Instead, you select the IMAP config entry.

### Options in the UI

{% options_ui %}
Entry:
  description: The IMAP config entry that you want to search in.
Search command:
  description: The IMAP search command used to find matching messages.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `imap.search`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: imap.search
  data:
    entry: 91fadb3617c5a3ea692aeb62d92aa869
    search_command: "Unseen Undeleted"
  response_variable: search_results
{% endexample %}

This searches for all unread messages in the folder you have configured in your entry and stores the corresponding `uids` in the `search_results` response variable.

### Options in YAML

{% options_yaml %}
entry:
  description: The ID of the IMAP config entry to search in. In UI mode, you can select the entry from a list. In YAML mode, you find the entry ID.
  required: true
  type: string
search_command:
  description: The IMAP search command to be used for the search.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response contains the following fields:

- `uids`: A list of the UIDs of the messages that were found.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
