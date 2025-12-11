---
title: Minio
description: Integration for interacting with Minio object storage.
ha_category:
  - Utility
ha_iot_class: Cloud Push
ha_release: 0.98
ha_codeowners:
  - '@tkislan'
ha_domain: minio
ha_integration_type: integration
ha_quality_scale: legacy
---

This integration adds interaction with [Minio](https://min.io).
It also enables listening for bucket notifications: [see documentation](https://docs.min.io/docs/minio-client-complete-guide.html#watch)

To download or upload files, folders must be added to [allowlist_external_dirs](/integrations/homeassistant/#allowlist_external_dirs).

## Configuration

To enable the Minio integration in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
minio:
  host: localhost
  port: 9000
  access_key: ACCESS_KEY
  secret_key: SECRET_KEY
  secure: false
```

{% configuration %}
host:
  description: Minio server host
  required: true
  type: string
port:
  description: Minio server port
  required: true
  type: integer
access_key:
  description: Minio server access key
  required: true
  type: string
secret_key:
  description: Minio server secret key
  required: true
  type: string
secure:
  description: Whether to use HTTP or HTTPS connection
  required: true
  type: boolean
  default: false
listen:
  description: List of configurations to listen for events to
  required: false
  default: []
  type: list
  keys:
    bucket:
      description: Bucket to use
      required: true
      type: string
    prefix:
      description: What prefix to use to filter file events
      required: false
      type: string
      default: ""
    suffix:
      description: What file suffix to use to filter file events
      required: false
      type: string
      default: ".*"
    events:
      description: What file
      required: false
      type: string
      default: "s3:ObjectCreated:*"
{% endconfiguration %}

## Automations

Automations can be triggered on new files created on the Minio server using the `data_template`.

{% raw %}

```yaml
#Automatically upload new local files
automation:
- alias: "Upload camera snapshot"
  triggers:
    - trigger: event
      event_type: folder_watcher
      event_data:
        event_type: created
  actions:
    - delay: "00:00:01"
    - action: minio.put
      data:
        file_path: "{{ trigger.event.data.path }}"
        bucket: "camera-image-object-detection"
        key: "input/{{ now().year }}/{{ (now().month | string).zfill(2) }}/{{ (now().day | string).zfill(2) }}/{{ trigger.event.data.file }}"
    - delay: "00:00:01"
    - action: shell_command.remove_file
      data:
        file: "{{ trigger.event.data.path }}"

- alias: "Download new Minio file"
  triggers:
    - trigger: event
      event_type: minio

  conditions: []
  actions:
    - action: minio.get
      data:
        bucket: "{{trigger.event.data.bucket}}"
        key: "{{trigger.event.data.key}}"
        file_path: "/tmp/{{ trigger.event.data.file_name }}"
```

{% endraw %}

## Actions

These actions are provided:

- `get`
- `put`
- `remove`

### Action `minio.get`

Download file.

| Data attribute | Required | Description                        |
| ---------------------- | -------- | ---------------------------------- |
| `bucket`               | yes      | Bucket to use                      |
| `key`                  | yes      | Object key of the file             |
| `file_path`            | yes      | File path on the local file system |

### Action `minio.put`

Upload file.

| Data attribute | Required | Description                        |
| ---------------------- | -------- | ---------------------------------- |
| `bucket`               | yes      | Bucket to use                      |
| `key`                  | yes      | Object key of the file             |
| `file_path`            | yes      | File path on the local file system |

### Action `minio.remove`

Delete file.

| Data attribute | Required | Description            |
| ---------------------- | -------- | ---------------------- |
| `bucket`               | yes      | Bucket to use          |
| `key`                  | yes      | Object key of the file |
