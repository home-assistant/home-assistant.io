---
title: Number
description: Instructions on how to manage your Number entities with Home Assistant.
ha_category:
  - Number
ha_release: 2020.12
ha_quality_scale: internal
ha_domain: number
ha_codeowners:
  - '@home-assistant/core'
  - '@Shulyaka'
ha_integration_type: entity
---

Keeps track on `number` entities in your environment, their state, and allows you to control them. This integration allows other integrations to get a value input from user within a range.

Number entities cannot be implemented manually, but can be provided by other
integrations. If you are looking for a way to create a number entity,
please take a look at the [Number helper](/integrations/input_number).

## Device Class

The type of data a number represents impacts how it is displayed in the frontend. This is controlled by the number's device class designation. Built-in numbers and many created from an integration will have this designation predefined. Those can be modified in the [customize section](/docs/configuration/customizing-devices/). When manually creating a new number the device class may be optionally assigned. A full list of available number device classes is below:

- **None**: Generic number. This is the default and doesn't need to be set.
- **temperature**: Temperature in °C or °F
 
## Services

The Number entities registers the following services:

| Service | Data | Description |
| ------- | ---- | ----------- |
| `set_value` | `value`<br>`entity_id(s)`<br>`area_id(s)` | Set the value of specific `number` entities
