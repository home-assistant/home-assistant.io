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
  - '@jpbede'
ha_domain: sabnzbd
ha_platforms:
  - binary_sensor
  - button
  - number
  - sensor
ha_integration_type: integration
ha_quality_scale: bronze
---

The **SABnzbd** {% term integration %} allows you to monitor and control your downloads with [SABnzbd](https://sabnzbd.org) from within Home Assistant and set up automations based on download status and activity.

SABnzbd is a popular newsgroup binary downloader that automates the downloading, verification, repairing, and extraction of files from Usenet. With this integration, you can create smart home automations that respond to your download activity, monitor disk space, and control your downloads remotely.

## Use cases

Here are some practical ways you can use the SABnzbd integration:

- Download completion notifications: Get notified on your phone or smart display when downloads finish.
- Bandwidth management: Automatically pause downloads during peak internet usage hours or when streaming services are active.
- Disk space monitoring: Set up alerts when your download drive is running low on space.
- Smart scheduling: Automatically start downloads during off-peak hours when internet is faster or cheaper.
- Home theater integration: Pause downloads when movie night starts to ensure smooth streaming.
- Security monitoring: Get alerted if SABnzbd goes offline or becomes unreachable.

## Prerequisites

You need to grab your API key from your SABnzbd instance in order to configure this integration:

1. Navigate to your SABnzbd web interface.
2. Select *Config** {% icon "mdi:settings" %}, then **General**.
3. Copy your API key under **Security**.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
    description: "The full URL, including port, of your SABnzbd server. Example: `http://localhost:8080` or `http://a02368d7-sabnzbd:8080`, if you are using the add-on."
API key:
    description: "The API key of your SABnzbd server. You can find this in the SABnzbd web interface under **Config** {% icon "mdi:settings" %} (top right) > **General** > **Security**."
{% endconfiguration_basic %}

## Supported functionality

### Binary sensors

- **Warnings**: Indicates if SABnzbd has any warnings (for example, disk space low, download errors)

### Buttons

- **Pause**: Pause all downloads
- **Resume**: Resume paused downloads

### Sensors

This integration creates the following sensors to monitor your SABnzbd instance:

- **Status**: The current status of SABnzbd (Idle, Downloading, Paused, etc.)
- **Speed**: The current download speed in MB/s
- **Queue**: The total size of the download queue in GB
- **Left**: The remaining size of the download queue in GB
- **Disk**: The total disk size at SABnzbd's download location in GB
- **Disk free**: The available disk space at SABnzbd's download location in GB
- **Queue count**: The number of items in the download queue
- **Total**: Total GB downloaded since SABnzbd was last restarted

### Numbers

- **Speed limit**: Set the download speed limit (as a percentage of your configured maximum speed).

## Examples

### Basic download monitoring automation

This automation sends a notification when a download completes:

{% raw %}
```yaml
- alias: "SABnzbd download complete"
  triggers:
    - trigger: state
      entity_id: sensor.sabnzbd_status
      to: "Idle"
      from: "Downloading"
  actions:
    - action: notify.mobile_app_your_phone
      data:
        title: "Download Complete"
        message: "SABnzbd has finished downloading and extracting files"
```
{% endraw %}

### Disk space warning

Get notified when your download drive is running low on space:

{% raw %}
```yaml
- alias: "SABnzbd low disk space warning"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.sabnzbd_disk_free
      below: 10
  actions:
    - action: notify.mobile_app_your_phone
      data:
        title: "Low Disk Space"
        message: "Download drive has less than {{ states('sensor.sabnzbd_disk_free') }} GB free"
        data:
          priority: high
```
{% endraw %}

### Bandwidth management during streaming

Automatically pause downloads when your media players are active:

{% raw %}
```yaml
- alias: "Pause downloads during movie time"
  triggers:
    - trigger: state
      entity_id: media_player.living_room_tv
      to: "playing"
  conditions:
    - condition: state
      entity_id: sensor.sabnzbd_status
      state: "Downloading"
  actions:
    - action: button.press
      target:
        entity_id: button.sabnzbd_pause
    - action: notify.mobile_app_your_phone
      data:
        message: "Downloads paused for movie time"

- alias: "Resume downloads after movie time"
  triggers:
    - trigger: state
      entity_id: media_player.living_room_tv
      from: "playing"
      for: "00:05:00"
  conditions:
    - condition: state
      entity_id: sensor.sabnzbd_status
      state: "Paused"
  actions:
    - action: button.press
      target:
        entity_id: button.sabnzbd_resume
```
{% endraw %}

### Smart scheduling with speed limits

Reduce download speed during peak hours and increase it during off-peak hours:

{% raw %}
```yaml
- alias: "SABnzbd peak hours speed limit"
  triggers:
    - trigger: time
      at: "18:00:00"
  actions:
    - action: number.set_value
      target:
        entity_id: number.sabnzbd_speed_limit
      data:
        value: 30

- alias: "SABnzbd off-peak full speed"
  triggers:
    - trigger: time
      at: "23:00:00"
  actions:
    - action: number.set_value
      target:
        entity_id: number.sabnzbd_speed_limit
      data:
        value: 100
```
{% endraw %}

### Dashboard card example

Create a comprehensive SABnzbd monitoring card for your dashboard:

{% raw %}
```yaml
type: entities
title: SABnzbd Downloads
entities:
  - entity: sensor.sabnzbd_status
    name: Status
  - entity: sensor.sabnzbd_speed
    name: Download speed
  - entity: sensor.sabnzbd_queue_count
    name: Items in queue
  - entity: sensor.sabnzbd_left
    name: Remaining
  - type: divider
  - entity: button.sabnzbd_pause
    name: Pause downloads
  - entity: button.sabnzbd_resume
    name: Resume downloads
  - type: divider
  - entity: sensor.sabnzbd_disk_free
    name: Free space
  - entity: number.sabnzbd_speed_limit
    name: Speed limit
```
{% endraw %}

## Data updates

The SABnzbd integration {% term polling polls %} data from your SABnzbd server every 30 seconds by default. This provides near real-time updates of download progress, queue status, and system information without putting excessive load on your SABnzbd instance.

## Troubleshooting

### SABnzbd not found or unreachable

1. Verify SABnzbd is running: Check that SABnzbd is running and accessible via its web interface.
2. Check the URL: Ensure you're using the correct URL format including the port (typically `http://localhost:8080`).
3. Test API key: Verify your API key is correct by comparing it in the SABnzbd web interface.
4. Network connectivity: If SABnzbd is on another device, ensure Home Assistant can reach it over the network
5. Firewall settings: Check that your firewall allows connections to SABnzbd's port.
6. Enable debug logging: Temporarily enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics) for the SABnzbd integration to get more detailed error messages.

### SABnzbd add-on specific issues

If you're using the SABnzbd Home Assistant add-on:

1. Use internal URL: Use `http://a02368d7-sabnzbd:8080` instead of `localhost`.
2. Check add-on logs: Review the SABnzbd add-on logs for any error messages.
3. Add-on configuration: Ensure the add-on is properly configured and started.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
