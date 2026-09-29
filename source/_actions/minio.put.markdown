---
title: "Put file"
action: minio.put
domain: minio
description: "Uploads a file from the local file system to a MinIO bucket."
related_actions:
  - minio.get
  - minio.remove
---

The **Put** action uploads a file from the local file system to a MinIO bucket.

This is useful when you want to store a file in MinIO, for example to keep a camera snapshot or a generated report in object storage.

{% include actions/ui_header.md %}

### Prerequisites

- The file path must be added to [`allowlist_external_dirs`](/integrations/homeassistant/#allowlist_external_dirs) in {% term "`configuration.yaml`" %}.

To upload a file from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Minio: Put**.
6. Enter the **Bucket**, the **Key** to store the object under, and the **File path** of the local file.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Bucket:
  description: The name of the bucket to upload to.
  required: true
Key:
  description: The object key to store the file under in the bucket.
  required: true
File path:
  description: The path of the file on the local file system to upload.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `minio.put`. A basic example looks like this:

{% example %}
action: |
  action: minio.put
  data:
    bucket: "camera-files"
    key: "front_camera/snapshot.jpg"
    file_path: "/data/camera_files/snapshot.jpg"
{% endexample %}

This uploads the local file to the bucket under the given key.

### Options in YAML

{% options_yaml %}
bucket:
  description: >
    The name of the bucket to upload to.
  required: true
  type: string
key:
  description: >
    The object key to store the file under in the bucket.
  required: true
  type: string
file_path:
  description: >
    The path of the file on the local file system to upload.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: upload a camera snapshot to MinIO

When motion is detected, take a snapshot and upload it to a MinIO bucket for storage.

- **Trigger**: A motion sensor turns on
- **Action**: Camera: Take snapshot, followed by Minio: Put

{% details "YAML example for uploading a snapshot" %}

{% example %}
automation: |
  alias: "Store snapshot in MinIO"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door_motion
      to: "on"
  actions:
    - action: camera.snapshot
      target:
        entity_id: camera.front_door
      data:
        filename: "/data/camera_files/snapshot.jpg"
    - action: minio.put
      data:
        bucket: "camera-files"
        key: "front_door/snapshot.jpg"
        file_path: "/data/camera_files/snapshot.jpg"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
