---
layout: page
title: "ROVA Sensor"
description: "Instructions on how to integrate ROVA sensor within Home Assistant."
date: 2018-12-08 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: rova.jpg
ha_category: Sensor
ha_release: 0.87
ha_iot_class: "Cloud Polling"
---

[ROVA](https://rova.nl) is a waste collection company that operates in the center and east of the Netherlands. The `rova` platform uses an unofficial [ROVA](https://rova.nl) API to allow you to get your waste collection schedule and integrate this in your Home Assistant installation.

## {% linkable_title Configuration %}

To use the ROVA sensor in your installation, add the following to your configuration.yaml file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rova
    zip_code: ZIP_CODE
    house_number: HOUSE_NUMBER
```

{% configuration %}
zip_code:
  description: Your zip code.
  required: true
  type: string
house_number:
  description: Your house number.
  required: true
  type: string
name:
  description: Let you overwrite the name of the device in the frontend.
  required: false
  default: Rova
  type: string
monitored_conditions:
  description: ROVA information to be monitored. The following collection dates can be monitored.
  required: false
  type: list
  keys:
    bio:
      description: Upcoming collection date of your biodegradable waste
    paper:
      description: Upcoming collection date of your paper waste
    plastic:
      description: upcoming collection date of your plastic waste
    residual:
      description: Upcoming collection date of your general waste
{% endconfiguration %}

If no **monitored_conditions** are specified, only **bio** will be enabled.

### {% linkable_title Full configuration sample %}

A full configuration entry would look like the sample below.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rova
    zip_code: ZIP_CODE
    house_number: HOUSE_NUMBER
    name: Rova
    monitored_conditions:
      - bio
      - paper
      - plastic
      - residual
```

To have your Home Assistant installation remind you of upcoming waste collections, combine the `rova` platform with some [Automations](/docs/automation/) and a [notification platform](/components/notify/).

{% raw %}
```yaml
# Example configuration.yaml entry for Rova waste collection reminder
automation:
  - id: rova-garbage-bio-reminder
    alias: 'Send Rova Bio waste collection reminder'
    hide_entity: true
    trigger:
      - platform: time
        at: '19:00:00'
    condition:
      - condition: template
        value_template: "{% if (as_timestamp(states.sensor.rova_garbage_gft.state) - as_timestamp(now())) < 43200 %}true{% endif %}"
    action:
      - service: NOTIFICATION_SERVICE
        data:
          message: 'Reminder: put out biowaste bin'
```
{% endraw %}
