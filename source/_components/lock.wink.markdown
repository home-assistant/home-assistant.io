---
layout: page
title: "Wink Lock"
description: "Instructions how to setup the Wink locks within Home Assistant."
date: 2015-11-20 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: wink.png
ha_category: Lock
ha_release: 0.9
ha_iot_class: "Cloud Polling"
---


The Wink lock platform allows you to control your [Wink](http://www.wink.com/) locks.

The requirement is that you have setup [Wink](/components/wink/).


### Supported lock devices

- Kwikset
- Schlage
- Generic Z-wave

<p class='note'>
The following services have only been confirmed on Schlage locks.
</p>

### {% linkable_title Service `wink_set_lock_alarm_mode` %}

You can use the service wink/wink_set_lock_alarm_mode to set the alarm mode of your lock.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `mode` | no | String one of tamper, activity, or forced_entry
| `entity_id` | yes | String or list of strings that point at `entity_id`s of locks.

Example:

```yaml
script:
  set_locks_to_tamper:
    sequence:
      - service: wink.wink_set_lock_alarm_mode
        data:
          mode: "tamper"
```

### {% linkable_title Service `wink_set_lock_alarm_sensitivity` %}

You can use the service wink/wink_set_lock_alarm_sensitivity to set the alarm sensitivity of your lock.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `sensitivity` | no | String one of low, medium_low, medium, medium_high, high
| `entity_id` | yes | String or list of strings that point at `entity_id`s of locks.

Example:

```yaml
script:
  set_locks_to_high_sensitivity:
    sequence:
      - service: wink.wink_set_lock_alarm_sensitivity
        data:
          sensitivity: "high"
```

### {% linkable_title Service `wink_set_lock_alarm_state` %}

You can use the service wink/wink_set_lock_alarm_state to set the alarm state of your lock.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `enabled` | no | Boolean enabled or disabled, true or false
| `entity_id` | yes | String or list of strings that point at `entity_id`s of locks.

Example:

```yaml
script:
  disable_all_locks_alarm:
    sequence:
      - service: wink.wink_set_lock_alarm_state
        data:
          enabled: false 
```

### {% linkable_title Service `wink_set_lock_beeper_state` %}

You can use the service wink/wink_set_lock_beeper_state to set the beeper state of your lock.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `enabled` | no | Boolean enabled or disabled, true or false
| `entity_id` | yes | String or list of strings that point at `entity_id`s of locks.

Example:

```yaml
script:
  disable_all_locks_beepers:
    sequence:
      - service: wink.wink_set_lock_beeper_state
        data:
          enabled: false
```

### {% linkable_title Service `wink_set_lock_vacation_mode` %}

You can use the service wink/wink_set_lock_vacation_mode to set the vacation mode of your lock.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `enabled` | no | Boolean enabled or disabled, true or false
| `entity_id` | yes | String or list of strings that point at `entity_id`s of locks.

Example:

```yaml
script:
  enabled_vacation_mode_on_all_locks:
    sequence:
      - service: wink.wink_set_lock_vacation_mode
        data:
          enabled: false
```


<p class='note'>
If supported by your lock, a binary sensor will be created for each user key code you have defined. These key codes will turn on when the code is entered and automatically turn off after a few seconds.
</p>
