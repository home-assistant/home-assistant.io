---
title: "Upload"
action: google_photos.upload
domain: google_photos
description: "Uploads one or more photos or videos from Home Assistant to Google Photos."
---

Use this action to upload photos or videos from the machine running Home Assistant to your Google Photos library. You can upload a single file or several at once, and place them in an album you choose. This is handy for automatically backing up camera snapshots or sharing media to a Google Photos album.

## Prerequisites

Before using this action, make sure the file paths you upload are added to [`allowlist_external_dirs`](/integrations/homeassistant/#allowlist_external_dirs). Without this, Home Assistant cannot read the files and the action returns an error.

Each file must be an image or a video, and there is a maximum file size. If a file is too large, is not an image or video, or does not exist, the action returns an error.

{% include actions/ui_header.md %}

To upload media from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Google Photos: Upload**.
6. Select the **Google Photos entry** to upload to. This is the Google Photos account you set up in Home Assistant. If you added more than one account, pick the one you want.
7. Enter the **Filename** of the file to upload, and the **Album** to upload it to.
8. In the **Response variable** field, enter a name to store the data in, such as `upload`.
9. Select **Save**.```

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Google Photos entry:
  description: The Google Photos account to upload to. This is the account you set up in Home Assistant. If you added more than one account, pick the one you want.
  required: true
Filename:
  description: The full path to the file to upload. The path must be allowed in `allowlist_external_dirs`. You can provide a single path or a list of paths to upload several files at once.
  required: true
Album:
  description: The name of the album to upload the files to.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `google_photos.upload`. A basic example looks like this:

{% example %}
action: |
  action: google_photos.upload
  data:
    config_entry_id: a1bee602deade2b09bc522749bbce48e
    filename: /config/www/images/snapshot.jpg
    album: Home Assistant
  response_variable: upload
{% endexample %}

This uploads a single image to the **Home Assistant** album.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The ID of the Google Photos config entry to upload to. This is the
    account you set up in Home Assistant.
  required: true
  type: string
filename:
  description: >
    The full path to the file to upload. The path must be allowed in
    `allowlist_external_dirs`. You can provide a single path or a list of
    paths to upload several files at once.
  required: true
  type: [string, list]
album:
  description: The name of the album to upload the files to.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

This action can return a response with the uploaded media. To use it, store the result in a response variable.

The response contains the following fields:

- `media_items`: A list of the uploaded items, each with a `media_item_id` that identifies it in Google Photos.
- `album_id`: The ID of the album the files were uploaded to.

A shortened example of the response looks like this:

```yaml
media_items:
  - media_item_id: AGj1epU-abc123
  - media_item_id: AGj1epU-def456
album_id: AHfP9hco-xyz789
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
