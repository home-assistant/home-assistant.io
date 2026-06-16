---
title: "Get disk space"
action: sonarr.get_diskspace
domain: sonarr
description: "Retrieves the disk space information for all storage locations configured in Sonarr."
related_actions:
  - sonarr.get_series
  - sonarr.get_queue
---

Use this action to retrieve the disk space information for all storage locations configured in Sonarr.

This action returns its result in a response variable, which you can use in later steps of the same automation or script, for example to warn yourself when free space runs low.

{% include actions/ui_header.md %}

To get the disk space information from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Sonarr: Get disk space**.
6. Select the **Sonarr entry** to query and optionally a **Space unit**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Sonarr entry:
  description: The Sonarr config entry to query.
  required: true
Space unit:
  description: The unit for the space values. Use binary units such as KiB, MiB, GiB, TiB, or PiB for 1024-based values, or decimal units such as KB, MB, GB, TB, or PB for 1000-based values. The default is bytes.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sonarr.get_diskspace`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: sonarr.get_diskspace
  data:
    entry_id: "01234567890abcdef1234567890abcde"
    space_unit: GB
  response_variable: disk_data
{% endexample %}

This fetches the disk space information, with the values expressed in gigabytes.

### Options in YAML

{% options_yaml %}
entry_id:
  description: The Sonarr config entry to query.
  required: true
  type: string
space_unit:
  description: >
    The unit for the space values. Accepted values are bytes, KB, KiB, MB,
    MiB, GB, GiB, TB, TiB, PB, and PiB.
  required: false
  default: bytes
  type: string
{% endoptions_yaml %}

## Response data

The response contains a `disks` key with a mapping of disk information keyed by path. Each disk includes the following fields:

- `path`: The storage path.
- `label`: The disk label, if available.
- `free_space`: Free space in the selected unit.
- `total_space`: Total space in the selected unit.
- `unit`: The unit used for the space values.
- `usage_percent`: Percentage of disk space used.

A shortened example of the response looks like this:

```yaml
disks:
  "/mnt/media":
    path: "/mnt/media"
    label: "Media Storage"
    free_space: 1862.65
    total_space: 3725.29
    unit: "GB"
    usage_percent: 50.0
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
