---
layout: page
title: "Covers"
description: "Instructions how to integrate covers into Home Assistant."
date: 2016-06-28 17:30
sidebar: true
comments: false
sharing: true
footer: true
---

Home Assistant can give you an interface to control covers such as
rollershutters and garage doors.

### {% linkable_title Service `cover.open_cover` %}

Open one or multiple covers.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of covers. Else targets all.

### {% linkable_title Service `cover.close_cover` %}

Close one or multiple covers.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of covers. Else targets all.

### {% linkable_title Service `cover.stop_cover` %}

Stop one or multiple covers.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of covers. Else targets all.

### {% linkable_title Service `cover.set_cover_position` %}

Set cover position of one or multiple covers.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of covers. Else targets all.
| `position` | no | Integer between 0 and 100.

#### {% linkable_title Automation example  %}

```yaml
automation:
  trigger:
    platform: time
    after: "07:15:00"
  action:
    - service: cover.set_cover_position
      data:
        entity_id: cover.demo
        position: 50
```

### {% linkable_title Service `cover.open_cover_tilt` %}

Open one or multiple covers tilt.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of covers. Else targets all.

### {% linkable_title Service `cover.close_cover_tilt` %}

Close one or multiple covers tilt.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of covers. Else targets all.

### {% linkable_title Service `cover.stop_cover_tilt` %}

Stop one or multiple covers tilting.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of covers. Else targets all.

### {% linkable_title Service `cover.set_cover_tilt_position` %}

Set cover tilt position of one or multiple covers.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of covers. Else targets all.
| `position` | no | Integer between 0 and 100.

#### {% linkable_title Automation example  %}

```yaml
automation:
  trigger:
    platform: time
    after: "07:15:00"
  action:
    - service: cover.set_cover_tilt_position
      data:
        entity_id: cover.demo
        position: 50
```
