---
title: NZBGet
description: Instructions on how to integrate NZBGet within Home Assistant.
ha_category:
  - Downloading
logo: nzbget.png
ha_iot_class: Local Polling
ha_release: 0.17
ha_codeowners:
  - '@chriscla'
ha_domain: nzbget
---

The `nzbget` platform will allow you to monitor and control your downloads with [NZBGet](https://nzbget.net/) from within Home Assistant and setup automation based on the information.

## Configuration

To enable this component, add the following to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
nzbget:
  host: YOUR_NZBGET_HOST
  username: YOUR_NZBGET_USERNAME
  password: YOUR_NZBGET_PASSWORD
```

{% configuration %}
host:
  required: true
  type: string
  description: IP address where your NZBGet installation is running.
port:
  required: false
  type: integer
  description: The port of your NZBGet installation.
  default: 6789
ssl:
  required: false
  type: boolean
  description: Whether or not to use SSL to access NZBGet.
  default: false
name:
  required: false
  type: string
  description: The prefix to use for your sensor.
  default: NZBGet
username:
  required: false
  type: string
  description: The username to access your NZBGet installation.
password:
  required: false
  type: string
  description: The password to access your NZBGet installation.
{% endconfiguration %}

## Sensor

This component will create these sensors:

- `nzbget_article_cache`: Article cache size in MB.
- `nzbget_average_speed`: Average download rate since server start in MB/s.
- `nzbget_download_paused`: Whether downloading is paused.
- `nzbget_speed`: Current download rate in MB/s.
- `nzbget_queue_size`: Remaining size to download in MB.
- `nzbget_disk_free`: Free disk space at the storage location of NZBGet.
- `nzbget_post_processing_jobs`: Number of Par-Jobs or Post-processing script jobs in the post-processing queue.
- `nzbget_post_processing_paused`: Whether post processing is paused.
- `nzbget_uptime`: NZBGet server uptime.
- `nzbget_size`: Amount of data downloaded since server start in MB.

## Event Automation

The NZBGet integration continuously monitors nzbget's download history. When a download completes, an event usable for automation is triggered on the Home Assistant Bus.

Possible events are:

- `nzbget_download_complete`

The event includes the name, category, and status of the downloaded nzb.

Example automation to send a Telegram message on a completed download:
{% raw %}

```yaml
- alias: Completed Torrent
  trigger:
    platform: event
    event_type: nzbget_download_complete
  - event_data:
    category: tv
  action:
    service: notify.telegram_notifier
    data_template:
      title: "Download completed!"
      message: "{{trigger.event.data.name}}"
```

{% endraw %}

## Services

Available services:

- `pause`: Pause the download queue.
- `resume`: Resume the download queue.
- `set_speed`: Set the download queue speed limit.

### Service `nzbget/set_speed`

| Service data attribute | Optional | Description |
|------------------------|----------|-------------------------------------------------------------------------------------------------|
| `speed`                |      yes | Sets the download speed limit, specified in Kb/s. 0 disables the speed limit. Defaults to 1000. |
