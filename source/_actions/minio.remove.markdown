---
title: "Remove"
action: minio.remove
domain: minio
description: "Deletes a file from a MinIO bucket."
related_actions:
  - minio.get
  - minio.put
---

The **Remove** action deletes an object from a MinIO bucket.

This is useful for cleaning up files you no longer need, for example removing an old snapshot after you have processed it.

{% include actions/ui_header.md %}

To delete a file from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Minio: Remove**.
6. Enter the **Bucket** and the **Key** of the object to delete.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Bucket:
  description: The name of the bucket to delete from.
  required: true
Key:
  description: The object key of the file to delete.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `minio.remove`. A basic example looks like this:

{% example %}
action: |
  action: minio.remove
  data:
    bucket: "camera-files"
    key: "front_camera/snapshot.jpg"
{% endexample %}

This deletes the object with the given key from the bucket.

### Options in YAML

{% options_yaml %}
bucket:
  description: >
    The name of the bucket to delete from.
  required: true
  type: string
key:
  description: >
    The object key of the file to delete.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: remove a snapshot after a week

Once a day, delete last week's snapshot from the bucket to keep storage tidy.

- **Trigger**: A daily time trigger
- **Action**: Minio: Remove

{% details "YAML example for removing an old snapshot" %}

{% example %}
automation: |
  alias: "Clean up old MinIO snapshot"
  triggers:
    - trigger: time
      at: "03:00:00"
  actions:
    - action: minio.remove
      data:
        bucket: "camera-files"
        key: "front_door/snapshot.jpg"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
