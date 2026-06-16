---
title: "Read file"
action: file.read_file
domain: file
description: "Reads a file and returns its contents in a response."
---

Use this action to read a JSON or YAML file and return its parsed contents in a response variable, for example to load data saved by another automation or an external program.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

### Prerequisites

- You need administrator rights to run this action.
- The file path must be added to [`allowlist_external_dirs`](/integrations/homeassistant/#allowlist_external_dirs) in {% term "`configuration.yaml`" %}.

To read a file from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **File: Read file**.
6. Enter the **File name** and select the **File encoding** that matches your file.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
File name:
  description: Name of the file to read. The path must be in your list of allowed external directories.
  required: true
File encoding:
  description: Encoding of the file. Choose JSON or YAML.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `file.read_file`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: file.read_file
  data:
    file_name: "/config/www/myfile.json"
    file_encoding: JSON
  response_variable: file_content
{% endexample %}
This reads `myfile.json` and stores the response in the `file_content` variable. The parsed file contents are in `file_content.data`.
### Options in YAML

{% options_yaml %}
file_name:
  description: Name of the file to read. The path must be in your list of allowed external directories.
  required: true
  type: string
file_encoding:
  description: Encoding of the file. Choose JSON or YAML.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The action returns a `data` field that holds the parsed contents of the file. For example, reading a file with this JSON content:

```json
{
  "latitude": 32.87336,
  "longitude": -117.22743,
  "gps_accuracy": 1.2
}
```

returns the following response:

```yaml
data:
  latitude: 32.87336
  longitude: -117.22743
  gps_accuracy: 1.2
```


{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
