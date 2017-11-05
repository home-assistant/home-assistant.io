---
layout: page
title: "Verisure Alarm"
description: "Instructions how to setup the Verisure Alarm control panel within Home Assistant."
date: 2016-02-15 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: verisure.png
ha_category: Alarm
ha_release: 0.7.3
ha_iot_class: "Cloud Polling"
---


The Verisure alarm control panel platform allows you to control your [Verisure](https://www.verisure.com/) Alarms.

The requirement is that you have setup your [Verisure hub](/components/verisure/).

The `changed_by` attribute enables one to be able to take different actions depending on who armed/disarmed the alarm in [automation](/getting-started/automation/).

```yaml
automation:
  - alias: Alarm status changed
    trigger:
      - platform: state
        entity_id: alarm_control_panel.alarm_1
    action:
      - service: notify.notify
        data_template:
          message: >
            {% raw %}Alarm changed from {{ trigger.from_state.state }}
            to {{ trigger.to_state.state }}
            by {{ trigger.to_state.attributes.changed_by }}{% endraw %}
```
