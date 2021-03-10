---
title: SABnzbd
description: Instructions on how to integrate SABnzbd with Home Assistant.
ha_category:
  - Downloading
  - Sensor
ha_release: 0.7
ha_iot_class: Local Polling
ha_domain: sabnzbd
ha_platforms:
  - sensor
---

The `sabnzbd` integration will allow you to monitor and control your downloads with [SABnzbd](https://sabnzbd.org) from within Home Assistant and setup automations based on the information.

If SABnzbd is discovered on your network, you can enter your API Key in the Configurator. Press "CONFIGURE" to do it.

<p class='img'>
  <img src='/images/screenshots/sabnzbd-configure.png' />
</p>

This will create services for interacting with SABnzbd in scripts and automations, but no sensors will be created.

To configure SABnzbd, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sabnzbd:
  api_key: YOUR_SABNZBD_API_KEY
```

{% configuration %}
api_key:
  description: The API key used to interact with your SABnzbd instance
  required: true
  type: string
host:
  description: The hostname of your SABnzbd instance, e.g., 192.168.1.32.
  required: false
  default: localhost
  type: string
path:
  description: Path to your SABnzbd instance corresponding to its `url_base` setting, e.g., `/sabnzbd`.
  required: false
  type: string
name:
  description: The name of your SABnzbd instance (this will be the prefix for all created sensors).
  required: false
  default: SABnzbd
  type: string
port:
  description: The port on which your SABnzbd instance is listening.
  required: false
  default: 8080
  type: integer
sensors:
  description: List of variables for which to create sensor entities.
  required: false
  type: list
ssl:
  description: Set to true to use SSL (https) to access SABnzbd.
  required: false
  default: false
  type: boolean
{% endconfiguration %}

Available sensors are:

- `current_status`: The current status of SABnzbd (Idle, Paused, etc.)
- `speed`: The current download speed
- `queue_size`: The total size of the download queue
- `queue_remaining`: The remaining size of the download queue
- `disk_size`: The total disk size at SABnzbd's download location
- `disk_free`: The available disk space at SABnzbd's download location
- `queue_count`: The number of items in the download queue
- `day_size`: GB downloaded today
- `week_size`: GB downloaded this week
- `month_size`: GB downloaded this month
- `total_size`: Total GB downloaded

## Full examples

```yaml
# Example configuration.yaml entry
sabnzbd:
  api_key: YOUR_SABNZBD_API_KEY
  host: 192.168.1.32
  path: /sabnzbd
  name: sab
  port: 9090
  ssl: true
  sensors:
    - current_status
    - speed
    - queue_size
    - queue_remaining
    - disk_size
    - disk_free
    - queue_count
    - day_size
    - week_size
    - month_size
    - total_size
```

This will attempt to access your SABnzbd instance at `https://192.168.1.32:9090` and will create sensors named
`sensor.sab_status`, `sensor.sab_speed`, etc.

## Services

### Media control services

Available services: `pause`, `resume`, `set_speed`.

#### Service `sabnzbd/set_speed`

| Service data attribute | Optional | Description                                                                                                                                                                             |
|------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `speed`                |      yes | Sets the download speed limit. If specified as a number with no units, will be interpreted as a percent. If units are provided (e.g., 500K) will be interpreted absolutely. Defaults to 100 |
