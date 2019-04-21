---
layout: page
title: "Minio"
description: "Component for interacting with Minio object storage."
date: 2019-04-21 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: System Monitor
ha_iot_class: Cloud Push
ha_release: 0.92
ha_qa_scale: internal
---

This component adds interaction with [Minio](https://min.io).
Also enables to listen for bucket notifications: [watch docs](https://docs.min.io/docs/minio-client-complete-guide.html#watch)

To download or upload files, folders must be added to [whitelist_external_dirs](/docs/configuration/basic/).

## {% linkable_title Configuration %}

To enable the Minio component in your installation, add the following to your `configuration.yaml` file:

{% raw %}
```yaml
minio:
  host: localhost
  port: 9000
  access_key: SO9KNO6YT9OGE39PQCZW
  secret_key: EzH5iGs3qbJr1MwIMf2AUyfqzewgd2qgrk9+i+vU
  secure: false
  listen:
    - bucket: test
```
{% endraw %}

{% configuration %}
host:
  description: Minio server host
  required: true
  type: string
port:
  description: Minio server port
  required: true
  type: number
access_key:
  description: Minio server access key
  required: true
  type: string
secret_key:
  description: Minio server secret key
  required: true
  type: string
secure:
  description: Whether to use http or https connection
  required: true
  type: boolean
listen:
  description: List of configurations to listen for events to
  required: false
  default: "*"
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
      default: ''
    suffix:
      description: What file suffix to use to filter file events
      required: false
      type: string
      default: '.*'
    events:
      description: What file
      required: false
      type: string
      default: 's3:ObjectCreated:*'
{% endconfiguration %}

## Automations

Automations can be triggered on new files created on the Minio server using the `data_template`.

{% raw %}
```yaml
#Automatically upload new local files
automation:
- alias: Upload camera snapshot
  trigger:
    platform: event
    event_type: folder_watcher
    event_data:
      event_type: created
  action:
    - delay: '00:00:01'
    - service: minio.put
      data_template:
        file_path: "{{ trigger.event.data.path }}"
        bucket: "camera-image-object-detection"
        key: "input/{{ now().year }}/{{ (now().month | string).zfill(2) }}/{{ (now().day | string).zfill(2) }}/{{ trigger.event.data.file }}"
    - delay: '00:00:01'
    - service: shell_command.remove_file
      data_template:
        file: "{{ trigger.event.data.path }}"

- alias: Download new Minio file
  trigger:
  - platform: event
    event_type: minio
    
  condition: []
  action:
  - service: minio.get
    data_template:
      bucket: "{{trigger.event.data.bucket}}"
      key: "{{trigger.event.data.key}}"
      file_path: "/tmp/{{ trigger.event.data.file_name }}"
```
{% endraw %}

## {% linkable_title Platform Services %}

These services are provided:

- `get`
- `put`
- `remove`

### {% linkable_title Service `minio.get` %}

Download file.

| Service data attribute    | Required | Description                                       |
|---------------------------|----------|---------------------------------------------------|
| `bucket`                  |      yes | Bucket to use                                     |
| `key`                     |      yes | Object key of the file                            |
| `file_path`               |      yes | File path on the local file system                |

### {% linkable_title Service `minio.put` %}

Upload file.

| Service data attribute    | Required | Description                                       |
|---------------------------|----------|---------------------------------------------------|
| `bucket`                  |      yes | Bucket to use                                     |
| `key`                     |      yes | Object key of the file                            |
| `file_path`               |      yes | File path on the local file system                |

### {% linkable_title Service `minio.remove` %}

Delete file.

| Service data attribute    | Required | Description                                       |
|---------------------------|----------|---------------------------------------------------|
| `bucket`                  |      yes | Bucket to use                                     |
| `key`                     |      yes | Object key of the file                            |
