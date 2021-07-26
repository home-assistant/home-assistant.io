---
title: Select
description: Instructions on how to manage your Select entities with Home Assistant.
ha_category:
  - Select
ha_release: 2021.7
ha_quality_scale: internal
ha_domain: select
ha_codeowners:
  - '@home-assistant/core'
---

Keeps track on `select` entities in your environment, their state, and allows
you to control them. This integration allows other integrations to offer
a limited set of selectable options for the entity.

### Services

The Select entities registers the following services:

#### Service `select.select_option`

Select the specified option.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `option` | no | Option to be selected

#### Service `select.select_next`

Select the next option.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `cycle` | yes | Whether to select the last option if the first is currently selected. Default: `true`

#### Service `select.select_previous`

Select the previous option.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `cycle` | yes | Whether to select the first option if the last is currently selected. Default: `true`
