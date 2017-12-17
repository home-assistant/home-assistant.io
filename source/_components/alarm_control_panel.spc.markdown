---
layout: page
title: "Vanderbilt SPC Alarm"
description: "Instructions how to setup the Vanderbilt SPC Alarm control panel within Home Assistant."
date: 2017-05-18 22:01
sidebar: true
comments: false
sharing: true
footer: true
logo: vanderbilt_spc.png
ha_category: Alarm
ha_release: 0.47
ha_iot_class: "Local Push"
---


The `spc` alarm control panel platform allows you to control your [Vanderbilt SPC](http://www.spc-intruder-detection.com/ssp-spc/) alarms.

The requirement is that you have setup your [SPC hub](/components/spc/).

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
