---
title: "Get sheet"
action: google_sheets.get_sheet
domain: google_sheets
description: "Retrieves rows of data from a Google Sheets document."
related_actions:
  - google_sheets.append_sheet
---

Use this action to retrieve rows of data from a Google Sheets document, for example, to read back values you stored earlier. This action returns [response data](/docs/scripts/perform-actions/#use-templates-to-handle-response-data) that you can use in the rest of your automation or script.

{% include actions/ui_header.md %}

To get data from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Google Sheets: Get sheet**.
6. Select the **Config entry** for the document you want to read from.
7. Optionally, set the **Worksheet**.
8. Set the number of **Rows** to return.
9. Select **Save**.

This action does not support targets. You select the document through the **Config entry** field instead of choosing an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config entry:
  description: The Google Sheets document to read from.
  required: true
Worksheet:
  description: The name of the worksheet. Defaults to the first worksheet in the document.
  required: false
Rows:
  description: The number of rows to return, counted from the end of the worksheet.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `google_sheets.get_sheet`. A basic example looks like this:

{% example %}
action: |
  action: google_sheets.get_sheet
  data:
    config_entry: 1b4a46c6cba0677bbfb5a8c53e8618b0
    worksheet: "Car Charging"
    rows: 2
  response_variable: sheet_data
{% endexample %}

This returns the last two rows from the `Car Charging` worksheet.

### Options in YAML

{% options_yaml %}
config_entry:
  description: The Google Sheets document to read from.
  required: true
  type: string
worksheet:
  description: The name of the worksheet. Defaults to the first worksheet in the document.
  required: false
  type: string
rows:
  description: The number of rows to return, counted from the end of the worksheet.
  required: true
  type: integer
{% endoptions_yaml %}

## Response data

The action returns a `range` with the requested rows. Each row is a list of cell values.

```yaml
range:
  - - 04/07/2024
    - 9 Kw
  - - 05/07/2024
    - 8 Kw
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
