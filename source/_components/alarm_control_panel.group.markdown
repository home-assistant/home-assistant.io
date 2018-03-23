---
layout: page
title: "Alarm Group"
description: "Instructions on how to set up the alarm group platform."
date: 2017-11-22 00:12
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Alarm
ha_release: 0.66
---

The `group` alarm platform allows you to combine multiple `alarm` platforms into a single service.

To use this notification platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
alarm:
  - name: ALARM_NAME
    platform: group
    code_format: '\d+'
    panels:
    - panel: alarm_control_panel.garage
    - panel: alarm_control_panel.living_room
    - panel: alarm_control_panel.bedroom
    - panel: alarm_control_panel.tampering
```

{% configuration %}
  name:
    description: The name of the group
    required: false
    type: string
  code_format:
    description: A regular expression for the code, only required if you want to protect the alarm with a code.  `'\d+'` denotes a numeric code.
    required: false
    type: string
  entities:
    description: A list of entity ids for the alarm control panels to be included in the group.
    required: false
    type: list
{% endconfiguration %}
