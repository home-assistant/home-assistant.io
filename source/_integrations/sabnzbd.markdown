---
title: SABnzbd
description: Instructions on how to integrate SABnzbd with Home Assistant.
ha_category:
  - Downloading
  - Sensor
ha_release: 0.7
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@shaiu'
ha_domain: sabnzbd
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `sabnzbd` integration will allow you to monitor and control your downloads with [SABnzbd](https://sabnzbd.org) from within Home Assistant and setup automations based on the information.

## Prerequisites

You need to grab your API key from your SABnzbd instance in order to configure this integration:

- Navigate to your SABnzbd.
- Click "Config", then click "General".
- Copy your API key under "Security".

{% include integrations/config_flow.md %}

## Sensor

This component will create these sensors:

- `status`: The current status of SABnzbd. (Idle, Paused, etc.)
- `speed`: The current download speed.
- `queue`: The total size of the download queue.
- `left`: The remaining size of the download queue.
- `disk`: The total disk size at SABnzbd's download location.
- `disk_free`: The available disk space at SABnzbd's download location.
- `queue_count`: The number of items in the download queue.
- `total`: Total GB downloaded.
- `daily_total`: GB downloaded today. (disabled by default)
- `weekly_size`: GB downloaded this week. (disabled by default)
- `monthly_total`: GB downloaded this month. (disabled by default)


## Services

Available services:

- `pause`: Pause the download queue.
- `resume`: Resume the download queue.
- `set_speed`: Set the download queue speed limit.

### Service `sabnzbd.pause`

| Service data attribute | Optional | Description                                                                                                                                                                                 |
|------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `api_key`      | no       | The SABnzbd API key of the service instance (unique per SABnzbd integration).                                                                                                               |

### Service `sabnzbd.resume`

| Service data attribute | Optional | Description                                                                                                                                                                                 |
|------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `api_key`      | no       | The SABnzbd API key of the service instance (unique per SABnzbd integration).                                                                                                               |

### Service `sabnzbd.set_speed`

| Service data attribute | Optional | Description                                                                                                                                                                                 |
|------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `speed`                | yes      | Sets the download speed limit. If specified as a number with no units, will be interpreted as a percent. If units are provided (e.g., 500K) will be interpreted absolutely. Defaults to 100 |
| `api_key`      | no       | The SABnzbd API key of the service instance (unique per SABnzbd integration).                                                                                                               |
