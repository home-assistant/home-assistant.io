---
title: Snapcast
description: Instructions on how to integrate Snapcast into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.13
ha_iot_class: Local Polling
ha_domain: snapcast
ha_platforms:
  - media_player
ha_integration_type: integration
---

The `snapcast` platform allows you to control [Snapcast](https://github.com/badaix/snapcast) from Home Assistant.

To add Snapcast to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: snapcast
    host: YOUR_IP_ADDRESS
```

{% configuration %}
host:
  description: The IP address of the device, e.g., `192.168.0.10`.
  required: true
  type: string
port:
  description: The port number.
  required: false
  default: 1705
  type: integer
{% endconfiguration %}

## Services

The snapcast components provides a few services registered under the media_player component.

### Service `snapcast.snapshot`

Take a snapshot of what is currently playing on one or more speakers. This service, and the following one, are useful if you want to play a doorbell or notification sound and resume playback afterwards.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | The speakers to snapshot.

### Service `snapcast.restore`

Restore a previously taken snapshot of one or more speakers.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of `entity_id`s that should have their snapshot restored.

### Service `snapcast.join`

Group players together under a single group.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `master` | no | Entity ID of the player to synchronize to.
| `entity_id` | yes | String or list of `entity_id`s to join to the master.

### Service `snapcast.unjoin`

Remove one or more speakers from their group of speakers.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of `entity_id`s to separate from their coordinator speaker.

### Service `snapcast.set_latency`

Set the latency of a speaker.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of `entity_id`s for which latency will be adjusted.
| `latency` | no | Latency in ms.
