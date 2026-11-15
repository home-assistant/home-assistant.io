---
title: "Upload files"
action: webdav.upload
domain: webdav
response: optional
description: "Uploads one or more files to a WebDAV server."
---

Use this action to upload one or more files from Home Assistant to your WebDAV server, for example to keep a copy of your camera snapshots.

The destination folder is relative to the URL you configured for the integration, not to the backup path. It is created if it does not exist yet. Files that already exist at the destination are overwritten.

Home Assistant can only upload files from folders it is allowed to read. If a file is outside these folders, add its folder to [`allowlist_external_dirs`](/integrations/homeassistant/#allowlist_external_dirs) in your `configuration.yaml` file.

{% include actions/ui_header.md %}

To upload files from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **WebDAV: Upload files**.
6. Select the WebDAV **Config entry** to upload to, enter the **Filenames** to upload, and the **Destination folder**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config entry ID:
  description: The WebDAV server to upload the files to.
  required: true
Filenames:
  description: One or more paths to the files you want to upload.
  required: true
Destination folder:
  description: The folder on the WebDAV server, relative to the configured URL, to upload the files to. It is created if it does not exist.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `webdav.upload`. A basic example looks like this:

{% example %}
action: |
  action: webdav.upload
  data:
    config_entry_id: a1bee602deade2b09bc522749bbce48e
    filename: /media/image.jpg
    destination_folder: Snapshots/2025
{% endexample %}

This uploads a single file to the `Snapshots/2025` folder on your WebDAV server.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The WebDAV server to upload the files to.
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
    The folder on the WebDAV server to upload the files to, relative to the
    URL configured for the integration. Subfolders are supported, and the
    folder is created if it does not exist. Use `/` to upload to the root.
    The path cannot contain `..`.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

{% include actions/response.md %}

When you provide a response variable, the action returns a `files` list. Each entry has a `path` with the full path of the uploaded file on the WebDAV server.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Upload multiple files

You can upload several files at once by passing a list of paths.

{% details "Upload multiple files" %}

{% example %}
action: |
  action: webdav.upload
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

When a wildcard matches files in subfolders, those subfolders are recreated inside the `destination_folder` on the WebDAV server, preserving the original structure.

If a wildcard pattern does not match any files, the action fails with an error listing the patterns that had no matches. The characters `*`, `?`, and `[` are treated as wildcards, unless a file with that exact name exists. In that case, the file is uploaded as is.

{% details "Upload files using a wildcard" %}

{% example %}
action: |
  action: webdav.upload
  data:
    config_entry_id: a1bee602deade2b09bc522749bbce48e
    filename: /media/snapshots/**/*.jpg
    destination_folder: Snapshots/2025
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
