---
title: Bluesound
description: Instructions on how to integrate Bluesound devices into Home Assistant.
ha_category:
  - Media player
ha_release: 0.51
ha_iot_class: Local Polling
ha_domain: bluesound
ha_platforms:
  - media_player
ha_codeowners:
  - '@thrawnarn'
ha_integration_type: integration
---

The `bluesound` platform allows you to control your [Bluesound](https://www.bluesound.com/) HiFi wireless speakers and audio integrations from Home Assistant.

{% include integrations/config_flow.md %}

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
