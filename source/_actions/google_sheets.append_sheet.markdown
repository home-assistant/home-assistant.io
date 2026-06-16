---
title: "Append sheet"
action: google_sheets.append_sheet
domain: google_sheets
description: "Adds rows of data to a Google Sheets document."
related_actions:
  - google_sheets.get_sheet
---

Use this action to add rows of data to the Google Sheets document that was created when you set up the integration. This is handy for storing data from Home Assistant for further processing, for example logging energy usage over time.

{% include actions/ui_header.md %}

To append data from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Google Sheets: Append sheet**.
6. Select the **Config entry** for the document you want to add to.
7. Optionally, set the **Worksheet** and whether to add a **Created** column.
8. Set the **Data** to append.
9. Select **Save**.

This action does not support targets. You select the document through the **Config entry** field instead of choosing an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config entry:
  description: The Google Sheets document to add to.
  required: true
Worksheet:
  description: The name of the worksheet. Defaults to the first worksheet in the document.
  required: false
Add created column:
  description: "Whether to add a `created` column with the date and time to the appended data."
  required: false
Data:
  description: The data to append to the worksheet. Each value is placed on a new row, one value per column.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `google_sheets.append_sheet`. A basic example looks like this:

{% example %}
action: |
  action: google_sheets.append_sheet
  data:
    config_entry: 1b4a46c6cba0677bbfb5a8c53e8618b0
    worksheet: "Car Charging"
    add_created_column: false
    data:
      Date: "{{ now().strftime('%-d-%b-%y') }}"
      KWh: "{{ states('input_number.car_charging_kwh') | float(0) }}"
      Cost: "{{ states('input_number.car_charging_cost') | float(0) }}"
{% endexample %}

This appends a single row with the date, energy, and cost.

### Options in YAML

{% options_yaml %}
config_entry:
  description: The Google Sheets document to add to.
  required: true
  type: string
worksheet:
  description: The name of the worksheet. Defaults to the first worksheet in the document.
  required: false
  type: string
add_created_column:
  description: "Whether to add a `created` column with the date and time to the appended data."
  required: false
  type: boolean
  default: true
data:
  description: The data to append to the worksheet. Each value is placed on a new row, one value per column.
  required: true
  type: map
{% endoptions_yaml %}

{% include actions/try_it.md %}

### Automation: append multiple rows at once

You can append more than one row in a single call by passing a list of mappings as the data.

{% details "YAML example for appending multiple rows" %}

{% example %}
action: |
  action: google_sheets.append_sheet
  data:
    config_entry: 1b4a46c6cba0677bbfb5a8c53e8618b0
    worksheet: "Car Charging"
    data:
      - Item: "Car 1 cost"
        Cost: "{{ states('input_number.car_1_charging_cost') | float(0) }}"
      - Item: "Car 2 cost"
        Cost: "{{ states('input_number.car_2_charging_cost') | float(0) }}"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
