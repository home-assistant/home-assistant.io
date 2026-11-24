---
title: "Upload files"
action: webdav.upload
domain: webdav
response: optional
description: "Uploads one or more files to a WebDAV server."
---

Use this action to upload one or more files from Home Assistant to your WebDAV server, for example to keep a copy of your camera snapshots.

The destination folder is relative to the URL you configured for the integration, not to the backup path. It is created if it does not exist yet. Files that already exist at the destination are overwritten.

Home Assistant can only upload files from folders it can read. By default, these are your media folders and the `www` folder in your configuration folder. Files in the `www` folder can be opened by anyone who can reach your Home Assistant without signing in. Store private files, like camera snapshots, in a media folder. To upload files from another folder, add it to [`allowlist_external_dirs`](/integrations/homeassistant/#allowlist_external_dirs) in your `configuration.yaml` file.

{% include actions/ui_header.md %}

To upload files from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **WebDAV: Upload files**.
6. Select the WebDAV server in **Config entry ID**, enter the **Filenames** to upload, and the **Destination folder**.
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
    One or more paths to the files you want to upload. Each file must be in
    a folder that Home Assistant is allowed to read: the `www` folder in your
    configuration folder, a media folder, or a folder listed in
    `allowlist_external_dirs`. Wildcards (glob patterns) are supported, so you
    can upload several files at once. When you use a wildcard, the folder part
    before the first wildcard must be an allowed folder.
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

## Good to know

- Only administrators can run this action.
- Every file must end up at a different path on the server. If two files are uploaded to the same path, for example, two files with the same name from different folders, the action stops with an error and uploads nothing.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: upload a snapshot when motion is detected

When motion is detected at the front door, take a snapshot and upload it to your WebDAV server, so you have a copy even if Home Assistant is offline. The snapshot uses the same filename each time, so each upload replaces the previous one on the server.

- **Trigger**: State changed
  - **Entity**: Front door motion sensor
  - **To**: Detected
- **Action**: Take camera snapshot
  - **Target**: Front door camera
  - **Filename**: `/media/snapshots/front_door.jpg`
- **Action**: Upload files
  - **Config entry**: Your WebDAV server
  - **Filenames**: `/config/www/snapshots/front_door.jpg`
  - **Destination folder**: `Snapshots`

{% details "YAML example for uploading a snapshot on motion" %}

{% example %}
automation: |
  alias: "Upload a snapshot when motion is detected"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door_motion
      to: "on"
  actions:
    - action: camera.snapshot
      target:
        entity_id: camera.front_door
      data:
        filename: /config/www/snapshots/front_door.jpg
    - action: webdav.upload
      data:
        config_entry_id: a1bee602deade2b09bc522749bbce48e
        filename: /config/www/snapshots/front_door.jpg
        destination_folder: Snapshots
{% endexample %}

{% enddetails %}

### Automation: Upload all snapshots every night

Every night, upload all snapshots from the `snapshots` folder to your WebDAV server. The wildcard picks up every JPG file in the folder, so you don't need to list each file.

- **Trigger**: Time
  - **At time**: `23:00`
- **Action**: Upload files
  - **Config entry**: Your WebDAV server
  - **Filenames**: `/config/www/snapshots/*.jpg`
  - **Destination folder**: `Snapshots/Archive`

{% details "YAML example for uploading all snapshots every night" %}

{% example %}
automation: |
  alias: "Upload all snapshots every night"
  triggers:
    - trigger: time
      at: "23:00:00"
  actions:
    - action: webdav.upload
      data:
        config_entry_id: a1bee602deade2b09bc522749bbce48e
        filename: /config/www/snapshots/*.jpg
        destination_folder: Snapshots/Archive
{% endexample %}

{% enddetails %}

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
