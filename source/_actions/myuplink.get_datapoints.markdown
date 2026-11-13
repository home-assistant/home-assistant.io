---
title: "Get datapoints"
action: myuplink.get_datapoints
domain: myuplink
description: "Gets datapoints from a myUplink appliance."
---

Use this action to get a list of datapoints fromn a myUplink heatpump. The action allows getting arbitrary datapoints that are available in the API output irrespective of being filtered out by the integration or not. The exact format for such datapoints is not documented by myUplink but the meaning of keys and values can often be deduced from the output of the action.

This action does not change any settings on the heatpump.

{% include actions/ui_header.md %}

To get a list of datapoints from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for the action **myuplink: Get datapoints** and select it.
6. Select the appliance in the **Device** field and add one or more **Datapoint IDs**.
7. In the **Response variable** field, enter a name to store the data in, such as `datapoints`.
8. Select **Save**.

## Options in the UI

{% options_ui %}
Device:
  description: The myuplink appliance to set the datapoint on.
Datapoints:
  description: A list of the datapoints to get. To find the ID, fetch a diagnostics download and find the appropriate datapoint_id.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `myuplink.get_datapoints`. A basic example looks like this:

{% example %}
action: |
  action: myuplink.get_datapoints
  data:
    device_id: abcde1234567890abcde1234567890ab
    datapoints:
      - datapoint_id: 80000
      - datapoint_id: 80001
  response_variable: datapoints
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: The ID of the myuplink appliance to get the datapoints from.
  required: true
  type: string
datapoints:
  description: The list of the datapoints to get. To find the ID, fetch a diagnostics download and find the appropriate datapoint_id.
  required: true
  type: list
{% endoptions_yaml %}

This action does not support targets. Select the appliance through the **Device** field.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
