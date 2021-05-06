---
title: Bluesound
description: Instructions on how to integrate Bluesound devices into Home Assistant.
logo: bluesound.png
ha_category:
  - Media Player
ha_release: 0.51
ha_iot_class: Local Polling
ha_domain: bluesound
ha_platforms:
  - media_player
---

The `bluesound` platform allows you to control your [Bluesound](https://www.bluesound.com/) HiFi wireless speakers and audio integrations from Home Assistant.

If you want to automatically discover new devices, just make sure you have discovery: in your `configuration.yaml` file. To manually add a Bluesound device to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml
media_player:
  - platform: bluesound
    hosts:
      - host: 192.168.1.100
```

{% configuration %}
hosts:
  description: List with your Bluesound devices.
  required: false
  type: list
  keys:
    host:
      description: The IP address or hostname of the player.
      required: true
      type: string
    name:
      description: The name of the device used in the frontend.
      required: false
      type: string
    port:
      description: The port to communicate with the device.
      required: false
      default: 11000
      type: integer
{% endconfiguration %}

## Advanced configuration example

```yaml
# Example configuration.yaml entry with manually specified addresses
media_player:
  - platform: bluesound
    hosts:
      - host: 192.168.1.100
        name: bluesound_kitchen
        port: 11000
      - host: 192.168.1.131
```

### Service `bluesound.join`

Group players together under a single master speaker. That will make a new group or join an existing group.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `master` | no | A single `entity_id` that will become/hold the master speaker.
| `entity_id` | no | String or list of a single `entity_id` that will group to master speaker.

### Service `bluesound.unjoin`

Remove one or more speakers from a group of speakers. If no `entity_id` is provided, all speakers are unjoined.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of `entity_id`s that will be separated from their master speaker.

### Service `bluesound.set_sleep_timer`

Sets a timer that will turn off the speaker. For each time you call this it will increase the time by one step. The steps are (in minutes): 15, 30, 45, 60, 90, 0.
If you increase an ongoing timer of for example 13 minutes, it will increase it to 15. If the timer is set to 90, it will remove the time (hence the 0).

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of `entity_id`s that will have their timers set.

### Service `bluesound.clear_sleep_timer`

Clear the sleep timer on a speaker, if one is set.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of `entity_id`s that will have their timers cleared.
