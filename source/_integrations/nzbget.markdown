---
title: NZBGet
description: Instructions on how to integrate NZBGet within Home Assistant.
ha_category:
  - Downloading
ha_iot_class: Local Polling
ha_release: 0.17
ha_config_flow: true
ha_codeowners:
  - '@chriscla'
ha_domain: nzbget
ha_platforms:
  - sensor
  - switch
ha_integration_type: integration
---

The NZBGet integration allows you to monitor and control your downloads with [NZBGet](https://nzbget.net/) from within Home Assistant. It also allows you to setup automation based on the information.

{% include integrations/config_flow.md %}

## Sensor

This integration will create these sensors:

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
- `nzbget_speed_limit`: Download queue speed limit in MB/s.

## Event automation

The NZBGet integration continuously monitors nzbget's download history. When a download completes, an event usable for automation is triggered on the Home Assistant Bus.

Possible events are:

- `nzbget_download_complete`

The event includes the name, category, and status of the downloaded nzb.

Example automation to send a Telegram message on a completed download:

{% raw %}

```yaml
- alias: "Completed Torrent"
  triggers:
    - trigger: event
      event_type: nzbget_download_complete
      event_data:
        category: tv
  actions:
    - action: notify.telegram_notifier
      data:
        title: "Download completed!"
        message: "{{trigger.event.data.name}}"
```

{% endraw %}

## Actions

Available actions:

- `pause`: Pause the download queue.
- `resume`: Resume the download queue.
- `set_speed`: Set the download queue speed limit.

### Action `nzbget/set_speed`

| Data attribute | Optional | Description                                                                                     |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------- |
| `speed`                | yes      | Sets the download speed limit, specified in Kb/s. 0 disables the speed limit. Defaults to 1000. |
