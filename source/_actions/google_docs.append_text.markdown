---
title: "Append text to Google document"
action: google_docs.append_text
domain: google_docs
description: "Appends text to a Google Docs document."
related_actions:
  - google_docs.get_text
---

Use this action to append text to the Google document created when you set up the integration. This is handy for storing messages or a text log from Home Assistant.

{% include actions/ui_header.md %}

To append text from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
5. From the search box, search for Google Docs and select **Append text**.
6. Under **Document**, select the document you want to add to.
7. Set the **Text** to append.
8. Select **Save**.

This action does not support targets. You select the document through the **Document** field instead of choosing an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Document:
  description: The Google Docs document to add to.
  required: true
Text:
  description: The text to append. Include a newline to separate consecutive entries.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `google_docs.append_text`. Replace `YOUR_GOOGLE_DOCS_ENTRY_ID` with the entry ID shown when you select your document in the visual editor and switch the action to YAML.

{% example %}
action: |
  action: google_docs.append_text
  data:
    text: |
      The washing machine finished.
    config_entry: YOUR_GOOGLE_DOCS_ENTRY_ID
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry:
  description: The Google Docs document to add to.
  required: true
  type: string
text:
  description: The text to append. Include a newline to separate consecutive entries.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- Text is appended to the first document tab exactly as supplied. No timestamp, separator, or newline is added automatically.
- The basic YAML example includes a trailing newline, so consecutive calls produce separate lines.
- Home Assistant trims whitespace from [template results](/docs/templating/yaml/). To preserve a trailing newline in templated messages, the examples below return the entire `data` mapping and include `\n` inside the text.
- If an append request times out, check the document before repeating the action to avoid duplicate text.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: add a timestamp to a log entry

Use a template to include the time in a message. Add this action to your existing washing machine automation, then switch the action to YAML to use the example below:

- **Action**: Append text
  - **Document**: Your Google Docs document
  - **Text**: A timestamp and message, as shown below

{% details "YAML example for a timestamped log entry" %}

{% example %}
action: |
  action: google_docs.append_text
  data: >
    {{
      dict(
        config_entry='YOUR_GOOGLE_DOCS_ENTRY_ID',
        text=now().isoformat() ~ ': The washing machine finished.\n'
      )
    }}
{% endexample %}

{% enddetails %}

### Automation: log car charging data

You can store several values as text in one call. This example uses separately created {% term helpers %}, `input_number.car_charging_kwh` and `input_number.car_charging_cost`, in an existing car charging automation. Switch the action to YAML to use the example below:

- **Action**: Append text
  - **Document**: Your Google Docs document
  - **Text**: The date, energy, and cost, as shown below

{% details "YAML example for car charging data" %}

{% example %}
action: |
  action: google_docs.append_text
  data: >
    {{
      dict(
        config_entry='YOUR_GOOGLE_DOCS_ENTRY_ID',
        text='Date: ' ~ now().isoformat() ~ '\n'
          ~ 'Energy: '
          ~ (states('input_number.car_charging_kwh') | float(0))
          ~ ' kWh\n'
          ~ 'Cost: '
          ~ (states('input_number.car_charging_cost') | float(0))
          ~ '\n'
      )
    }}
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
