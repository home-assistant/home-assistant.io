---
title: "Get file"
action: minio.get
domain: minio
description: "Downloads a file from a MinIO bucket to the local file system."
related_actions:
  - minio.put
  - minio.remove
---

The **Get** action downloads an object from a MinIO bucket and saves it to a file on the local file system.

This is useful when another part of your setup needs a file that is stored in MinIO, for example to retrieve a camera snapshot or a backup that was uploaded earlier.

{% include actions/ui_header.md %}

### Prerequisites

- The file path must be added to [`allowlist_external_dirs`](/integrations/homeassistant/#allowlist_external_dirs) in {% term "`configuration.yaml`" %}.

To download a file from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Minio: Get**.
6. Enter the **Bucket**, the **Key** of the object, and the **File path** to save it to.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Bucket:
  description: The name of the bucket to download from.
  required: true
Key:
  description: The object key of the file in the bucket.
  required: true
File path:
  description: The path on the local file system to save the file to.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `minio.get`. A basic example looks like this:

{% example %}
action: |
  action: minio.get
  data:
    bucket: "camera-files"
    key: "front_camera/snapshot.jpg"
    file_path: "/data/camera_files/snapshot.jpg"
{% endexample %}

This downloads the object to the given path on the local file system.

### Options in YAML

{% options_yaml %}
bucket:
  description: >
    The name of the bucket to download from.
  required: true
  type: string
key:
  description: >
    The object key of the file in the bucket.
  required: true
  type: string
file_path:
  description: >
    The path on the local file system to save the file to.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: download a file when it is added to a bucket

When MinIO reports that an object was created, download it to the local file system.

- **Trigger**: A MinIO bucket event for a created object
- **Action**: Minio: Get

{% details "YAML example for downloading a newly added object" %}

{% example %}
automation: |
  alias: "Download new MinIO object"
  triggers:
    - trigger: event
      event_type: minio
  actions:
    - action: minio.get
      data:
        bucket: "{{ trigger.event.data.bucket }}"
        key: "{{ trigger.event.data.key }}"
        file_path: "/tmp/{{ trigger.event.data.key | basename }}"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
