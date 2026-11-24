---
title: "Set datapoint"
action: myuplink.set_datapoint
domain: myuplink
description: "Sets a datapoint on a myUplink appliance."
---

Use this action to set a datapoint on a myUplink heatpump. The action allows setting arbitrary datapoints where the metadata from the API is wrong or incomplete. The exact format for such datapoints is not documented by myUplink but the arguments can often be deduced from a diagnostic download from the device page.

As this action can change operations parameters on the heatpump without a clear visual feedback in the UI, the action is reserved for administrators only.

{% include actions/ui_header.md %}

To set a datapoint value from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for the action **myuplink: Set datapoint** and select it.
6. Select the appliance in the **Device** field and enter the **Datapoint ID** and the **Value**.
7. Select **Save**.

## Options in the UI

{% options_ui %}
Device:
  description: The myuplink appliance to set the datapoint on.
Datapoint ID:
  description: The ID of the datapoint to set. To find the ID, fetch a diagnostics download and find the appropriate datapoint_id.
Value:
  description: The desired value. Most often represented by a numeric value. Allowed values can be deduced from a diagnostic download.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `myuplink.set_datapoint`. A basic example looks like this:

{% example %}
action: |
  action: myuplink.set_datapoint
  data:
    device_id: abcde1234567890abcde1234567890ab
    datapoint_id: 80000
    value: 0
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: The ID of the myuplink appliance to set the datapoint on.
  required: true
  type: string
datapoint_id:
  description: The ID of the datapoint to set. To find the ID, fetch a diagnostics download and find the appropriate datapoint_id.
  required: true
  type: integer
value:
  description: The desired value. Most often represented by a numeric value. Allowed values can be deduced from a diagnostic download.
  required: true
  type: string
{% endoptions_yaml %}

This action does not support targets. Select the appliance through the **Device** field.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
