---
layout: page
title: "Wink Switch"
description: "Instructions how to setup the Wink switches within Home Assistant."
date: 2015-01-20 22:36
sidebar: true
comments: false
sharing: true
footer: true
logo: wink.png
ha_category: Switch
ha_release: pre 0.7
ha_iot_class: "Cloud Polling"
---


The Wink switch platform allows you to control your [Wink](http://www.wink.com/) switches.

The requirement is that you have setup [Wink](/components/wink/).


### Supported switch devices

- Wink Pivot power genius (No Wink hub required)
- non-dimming Z-wave in wall switches (dimming switches show up as lights)
- Wink Relay load controlling switches
- Rachio sprinkler controller (No Wink hub required)
- iHome smart plug (No Wink hub required)
- Wink switch groups (User created groups of switches)
- GoControl siren and strobe
- Dome siren and chime


### {% linkable_title Service `wink_set_siren_auto_shutoff` %}

You can use the service wink/wink_set_siren_auto_shutoff to set how long the siren will sound before shuting off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `auto_shutoff` | no | Int. One of [None, -1, 30, 60, 120] (None and -1 are forever. Use None for gocontrol, and -1 for Dome)
| `entity_id` | yes | String or list of strings that point at `entity_id`s of siren.

Example:

```yaml
script:
  set_all_sirens_to_one_minute_auto_shutoff:
    sequence:
      - service: wink.wink_set_siren_auto_shutoff
        data:
          auto_shutoff: 60
```

<p class='note'>
The following services only work with the Dome siren/chime.
</p>

### {% linkable_title Service `wink_set_chime_volume` %}

You can use the service wink/wink_set_chime_volume to set the volume for the chime on your Dome siren/chime.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `volume` | no | String. One of ["low", "medium", "high"]
| `entity_id` | yes | String or list of strings that point at `entity_id`s of siren/chime.

Example:

```yaml
script:
  set_chime_volume_to_low_for_all_chimes
    sequence:
      - service: wink.wink_set_chime_volume
        data:
          volume: "low"
```

### {% linkable_title Service `wink_set_siren_volume` %}

You can use the service wink/wink_set_chime_volume to set the volume for the chime on your Dome siren/chime.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `volume` | no | String. One of ["low", "medium", "high"]
| `entity_id` | yes | String or list of strings that point at `entity_id`s of siren/chime.

Example:

```yaml
script:
  set_siren_volume_to_low_for_all_sirens
    sequence:
      - service: wink.wink_set_siren_volume
        data:
          volume: "low"
```

### {% linkable_title Service `wink_enable_chime` %}

You can use the service wink/wink_enable_chime to set the tone and enable the chime on your Dome siren/chime.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `tone` | no | String. One of ["doorbell", "fur_elise", "doorbell_extended", "alert", "william_tell", "rondo_alla_turca", "police_siren", "evacuation", "beep_beep", "beep", "inactive"]
| `entity_id` | yes | String or list of strings that point at `entity_id`s of siren/chime.

Example:

```yaml
script:
  execute_doorbell
    sequence:
      - service: wink.wink_enable_chime
        data:
          tone: "doorbell"
```

### {% linkable_title Service `wink_set_siren_tone` %}

You can use the service wink/wink_set_siren_tone to set the tone on your Dome siren. This tone will be used the next time the siren is executed.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `tone` | no | String. One of ["doorbell", "fur_elise", "doorbell_extended", "alert", "william_tell", "rondo_alla_turca", "police_siren", "evacuation", "beep_beep", "beep"]
| `entity_id` | yes | String or list of strings that point at `entity_id`s of siren/chime.

Example:

```yaml
script:
  set_siren_to_alert:
    sequence:
      - service: wink.wink_set_siren_tone
        data:
          tone: "alert"
```

### {% linkable_title Service `wink_set_siren_strobe_enabled` %}

You can use the service wink/wink_set_siren_strobe_enabled to enable or disable the strobe when the siren is executed.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `enabled` | no | Boolean. True or False.
| `entity_id` | yes | String or list of strings that point at `entity_id`s of siren/chime.

Example:

```yaml
script:
  disable_siren_strobe:
    sequence:
      - service: wink.wink_set_siren_strobe_enabled
        data:
          enabled: False
```

### {% linkable_title Service `wink_set_chime_strobe_enabled` %}

You can use the service wink/wink_set_chime_strobe_enabled to enable or disable the strobe when the chime is executed.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `enabled` | no | Boolean. True or False.
| `entity_id` | yes | String or list of strings that point at `entity_id`s of chime/chime.

Example:

```yaml
script:
  disable_chime_strobe:
    sequence:
      - service: wink.wink_set_chime_strobe_enabled
        data:
          enabled: False
```