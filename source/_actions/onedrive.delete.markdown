---
title: "Delete files"
action: onedrive.delete
domain: onedrive
description: "Deletes one or more files from OneDrive."
related_actions:
  - onedrive.upload
---

Use this action to delete one or more files from the application folder that the integration has access to (`Apps/Home Assistant`, sometimes shown as `Apps/Graph`).

Whether a deleted file is moved to the Recycle Bin or permanently removed depends on the **Delete files permanently** option in the integration settings. This action removes only files, not the folders that were created during upload.

{% include actions/ui_header.md %}

To delete files from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **OneDrive: Delete files**.
6. Select the OneDrive **Config entry** to delete from, and enter the **Destination paths** to the files you want to delete.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config entry ID:
  description: The OneDrive to delete the files from.
  required: true
Destination paths:
  description: One or more paths to the files inside the application folder you want to delete.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `onedrive.delete`. A basic example looks like this:

{% example %}
action: |
  action: onedrive.delete
  data:
    config_entry_id: a1bee602deade2b09bc522749bbce48e
    destination_path: Snapshots/2025/image.jpg
{% endexample %}

This deletes a single file from the `Snapshots/2025` folder.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The OneDrive to delete the files from.
  required: true
  type: string
destination_path:
  description: >
    One or more paths to the files inside the application folder you want
    to delete. Subfolders are supported.
  required: true
  type: [string, list]
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Delete multiple files

You can delete several files at once by passing a list of paths.

{% details "Delete multiple files" %}

{% example %}
action: |
  action: onedrive.delete
  data:
    config_entry_id: a1bee602deade2b09bc522749bbce48e
    destination_path:
      - Snapshots/2025/image.jpg
      - Snapshots/2025/image2.jpg
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
