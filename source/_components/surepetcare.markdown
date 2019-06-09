---
layout: page
title: "Sure Petcare"
description: "Instructions how to integrate the Sure Petcare cat and pet flaps into Home Assistant."
date: 2019-06-10 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo:
ha_category:
  - Binary Sensor
  - Sensor
ha_release: 0.95
ha_iot_class: Cloud Polling
---

The `surepetcare` component allows you to get information aber your Sure Petcare Connect Pet or Cat Flap.

To add a flap and pet, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
surepetcare:
  username: x@y.com
  password: v3rys3cr3t!
  household_id: 1337
  flaps: [{id: 2337, name: Flap}]
  pets: [{id: 3337, name: Pet}]
```


{% configuration %}
  username:
    description: The Sure Petcare Username/Email
    required: true
    type: string
  password:
    description: The Sure Petcare Password
    required: true
    type: string
  household_id:
    description: The Sure Petcare household_id
    required: true
    type: integer
  flaps:
    description: The Sure Petcare flaps
    required: true
    type: map
    keys:
      id:
        description: The Sure Petcare id of a flap
        required: true
      name:
        description: A name for the flap
        required: true
  pets:
    description: Pets managed by Sure Petcare flap(s)
    required: true
    type: map
    keys:
      id:
        description: The Sure Petcare id of a pet
        required: true
      name:
        description: The name of the pet
        required: true
{% endconfiguration %}

#### {% linkable_title Getting the IDs of your household, flaps and pets %}

For now, please use the [sp_cli.py](https://github.com/rcastberg/sure_petcare/blob/master/sp_cli.py) from [@rcastberg](https://github.com/rcastberg) to fetch the IDs from the Sure Petcare API. With default setting, the IDs will be written as JSON to `~/.surepet.cache`.
