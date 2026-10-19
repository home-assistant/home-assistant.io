---
title: "Upload files"
action: onedrive.upload
domain: onedrive
description: "Uploads one or more files to OneDrive."
related_actions:
  - onedrive.delete
---

Use this action to upload one or more files from Home Assistant to your OneDrive, for example to keep a copy of your camera snapshots.

Files are uploaded into the application folder that the integration has access to (`Apps/Home Assistant`, sometimes shown as `Apps/Graph`). The destination folder is created if it does not exist yet.

{% include actions/ui_header.md %}

To upload files from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **OneDrive: Upload files**.
6. Select the OneDrive **Config entry** to upload to, enter the **Filenames** to upload, and the **Destination folder**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config entry ID:
  description: The OneDrive to upload the files to.
  required: true
Filenames:
  description: One or more paths to the files you want to upload.
  required: true
Destination folder:
  description: The folder inside the application folder to upload the files to. It is created if it does not exist.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `onedrive.upload`. A basic example looks like this:

{% example %}
action: |
  action: onedrive.upload
  data:
    config_entry_id: a1bee602deade2b09bc522749bbce48e
    filename: /media/image.jpg
    destination_folder: Snapshots/2025
{% endexample %}

This uploads a single file to the `Snapshots/2025` folder.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The OneDrive to upload the files to.
  required: true
  type: string
filename:
  description: >
    One or more paths to the files you want to upload. The path must be in
    the `allowlist_external_dirs` of your `homeassistant:` configuration.
    Wildcards (glob patterns) are supported, so you can upload several files
    at once. When you use a wildcard, the folder part before the first
    wildcard must be in `allowlist_external_dirs`.
  required: true
  type: [string, list]
destination_folder:
  description: >
    The folder inside the application folder to upload the files to.
    Subfolders are supported, and the folder is created if it does not
    exist. Folder names must comply with [OneDrive naming restrictions](https://support.microsoft.com/en-us/office/restrictions-and-limitations-in-onedrive-and-sharepoint-64883a5d-228e-48f5-b3d2-eb39e07630fa) (for example, they cannot contain `"`, `*`, `:`, `<`, `>`, `?`, `/`, `\`, or `|`).
  required: true
  type: string
{% endoptions_yaml %}

## Response data

When you provide a response variable, the action returns a `files` list. Each entry describes one uploaded file, with the metadata that OneDrive returns for it, such as its ID, name, and size.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Upload multiple files

You can upload several files at once by passing a list of paths.

{% details "Upload multiple files" %}

{% example %}
action: |
  action: onedrive.upload
  data:
    config_entry_id: a1bee602deade2b09bc522749bbce48e
    filename:
      - /media/image_1.jpg
      - /media/image_2.jpg
    destination_folder: Snapshots/2025
{% endexample %}

{% enddetails %}

### Upload files using wildcards

The `filename` option supports wildcards (glob patterns), so you can upload several files without listing each one:

- `*` matches any number of characters within a single folder level. For example, `/media/snapshots/*.jpg` uploads every JPG file in the `snapshots` folder.
- `**` matches folders recursively. For example, `/media/snapshots/**/*.jpg` uploads every JPG file in the `snapshots` folder and all of its subfolders.
- `?` matches a single character.
- `[` starts a character range, such as `[0-9]`.

When a wildcard matches files in subfolders, those subfolders are recreated inside the `destination_folder` on OneDrive, preserving the original structure.

If a wildcard pattern does not match any files, the action fails with an error listing the patterns that had no matches. The characters `*`, `?`, and `[` are always treated as wildcards.

{% details "Upload files using a wildcard" %}

{% example %}
action: |
  action: onedrive.upload
  data:
    config_entry_id: a1bee602deade2b09bc522749bbce48e
    filename: /media/snapshots/**/*.jpg
    destination_folder: Snapshots/2025
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
