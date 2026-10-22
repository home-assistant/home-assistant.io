---
title: "Get text from Google document"
action: google_docs.get_text
domain: google_docs
description: "Retrieves plain text from a Google Docs document."
related_actions:
  - google_docs.append_text
---

Use this action to retrieve text from a Google document, for example, to read back messages you stored earlier. This action returns [response data](/docs/automation/action/#action-response-data) that you can use in the rest of your automation or script.

{% include actions/ui_header.md %}

To get text from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for Google Docs and select **Get text**.
6. Under **Document**, select the document you want to read from.
7. In the **Response variable** field, enter a name to store the data in, such as `document`.
8. Select **Save**.

This action does not support targets. You select the document through the **Document** field instead of choosing an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Document:
  description: The Google Docs document to read from.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `google_docs.get_text`. Replace `YOUR_GOOGLE_DOCS_ENTRY_ID` with the entry ID shown when you select your document in the visual editor and switch the action to YAML.

{% example %}
action: |
  action: google_docs.get_text
  data:
    config_entry: YOUR_GOOGLE_DOCS_ENTRY_ID
  response_variable: document
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry:
  description: The Google Docs document to read from.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The action returns the document ID, title, and plain text:

```yaml
document_id: "GOOGLE_DOCUMENT_ID"
title: "Home Assistant"
text: "The washing machine finished."
```

## Good to know

- Only the first document tab is read. Text in paragraphs, tables, and tables of contents is included. Formatting, images, headers, footers, and footnotes are not returned.
- Google's mandatory final newline is removed. Other newlines are preserved.
- In automations and scripts, a response variable is required. Access the text with {% raw %}`{{ document.text }}`{% endraw %} and the title with {% raw %}`{{ document.title }}`{% endraw %}.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: use document text in later actions

This script reads the document and stores its text in a variable for use in later actions:

- **Action**: Get text
  - **Document**: Your Google Docs document
  - **Response variable**: `document`
- **Action**: Define variables
  - **Variable**: `current_text`, set to the document text

{% details "YAML example for reading stored text" %}

{% example %}
script: |
  sequence:
    - action: google_docs.get_text
      data:
        config_entry: YOUR_GOOGLE_DOCS_ENTRY_ID
      response_variable: document
    - variables:
        current_text: "{{ document.text }}"
{% endexample %}

{% enddetails %}

### Automation: read back an appended message

This script appends a log entry and reads the updated text into `document`:

- **Action**: Append text
  - **Document**: Your Google Docs document
  - **Text**: A timestamp and message, as shown below
- **Action**: Get text
  - **Document**: The same Google Docs document
  - **Response variable**: `document`

{% details "YAML example for appending and reading text" %}

{% example %}
script: |
  sequence:
    - action: google_docs.append_text
      data:
        config_entry: YOUR_GOOGLE_DOCS_ENTRY_ID
        text: |
          {{ now().isoformat() }}: The washing machine finished.
    - action: google_docs.get_text
      data:
        config_entry: YOUR_GOOGLE_DOCS_ENTRY_ID
      response_variable: document
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
