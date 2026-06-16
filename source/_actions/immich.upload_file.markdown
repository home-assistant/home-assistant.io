---
title: "Upload file"
action: immich.upload_file
domain: immich
description: "Uploads a file to your Immich instance."
---

The **Upload file** action sends a media file, such as a photo or video, to your Immich instance. Optionally, you can place the uploaded file directly into one of your albums.

{% include actions/ui_header.md %}

To upload a file from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Immich: Upload file**.
6. Select the **Immich instance** to upload to.
7. Select the **File** to upload.
8. Optionally, enter an **Album ID** to place the file in a specific album.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Immich instance:
  description: The Immich instance to upload the file to.
  required: true
File:
  description: The media file to upload.
  required: true
Album ID:
  description: >
    The album to place the file in after uploading. To find the album ID, open
    the album in the Immich web interface. The ID is the last part of the URL,
    `https://your-immich-instance/albums/<ALBUM-ID>`.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `immich.upload_file`:

{% example %}
action: |
  action: immich.upload_file
  data:
    config_entry_id: YOUR_CONFIG_ENTRY_ID
    file:
      media_content_id: "media-source://media_source/local/photo.jpg"
      media_content_type: "image/jpeg"
    album_id: YOUR_ALBUM_ID
{% endexample %}

This uploads a local photo to the selected Immich instance and places it in the given album.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The Immich instance to upload the file to.
  required: true
  type: string
file:
  description: The media file to upload.
  required: true
  type: map
  keys:
    media_content_id:
      description: The media source URL of the file to upload.
      type: string
    media_content_type:
      description: The MIME type of the file to upload, for example `image/jpeg`.
      type: string
album_id:
  description: >
    The album to place the file in after uploading. To find the album ID, open
    the album in the Immich web interface. The ID is the last part of the URL,
    `https://your-immich-instance/albums/<ALBUM-ID>`.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Script: upload a camera snapshot

Take a snapshot of a camera entity with the [`camera.snapshot`](/actions/camera.snapshot) action, store it using a [local media](/integrations/media_source/#local-media) path, then upload it to a specific album in your Immich instance.

{% details "YAML example for uploading a camera snapshot" %}

{% example %}
script: |
  sequence:
    - variables:
        file_name: camera.yourcamera_{{ now().strftime("%Y%m%d-%H%M%S") }}.jpg
    - action: camera.snapshot
      data:
        filename: "/media/{{ file_name }}"
      target:
        entity_id: camera.yourcamera
    - action: immich.upload_file
      data:
        config_entry_id: 01JVJ0RA387MWA938VE8HGXBMJ
        file:
          media_content_id: "media-source://media_source/local/{{ file_name }}"
          media_content_type: "image/jpeg"
        album_id: f2de0ede-d7d4-4db3-afe3-7288f4e65bb1
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
