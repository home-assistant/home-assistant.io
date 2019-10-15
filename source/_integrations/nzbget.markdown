---
title: "NZBGet"
description: "Instructions on how to integrate NZBGet within Home Assistant."
ha_category:
  - Downloading
logo: nzbget.png
ha_iot_class: Local Polling
ha_release: 0.17
---

The `nzbget` platform will allow you to monitor and control your downloads with [NZBGet](http://NZBGet.net) from within Home Assistant and setup automation based on the information.

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

- `article_cache`: Number of cached articles.
- `average_download_rate`: Average download rate
- `download_paused`: Paused downloads
- `download_rate`: Current download rate
- `download_size`: The size to download
- `free_disk_space`: Free disk space at the storage location of NZBGet
- `post_paused`: Paused posts
- `remaining_size`: Remaining size to download
- `uptime`: Uptime of NZBGet

## Services

Available services: 

  - `pause`: Pause the download queue.
  - `resume`: Resume the download queue.
  - `set_speed`: Set the download queue speed limit.

### Service `nzbget/set_speed`

| Service data attribute | Optional | Description |                                                                                     
|------------------------|----------|-------------------------------------------------------------------------------------------------|
| `speed`                |      yes | Sets the download speed limit, specified in Kb/s. 0 disables the speed limit. Defaults to 1000. |
